// JavaScript для секции "Обо мне"

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация цикла разработки
    initDevCycle();
    
    // Инициализация счетчиков статистики
    initCounters();
    
    // Анимация технологического стека при скролле
    initTechStackAnimation();
});

// Инициализация интерактивного цикла разработки
function initDevCycle() {
    const cycleItems = document.querySelectorAll('.cycle-item');
    const aboutTitle = document.getElementById('about-title');
    const aboutSubtitle = document.getElementById('about-subtitle');
    const aboutTextPrimary = document.getElementById('about-text-primary');
    const aboutTextSecondary = document.getElementById('about-text-secondary');
    
    // Данные для каждого этапа цикла
    const cycleData = [
        {
            title: "Идея",
            subtitle: "Анализ потребностей и формирование концепции",
            textPrimary: "Применяю современные техники анализа: интервью с заинтересованными сторонами, пользовательские истории (User Stories), методы дизайн-мышления и составление карт пути пользователя (User Journey Maps).",
            textSecondary: "Использую инструменты для прототипирования: Figma, Miro и Draw.io для создания структурных схем. Провожу исследования рынка и анализ конкурентов для формирования уникального ценностного предложения продукта."
        },
        {
            title: "Дизайн",
            subtitle: "Создание пользовательского интерфейса и опыта",
            textPrimary: "Разрабатываю современные и удобные интерфейсы с фокусом на UX/UI дизайн. Создаю интерактивные прототипы в Figma, которые позволяют тестировать пользовательские сценарии до начала разработки.",
            textSecondary: "Использую систему атомарного дизайна для создания масштабируемых компонентов. Тесно сотрудничаю с заказчиком на этапе дизайна, внедряя итеративный подход с регулярными презентациями и сбором обратной связи."
        },
        {
            title: "Разработка",
            subtitle: "Написание чистого и эффективного кода",
            textPrimary: "Разрабатываю frontend-часть с использованием современных фреймворков (React, Vue.js) и библиотек, применяя лучшие практики чистого кода и компонентного подхода.",
            textSecondary: "Создаю backend-решения на Django и Django REST Framework, проектирую оптимальную архитектуру баз данных с учетом особенностей проекта. Использую контейнеризацию (Docker) для обеспечения единообразной среды разработки и деплоя."
        },
        {
            title: "Тестирование",
            subtitle: "Обеспечение качества и стабильности",
            textPrimary: "Применяю комплексный подход к тестированию: модульные тесты (unit tests), интеграционные тесты и e2e тестирование. Использую инструменты автоматизированного тестирования (Jest, Pytest, Selenium).",
            textSecondary: "Провожу ручное тестирование пользовательских сценариев и кросс-браузерную проверку. Особое внимание уделяю тестированию на мобильных устройствах и планшетах, обеспечивая отличную работу на всех платформах."
        },
        {
            title: "Запуск",
            subtitle: "Развертывание и оптимизация",
            textPrimary: "Настраиваю CI/CD пайплайны для автоматизации процесса деплоя. Использую современные практики DevOps: контейнеризацию, оркестрацию и мониторинг для обеспечения стабильной работы проекта.",
            textSecondary: "Оптимизирую производительность приложения: минимизирую время загрузки страниц, настраиваю кэширование, оптимизирую запросы к БД. Внедряю аналитические инструменты для отслеживания пользовательской активности и выявления проблемных мест."
        },
        {
            title: "Поддержка",
            subtitle: "Сопровождение и развитие проекта",
            textPrimary: "Обеспечиваю техническую поддержку и мониторинг после запуска. Регулярно обновляю зависимости и компоненты системы, уделяя особое внимание вопросам безопасности.",
            textSecondary: "Анализирую метрики пользовательской активности для выявления возможностей по улучшению продукта. Разрабатываю и внедряю новые функции на основе обратной связи от пользователей и изменяющихся бизнес-требований."
        }
    ];
    
    // Установка начального активного элемента
    setActiveItem(cycleItems[0], cycleData[0]);
    
    // Обработчики событий для элементов цикла
    cycleItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Удаляем класс active у всех элементов
            cycleItems.forEach(item => item.classList.remove('active'));
            
            // Добавляем класс active кликнутому элементу
            this.classList.add('active');
            
            // Обновляем текстовое содержимое
            setActiveItem(this, cycleData[index]);
        });
    });
    
    // Функция установки активного элемента
    function setActiveItem(item, data) {
        // Добавляем класс active
        item.classList.add('active');
        
        // Сбрасываем анимацию заголовка
        aboutTitle.style.animation = 'none';
        aboutTitle.offsetHeight; // Триггерим reflow
        aboutTitle.style.animation = null;
        
        // Обновляем содержимое с учетом языка
        const currentLang = document.documentElement.dataset.lang || 'ru';
        
        if (currentLang === 'ru') {
            aboutTitle.innerHTML = data.title;
            aboutSubtitle.innerHTML = data.subtitle;
            aboutTextPrimary.innerHTML = data.textPrimary;
            aboutTextSecondary.innerHTML = data.textSecondary;
        } else {
            // Если есть английский перевод, можно добавить логику здесь
            // Для примера используем те же данные
            aboutTitle.innerHTML = data.title;
            aboutSubtitle.innerHTML = data.subtitle;
            aboutTextPrimary.innerHTML = data.textPrimary;
            aboutTextSecondary.innerHTML = data.textSecondary;
        }
        
        // Добавляем анимацию текста
        aboutTextPrimary.style.animation = 'none';
        aboutTextSecondary.style.animation = 'none';
        aboutTextPrimary.offsetHeight; // Триггерим reflow
        aboutTextSecondary.offsetHeight;
        aboutTextPrimary.style.animation = 'fadeInRight 0.5s ease forwards';
        aboutTextSecondary.style.animation = 'fadeInRight 0.5s ease forwards 0.2s';
        
        // Устанавливаем data атрибуты для поддержки перевода
        aboutTitle.setAttribute('data-ru', data.title);
        aboutSubtitle.setAttribute('data-ru', data.subtitle);
        aboutTextPrimary.setAttribute('data-ru', data.textPrimary);
        aboutTextSecondary.setAttribute('data-ru', data.textSecondary);
    }
    
    // Автоматическое переключение элементов каждые 5 секунд
    let currentIndex = 0;
    const autoSwitchInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % cycleItems.length;
        cycleItems.forEach(item => item.classList.remove('active'));
        setActiveItem(cycleItems[currentIndex], cycleData[currentIndex]);
    }, 5000);
    
    // Останавливаем автопереключение при взаимодействии пользователя
    cycleItems.forEach(item => {
        item.addEventListener('click', () => {
            clearInterval(autoSwitchInterval);
        });
    });
}

// Инициализация счетчиков для секции статистики
function initCounters() {
    // Функционал счетчиков отключен, так как теперь используются статичные значения
    console.log('Счетчики статистики отключены - используются статичные значения');
    
    /* Закомментированный код старой анимации
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // скорость анимации (чем меньше, тем быстрее)
    
    // Функция для анимации счетчика
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        
        const updateCount = () => {
            const increment = target / speed;
            
            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCount();
    };
    
    // Запускаем анимацию счетчиков при скролле
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statsContainer = entry.target.closest('.stats-container');
                if (statsContainer) {
                    const counters = statsContainer.querySelectorAll('.counter');
                    counters.forEach(counter => {
                        animateCounter(counter);
                    });
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
    */
}

// Анимация технологического стека при скролле
function initTechStackAnimation() {
    const techCategories = document.querySelectorAll('.tech-category');
    
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Добавляем задержку для каскадной анимации
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Подготавливаем элементы к анимации
    techCategories.forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        observer.observe(category);
    });
}
