from django.core.mail import send_mail
import random
from django.conf import settings
from rest_framework.views import APIView
from rest_framework import status
from .serializers import VerifyAccountSerializer
from .models import userList
from rest_framework.response import Response

def send_otp_via_email(email):
    subject = f'Fortifile account verification email'
    otp = random.randint(100000, 999999)
    message = f'Your verification One Time Password(OTP) is {otp}'
    from_email = settings.EMAIL_HOST_USER
    send_mail(subject, message, from_email, [email])
    user_obj = userList.objects.get(email=email)
    user_obj.otp=otp
    user_obj.save()

