

from django.contrib import admin
from django.urls import path
from . import views
from .views import signup, login_view, files_by_username, serve_shared_file, allUsers, send_attachment_email
from django.conf import settings
from django.conf.urls.static import static
from .views import FileUploadView, VerifyOTP, FileDelete


urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/register', signup, name='register'),
    path('api/login', login_view, name='login'),
    path('', views.index, name='index'),
    path('api/upload', FileUploadView.as_view(), name='file-upload'),
    # path('api/allFilesByUsername', FileUploadView.as_view(), name='file'),
    path('api/files/<str:username>/', files_by_username, name='files-by-username'),
    path('file/share/<int:file_id>/', serve_shared_file, name='serve_shared_file'),
    path('api/filesDelete', FileDelete.as_view(), name='delete_file'),
    path('api/verify', VerifyOTP.as_view()),
    path('api/allUsers/<str:username>/', allUsers, name = "allUsers"),
    path('api/sendEmail', send_attachment_email, name="send_attachment_email")
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)