@echo off
REM Скрипт подготовки проекта для развёртки на Reg.ru (Windows)

echo.
echo 🚀 Подготовка проекта к развёртке на Reg.ru (platon-akulov.ru)
echo ==================================
echo.

REM 1. Активируем виртуальное окружение
echo 1️⃣ Активация виртуального окружения...
call venv\Scripts\activate.bat

REM 2. Установка зависимостей
echo.
echo 2️⃣ Установка зависимостей...
python -m pip install --upgrade pip setuptools wheel
pip install -r requirements.txt

REM 3. Сбор статических файлов
echo.
echo 3️⃣ Сбор статических файлов...
python manage.py collectstatic --noinput

REM 4. Проверка миграций
echo.
echo 4️⃣ Проверка миграций БД...
python manage.py migrate --check

REM 5. Проверка конфигурации Django
echo.
echo 5️⃣ Проверка конфигурации Django...
python manage.py check

REM 6. Очистка кэша
echo.
echo 6️⃣ Очистка кэша Python...
for /d /r . %%d in (__pycache__) do @if exist "%%d" rd /s /q "%%d"
for /r . %%f in (*.pyc) do @if exist "%%f" del /q "%%f"

REM 7. Создание файлов логов
echo.
echo 7️⃣ Подготовка логов...
type nul > django.log
type nul > passenger_wsgi.log

echo.
echo ✅ Подготовка завершена!
echo.
echo 📋 Что дальше:
echo   1. Убедитесь, что settings.py содержит правильный домен: platon-akulov.ru
echo   2. Обновите пути в passenger_wsgi.py с вашим именем пользователя
echo   3. Загрузите проект на хостинг Reg.ru (исключив папку venv\)
echo   4. Следуйте инструкциям в DEPLOYMENT_REGRU.md
echo.
echo 🌐 Домен: platon-akulov.ru
echo 🗄️  БД: SQLite3 (db.sqlite3)
echo 🔧 DEBUG: True (для отладки на сервере)
echo.
echo Подробная инструкция: см. DEPLOYMENT_REGRU.md
echo.
pause
