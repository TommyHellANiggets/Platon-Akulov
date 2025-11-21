document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.testimonial-card');
    const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    const loadMoreBtn = document.getElementById('load-more-testimonials');
    const overlay = document.querySelector('.testimonials-overlay');
    
    // Анимация появления карточек
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(12px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 80);
    });
    
    // Функционал "Показать ещё"
    if (testimonialsWrapper && loadMoreBtn && overlay) {
        const INITIAL_HEIGHT = 800; // Начальная высота в пикселях
        const INCREMENT = 800; // Увеличение высоты при каждом клике
        let currentMaxHeight = INITIAL_HEIGHT;
        
        // Устанавливаем начальную высоту
        testimonialsWrapper.style.maxHeight = `${INITIAL_HEIGHT}px`;
        testimonialsWrapper.style.overflow = 'hidden';
        testimonialsWrapper.style.position = 'relative';
        
        // Функция проверки, нужна ли кнопка
        function checkIfNeedButton() {
            const fullHeight = testimonialsGrid.scrollHeight;
            
            if (fullHeight <= currentMaxHeight) {
                // Весь контент виден
                loadMoreBtn.style.display = 'none';
                overlay.style.opacity = '0';
                overlay.style.pointerEvents = 'none';
            } else {
                // Есть скрытый контент
                loadMoreBtn.style.display = 'flex';
                overlay.style.opacity = '1';
                overlay.style.pointerEvents = 'auto';
            }
        }
        
        // Проверяем при загрузке
        setTimeout(checkIfNeedButton, 500);
        
        // Обработчик кнопки "Показать ещё"
        loadMoreBtn.addEventListener('click', function() {
            currentMaxHeight += INCREMENT;
            testimonialsWrapper.style.maxHeight = `${currentMaxHeight}px`;
            testimonialsWrapper.style.transition = 'max-height 0.6s ease';
            
            // Проверяем после анимации
            setTimeout(checkIfNeedButton, 650);
        });
        
        // Проверяем при изменении размера окна
        window.addEventListener('resize', checkIfNeedButton);
    }
});
