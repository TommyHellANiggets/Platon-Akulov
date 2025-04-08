// Анимация фоновой волнистой линии
document.addEventListener('DOMContentLoaded', function() {
    // Создаем элемент canvas и контекст
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    // Функция для инициализации канваса
    function initCanvas() {
        // Добавляем canvas к body
        const body = document.body;
        canvas.id = 'background-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';
        canvas.style.pointerEvents = 'none';
        body.insertBefore(canvas, body.firstChild);
        
        // Устанавливаем размер канваса
        resizeCanvas();
        
        // Добавляем обработчик изменения размера окна
        window.addEventListener('resize', resizeCanvas);
    }
    
    // Функция для изменения размера канваса
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Класс для точки линии
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.age = 0; // Возраст точки в миллисекундах
            this.maxAge = 30000; // Увеличиваю время жизни точки до 30 секунд (было 8000)
        }
        
        // Обновление возраста точки
        update(deltaTime) {
            this.age += deltaTime;
        }
        
        // Проверка, устарела ли точка
        isExpired() {
            return this.age > this.maxAge;
        }
        
        // Получение прозрачности точки в зависимости от её возраста
        getOpacity() {
            // Нелинейное уменьшение прозрачности для более мягкого эффекта
            if (this.age < this.maxAge * 0.8) {
                // Первые 80% времени жизни точка остается яркой
                return 1;
            } else {
                // Последние 20% времени - плавное исчезновение
                const fadeProgress = (this.age - this.maxAge * 0.8) / (this.maxAge * 0.2);
                return Math.max(0, 1 - fadeProgress);
            }
        }
    }
    
    // Класс для плавной линии
    class SmoothLine {
        constructor() {
            // Цвета для градиента (сине-зеленая тема)
            this.colors = [
                '#1DB954', // Зеленый
                '#4E9AFF'  // Синий
            ];
            
            // Текущий цвет (будет заменен на градиент)
            this.color = this.colors[0];
            
            // Толщина линии
            this.lineWidth = 35; // увеличиваем толщину (было 24)
            
            // Базовая прозрачность
            this.baseAlpha = 0.8; // увеличиваем прозрачность (было 0.7)
            
            // Массив точек линии
            this.points = [];
            
            // Текущая позиция
            this.currentX = Math.random() * window.innerWidth;
            this.currentY = Math.random() * window.innerHeight;
            
            // Текущий угол движения (в радианах)
            this.angle = Math.random() * Math.PI * 2;
            
            // Скорость движения
            this.speed = 0.7; // еще немного замедляем (было 0.8)
            
            // Максимальное изменение угла за кадр
            this.maxAngleChange = 0.04; // увеличиваем для более крутых поворотов (было 0.02)
            
            // Последнее время обновления
            this.lastUpdateTime = Date.now();
            
            // Длина "хвоста"
            this.tailLength = 30000; // миллисекунды (увеличено с 8000)
            
            // Частота изменения направления (для большего количества завитушек)
            this.directionChangeFrequency = 0.1; // вероятность изменения направления на каждом кадре
            
            // Создаем градиент для линии
            this.createGradient();
        }
        
        // Создание градиента
        createGradient() {
            this.gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
            this.gradient.addColorStop(0, this.colors[0]);
            this.gradient.addColorStop(1, this.colors[1]);
        }
        
        // Обновление состояния линии
        update() {
            const currentTime = Date.now();
            const deltaTime = currentTime - this.lastUpdateTime;
            this.lastUpdateTime = currentTime;
            
            // Обновляем возраст существующих точек
            for (let i = this.points.length - 1; i >= 0; i--) {
                this.points[i].update(deltaTime);
                
                // Удаляем устаревшие точки
                if (this.points[i].isExpired()) {
                    this.points.splice(i, 1);
                }
            }
            
            // Добавляем больше случайности в изменение угла для создания завитушек
            if (Math.random() < this.directionChangeFrequency) {
                // С вероятностью directionChangeFrequency делаем более резкий поворот
                this.angle += (Math.random() * 2 - 1) * (this.maxAngleChange * 3);
            } else {
                // Обычное плавное изменение угла
                this.angle += (Math.random() * 2 - 1) * this.maxAngleChange;
            }
            
            // Вычисляем новую позицию
            this.currentX += Math.cos(this.angle) * this.speed;
            this.currentY += Math.sin(this.angle) * this.speed;
            
            // Если вышли за границы экрана, корректируем направление
            if (this.currentX < 0) {
                this.currentX = 0;
                this.angle = Math.PI - this.angle;
            } else if (this.currentX > window.innerWidth) {
                this.currentX = window.innerWidth;
                this.angle = Math.PI - this.angle;
            }
            
            if (this.currentY < 0) {
                this.currentY = 0;
                this.angle = -this.angle;
            } else if (this.currentY > window.innerHeight) {
                this.currentY = window.innerHeight;
                this.angle = -this.angle;
            }
            
            // Добавляем новую точку в текущей позиции
            this.points.push(new Point(this.currentX, this.currentY));
            
            // Обновляем градиент при изменении размера окна
            if (this.canvasResized) {
                this.createGradient();
                this.canvasResized = false;
            }
        }
        
        // Отрисовка линии
        render(ctx) {
            if (this.points.length < 2) return;
            
            // Добавляем эффект свечения
            ctx.shadowBlur = 25; // увеличиваем размер свечения (было 20)
            ctx.shadowColor = this.colors[0];
            
            // Обновляем градиент, если нужно
            if (!this.gradient || window.innerWidth !== canvas.width || window.innerHeight !== canvas.height) {
                this.createGradient();
                this.canvasResized = true;
            }
            
            // Рисуем линию через все точки с учетом их прозрачности
            for (let i = 0; i < this.points.length - 1; i++) {
                const point = this.points[i];
                const nextPoint = this.points[i + 1];
                
                // Начинаем новый путь
                ctx.beginPath();
                
                // Устанавливаем прозрачность для текущего сегмента
                const opacity = point.getOpacity() * this.baseAlpha;
                ctx.strokeStyle = this.gradient; // Используем градиент вместо сплошного цвета
                ctx.globalAlpha = opacity;
                ctx.lineWidth = this.lineWidth;
                
                // Применяем скругление линии для более мягкого эффекта
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                
                // Рисуем линию между двумя точками
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(nextPoint.x, nextPoint.y);
                
                // Отрисовываем линию
                ctx.stroke();
            }
            
            // Сбрасываем глобальную прозрачность
            ctx.globalAlpha = 1;
        }
    }
    
    // Создаем линию
    const line = new SmoothLine();
    
    // Функция анимации
    function animate() {
        // Очищаем канвас
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Обновляем и рисуем линию
        line.update();
        line.render(context);
        
        // Запрашиваем следующий кадр анимации
        requestAnimationFrame(animate);
    }
    
    // Инициализируем канвас и запускаем анимацию
    initCanvas();
    animate();
    
    // Проверяем, работает ли анимация через 2 секунды после загрузки страницы
    setTimeout(() => {
        const canvas = document.getElementById('background-canvas');
        if (!canvas || canvas.width === 0 || canvas.height === 0) {
            console.log('Перезапуск анимации фона...');
            initCanvas();
            animate();
        }
    }, 2000);
}); 