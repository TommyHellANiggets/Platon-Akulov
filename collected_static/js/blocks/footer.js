/**
 * Скрипты для футера
 */

document.addEventListener('DOMContentLoaded', function() {
    initFooterAnimation();
    addFooterHoverEffects();
});

/**
 * Инициализация анимации для футера
 */
function initFooterAnimation() {
    const footer = document.querySelector('footer');
    const footerContent = document.querySelector('.footer-content');
    const footerBottom = document.querySelector('.footer-bottom');
    
    // Анимация появления при прокрутке
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateFooterElements();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    if (footer) {
        observer.observe(footer);
    }
}

/**
 * Анимация элементов футера
 */
function animateFooterElements() {
    const footerElements = [
        ...document.querySelectorAll('.footer-logo > *'),
        document.querySelector('.footer-nav'),
        ...document.querySelectorAll('.footer-social a'),
        document.querySelector('.footer-bottom')
    ];
    
    footerElements.forEach((element, index) => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
            element.style.transitionDelay = `${index * 0.1}s`;
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100);
        }
    });
}

/**
 * Добавление эффектов при наведении на элементы футера
 */
function addFooterHoverEffects() {
    // Эффект волны для социальных иконок
    const socialLinks = document.querySelectorAll('.footer-social a');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // Создаем волновой эффект
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size * 2}px`;
            ripple.style.left = `${-size / 2}px`;
            ripple.style.top = `${-size / 2}px`;
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Обновление года в футере на текущий
    updateFooterYear();
}

/**
 * Обновление года в футере
 */
function updateFooterYear() {
    const currentYear = new Date().getFullYear();
    const footerBottomText = document.querySelector('.footer-bottom p');
    
    if (footerBottomText) {
        // Год уже установлен на 2025 в HTML, поэтому не изменяем
        // Это просто пример для будущих обновлений
        
        // Добавляем счетчик просмотров (имитация)
        const viewCount = Math.floor(Math.random() * 10000) + 5000;
        const viewCountEl = document.createElement('span');
        viewCountEl.className = 'view-count';
        viewCountEl.innerHTML = `<i class="fas fa-eye"></i> ${viewCount}`;
        viewCountEl.style.marginLeft = '15px';
        viewCountEl.style.fontSize = '0.8em';
        viewCountEl.style.opacity = '0.7';
        
        footerBottomText.appendChild(viewCountEl);
    }
}
