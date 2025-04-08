#!/usr/bin/env python3
"""
Файл app.py для совместимости с некоторыми хостингами.
"""

import os
import sys
import logging

# Настройка логирования в stderr (чтобы видеть в логах хостинга)
logging.basicConfig(
    stream=sys.stderr,
    level=logging.DEBUG,
    format='%(asctime)s [%(levelname)s] %(message)s',
)

try:
    # Импортируем приложение из passenger_wsgi.py
    logging.info("Importing application from passenger_wsgi.py")
    from passenger_wsgi import application
    logging.info("Application imported successfully")
except Exception as e:
    logging.error(f"Error importing application: {str(e)}", exc_info=True)
    # Создаем простое приложение для отображения ошибки
    def application(environ, start_response):
        status = '500 Internal Server Error'
        output = f'Error importing application: {str(e)}'.encode('utf-8')
        response_headers = [('Content-type', 'text/plain; charset=utf-8'),
                           ('Content-Length', str(len(output)))]
        start_response(status, response_headers)
        return [output] 