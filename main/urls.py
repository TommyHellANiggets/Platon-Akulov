from django.urls import path
from django.contrib.auth import views as auth_views
from . import views, views_dashboard

urlpatterns = [
    # Публичные страницы
    path('', views.index, name='index'),
    path('contact/', views.contact, name='contact'),
    
    # Авторизация
    path('login/', auth_views.LoginView.as_view(template_name='main/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='/'), name='logout'),
    
    # Панель управления
    path('dashboard/', views_dashboard.dashboard, name='dashboard'),
    
    # Проекты
    path('dashboard/projects/', views_dashboard.project_list, name='project_list'),
    path('dashboard/projects/create/', views_dashboard.project_create, name='project_create'),
    path('dashboard/projects/<int:pk>/edit/', views_dashboard.project_edit, name='project_edit'),
    path('dashboard/projects/<int:pk>/delete/', views_dashboard.project_delete, name='project_delete'),
    path('dashboard/projects/reorder/', views_dashboard.reorder_projects, name='project_reorder'),
    
    # Отзывы
    path('dashboard/testimonials/', views_dashboard.testimonial_list, name='testimonial_list'),
    path('dashboard/testimonials/create/', views_dashboard.testimonial_create, name='testimonial_create'),
    path('dashboard/testimonials/<int:pk>/edit/', views_dashboard.testimonial_edit, name='testimonial_edit'),
    path('dashboard/testimonials/<int:pk>/delete/', views_dashboard.testimonial_delete, name='testimonial_delete'),
    
    # Статистика
    path('dashboard/statistics/', views_dashboard.statistics_edit, name='statistics_edit'),
    
    # Сообщения
    path('dashboard/messages/', views_dashboard.message_list, name='message_list'),
    path('dashboard/messages/<int:pk>/', views_dashboard.message_view, name='message_view'),
    path('dashboard/messages/<int:pk>/delete/', views_dashboard.message_delete, name='message_delete'),
    path('dashboard/messages/<int:pk>/reply/', views_dashboard.message_reply, name='message_reply'),
    path('dashboard/messages/mark-all-read/', views_dashboard.mark_all_read, name='mark_all_read'),
] 