// JavaScript для секции Hero

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация анимаций для плавающих элементов
    initFloatingElements();
    
    // Добавление эффекта параллакса к плавающим элементам
    initParallaxEffect();
    
    // Анимация для скролла вниз
    initScrollIndicator();
    
    // Подсветка иконок технологий при наведении
    initTechBadges();
});

// Инициализация рандомных анимаций для плавающих элементов
function initFloatingElements() {
    const elements = document.querySelectorAll('.floating-element');
    
    elements.forEach(element => {
        // Добавление случайной начальной задержки для более естественного вида
        const delay = Math.random() * 2;
        element.style.animationDelay = `${delay}s`;
    });
}

// Добавление эффекта параллакса при движении мыши
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const floatingElements = document.querySelectorAll('.floating-element');
    
    if (window.innerWidth > 768) { // Только для больших экранов
        hero.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            floatingElements.forEach((element, index) => {
                // Создаем разную чувствительность для разных элементов
                const speed = 1 + index * 0.5;
                const xOffset = (x - 0.5) * 20 * speed;
                const yOffset = (y - 0.5) * 20 * speed;
                
                // Применяем смещение с помощью CSS переменных
                element.style.setProperty('--parallax-x', `${xOffset}px`);
                element.style.setProperty('--parallax-y', `${yOffset}px`);
                element.style.transform = `translate(var(--parallax-x), var(--parallax-y))`;
            });
        });
        
        // Сбрасываем позицию при выходе из секции
        hero.addEventListener('mouseleave', () => {
            floatingElements.forEach(element => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }
}

// Инициализация анимации для индикатора скролла
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            // Находим следующую секцию
            const nextSection = document.querySelector('#about');
            if (nextSection) {
                // Плавно скроллим к следующей секции
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Скрываем индикатор при скролле
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '0.7';
            }
        });
    }
}

// Инициализация эффектов для бейджей технологий
function initTechBadges() {
    const badges = document.querySelectorAll('.tech-badge');
    
    badges.forEach(badge => {
        // Эффект при наведении мыши
        badge.addEventListener('mouseenter', () => {
            // Создаем эффект пульсации для остальных бейджей
            badges.forEach(otherBadge => {
                if (otherBadge !== badge) {
                    otherBadge.style.transform = 'scale(0.95)';
                    otherBadge.style.opacity = '0.7';
                }
            });
        });
        
        badge.addEventListener('mouseleave', () => {
            // Восстанавливаем состояние всех бейджей
            badges.forEach(otherBadge => {
                otherBadge.style.transform = '';
                otherBadge.style.opacity = '';
            });
        });
    });
}
