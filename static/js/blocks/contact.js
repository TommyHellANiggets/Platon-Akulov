document.addEventListener('DOMContentLoaded', function() {
    // Инициализация контактной формы
    initContactForm();
    
    // Инициализация переключения вкладок
    initTabs();
    
    // Инициализация DVD эффекта с физикой движения
    // Временно отключено
    // initDVDPhysics();
    
    // Отслеживание смены языка
    document.addEventListener('languageChanged', function(e) {
        // updateDVDText(e.detail.lang);
    });
});

/**
 * Инициализирует DVD эффект с физикой движения
 * Временно отключено
 */
/*
function initDVDPhysics() {
    // Проверка текущего языка при загрузке
    const currentLang = document.documentElement.lang || 'ru';
    updateDVDText(currentLang);
    
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;
    
    // Создаем DVD логотип программно
    const dvdLogo = document.createElement('div');
    dvdLogo.className = 'dvd-logo';
    
    // Устанавливаем начальный текст в зависимости от языка
    const ruText = contactSection.getAttribute('data-dvd-text');
    const ukText = contactSection.getAttribute('data-dvd-text-uk');
    dvdLogo.textContent = currentLang === 'uk' ? ukText.replace('&#10;', '\n') : ruText.replace('&#10;', '\n');
    
    // Добавляем логотип в DOM
    contactSection.appendChild(dvdLogo);
    
    // Массив цветов для смены при столкновении
    const colors = [
        '#ff0000', // красный
        '#00ff00', // зеленый
        '#0000ff', // синий
        '#ffff00', // желтый
        '#ff00ff', // розовый
        '#00ffff', // голубой
        '#ff8000', // оранжевый
        '#8000ff', // пурпурный
        '#0080ff', // светло-синий
        '#ff0080'  // розово-красный
    ];
    
    // Начальный цвет обводки
    let currentColorIndex = 0;
    dvdLogo.style.outlineColor = colors[currentColorIndex];
    
    // Получаем размеры контейнера и логотипа
    const updateDimensions = () => {
        return {
            containerWidth: contactSection.offsetWidth,
            containerHeight: contactSection.offsetHeight,
            logoWidth: dvdLogo.offsetWidth,
            logoHeight: dvdLogo.offsetHeight
        };
    };
    
    let dimensions = updateDimensions();
    
    // Начальное положение (в середине экрана)
    let posX = (dimensions.containerWidth - dimensions.logoWidth) / 2;
    let posY = (dimensions.containerHeight - dimensions.logoHeight) / 2;
    
    // Начальная скорость и направление (случайные значения для более интересного движения)
    let speedX = Math.random() > 0.5 ? 2 : -2;
    let speedY = Math.random() > 0.5 ? 2 : -2;
    
    // Обновление положения логотипа
    dvdLogo.style.left = posX + 'px';
    dvdLogo.style.top = posY + 'px';
    
    // Переменная для определения, было ли столкновение
    let collided = false;
    
    // Функция обновления позиции логотипа с физикой отражения
    function updatePosition() {
        // Получаем текущие размеры
        dimensions = updateDimensions();
        
        // Рассчитываем новую позицию
        posX += speedX;
        posY += speedY;
        
        // Проверяем столкновения
        let hasCollision = false;
        
        // Проверяем столкновение с правой стенкой
        if (posX + dimensions.logoWidth >= dimensions.containerWidth) {
            posX = dimensions.containerWidth - dimensions.logoWidth;
            speedX = -speedX;
            hasCollision = true;
        }
        // Проверяем столкновение с левой стенкой
        else if (posX <= 0) {
            posX = 0;
            speedX = -speedX;
            hasCollision = true;
        }
        
        // Проверяем столкновение с нижней стенкой
        if (posY + dimensions.logoHeight >= dimensions.containerHeight) {
            posY = dimensions.containerHeight - dimensions.logoHeight;
            speedY = -speedY;
            hasCollision = true;
        }
        // Проверяем столкновение с верхней стенкой
        else if (posY <= 0) {
            posY = 0;
            speedY = -speedY;
            hasCollision = true;
        }
        
        // Если было столкновение, меняем цвет и добавляем анимацию
        if (hasCollision && !collided) {
            changeColor();
            animateCollision();
            collided = true;
            
            // Сбрасываем флаг столкновения через небольшую задержку
            setTimeout(() => {
                collided = false;
            }, 300); // Задержка равна длительности анимации
        }
        
        // Обновляем положение логотипа
        dvdLogo.style.left = posX + 'px';
        dvdLogo.style.top = posY + 'px';
        
        // Запускаем следующий кадр анимации
        requestAnimationFrame(updatePosition);
    }
    
    // Функция смены цвета при столкновении
    function changeColor() {
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        const newColor = colors[currentColorIndex];
        dvdLogo.style.outlineColor = newColor;
        dvdLogo.style.boxShadow = `0 0 15px ${newColor}`;
    }
    
    // Функция анимации столкновения
    function animateCollision() {
        // Добавляем класс для анимации
        dvdLogo.classList.add('collide');
        
        // Удаляем класс после завершения анимации
        setTimeout(() => {
            dvdLogo.classList.remove('collide');
        }, 300);
    }
    
    // Запускаем анимацию
    requestAnimationFrame(updatePosition);
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', () => {
        dimensions = updateDimensions();
        
        // Проверяем, не вышел ли логотип за границы после изменения размера
        if (posX + dimensions.logoWidth > dimensions.containerWidth) {
            posX = dimensions.containerWidth - dimensions.logoWidth;
        }
        if (posY + dimensions.logoHeight > dimensions.containerHeight) {
            posY = dimensions.containerHeight - dimensions.logoHeight;
        }
    });
}
*/

/**
 * Обновляет текст DVD логотипа в зависимости от языка
 * @param {string} lang - Код языка ('ru' или 'uk')
 * Временно отключено
 */
/*
function updateDVDText(lang) {
    const dvdLogo = document.querySelector('.dvd-logo');
    const contactSection = document.getElementById('contact');
    if (!dvdLogo || !contactSection) return;
    
    if (lang === 'uk') {
        const ukText = contactSection.getAttribute('data-dvd-text-uk');
        if (ukText) {
            dvdLogo.textContent = ukText.replace('&#10;', '\n');
        }
    } else {
        const ruText = contactSection.getAttribute('data-dvd-text');
        if (ruText) {
            dvdLogo.textContent = ruText.replace('&#10;', '\n');
        }
    }
}
*/

/**
 * Инициализирует контактную форму
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Анимация отправки
        const submitBtn = this.querySelector('.submit-btn');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        // Получаем данные формы
        const formData = new FormData(this);
        
        // Имитация отправки формы (заменить на реальную отправку)
        setTimeout(() => {
            // Здесь должен быть код для отправки данных на сервер
            
            // Очищаем форму
            contactForm.reset();
            
            // Показываем уведомление об успешной отправке
            showNotification('Ваше сообщение успешно отправлено!', 'success');
            
            // Восстанавливаем кнопку
            submitBtn.innerHTML = '<span>Отправить</span><i class="fas fa-arrow-right"></i>';
            submitBtn.disabled = false;
        }, 1500);
    });
    
    // Добавляем эффект focused для полей ввода
    const inputFields = contactForm.querySelectorAll('input, textarea');
    
    inputFields.forEach(field => {
        // Проверяем наличие текста при загрузке
        if (field.value.trim() !== '') {
            field.classList.add('has-content');
            field.parentNode.classList.add('focused');
        }
        
        field.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.parentNode.classList.remove('focused');
                this.classList.remove('has-content');
            } else {
                this.classList.add('has-content');
            }
        });
        
        field.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.add('has-content');
            } else {
                this.classList.remove('has-content');
            }
        });
    });
}

/**
 * Инициализирует переключение вкладок
 */
function initTabs() {
    const tabs = document.querySelectorAll('.contact-tabs .tab');
    const tabsContainer = document.getElementById('contactTabs');
    
    if (!tabs.length || !tabsContainer) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Получаем ID вкладки, на которую нужно переключиться
            const tabId = this.getAttribute('data-tab');
            
            // Если нет ID, выходим
            if (!tabId) return;
            
            // Удаляем активный класс со всех вкладок
            tabs.forEach(t => t.classList.remove('active'));
            
            // Добавляем активный класс текущей вкладке
            this.classList.add('active');
            
            // Скрываем все панели содержимого
            const tabPanes = document.querySelectorAll('.tab-pane');
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Показываем нужную панель
            const activePane = document.getElementById(tabId);
            if (activePane) {
                activePane.classList.add('active');
            }
            
            // Управляем положением тумблера
            if (tabId === 'messageTab') {
                tabsContainer.classList.remove('second-active');
            } else {
                tabsContainer.classList.add('second-active');
            }
        });
    });
}

/**
 * Показывает уведомление
 * @param {string} message - Текст уведомления
 * @param {string} type - Тип уведомления (success, error, warning)
 */
function showNotification(message, type = 'success') {
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Добавляем иконку в зависимости от типа
    let icon = '';
    switch (type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-exclamation-circle"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        default:
            icon = '<i class="fas fa-info-circle"></i>';
    }
    
    notification.innerHTML = `
        ${icon}
        <p>${message}</p>
        <button class="close-btn"><i class="fas fa-times"></i></button>
    `;
    
    // Добавляем уведомление в контейнер
    container.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Добавляем обработчик для кнопки закрытия
    const closeBtn = notification.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        
        // Удаляем уведомление после завершения анимации
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Автоматическое закрытие через 5 секунд
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}
