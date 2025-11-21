from django.urls import path
from django.contrib.auth import views as auth_views
from . import views, views_dashboard

urlpatterns = [
    # Публичные страницы
    path('', views.index, name='index'),
    path('contact/', views.contact, name='contact'),
    
    # Авторизация
    path('admin/login/', views_dashboard.login_view, name='login'),
    path('logout/', views_dashboard.logout_view, name='logout'),
    
    # Панель управления
    path('admin/', views_dashboard.dashboard, name='dashboard'),
    
    # Проекты
    path('admin/projects/', views_dashboard.project_list, name='project_list'),
    path('admin/projects/create/', views_dashboard.project_create, name='project_create'),
    path('admin/projects/<int:pk>/edit/', views_dashboard.project_edit, name='project_edit'),
    path('admin/projects/<int:pk>/delete/', views_dashboard.project_delete, name='project_delete'),
    path('admin/projects/reorder/', views_dashboard.reorder_projects, name='project_reorder'),
    
    # Отзывы
    path('admin/testimonials/', views_dashboard.testimonial_list, name='testimonial_list'),
    path('admin/testimonials/create/', views_dashboard.testimonial_create, name='testimonial_create'),
    path('admin/testimonials/<int:pk>/edit/', views_dashboard.testimonial_edit, name='testimonial_edit'),
    path('admin/testimonials/<int:pk>/delete/', views_dashboard.testimonial_delete, name='testimonial_delete'),
    
    # Статистика
    path('admin/statistics/', views_dashboard.statistics_edit, name='statistics_edit'),
    
    # Сообщения
    path('admin/messages/', views_dashboard.message_list, name='message_list'),
    path('admin/messages/<int:pk>/', views_dashboard.message_view, name='message_view'),
    path('admin/messages/<int:pk>/delete/', views_dashboard.message_delete, name='message_delete'),
    path('admin/messages/<int:pk>/reply/', views_dashboard.message_reply, name='message_reply'),
    path('admin/messages/mark-all-read/', views_dashboard.mark_all_read, name='mark_all_read'),
]