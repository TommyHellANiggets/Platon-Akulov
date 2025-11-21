// Оптимизированная плавная прокрутка для якорных ссылок
// Работает только для ссылок (#about, #projects и т.д.)

(function () {
    'use strict';

    // Функция плавной прокрутки к элементу
    function smoothScrollTo(targetY, duration = 800) {
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        const startTime = performance.now();

        function easeInOutCubic(t) {
            return t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function animation(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = easeInOutCubic(progress);

            window.scrollTo(0, startY + distance * ease);

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    // Обработчик для всех якорных ссылок
    document.addEventListener('click', function (e) {
        const target = e.target.closest('a[href^="#"]');
        if (!target) return;

        const href = target.getAttribute('href');
        if (href === '#' || href === '#!') return;

        const targetElement = document.querySelector(href);
        if (!targetElement) return;

        e.preventDefault();

        // Вычисляем позицию с учетом отступа для header
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        smoothScrollTo(offsetPosition);

        // Обновляем URL без прокрутки
        if (history.pushState) {
            history.pushState(null, null, href);
        }
    });

    console.log('✅ Smooth anchor scrolling enabled');
})();
