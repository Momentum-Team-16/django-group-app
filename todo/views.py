from django.shortcuts import render
from .models import User, Task, Completion

# Create your views here.


def index(request):
    tasks = Task.objects.all()
    context = {
        'tasks': tasks,
    }
    return render(request, 'todo/index.html', context)
