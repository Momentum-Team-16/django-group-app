from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    bio = models.TextField(max_length=500, blank=True, null=True)
    location = models.CharField(max_length=30, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)


class Task(models.Model):
    LOW = '1'
    MEDIUM = '2'
    HIGH = '3'
    IMPORTANCE_CHOICES = [
        (LOW, 'Low'),
        (MEDIUM, 'Medium'),
        (HIGH, 'High')
    ]

    title = models.CharField(max_length=50)
    details = models.TextField(max_length=500, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='tasks')
    participants = models.ManyToManyField(User, related_name='completed_tasks')
    checkbox = models.BooleanField(default=False)
    importance = models.CharField(
        max_length=1, choices=IMPORTANCE_CHOICES, null=True, blank=True)

    def __str__(self):
        return f'{self.title} to be completed by {self.owner}'


class Completion(models.Model):
    completed_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='completions')
    completed_date = models.DateTimeField(
        auto_now_add=True, blank=True, null=True)
    debrief = models.TextField(max_length=500, null=True, blank=True)
    task = models.ForeignKey(
        Task, on_delete=models.CASCADE, related_name='completions')

# class Group(models.Model):
#     task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='tasks')
