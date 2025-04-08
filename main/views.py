from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from django.conf import settings
from .models import Statistics, Testimonial, ContactMessage, Project
from django.views.decorators.csrf import csrf_exempt
import json

def index(request):
    """Главная страница портфолио"""
    projects = Project.objects.all().order_by('order')
    testimonials = Testimonial.objects.all()
    
    # Количество проектов на странице
    per_page = 6
    total_projects = projects.count()
    
    # Получаем проекты для первой страницы
    initial_projects = projects[:per_page]
    
    # Получаем статистику
    try:
        statistics = Statistics.objects.first()
        if not statistics:
            statistics = Statistics.objects.create(
                years_experience=4,
                projects_count=50,
                clients_count=30,
                positive_reviews=35
            )
    except Exception as e:
        print(f"Ошибка при получении статистики: {e}")
        statistics = None
    
    context = {
        'projects': initial_projects,
        'total_projects': total_projects,
        'has_more': total_projects > per_page,
        'testimonials': testimonials,
        'statistics': statistics,
    }
    
    return render(request, 'main/index.html', context)

@csrf_exempt
def contact(request):
    """Обработка формы обратной связи"""
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        
        if name and email and message:
            ContactMessage.objects.create(
                name=name,
                email=email,
                message=message
            )
            return JsonResponse({'success': True})
        
        return JsonResponse({'success': False, 'error': 'Все поля обязательны для заполнения'})
    
    return JsonResponse({'success': False, 'error': 'Метод не поддерживается'})

@login_required
def dashboard(request):
    """Панель управления"""
    messages = ContactMessage.objects.all().order_by('-date')
    projects = Project.objects.all().order_by('order')
    testimonials = Testimonial.objects.all()
    
    context = {
        'messages': messages,
        'projects': projects,
        'testimonials': testimonials,
    }
    
    return render(request, 'main/dashboard.html', context)

def login_view(request):
    """Страница входа в панель управления"""
    return render(request, 'main/login.html')

# Dashboard views
@login_required
def dashboard(request):
    testimonials_count = Testimonial.objects.count()
    projects_count = Project.objects.count()
    messages_count = ContactMessage.objects.count()
    unread_messages_count = ContactMessage.objects.filter(is_read=False).count()
    
    context = {
        'testimonials_count': testimonials_count,
        'projects_count': projects_count,
        'messages_count': messages_count,
        'unread_messages_count': unread_messages_count,
    }
    return render(request, 'dashboard/index.html', context)

# Message views
@login_required
def message_list(request):
    messages_list = ContactMessage.objects.all().order_by('-created_at')
    
    if request.method == 'POST' and 'mark_all_read' in request.POST:
        ContactMessage.objects.filter(is_read=False).update(is_read=True)
        messages.success(request, 'Все сообщения отмечены как прочитанные!')
        return redirect('message_list')
    
    return render(request, 'dashboard/messages/list.html', {'messages_list': messages_list})

@login_required
def message_view(request, pk):
    message = get_object_or_404(ContactMessage, pk=pk)
    
    if request.method == 'POST':
        if 'is_read' in request.POST:
            message.is_read = True
            message.save()
            messages.success(request, 'Статус сообщения обновлен!')
        return redirect('message_view', pk=message.pk)
    
    return render(request, 'dashboard/messages/view.html', {'message': message})

@login_required
def message_delete(request, pk):
    message = get_object_or_404(ContactMessage, pk=pk)
    
    if request.method == 'POST':
        message.delete()
        messages.success(request, 'Сообщение успешно удалено!')
        return redirect('message_list')
    
    return render(request, 'dashboard/messages/delete.html', {'message': message})

@login_required
def message_reply(request, pk):
    message = get_object_or_404(ContactMessage, pk=pk)
    
    if request.method == 'POST':
        subject = request.POST.get('subject')
        reply_text = request.POST.get('message')
        mark_read = request.POST.get('mark_read') == 'on'
        
        if subject and reply_text:
            # Отправка email
            send_mail(
                subject,
                reply_text,
                settings.DEFAULT_FROM_EMAIL,
                [message.email],
                fail_silently=False,
            )
            
            # Отметить как прочитанное если выбрано
            if mark_read:
                message.is_read = True
                message.save()
            
            messages.success(request, f'Ответ успешно отправлен на {message.email}!')
            return redirect('message_list')
        else:
            messages.error(request, 'Пожалуйста, заполните все поля формы!')
    
    return render(request, 'dashboard/messages/reply.html', {'message': message})

def load_more_projects(request):
    """AJAX обработчик для загрузки дополнительных проектов"""
    offset = int(request.GET.get('offset', 0))
    screen_size = request.GET.get('screen', 'desktop')
    
    # Определяем количество загружаемых проектов в зависимости от размера экрана
    if screen_size == 'mobile':
        per_page = 2
    elif screen_size == 'tablet':
        per_page = 4
    else:  # desktop
        per_page = 6
    
    projects = Project.objects.all().order_by('order')[offset:offset+per_page]
    total_count = Project.objects.count()
    
    # Преобразуем проекты в JSON
    projects_data = []
    for project in projects:
        project_dict = {
            'title': project.title,
            'url': project.url,
            'image': str(project.image) if project.image else None,
            'created_at': project.created_at.strftime('%d.%m.%Y') if project.created_at else None,
        }
        projects_data.append(project_dict)
    
    # Проверяем, является ли эта партия последней
    is_last_batch = (offset + per_page) >= total_count
    
    return JsonResponse({
        'projects': projects_data,
        'is_last_batch': is_last_batch
    })
