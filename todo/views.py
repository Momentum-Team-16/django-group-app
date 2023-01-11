from django.http import JsonResponse
from django.shortcuts import render
from .models import User, Task, Completion

# Create your views here.


def index(request):
    tasks = Task.objects.all()
    context = {
        'tasks': tasks,
    }
    return render(request, 'todo/index.html', context)


def create_completion(request, task_pk):
    task = Task.objects.get(pk=task_pk)
    completion = Completion.objects.create(
        completed_by=request.user, task=task)

    data = {
        'completed': 'True',
        'task': task_pk
    }
    return JsonResponse(data)
