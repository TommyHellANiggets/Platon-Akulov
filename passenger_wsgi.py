import os
import sys
import logging
import traceback
import importlib.util
import re

# Путь к корню сайта для Reg.ru (ПРАВИЛЬНЫЙ путь с сервера!)
SITE_ROOT = '/var/www/u3332631/data/www/platon-akulov.ru'
# Путь к виртуальному окружению Python (Python 3.8.6 на сервере)
VENV_PATH = '/var/www/u3332631/data/www/platon-akulov.ru/venv/lib/python3.8/site-packages'

# Добавляем пути в sys.path
sys.path.insert(0, SITE_ROOT)
sys.path.insert(1, VENV_PATH)

# Настройка логирования
log_file = os.path.join(SITE_ROOT, 'passenger_wsgi.log')
logging.basicConfig(
    filename=log_file,
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Создаем обработчик для вывода логов в консоль
console = logging.StreamHandler()
console.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
console.setFormatter(formatter)
logger.addHandler(console)

logger.info(f"Запуск passenger_wsgi.py. Лог-файл: {log_file}")
logger.info(f"SITE_ROOT: {SITE_ROOT}")
logger.info(f"VENV_PATH: {VENV_PATH}")
logger.info(f"sys.path: {sys.path}")

# Функция для обработки статических файлов
def serve_static_file(environ, start_response, path):
    try:
        # Определяем MIME-тип на основе расширения файла
        mime_types = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.ico': 'image/x-icon',
            '.svg': 'image/svg+xml',
            '.pdf': 'application/pdf',
            '.woff': 'font/woff',
            '.woff2': 'font/woff2',
            '.ttf': 'font/ttf',
            '.eot': 'application/vnd.ms-fontobject',
        }
        
        # Получаем расширение файла
        _, ext = os.path.splitext(path)
        content_type = mime_types.get(ext.lower(), 'application/octet-stream')
        
        # Проверяем существование файла
        if not os.path.exists(path) or not os.path.isfile(path):
            logger.error(f"Файл не найден: {path}")
            start_response('404 Not Found', [('Content-Type', 'text/plain')])
            return [b'File not found']
        
        # Открываем и читаем файл
        with open(path, 'rb') as f:
            file_content = f.read()
        
        # Отправляем файл
        start_response('200 OK', [
            ('Content-Type', content_type),
            ('Content-Length', str(len(file_content)))
        ])
        return [file_content]
    except Exception as e:
        logger.error(f"Ошибка при обработке статического файла {path}: {str(e)}")
        logger.error(traceback.format_exc())
        start_response('500 Internal Server Error', [('Content-Type', 'text/plain')])
        return [f'Error serving static file: {str(e)}'.encode('utf-8')]

try:
    # Проверяем наличие модуля main
    main_exists = importlib.util.find_spec('main') is not None
    logger.info(f"Модуль main существует: {main_exists}")
    
    # Проверяем структуру директорий
    logger.info(f"Содержимое директории {SITE_ROOT}:")
    for item in os.listdir(SITE_ROOT):
        logger.info(f"- {item}")
    
    if os.path.exists(os.path.join(SITE_ROOT, 'main')):
        logger.info(f"Содержимое директории {os.path.join(SITE_ROOT, 'main')}:")
        for item in os.listdir(os.path.join(SITE_ROOT, 'main')):
            logger.info(f"- {item}")
    
    # Устанавливаем переменную окружения для настроек Django
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')
    
    # Импортируем WSGI-приложение
    from django.core.wsgi import get_wsgi_application
    django_app = get_wsgi_application()
    
    logger.info("WSGI-приложение успешно загружено")
    
    # Функция-обертка для обработки запросов
    def application(environ, start_response):
        path_info = environ.get('PATH_INFO', '')
        logger.debug(f"Получен запрос: {path_info}")
        
        # Проверяем, является ли запрос запросом к статическому файлу
        static_patterns = [
            (r'^/static/(.*)$', os.path.join(SITE_ROOT, 'static')),
            (r'^/media/(.*)$', os.path.join(SITE_ROOT, 'media')),
            (r'^/favicon\.ico$', os.path.join(SITE_ROOT, 'static', 'favicon.ico')),
        ]
        
        for pattern, root_dir in static_patterns:
            match = re.match(pattern, path_info)
            if match:
                file_path = os.path.join(root_dir, match.group(1) if len(match.groups()) > 0 else '')
                logger.debug(f"Обработка статического файла: {file_path}")
                return serve_static_file(environ, start_response, file_path)
        
        # Если это не статический файл, передаем запрос Django
        logger.debug(f"Передача запроса Django: {path_info}")
        return django_app(environ, start_response)
    
except Exception as e:
    logger.error(f"Ошибка при загрузке приложения: {str(e)}")
    logger.error(traceback.format_exc())
    
    # Функция для отображения ошибки в браузере
    def application(environ, start_response):
        status = '500 Internal Server Error'
        response_headers = [('Content-type', 'text/html; charset=utf-8')]
        start_response(status, response_headers)
        
        error_message = f"""
        <html>
        <head>
            <title>Ошибка сервера</title>
            <style>
                body {{ font-family: Arial, sans-serif; margin: 20px; }}
                h1 {{ color: #d9534f; }}
                pre {{ background-color: #f5f5f5; padding: 10px; border-radius: 5px; overflow-x: auto; }}
                .info {{ background-color: #f0f0f0; padding: 15px; border-radius: 5px; margin-top: 20px; }}
            </style>
        </head>
        <body>
            <h1>Ошибка при загрузке приложения</h1>
            <p><strong>Ошибка:</strong> {str(e)}</p>
            <h2>Трассировка:</h2>
            <pre>{traceback.format_exc()}</pre>
            <div class="info">
                <h2>Информация о среде:</h2>
                <ul>
                    <li><strong>SITE_ROOT:</strong> {SITE_ROOT}</li>
                    <li><strong>VENV_PATH:</strong> {VENV_PATH}</li>
                    <li><strong>sys.path:</strong> {sys.path}</li>
                    <li><strong>Модуль main существует:</strong> {main_exists if 'main_exists' in locals() else 'Не проверено'}</li>
                    <li><strong>Python version:</strong> {sys.version}</li>
                </ul>
            </div>
        </body>
        </html>
        """
        
        return [error_message.encode('utf-8')]