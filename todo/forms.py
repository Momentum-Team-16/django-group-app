from django import forms
from .models import Task, Completion, User


class TaskForm(forms.ModelForm):

    class Meta:
        model = Task
        fields = ('title', 'details', 'participants', 'importance')
