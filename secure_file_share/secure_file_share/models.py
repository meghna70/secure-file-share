from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.utils.timezone import now, timedelta
# Create your models here.
class userList(models.Model):
    is_anonymous = None,
    is_authenticated = None,
    username = models.CharField(max_length = 200, unique=True)
    email = models.EmailField()
    password = models.TextField(max_length = 100)
    verified = models.BooleanField(default=False)
    role = models.TextField(default="Regular")
    is_active = models.BooleanField(default=True)
    otp = models.IntegerField(max_length=6)
    REQUIRED_FIELDS = ['email']
    USERNAME_FIELD = "username"
    def save(self, *args, **kwargs):
        if not self.id:  # Hash password on creation
            self.password = make_password(self.password)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.username

class File(models.Model):
    username = models.CharField(max_length=100)  # User who uploaded the file
    filename = models.CharField(max_length=255)  # Original file name
    # file = models.FileField(upload_to='uploads/')  # File storage path
    # file_content = models.TextField() 
    file_blob = models.BinaryField()
    uploaded_at = models.DateTimeField(auto_now_add=True)  # Timestamp of uplo
    def __str__(self):
        return f"{self.username} - {self.filename}"
    

def default_expiry_time():
    return now() + timedelta(days=1)

class Permissions(models.Model):
    to_username = models.CharField(max_length=100)  # User who uploaded the file
    from_username = models.CharField(max_length=100)
    to_email =  models.EmailField()
    from_email =  models.EmailField()
    file_id = models.IntegerField()
    filename = models.CharField(max_length=255)  # Original file name
    permission_type = models.TextField(default = "View")
    file_blob = models.BinaryField()
    start_time = models.DateTimeField(auto_now_add=True)  # Timestamp of uplo
    expiry_time = models.DateTimeField(default=default_expiry_time)
    shared_link = models.URLField()
    def __str__(self):
        return f"Permission: {self.permission_type} for {self.filename} from {self.from_username} to {self.to_username}"
    
