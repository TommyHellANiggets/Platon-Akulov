/**
 * Главный JavaScript файл
 */

/**
 * Инициализирует анимацию системы чёрных труб со светящейся линией
 */
function initPipes() {
    // Получаем все световые элементы
    const lightElements = document.querySelectorAll('.pipe-light');
    const indicators = document.querySelectorAll('.pipe-indicator');
    
    // Настраиваем маршруты движения света
    setupLightRoutes(lightElements);
    
    // Запускаем анимацию света
    animateLights(lightElements, indicators);
    
    // Добавляем эффект при наведении на трубы
    setupPipeHoverEffects();
    
    // Добавляем эффект при прокрутке страницы
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = scrollY / maxScroll;
        
        // Изменяем интенсивность активных индикаторов при прокрутке
        const activeIndicators = document.querySelectorAll('.pipe-indicator.active');
        activeIndicators.forEach(indicator => {
            const brightness = 1 + (scrollPercent * 0.5);
            indicator.style.filter = `brightness(${brightness})`;
        });
    });
}

/**
 * Настраивает маршруты движения света по трубам
 * @param {NodeList} lightElements - Элементы света для труб
 */
function setupLightRoutes(lightElements) {
    // Определяем ID для каждого светового элемента
    lightElements.forEach((light, index) => {
        light.dataset.lightId = index;
        
        // Настраиваем начальные позиции света
        if (light.classList.contains('horizontal')) {
            light.style.setProperty('--light-position', '0px');
        } else {
            light.style.setProperty('--light-position', '0px');
        }
    });
}

/**
 * Анимирует движение света по трубам и активирует индикаторы
 * @param {NodeList} lightElements - Элементы света для труб
 * @param {NodeList} indicators - Индикаторы на трубах
 */
function animateLights(lightElements, indicators) {
    // Преобразуем NodeList в массивы для удобства
    const lights = Array.from(lightElements);
    const allIndicators = Array.from(indicators);
    
    // Создаем объект для хранения текущей позиции света
    const lightPositions = {};
    
    // Определяем максимальные дистанции для каждой трубы
    const pipeMaxDistances = {
        'left-vertical': 600,    // Максимальная высота левой вертикальной трубы
        'right-vertical': 500,   // Максимальная высота правой вертикальной трубы
        'top-horizontal': 800,   // Максимальная ширина верхней горизонтальной трубы
        'bottom-horizontal': 800 // Максимальная ширина нижней горизонтальной трубы
    };
    
    // Определяем типы для световых элементов
    const lightTypes = [
        'left-vertical',
        'right-vertical',
        'top-horizontal',
        'bottom-horizontal'
    ];
    
    // Настраиваем типы для каждого светового элемента
    lights.forEach((light, index) => {
        if (index < lightTypes.length) {
            light.dataset.lightType = lightTypes[index];
            lightPositions[lightTypes[index]] = {
                position: 0,
                direction: 1, // 1 - вперед, -1 - назад
                speed: 2 + Math.random() * 2 // Разная скорость для каждого света
            };
        }
    });
    
    // Запускаем анимацию движения света
    function animationLoop() {
        // Обновляем позиции светов
        lights.forEach(light => {
            const lightType = light.dataset.lightType;
            if (!lightType || !lightPositions[lightType]) return;
            
            const lightData = lightPositions[lightType];
            const maxDistance = pipeMaxDistances[lightType];
            
            // Вычисляем новую позицию
            let newPosition = lightData.position + (lightData.direction * lightData.speed);
            
            // Проверяем достижение границ и меняем направление
            if (newPosition >= maxDistance) {
                newPosition = maxDistance;
                lightData.direction = -1;
            } else if (newPosition <= 0) {
                newPosition = 0;
                lightData.direction = 1;
            }
            
            // Обновляем позицию света
            lightData.position = newPosition;
            
            // Применяем новую позицию к световому элементу
            if (light.classList.contains('horizontal')) {
                light.style.setProperty('--light-position', `${newPosition}px`);
            } else {
                light.style.setProperty('--light-position', `${newPosition}px`);
            }
            
            // Проверяем пересечение с индикаторами
            checkIndicatorIntersection(light, allIndicators, lightType, newPosition);
        });
        
        // Запрашиваем следующий кадр анимации
        requestAnimationFrame(animationLoop);
    }
    
    // Запускаем анимационный цикл
    animationLoop();
}

/**
 * Проверяет пересечение света с индикаторами и активирует их
 * @param {HTMLElement} light - Световой элемент
 * @param {Array} indicators - Все индикаторы
 * @param {string} lightType - Тип светового элемента
 * @param {number} position - Текущая позиция света
 */
function checkIndicatorIntersection(light, indicators, lightType, position) {
    // Определяем родительский контейнер для текущего света
    let parentSystem;
    
    if (lightType === 'left-vertical') {
        parentSystem = '.left-pipe-system';
    } else if (lightType === 'right-vertical') {
        parentSystem = '.right-pipe-system';
    } else if (lightType === 'top-horizontal') {
        parentSystem = '.top-pipe-system';
    } else if (lightType === 'bottom-horizontal') {
        parentSystem = '.bottom-pipe-system';
    }
    
    // Выбираем только индикаторы, которые принадлежат соответствующей системе труб
    const relevantIndicators = indicators.filter(indicator => {
        return indicator.closest(parentSystem) !== null;
    });
    
    // Проверяем каждый индикатор на пересечение со светом
    relevantIndicators.forEach(indicator => {
        const indicatorRect = indicator.getBoundingClientRect();
        const lightRect = light.getBoundingClientRect();
        
        // Определяем, пересекается ли свет с индикатором
        let isIntersecting = false;
        
        if (light.classList.contains('horizontal')) {
            // Для горизонтальных труб проверяем по X
            const indicatorX = indicatorRect.left + indicatorRect.width / 2;
            const lightLeft = lightRect.left;
            const lightRight = lightRect.right;
            
            isIntersecting = indicatorX >= lightLeft && indicatorX <= lightRight;
        } else {
            // Для вертикальных труб проверяем по Y
            const indicatorY = indicatorRect.top + indicatorRect.height / 2;
            const lightTop = lightRect.top;
            const lightBottom = lightRect.bottom;
            
            isIntersecting = indicatorY >= lightTop && indicatorY <= lightBottom;
        }
        
        // Активируем или деактивируем индикатор
        if (isIntersecting) {
            // Активируем индикатор
            indicator.classList.add('active');
            
            // Создаем случайное время для деактивации
            const deactivationTime = 200 + Math.random() * 300;
            
            // Деактивируем индикатор через случайное время
            setTimeout(() => {
                indicator.classList.remove('active');
            }, deactivationTime);
        }
    });
}

/**
 * Добавляет эффекты при наведении на трубы
 */
function setupPipeHoverEffects() {
    const pipes = document.querySelectorAll('.pipe');
    const indicators = document.querySelectorAll('.pipe-indicator');
    
    pipes.forEach(pipe => {
        pipe.addEventListener('mouseenter', function() {
            // Находим все индикаторы, которые принадлежат этой трубе
            const pipeIndicators = Array.from(indicators).filter(indicator => {
                return pipe.contains(indicator);
            });
            
            // Активируем все индикаторы при наведении на трубу
            pipeIndicators.forEach(indicator => {
                indicator.classList.add('active');
            });
        });
        
        pipe.addEventListener('mouseleave', function() {
            // Находим все индикаторы, которые принадлежат этой трубе
            const pipeIndicators = Array.from(indicators).filter(indicator => {
                return pipe.contains(indicator);
            });
            
            // Деактивируем все индикаторы при уходе с трубы
            pipeIndicators.forEach(indicator => {
                // Задержка, чтобы эффект был плавнее
                setTimeout(() => {
                    indicator.classList.remove('active');
                }, 100 + Math.random() * 200);
            });
        });
    });
}

// Добавляю код для обработки сайдбара в начало файла

// Обработка сайдбара
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarClose = document.querySelector('.sidebar-close');
    
    // Создаем новую кнопку закрытия, если её нет или она скрыта
    function createCloseButton() {
        // Удаляем существующую кнопку закрытия, если она есть
        const existingCloseBtn = document.querySelector('.sidebar-close-btn');
        if (existingCloseBtn) {
            existingCloseBtn.remove();
        }
        
        // Создаем новую кнопку закрытия
        const newCloseBtn = document.createElement('button');
        newCloseBtn.className = 'sidebar-close-btn';
        newCloseBtn.setAttribute('aria-label', 'Закрыть меню');
        newCloseBtn.innerHTML = '<i class="fas fa-times"></i>';
        
        // Добавляем кнопку в начало сайдбара
        if (sidebar) {
            sidebar.insertBefore(newCloseBtn, sidebar.firstChild);
            
            // Добавляем обработчик событий для закрытия сайдбара
            newCloseBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeSidebar();
            });
            
            // Принудительно делаем кнопку видимой
            setTimeout(() => {
                newCloseBtn.style.display = 'block';
                newCloseBtn.style.opacity = '0.8';
            }, 100);
        }
        
        return newCloseBtn;
    }
    
    // Функция для закрытия сайдбара
    function closeSidebar() {
        if (sidebar) {
            sidebar.classList.remove('active');
            document.body.style.overflow = ''; // Восстанавливаем прокрутку
        }
    }
    
    // Убедимся, что сайдбар скрыт при загрузке страницы
    if (sidebar) {
        sidebar.classList.remove('active');
        createCloseButton(); // Создаем кнопку закрытия
    }
    
    // Показываем сайдбар только при клике на кнопку меню
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault(); // Предотвращаем действие по умолчанию
            e.stopPropagation(); // Останавливаем всплытие события
            if (sidebar) {
                sidebar.classList.add('active');
                document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы при открытом сайдбаре
            }
        });
    }
    
    // Закрываем сайдбар при клике на ссылки внутри него
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            closeSidebar();
        });
    });
    
    // Закрываем сайдбар при клике вне его области
    document.addEventListener('click', function(e) {
        if (sidebar && sidebar.classList.contains('active')) {
            // Проверяем, что клик был не по сайдбару и не по кнопке открытия меню
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                closeSidebar();
            }
        }
    });
    
    // Предотвращаем закрытие при клике внутри сайдбара (кроме ссылок)
    if (sidebar) {
        sidebar.addEventListener('click', function(e) {
            // Проверяем, что клик не был по ссылке
            if (!e.target.closest('a')) {
                e.stopPropagation(); // Предотвращаем всплытие события
            }
        });
    }
    
    // Закрываем сайдбар при свайпе влево на мобильных устройствах
    if (sidebar) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        sidebar.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        sidebar.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        // Обработка свайпа
        function handleSwipe() {
            // Если свайп влево более 50 пикселей, закрываем сайдбар
            if (touchStartX - touchEndX > 50) {
                closeSidebar();
            }
        }
    }
    
    // Добавляем обработчик клавиши Escape для закрытия сайдбара
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close sidebar if it's open
                const sidebar = document.querySelector('.sidebar');
                if (sidebar && sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Scroll to the target element
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Инициализировать бегущую строку с различными технологиями
    initMarquee();

    // Добавление эффекта свечения скроллбара при активном скроллинге
    let scrollTimer;
    window.addEventListener('scroll', function() {
        // Добавляем класс при скролле
        document.body.classList.add('scrolling');
        
        // Очищаем предыдущий таймер
        clearTimeout(scrollTimer);
        
        // Устанавливаем новый таймер для удаления класса
        scrollTimer = setTimeout(function() {
            document.body.classList.remove('scrolling');
        }, 1000); // Класс удаляется через 1 секунду после окончания скролла
    });
});

/**
 * Инициализация бегущей строки с настройкой дублирования элементов
 */
function initMarquee() {
    const marqueeContent = document.querySelector('.marquee-content');
    
    if (!marqueeContent) return;
    
    // Добавление обработчика события изменения языка
    document.addEventListener('languageChanged', function(e) {
        updateMarqueeLanguage(e.detail.lang);
    });
    
    // Перемешать элементы для более случайного порядка
    shuffleMarqueeItems();
    
    // Добавляем плавность при наведении
    marqueeContent.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    marqueeContent.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
}

/**
 * Перемешивает элементы бегущей строки для разнообразия
 */
function shuffleMarqueeItems() {
    const marqueeContent = document.querySelector('.marquee-content');
    const items = Array.from(document.querySelectorAll('.marquee-item'));
    
    if (!marqueeContent || items.length === 0) return;
    
    // Исключаем дублирующие элементы (последние 4 в нашем случае)
    const uniqueItems = items.slice(0, items.length - 4);
    const duplicateItems = items.slice(items.length - 4);
    
    // Перемешиваем только уникальные элементы
    const shuffledItems = uniqueItems.sort(() => Math.random() - 0.5);
    
    // Очищаем контейнер
    marqueeContent.innerHTML = '';
    
    // Добавляем перемешанные элементы
    shuffledItems.forEach(item => {
        marqueeContent.appendChild(item.cloneNode(true));
    });
    
    // Добавляем дублирующие элементы для непрерывности
    duplicateItems.forEach(item => {
        marqueeContent.appendChild(item.cloneNode(true));
    });
}

/**
 * Обновляет язык элементов бегущей строки
 * @param {string} lang - Код языка ('ru' или 'uk')
 */
function updateMarqueeLanguage(lang) {
    const items = document.querySelectorAll('.marquee-item');
    
    items.forEach(item => {
        const text = item.getAttribute(`data-${lang}`);
        if (text) {
            const span = item.querySelector('span');
            const icon = span.querySelector('i');
            span.innerHTML = '';
            span.appendChild(icon);
            span.append(' ' + text);
        }
    });
}

/**
 * Инициализация анимации течения воды по трубам
 */
function initWaterFlow() {
    const pipeSystem = document.querySelector('.pipe-system');
    if (!pipeSystem) return;
    
    // Получаем все индикаторы
    const indicators = document.querySelectorAll('.pipe-indicator');
    
    // Определяем точки маршрута для капель воды
    const waterFlowRoutes = [
        // Путь 1: центральный путь от источника к стоку
        [
            { x: '50%', y: '60px', type: 'vertical', delay: 0 },
            { x: '50%', y: '120px', type: 'vertical', delay: 500 },
            { x: '50%', y: '160px', type: 'vertical', delay: 1000 },
            { x: 'calc(40% - 80px)', y: '196px', type: 'horizontal', delay: 1500 },
            { x: 'calc(40% - 108px)', y: '240px', type: 'vertical', delay: 2000 },
            { x: 'calc(40% - 108px)', y: '350px', type: 'vertical', delay: 2500 },
            { x: 'calc(40% - 108px)', y: '400px', type: 'vertical', delay: 3000 },
            { x: 'calc(40% - 40px)', y: '460px', type: 'horizontal', delay: 3500 },
            { x: 'calc(40% + 40px)', y: '460px', type: 'horizontal', delay: 4000 },
            { x: '50%', y: '560px', type: 'vertical', delay: 4500 },
            { x: '50%', y: '600px', type: 'vertical', delay: 5000 }
        ],
        // Путь 2: правый путь
        [
            { x: '50%', y: '120px', type: 'vertical', delay: 0 },
            { x: 'calc(40% + 20px)', y: '308px', type: 'horizontal', delay: 1000 },
            { x: 'calc(40% + 60px)', y: '308px', type: 'horizontal', delay: 1500 },
            { x: 'calc(40% + 112px)', y: '350px', type: 'vertical', delay: 2000 },
            { x: 'calc(40% + 112px)', y: '400px', type: 'vertical', delay: 2500 },
            { x: 'calc(40% + 112px)', y: '450px', type: 'vertical', delay: 3000 },
            { x: 'calc(40% + 40px)', y: '460px', type: 'horizontal', delay: 3500 },
            { x: '50%', y: '560px', type: 'vertical', delay: 4000 },
            { x: '50%', y: '600px', type: 'vertical', delay: 4500 }
        ],
        // Путь 3: левое ответвление
        [
            { x: 'calc(40% - 108px)', y: '350px', type: 'vertical', delay: 0 },
            { x: '70px', y: '396px', type: 'horizontal', delay: 1000 },
            { x: '120px', y: '396px', type: 'horizontal', delay: 1500 },
            { x: '170px', y: '396px', type: 'horizontal', delay: 2000 },
            { x: 'calc(40% - 108px)', y: '400px', type: 'vertical', delay: 2500 }
        ],
        // Путь 4: правое боковое ответвление
        [
            { x: 'right: 70px', y: '266px', type: 'horizontal', delay: 0 },
            { x: 'right: 120px', y: '266px', type: 'horizontal', delay: 500 },
            { x: 'right: 170px', y: '266px', type: 'horizontal', delay: 1000 },
            { x: 'right: 28px', y: '210px', type: 'vertical', delay: 1500 }
        ]
    ];
    
    // Создаем и запускаем анимации капель воды
    waterFlowRoutes.forEach(route => {
        animateWaterDrops(route, pipeSystem);
    });
    
    // Добавляем обработчик событий для прокрутки страницы
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        // Уменьшаем яркость/видимость системы труб при прокрутке
        pipeSystem.style.opacity = 1 - Math.min(scrollY / 500, 0.7);
        
        // Отключаем индикаторы при прокрутке
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Восстанавливаем анимацию через 1 секунду после окончания прокрутки
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            pipeSystem.style.opacity = 1;
        }, 1000);
    });
}

/**
 * Анимация капель воды по указанному маршруту
 * @param {Array} route - маршрут с точками пути
 * @param {HTMLElement} container - контейнер для добавления капель
 */
function animateWaterDrops(route, container) {
    // Устанавливаем интервал для периодического запуска капель
    const startInterval = 5000 + Math.random() * 2000; // Интервал запуска капель
    
    // Функция для создания и анимации капли
    function createDrop() {
        // Создаем каплю воды
        const drop = document.createElement('div');
        drop.className = `water-drop ${route[0].type}`;
        container.appendChild(drop);
        
        // Устанавливаем начальное положение
        const start = route[0];
        if (start.x.includes('right')) {
            drop.style.right = start.x.replace('right: ', '');
        } else {
            drop.style.left = start.x;
        }
        drop.style.top = start.y;
        
        // Функция для анимации капли по маршруту
        function animateAlongRoute(index = 0) {
            if (index >= route.length) {
                drop.remove(); // удаляем каплю, когда она достигла конца маршрута
                return;
            }
            
            const point = route[index];
            const nextIndex = index + 1;
            
            // Активируем индикатор на текущей точке
            activateNearestIndicator(point);
            
            // Задаем следующую позицию для капли
            setTimeout(() => {
                // Обновляем класс типа капли (горизонтальная/вертикальная)
                if (nextIndex < route.length && route[nextIndex].type !== point.type) {
                    drop.className = `water-drop ${route[nextIndex].type}`;
                }
                
                // Анимируем движение к следующей точке
                if (nextIndex < route.length) {
                    const next = route[nextIndex];
                    
                    // Устанавливаем новую позицию
                    if (next.x.includes('right')) {
                        drop.style.right = next.x.replace('right: ', '');
                        drop.style.left = 'auto';
                    } else {
                        drop.style.left = next.x;
                        drop.style.right = 'auto';
                    }
                    drop.style.top = next.y;
                    
                    // Длительность перехода между точками
                    const transitionDuration = 800;
                    drop.style.transition = `left ${transitionDuration}ms ease, right ${transitionDuration}ms ease, top ${transitionDuration}ms ease`;
                    
                    // Переходим к следующей точке маршрута
                    setTimeout(() => animateAlongRoute(nextIndex), transitionDuration);
                } else {
                    // Капля достигла конца маршрута
                    setTimeout(() => drop.remove(), 500);
                }
            }, point.delay);
        }
        
        // Запускаем анимацию капли
        animateAlongRoute();
    }
    
    // Периодически запускаем новые капли
    setInterval(createDrop, startInterval);
    
    // Запускаем первую каплю сразу
    setTimeout(createDrop, 1000);
}

/**
 * Активирует ближайший индикатор к указанной точке
 * @param {Object} point - точка маршрута
 */
function activateNearestIndicator(point) {
    // Находим все индикаторы
    const indicators = document.querySelectorAll('.pipe-indicator');
    
    // Преобразуем координаты точки
    let x, y;
    if (point.x.includes('right')) {
        const rightValue = point.x.replace('right: ', '');
        x = window.innerWidth - parseInt(rightValue);
    } else if (point.x.includes('calc')) {
        // Упрощенный парсинг calc выражений 
        // (в реальных проектах лучше использовать более надежный метод)
        try {
            if (point.x.includes('%')) {
                const percentage = parseFloat(point.x.match(/(\d+)%/)[1]);
                x = window.innerWidth * (percentage / 100);
                
                if (point.x.includes('-')) {
                    const pixels = parseFloat(point.x.match(/- (\d+)px/)[1]);
                    x -= pixels;
                } else if (point.x.includes('+')) {
                    const pixels = parseFloat(point.x.match(/\+ (\d+)px/)[1]);
                    x += pixels;
                }
            }
        } catch (e) {
            x = 0;
        }
    } else if (point.x.includes('%')) {
        const percentage = parseFloat(point.x);
        x = window.innerWidth * (percentage / 100);
    } else {
        x = parseFloat(point.x);
    }
    
    if (point.y.includes('%')) {
        const percentage = parseFloat(point.y);
        y = window.innerHeight * (percentage / 100);
    } else {
        y = parseFloat(point.y);
    }
    
    // Находим ближайший индикатор
    let closestIndicator = null;
    let minDistance = Infinity;
    
    indicators.forEach(indicator => {
        const rect = indicator.getBoundingClientRect();
        const indicatorX = rect.left + rect.width / 2;
        const indicatorY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(indicatorX - x, 2) + 
            Math.pow(indicatorY - y, 2)
        );
        
        if (distance < minDistance && distance < 30) {
            minDistance = distance;
            closestIndicator = indicator;
        }
    });
    
    // Активируем ближайший индикатор
    if (closestIndicator) {
        closestIndicator.classList.add('active');
        
        // Деактивируем через некоторое время
        setTimeout(() => {
            closestIndicator.classList.remove('active');
        }, 2000);
    }
}

/**
 * Инициализирует анимацию системы цветных линий
 */
function initTubeSystem() {
    // Весь блок функции удален
}

/**
 * Создает частицы для всех линий в системе
 */
function createParticlesForTubes() {
    // Весь блок функции удален
}

/**
 * Создает одну частицу для указанной линии
 */
function createParticle(tube, type) {
    // Весь блок функции удален
}

/**
 * Анимирует горизонтальную частицу
 */
function animateHorizontalParticle(particle, tube, duration, direction) {
    // Весь блок функции удален
}

/**
 * Анимирует вертикальную частицу
 */
function animateVerticalParticle(particle, tube, duration, direction) {
    // Весь блок функции удален
}

/**
 * Анимирует диагональную частицу
 */
function animateDiagonalParticle(particle, tube, duration, direction, type) {
    // Весь блок функции удален
}

/**
 * Добавляет интерактивность при наведении на элементы системы линий
 */
function addTubeInteractivity() {
    // Весь блок функции удален
}

/**
 * Создает эффект разлетающихся частиц при клике на пересечении
 */
function createExplosionParticles(element, count) {
    // Весь блок функции удален
}

/**
 * Периодически создает новые частицы в случайных местах
 */
function createRandomParticles() {
    // Весь блок функции удален
}

/**
 * Добавляет эффект при прокрутке страницы
 */
function addScrollEffect() {
    // Весь блок функции удален
}