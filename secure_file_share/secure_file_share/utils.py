import random
from django.core.cache import cache
from django.core.mail import send_mail
from asgiref.sync import sync_to_async
import pyotp
import random
from django.conf import settings
from .models import userList

def generate_and_store_otp(email):
    # Generate a 6-digit OTP
    otp = random.randint(100000, 999999)
    
    # Store OTP in cache with a 5-minute expiration (300 seconds)
    cache.set(f'otp_{email}', otp, timeout=300)
    
    return otp



# Send the provisioning URL to the user's email (for setting up Google Authenticator)
def send_otp_email(email, username):
    subject = f'Fortifile account verification email'
    otp = random.randint(100000, 999999)
    message = f'Your verification One Time Password(OTP) is {otp}'
    from_email = settings.EMAIL_HOST_USER
    send_mail(subject, message, from_email, [email], fail_silently=False)
    user_obj = userList.objects.get(username=username)
    user_obj.otp=otp
    user_obj.save()


def verify_otp(email, user_otp):
    stored_otp = cache.get(f'otp_{email}')
    if stored_otp and str(stored_otp) == str(user_otp):
        cache.delete(f'otp_{email}')  
        return True
    return False