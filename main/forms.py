from django import forms
from django.contrib.auth.forms import AuthenticationForm
from .models import Project, Testimonial, Statistics, ContactMessage

class LoginForm(AuthenticationForm):
    username = forms.CharField(widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Имя пользователя'
    }))
    password = forms.CharField(widget=forms.PasswordInput(attrs={
        'class': 'form-control',
        'placeholder': 'Пароль'
    }))

class ProjectForm(forms.ModelForm):
    created_at = forms.DateField(
        required=False,
        widget=forms.TextInput(attrs={
            'class': 'form-control datepicker',
            'placeholder': 'дд.мм.гггг'
        }),
        label='Дата создания',
        input_formats=['%d.%m.%Y', '%Y-%m-%d']
    )
    
    class Meta:
        model = Project
        fields = ['title', 'image', 'url', 'created_at', 'order']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control'}),
            'image': forms.FileInput(attrs={'class': 'form-control'}),
            'url': forms.URLInput(attrs={'class': 'form-control'}),
            'order': forms.NumberInput(attrs={'class': 'form-control'}),
        }

class TestimonialForm(forms.ModelForm):
    class Meta:
        model = Testimonial
        fields = ['project_title', 'author_name', 'comment', 'is_positive', 'date', 'link']
        widgets = {
            'project_title': forms.TextInput(attrs={'class': 'form-control'}),
            'author_name': forms.TextInput(attrs={'class': 'form-control'}),
            'comment': forms.Textarea(attrs={'class': 'form-control', 'rows': 4}),
            'is_positive': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
            'date': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
            'link': forms.URLInput(attrs={'class': 'form-control'}),
        }

class StatisticsForm(forms.ModelForm):
    class Meta:
        model = Statistics
        fields = ['years_experience', 'projects_count', 'clients_count', 'positive_reviews', 'hours_worked', 'lines_of_code']
        widgets = {
            'years_experience': forms.NumberInput(attrs={'class': 'form-control'}),
            'projects_count': forms.NumberInput(attrs={'class': 'form-control'}),
            'clients_count': forms.NumberInput(attrs={'class': 'form-control'}),
            'positive_reviews': forms.NumberInput(attrs={'class': 'form-control'}),
            'hours_worked': forms.NumberInput(attrs={'class': 'form-control'}),
            'lines_of_code': forms.NumberInput(attrs={'class': 'form-control'}),
        }

class ContactMessageForm(forms.ModelForm):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'message', 'is_read']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'readonly': True}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'readonly': True}),
            'message': forms.Textarea(attrs={'class': 'form-control', 'rows': 4, 'readonly': True}),
            'is_read': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        } 