// Функциональность для раздела отзывов в минималистичном стиле
document.addEventListener('DOMContentLoaded', function() {
    // Получаем карточки отзывов
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialWrapper = document.querySelector('.testimonials-wrapper');
    const loadMoreBtn = document.getElementById('load-more-testimonials');
    
    if (!testimonialCards.length) return;
    
    // Настройка карточек
    function setupCards() {
        testimonialCards.forEach((card, index) => {
            // Добавляем случайную высоту паддинга для лучшего эффекта masonry
            const content = card.querySelector('.testimonial-content');
            if (content) {
                const randomPadding = Math.floor(Math.random() * 8) + 18; // от 18px до 26px
                content.style.padding = `${randomPadding}px`;
            }
            
            // Настраиваем случайную высоту цитаты
            const quote = card.querySelector('.testimonial-quote');
            if (quote && Math.random() > 0.5) {
                const maxHeight = Math.floor(Math.random() * 50) + 80; // от 80px до 130px
                quote.style.maxHeight = `${maxHeight}px`;
                quote.style.overflow = 'hidden';
                quote.style.textOverflow = 'ellipsis';
                
                // Добавляем элемент "Читать далее" для длинных цитат
                if (quote.scrollHeight > maxHeight && !quote.querySelector('.read-more')) {
                    const readMore = document.createElement('span');
                    readMore.className = 'read-more';
                    readMore.textContent = '... ';
                    
                    const readMoreLink = document.createElement('a');
                    readMoreLink.href = '#';
                    readMoreLink.textContent = 'Читать далее';
                    readMoreLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        quote.style.maxHeight = 'none';
                        readMore.style.display = 'none';
                    });
                    
                    readMore.appendChild(readMoreLink);
                    quote.appendChild(readMore);
                }
            }
            
            // Добавляем обработку наведения для различных типов отзывов
            const isPositive = card.querySelector('.emoji-positive');
            const isNegative = card.querySelector('.emoji-negative');
            
            // Устанавливаем начальный цвет рамки
            if (isPositive) {
                card.style.borderColor = 'rgba(76, 175, 80, 0.1)';
            } else if (isNegative) {
                card.style.borderColor = 'rgba(244, 67, 54, 0.1)';
            }
            
            // Обработка наведения мыши
            card.addEventListener('mouseenter', function() {
                if (isPositive) {
                    this.style.borderColor = 'rgba(76, 175, 80, 0.3)';
                    this.style.boxShadow = '0 10px 25px rgba(76, 175, 80, 0.15)';
                } else if (isNegative) {
                    this.style.borderColor = 'rgba(244, 67, 54, 0.3)';
                    this.style.boxShadow = '0 10px 25px rgba(244, 67, 54, 0.15)';
                }
                this.style.transform = 'translateY(-5px)';
            });
            
            // Обработка ухода мыши
            card.addEventListener('mouseleave', function() {
                if (isPositive) {
                    this.style.borderColor = 'rgba(76, 175, 80, 0.1)';
                } else if (isNegative) {
                    this.style.borderColor = 'rgba(244, 67, 54, 0.1)';
                }
                this.style.boxShadow = 'none';
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Анимация появления карточек
    function animateCards() {
        testimonialCards.forEach((card, index) => {
            // Анимируем с задержкой для каждой карточки
            setTimeout(() => {
                card.classList.add('fade-in');
            }, 150 * index);
        });
    }
    
    // Настройка пагинации отзывов
    function setupPagination() {
        // Высота секции отзывов при загрузке
        let currentHeight = 700;
        
        // Общая высота всех отзывов
        let totalHeight = 0;
        
        // Расчет примерной высоты всего контейнера
        const grid = document.querySelector('.testimonials-grid');
        if (grid) {
            totalHeight = grid.scrollHeight;
        }
        
        // Управление видимостью кнопки "Показать еще"
        if (totalHeight <= 700) {
            // Если все отзывы помещаются в 700px, скрываем кнопку и оверлей
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
            const overlay = document.querySelector('.testimonials-overlay');
            if (overlay) overlay.style.display = 'none';
        }
        
        // Обработчик клика по кнопке "Показать еще"
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function() {
                // Увеличиваем высоту на 700px или показываем все отзывы
                if (currentHeight + 700 >= totalHeight) {
                    // Показать все
                    if (testimonialWrapper) {
                        testimonialWrapper.style.maxHeight = 'none';
                        testimonialWrapper.classList.add('expanded');
                    }
                    // Скрыть кнопку, так как все отзывы показаны
                    this.style.display = 'none';
                    // Скрыть оверлей
                    const overlay = document.querySelector('.testimonials-overlay');
                    if (overlay) overlay.style.opacity = '0';
                } else {
                    // Увеличиваем на 700px
                    currentHeight += 700;
                    if (testimonialWrapper) {
                        testimonialWrapper.style.maxHeight = currentHeight + 'px';
                    }
                }
            });
        }
    }
    
    // Инициализация
    function init() {
        setupCards();
        animateCards();
        setupPagination();
    }
    
    // Запускаем
    init();
});
