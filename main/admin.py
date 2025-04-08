from django.contrib import admin
from .models import Statistics, Project, Testimonial, ContactMessage
# from image_cropping import ImageCroppingMixin

@admin.register(Statistics)
class StatisticsAdmin(admin.ModelAdmin):
    list_display = ('years_experience', 'projects_count', 'clients_count', 'positive_reviews')
    
    def has_add_permission(self, request):
        # Проверяем, есть ли уже записи в таблице
        if Statistics.objects.exists():
            return False
        return super().has_add_permission(request)
    
    def has_delete_permission(self, request, obj=None):
        # Запрещаем удаление записи статистики
        return False

@admin.register(Project)
# class ProjectAdmin(ImageCroppingMixin, admin.ModelAdmin):
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'order', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('title', 'description')
    ordering = ('order',)

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('author_name', 'project_title')
    search_fields = ('author_name', 'project_title', 'comment')

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at', 'is_read')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('created_at',)
    
    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)
    mark_as_read.short_description = "Отметить как прочитанное"
    
    def mark_as_unread(self, request, queryset):
        queryset.update(is_read=False)
    mark_as_unread.short_description = "Отметить как непрочитанное"
    
    actions = ['mark_as_read', 'mark_as_unread']
