from django.db import models
# from image_cropping import ImageRatioField

# Create your models here.

class Statistics(models.Model):
    years_experience = models.IntegerField(default=0, verbose_name="Лет опыта")
    projects_count = models.IntegerField(default=0, verbose_name="Количество проектов")
    clients_count = models.IntegerField(default=0, verbose_name="Количество клиентов")
    positive_reviews = models.IntegerField(default=0, verbose_name="Положительных отзывов")
    hours_worked = models.IntegerField(default=0, verbose_name="Часов работы")
    lines_of_code = models.IntegerField(default=0, verbose_name="Строк кода")
    
    class Meta:
        verbose_name = "Статистика"
        verbose_name_plural = "Статистика"
    
    def __str__(self):
        return "Статистика сайта"

class Project(models.Model):
    title = models.CharField(max_length=200, verbose_name="Название")
    description = models.TextField(verbose_name="Описание", blank=True, null=True)
    image = models.ImageField(upload_to='projects/', verbose_name="Изображение")
    url = models.URLField(blank=True, null=True, verbose_name="Ссылка на проект")
    created_at = models.DateField(verbose_name="Дата создания", blank=True, null=True)
    order = models.IntegerField(default=0, verbose_name="Порядок отображения")
    
    class Meta:
        verbose_name = "Проект"
        verbose_name_plural = "Проекты"
        ordering = ['order']
    
    def __str__(self):
        return self.title

class Testimonial(models.Model):
    project_title = models.CharField(max_length=200, verbose_name="Название проекта")
    author_name = models.CharField(max_length=100, verbose_name="Имя автора")
    comment = models.TextField(verbose_name="Комментарий")
    is_positive = models.BooleanField(default=True, verbose_name="Положительный отзыв")
    date = models.DateField(verbose_name="Дата отзыва")
    link = models.URLField(blank=True, null=True, verbose_name="Ссылка на отзыв")
    
    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"
        ordering = ['-date']
    
    def __str__(self):
        return f"Отзыв от {self.author_name} о {self.project_title}"

class ContactMessage(models.Model):
    name = models.CharField(max_length=100, verbose_name="Имя")
    email = models.EmailField(verbose_name="Email")
    message = models.TextField(verbose_name="Сообщение")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    is_read = models.BooleanField(default=False, verbose_name="Прочитано")
    
    class Meta:
        verbose_name = "Сообщение"
        verbose_name_plural = "Сообщения"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Сообщение от {self.name} ({self.email})"
