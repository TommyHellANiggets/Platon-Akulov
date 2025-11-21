#!/bin/bash
# Скрипт для настройки Django на REG.RU сервере
# Выполните: bash deploy_server.sh

echo "=========================================="
echo "Деплой Django на REG.RU"
echo "=========================================="

# Переходим в директорию проекта
cd /var/www/u3332631/www/platon-akulov.ru

echo ""
echo "1. Проверка версии Python..."
python3 --version

echo ""
echo "2. Проверка структуры venv..."
ls -la venv/lib/ | grep python

echo ""
echo "3. Активация виртуального окружения..."
source venv/bin/activate

echo ""
echo "4. Проверка установленных пакетов..."
pip list | grep -i django

echo ""
echo "5. Установка/обновление зависимостей..."
pip install -r requirements.txt

echo ""
echo "6. Сбор статических файлов..."
python manage.py collectstatic --noinput

echo ""
echo "7. Применение миграций..."
python manage.py migrate

echo ""
echo "8. Установка прав доступа..."
chmod 664 db.sqlite3
chmod -R 755 collected_static/
chmod -R 755 static/
chmod -R 755 media/

echo ""
echo "9. Перезапуск Passenger..."
mkdir -p tmp
touch tmp/restart.txt

echo ""
echo "=========================================="
echo "✅ Деплой завершен!"
echo "=========================================="
echo ""
echo "Проверьте логи:"
echo "  tail -f passenger_wsgi.log"
echo "  tail -f django.log"
echo ""
echo "Откройте сайт: https://platon-akulov.ru"
