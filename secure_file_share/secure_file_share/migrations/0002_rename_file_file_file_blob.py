# Generated by Django 5.1.4 on 2024-12-27 10:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("secure_file_share", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="file",
            old_name="file",
            new_name="file_blob",
        ),
    ]
