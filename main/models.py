from django.db import models
# from image_cropping import ImageRatioField

# Create your models here.

class Statistics(models.Model):
    years_experience = models.IntegerField(default=0, verbose_name="Р›РµС‚ РѕРїС‹С‚Р°")
    projects_count = models.IntegerField(default=0, verbose_name="РљРѕР»РёС‡РµСЃС‚РІРѕ РїСЂРѕРµРєС‚РѕРІ")
    clients_count = models.IntegerField(default=0, verbose_name="РљРѕР»РёС‡РµСЃС‚РІРѕ РєР»РёРµРЅС‚РѕРІ")
    positive_reviews = models.IntegerField(default=0, verbose_name="РџРѕР»РѕР¶РёС‚РµР»СЊРЅС‹С… РѕС‚Р·С‹РІРѕРІ")
    hours_worked = models.IntegerField(default=0, verbose_name="Р§Р°СЃРѕРІ СЂР°Р±РѕС‚С‹")
    lines_of_code = models.IntegerField(default=0, verbose_name="РЎС‚СЂРѕРє РєРѕРґР°")
    views_count = models.PositiveIntegerField(default=0, verbose_name='Просмотров')
    
    class Meta:
        verbose_name = "РЎС‚Р°С‚РёСЃС‚РёРєР°"
        verbose_name_plural = "РЎС‚Р°С‚РёСЃС‚РёРєР°"
    
    def __str__(self):
        return "РЎС‚Р°С‚РёСЃС‚РёРєР° СЃР°Р№С‚Р°"

class Project(models.Model):
    title = models.CharField(max_length=200, verbose_name="РќР°Р·РІР°РЅРёРµ")
    description = models.TextField(verbose_name="РћРїРёСЃР°РЅРёРµ", blank=True, null=True)
    image = models.ImageField(upload_to='projects/', verbose_name="РР·РѕР±СЂР°Р¶РµРЅРёРµ")
    url = models.URLField(blank=True, null=True, verbose_name="РЎСЃС‹Р»РєР° РЅР° РїСЂРѕРµРєС‚")
    created_at = models.DateField(verbose_name="Р”Р°С‚Р° СЃРѕР·РґР°РЅРёСЏ", blank=True, null=True)
    order = models.IntegerField(default=0, verbose_name="РџРѕСЂСЏРґРѕРє РѕС‚РѕР±СЂР°Р¶РµРЅРёСЏ")
    
    class Meta:
        verbose_name = "РџСЂРѕРµРєС‚"
        verbose_name_plural = "РџСЂРѕРµРєС‚С‹"
        ordering = ['order']
    
    def __str__(self):
        return self.title

class Testimonial(models.Model):
    project_title = models.CharField(max_length=200, verbose_name="РќР°Р·РІР°РЅРёРµ РїСЂРѕРµРєС‚Р°")
    author_name = models.CharField(max_length=100, verbose_name="РРјСЏ Р°РІС‚РѕСЂР°")
    comment = models.TextField(verbose_name="РљРѕРјРјРµРЅС‚Р°СЂРёР№")
    is_positive = models.BooleanField(default=True, verbose_name="РџРѕР»РѕР¶РёС‚РµР»СЊРЅС‹Р№ РѕС‚Р·С‹РІ")
    date = models.DateField(verbose_name="Р”Р°С‚Р° РѕС‚Р·С‹РІР°")
    link = models.URLField(blank=True, null=True, verbose_name="РЎСЃС‹Р»РєР° РЅР° РѕС‚Р·С‹РІ")
    
    class Meta:
        verbose_name = "РћС‚Р·С‹РІ"
        verbose_name_plural = "РћС‚Р·С‹РІС‹"
        ordering = ['-date']
    
    def __str__(self):
        return f"РћС‚Р·С‹РІ РѕС‚ {self.author_name} Рѕ {self.project_title}"

class ContactMessage(models.Model):
    name = models.CharField(max_length=100, verbose_name="РРјСЏ")
    email = models.EmailField(verbose_name="Email")
    message = models.TextField(verbose_name="РЎРѕРѕР±С‰РµРЅРёРµ")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Р”Р°С‚Р° СЃРѕР·РґР°РЅРёСЏ")
    is_read = models.BooleanField(default=False, verbose_name="РџСЂРѕС‡РёС‚Р°РЅРѕ")
    
    class Meta:
        verbose_name = "РЎРѕРѕР±С‰РµРЅРёРµ"
        verbose_name_plural = "РЎРѕРѕР±С‰РµРЅРёСЏ"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"РЎРѕРѕР±С‰РµРЅРёРµ РѕС‚ {self.name} ({self.email})"


class SiteVisit(models.Model):
    session_key = models.CharField(max_length=64, unique=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Просмотр"
        verbose_name_plural = "Просмотры"
        ordering = ['-created_at']

    def __str__(self):
        return f"Визит {self.session_key}"
