from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import FileSerializer, VerifyAccountSerializer
from rest_framework import status
from .models import userList, File, Permissions
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
import pyotp
from django.contrib.auth.hashers import check_password
from .utils import send_otp_email, verify_otp
from rest_framework_simplejwt.authentication import JWTAuthentication
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from django.core.mail import send_mail
from io import BytesIO
from django.http import HttpResponse
import json
from cryptography.fernet import Fernet
from django.conf import settings
from django.core.mail import EmailMessage
import base64
import random
import os
from datetime import datetime, timedelta

# In-memory storage for OTP secrets (for demo purposes)
otp_secrets = {}
otp_store = {}
f = Fernet(settings.SECURE_KEY_AES)

def index(request):
    return render(request, 'index.html')


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')
    role = request.data.get('role')
    if not username or not password or not email:
        return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the username already exists
    if userList.objects.filter(username=username).exists():
        return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

    # Create the user in the userList model
    user = userList.objects.create(username=username, password=password, email=email, role = role, verified=False, otp = 0)
    refresh = RefreshToken()
    refresh["user_id"] = user.id  # Store user ID in the token
    
    send_otp_email(email, username)
    return Response({
        "message": "User registered successfully.",
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }, status=status.HTTP_201_CREATED)


def encrypt (file):
    try:
        with open(file, "rb") as file_original:
            original = base64.b64encode(file_original.read())
        
        return original
    except Exception as e:
        try:
            print("base 64 encoding did not work")
            file_content = file.read()
            # Encrypt the content
            encrypted_data = f.encrypt(file_content)

            return encrypted_data
        except Exception as e:
            return Response({"message": f"Error during encryption: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

class VerifyOTP(APIView):
    def post(self, request):
        try:
            # Extract fields from request
            username = request.data.get("username")
            otp = request.data.get("otp")
            email = request.data.get("email")

            if not username or not otp or not email:
                return Response(
                    {"message": "All fields (username, otp, email) are required."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Find user by username
            user = userList.objects.filter(username=username).first()

            if not user:
                return Response(
                    {"message": "Invalid username"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Validate OTP
            if str(user.otp) != otp:
                return Response(
                    {"message": "Incorrect OTP.",},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Mark user as verified
            user.verified = True
            user.save()

            return Response(
                {"message": "User verified", "data": {}},
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            print("Error:", e)
            return Response(
                {"message": "An error occurred", "error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


@api_view(['POST', 'DELETE'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if not username or not password :
        return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Fetch user from userList model
        user = userList.objects.get(username=username)

        # Verify password (note: you might want to hash the password before storing it)
        password_match =  check_password(password, user.password)
        if password_match != True :
            return Response({"error": "Invalid username or password."}, status=status.HTTP_400_BAD_REQUEST)

        if user.email != email:
            return Response({"error": "Invalid email."}, status=status.HTTP_401_UNAUTHORIZED)

        # # Verify OTP
        # otp_secret = otp_secrets.get(user.username)
        # if not otp_secret:
        #     return Response({"error": "2FA is not configured for this user."}, status=status.HTTP_400_BAD_REQUEST)

        # totp = pyotp.TOTP(otp_secret)
        # if not totp.verify(otp_token):
        #     return Response({"error": "Invalid OTP."}, status=status.HTTP_401_UNAUTHORIZED)
       
        refresh = RefreshToken()
        refresh["user_id"] = user.id  # Store user ID in the token
        return Response({
            "refresh": str(refresh),
            "access":  str(refresh.access_token),
            "username": str(username),
            "email": str(email),
            "role": str(user.role)
        })
    
    
    except userList.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
    

class FileUploadView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        file = request.FILES.get('file')
        filename = request.data.get('filename')

        if not username or not file:
            return Response({'error': 'Username and file are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # encrypted_file = encrypt(file)
            file_instance = File(
                username=username, 
                filename=filename,  
                file_blob=file.read()
                )
            file_instance.save()
            # serializer = FileSerializer(file_instance)
            return Response({ "file_id": file_instance.id}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status = status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['GET'])
@permission_classes([AllowAny])
def files_by_username(request, username):
    files = File.objects.filter(username=username)
    if not files.exists():
        return Response({'error': 'No files found for this user'}, status=404)

    new_files = []

    for file in files:
        file_base64 = base64.b64encode(file.file_blob).decode('utf-8') if file.file_blob else None
        new_files.append({
            'id': file.id,
            'filename': file.filename,
            'file': file_base64,  
            'upload_date': file.uploaded_at
        })

    return Response(new_files, status=200)


@api_view(['GET'])
@permission_classes([AllowAny])
def allUsers(request, username):
  
    users = userList.objects.exclude(username=username)
    print("users:", users)
    if not users.exists():
        return Response({'error': 'No other user'}, status=404)

    all_users = []

    for user in users:
        # file_base64 = base64.b64encode(file.file_blob).decode('utf-8') if file.file_blob else None
        all_users.append({
            'id': user.id,
            'username': user.username,
            'email' : user.email
        })

    return Response(all_users, status=200)


@api_view(['GET'])
@permission_classes([AllowAny])
def serve_shared_file(request, file_id):
    file = File.objects.filter(id = file_id)[0]
    
    # Assuming the file is stored in an encrypted blob field
    encrypted_data = file.file_blob

    # Decrypt the file
    file_base64 = base64.b64encode(encrypted_data).decode('utf-8') if encrypted_data else None

    # response['Content-Disposition'] = f'attachment; filename={file.filename}'

    if file.filename.endswith('.pdf'):
        content_type = 'application/pdf'
    elif file.filename.endswith('.jpg') or file.filename.endswith('.jpeg'):
        content_type = 'image/jpeg'
    elif file.filename.endswith('.png'):
        content_type = 'image/png'
    else:
        content_type = 'application/octet-stream'

    # Serve the decrypted file for viewing in the browser
    response = HttpResponse(file_base64, content_type=content_type)
    response['Content-Disposition'] = f'inline; filename={file.filename}'  # "inline" will attempt to display in the browser
    return response


class FileDelete(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        try:
            file = File.objects.get(id=request.data.get("file_id"))
            file.delete()
            return Response({"message": " successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([AllowAny])
def send_attachment_email(request):
    to_username = request.data.get("to_username")
    from_username = request.data.get("from_username")
    file_id = request.data.get("file_id")
    permission_type = request.data.get("permission_type")

    to_user = userList.objects.get(username = to_username)     
    from_user = userList.objects.get(username = from_username) 
    share_file = File.objects.get(id=file_id)

    subject = f'Fortifile file is shared with you'
    message = f'The file shared is attached here. '
    
    sender_email = settings.EMAIL_HOST_USER

    try:
        decoded_file = base64.b64decode(share_file.file_blob)
        file_path = os.path.join(settings.MEDIA_ROOT, share_file.filename)

        # Temporarily save the file to attach it
        with open(file_path, 'wb') as f:
            f.write(decoded_file)

        # Create email with file attachment
        email = EmailMessage(
            subject=subject,
            body=message,
            from_email=settings.EMAIL_HOST_USER,
            to=[to_user.email],
        )
        email.attach_file(share_file.filename, decoded_file, "application/pdf" )

        # Send email
        email.send(fail_silently=False)

        # Remove temporary file
        os.remove(file_path)

    except Exception as e:
        return Response({"error": f"Failed to send email with attachment. {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
    send_mail(subject, message, sender_email, [to_user.email], fail_silently=False)

    permission_obj = Permissions.objects.create(
        to_username= to_username, 
        from_username=from_username, 
        to_email=to_user.email, 
        from_email=from_user.email,
        file_id = file_id,
        filename = share_file.filename,
        permission_type = permission_type,
        file_blob = share_file.file_blob)
    
    return Response({ "message": "Shared Link sent successfully."}, status=status.HTTP_201_CREATED)
      