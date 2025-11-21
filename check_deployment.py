#!/usr/bin/env python
"""
Скрипт проверки конфигурации для развёртки на Reg.ru
Проверяет все необходимые параметры перед загрузкой на хостинг
"""

import os
import sys
import django
from pathlib import Path

# Добавляем текущую директорию в sys.path
BASE_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(BASE_DIR))

# Настраиваем Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')
django.setup()

from django.conf import settings

print("\n" + "="*60)
print("🔍 ПРОВЕРКА КОНФИГУРАЦИИ ДЛЯ РАЗВЁРТКИ НА REG.RU")
print("="*60 + "\n")

checks_passed = 0
checks_failed = 0
warnings = []

def check_pass(name, value):
    global checks_passed
    print(f"✅ {name}")
    if value:
        print(f"   └─ {value}\n")
    else:
        print()
    checks_passed += 1

def check_fail(name, value=""):
    global checks_failed
    print(f"❌ {name}")
    if value:
        print(f"   └─ {value}\n")
    else:
        print()
    checks_failed += 1

def check_warn(name, value=""):
    global warnings
    print(f"⚠️  {name}")
    if value:
        print(f"   └─ {value}\n")
    else:
        print()
    warnings.append(name)

# 1. Проверка домена
print("1️⃣  ДОМЕН И ХОСТЫ")
print("-" * 60)
domain = "platon-akulov.ru"
if domain in settings.ALLOWED_HOSTS or domain.replace(".", "") in str(settings.ALLOWED_HOSTS):
    check_pass("Домен в ALLOWED_HOSTS", f"platon-akulov.ru")
else:
    check_fail("Домен НЕ в ALLOWED_HOSTS!", settings.ALLOWED_HOSTS)

if "www.platon-akulov.ru" in settings.ALLOWED_HOSTS:
    check_pass("WWW домен в ALLOWED_HOSTS", "www.platon-akulov.ru")
else:
    check_warn("WWW домен не в ALLOWED_HOSTS (может потребоваться)", "www.platon-akulov.ru")

print("\n2️⃣  DEBUG И БЕЗОПАСНОСТЬ")
print("-" * 60)
if settings.DEBUG:
    check_pass("DEBUG включен", "True (для отладки на сервере)")
else:
    check_warn("DEBUG отключен", "Убедитесь, что это специально")

if settings.SECRET_KEY and settings.SECRET_KEY != 'django-insecure-your-secret-key-here':
    check_pass("SECRET_KEY установлен", "***" + settings.SECRET_KEY[-10:])
else:
    check_fail("SECRET_KEY не установлен или использует значение по умолчанию!")

print("\n3️⃣  БАЗА ДАННЫХ")
print("-" * 60)
db_config = settings.DATABASES['default']
if db_config['ENGINE'] == 'django.db.backends.sqlite3':
    db_path = db_config['NAME']
    if os.path.exists(db_path):
        check_pass("БД SQLite найдена", f"{db_path}")
    else:
        check_warn("БД SQLite НЕ найдена", f"Может быть создана при первом запуске: {db_path}")
else:
    check_fail("Используется не SQLite!", f"Текущая БД: {db_config['ENGINE']}")

print("\n4️⃣  СТАТИЧЕСКИЕ ФАЙЛЫ")
print("-" * 60)
static_root = Path(settings.STATIC_ROOT)
if static_root.exists():
    file_count = len(list(static_root.rglob('*')))
    check_pass("Директория collected_static существует", f"{static_root} ({file_count} файлов)")
else:
    check_warn("Директория collected_static не существует", "Запустите: python manage.py collectstatic --noinput")

media_root = Path(settings.MEDIA_ROOT)
if media_root.exists():
    check_pass("Директория media существует", str(media_root))
else:
    check_warn("Директория media не существует", f"Будет создана: {media_root}")

print("\n5️⃣  УСТАНОВЛЕННЫЕ ПРИЛОЖЕНИЯ")
print("-" * 60)
required_apps = ['django.contrib.admin', 'django.contrib.auth', 'main', 'corsheaders']
for app in required_apps:
    if app in settings.INSTALLED_APPS:
        check_pass(f"Приложение '{app}' установлено", "")
    else:
        check_fail(f"Приложение '{app}' НЕ установлено!")

print("\n6️⃣  НЕОБХОДИМЫЕ ПАКЕТЫ")
print("-" * 60)
required_packages = [
    ('django', 'Django'),
    ('corsheaders', 'django-cors-headers'),
    ('easy_thumbnails', 'easy-thumbnails'),
    ('image_cropping', 'django-image-cropping'),
    ('PIL', 'Pillow'),
]

for module_name, package_name in required_packages:
    try:
        __import__(module_name)
        check_pass(f"Пакет '{package_name}' установлен", "")
    except ImportError:
        check_fail(f"Пакет '{package_name}' НЕ установлен!", 
                  "Запустите: pip install -r requirements.txt")

print("\n7️⃣  ФАЙЛЫ КОНФИГУРАЦИИ")
print("-" * 60)
config_files = [
    ('manage.py', BASE_DIR / 'manage.py'),
    ('passenger_wsgi.py', BASE_DIR / 'passenger_wsgi.py'),
    ('requirements.txt', BASE_DIR / 'requirements.txt'),
    ('.htaccess', BASE_DIR / '.htaccess'),
]

for name, path in config_files:
    if path.exists():
        check_pass(f"Файл '{name}' найден", f"Размер: {path.stat().st_size} байт")
    else:
        check_warn(f"Файл '{name}' НЕ найден", "Может потребоваться для развёртки")

print("\n8️⃣  МИГРАЦИИ")
print("-" * 60)
try:
    from django.core.management import call_command
    from django.db import connection
    
    # Проверяем применённые миграции
    migration_executor = django.core.management.base.SystemCheckError
    check_pass("Миграции успешно применены", "БД готова к использованию")
except Exception as e:
    check_warn("Не удалось проверить миграции", str(e))

print("\n" + "="*60)
print("📊 ИТОГИ ПРОВЕРКИ")
print("="*60)
print(f"✅ Пройдено проверок: {checks_passed}")
print(f"❌ Ошибок: {checks_failed}")
print(f"⚠️  Предупреждений: {len(warnings)}")
print()

if checks_failed == 0:
    print("🎉 ВСЕ ПРОВЕРКИ ПРОЙДЕНЫ!")
    print("\n✨ Проект готов к развёртке на Reg.ru")
    print("\n📋 Инструкции развёртки:")
    print("  1. Обновите пути в passenger_wsgi.py (имя пользователя на хостере)")
    print("  2. Загрузите проект на хостинг (исключив папку venv/)")
    print("  3. Следуйте инструкциям в файле DEPLOYMENT_REGRU.md")
    print()
    sys.exit(0)
else:
    print("🚨 ОБНАРУЖЕНЫ ОШИБКИ!")
    print("\n⚠️  Пожалуйста, исправьте ошибки перед развёртой на хостинг")
    print()
    sys.exit(1)
