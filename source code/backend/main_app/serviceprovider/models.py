from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField

class TaskerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='tasker_profile')
    address = models.TextField(blank=True)
    experience = models.CharField(max_length=255, blank=True)
    no_experience = models.BooleanField(default=False)
    service_types = ArrayField(models.CharField(max_length=255), blank=True, default=list)
    terms_accepted = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - {self.user.email}"

class Document(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='documents')
    mandatory_document = models.FileField(upload_to='documents/mandatory/')
    additional_documents = ArrayField(models.FileField(upload_to='documents/additional/'), blank=True, default=list)

    def __str__(self):
        return f"Documents for {self.user.email}"
