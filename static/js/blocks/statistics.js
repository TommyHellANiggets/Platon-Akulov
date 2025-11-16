// Функциональность для раздела статистики с анимацией градиента
document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем анимацию градиента для статистики
    initStatisticsGradient();
});

function initStatisticsGradient() {
    const statItems = document.querySelectorAll('.stat-item');
    
    statItems.forEach(item => {
        // Обработчик наведения мыши
        item.addEventListener('mouseenter', function() {
            // Добавляем класс для запуска бесконечной анимации
            this.classList.add('gradient-active');
        });
        
        // Обработчик ухода мыши
        item.addEventListener('mouseleave', function() {
            // Удаляем класс активной анимации
            this.classList.remove('gradient-active');
        });
    });
}
