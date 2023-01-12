from django.http import JsonResponse
from django.shortcuts import render
from .models import User, Task, Completion
from .forms import TaskForm

# Create your views here.


def index(request):
    tasks = Task.objects.all()
    completed_tasks = [completion.task for completion in Completion.objects.filter(completed_by=request.user)]
    form = TaskForm()
    context = {
        'tasks': tasks,
        'completed_tasks': completed_tasks,
        'form': form,
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


def create_task(request):
    if request.method == 'POST':
        form = TaskForm(request.POST)

        if form.is_valid():
            task = form.save(commit=False)

            task.owner = request.user
            task.save()

            data = {
                'created': 'yes',
                'task_title': task.title,
                'task_details': task.details,
                'task_importance': task.importance,
                'task_pk': task.pk,
            }
        else:
            data = {'errors': form.errors}

    else:
        data = {
            'created': 'nothing'
        }
    return JsonResponse(data)
