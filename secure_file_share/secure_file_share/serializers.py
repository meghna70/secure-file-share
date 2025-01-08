from rest_framework import serializers
from .models import File
import base64
from rest_framework import serializers
from .models import Permissions  # Ensure this is your correct model

class PermissionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permissions
        fields = '__all__'  # Or specify the fields you want to include

class FileSerializer(serializers.ModelSerializer):
    file = serializers.SerializerMethodField()  # Serialize file blob as Base64

    class Meta:
        model = File
        fields = ['id', 'username', 'filename', 'file', 'uploaded_at']

    def get_file(self, obj):
        # Convert the binary data to a Base64 string for serialization
        if obj.file_blob:
            return base64.b64encode(obj.file_blob).decode('utf-8')
        return None

    def create(self, validated_data):
        # Handle file uploads as binary data
        file_blob = validated_data.pop('file_blob', None)
        file_instance = File.objects.create(
            **validated_data,
            file_blob=base64.b64decode(file_blob) if file_blob else None
        )
        return file_instance
    

class VerifyAccountSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    otp = serializers.IntegerField()
