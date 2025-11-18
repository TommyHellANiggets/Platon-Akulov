from django.db import models


class Statistics(models.Model):
    years_experience = models.IntegerField(default=0, verbose_name="Лет опыта")
    projects_count = models.IntegerField(default=0, verbose_name="Количество проектов")
    clients_count = models.IntegerField(default=0, verbose_name="Количество клиентов")
    positive_reviews = models.IntegerField(default=0, verbose_name="Положительных отзывов")
    hours_worked = models.IntegerField(default=0, verbose_name="Часов работы")
    lines_of_code = models.IntegerField(default=0, verbose_name="Строк кода")
    views_count = models.PositiveIntegerField(default=0, verbose_name="Просмотров")

    class Meta:
        verbose_name = "Статистика"
        verbose_name_plural = "Статистика"

    def __str__(self):
        return "Статистика сайта"


class Project(models.Model):
    title = models.CharField(max_length=200, verbose_name="Название")
    description = models.TextField(verbose_name="Описание", blank=True, null=True)
    image = models.ImageField(upload_to="projects/", verbose_name="Изображение")
    url = models.URLField(blank=True, null=True, verbose_name="Ссылка на проект")
    created_at = models.DateField(verbose_name="Дата создания", blank=True, null=True)
    order = models.IntegerField(default=0, verbose_name="Порядок отображения")

    class Meta:
        verbose_name = "Проект"
        verbose_name_plural = "Проекты"
        ordering = ["order"]

    def __str__(self):
        return self.title


class Testimonial(models.Model):
    project_title = models.CharField(max_length=200, verbose_name="Название проекта")
    author_name = models.CharField(max_length=100, verbose_name="Имя клиента")
    comment = models.TextField(verbose_name="Отзыв")
    is_positive = models.BooleanField(default=True, verbose_name="Положительный отзыв")
    date = models.DateField(verbose_name="Дата отзыва")
    link = models.URLField(blank=True, null=True, verbose_name="Ссылка на отзыв")

    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"
        ordering = ["-date"]

    def __str__(self):
        return f"Отзыв от {self.author_name} о {self.project_title}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=100, verbose_name="Имя")
    email = models.EmailField(verbose_name="Email")
    message = models.TextField(verbose_name="Сообщение")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Получено")
    is_read = models.BooleanField(default=False, verbose_name="Прочитано")

    class Meta:
        verbose_name = "Сообщение"
        verbose_name_plural = "Сообщения"
        ordering = ["-created_at"]

    def __str__(self):
        return f"Сообщение от {self.name} ({self.email})"


class SiteVisit(models.Model):
    session_key = models.CharField(max_length=64, unique=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Посещение"
        verbose_name_plural = "Посещения"
        ordering = ["-created_at"]

    def __str__(self):
        return f"Посещение {self.session_key}"
