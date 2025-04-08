"""
WSGI config for portfolio project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os
import sys

# Добавляем текущую директорию в sys.path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.append(BASE_DIR)

# Устанавливаем переменную окружения для настроек Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')

# Импортируем WSGI-приложение Django
from django.core.wsgi import get_wsgi_application

# Создаем обертку для обработки ошибок
try:
    django_app = get_wsgi_application()
    
    def application(environ, start_response):
        try:
            return django_app(environ, start_response)
        except Exception as e:
            status = '500 Internal Server Error'
            output = f'Error in Django application: {str(e)}'.encode('utf-8')
            response_headers = [('Content-type', 'text/plain'),
                               ('Content-Length', str(len(output)))]
            start_response(status, response_headers)
            return [output]
except Exception as e:
    def application(environ, start_response):
        status = '500 Internal Server Error'
        output = f'Error initializing Django: {str(e)}'.encode('utf-8')
        response_headers = [('Content-type', 'text/plain'),
                           ('Content-Length', str(len(output)))]
        start_response(status, response_headers)
        return [output]
