// Функциональность для раздела проектов
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('load-more');
    if (!loadMoreBtn) return;
    
    let offset = document.querySelectorAll('#projects-container .project-card').length;
    const projectsContainer = document.getElementById('projects-container');
    
    // Определение размера экрана для загрузки проектов
    function getScreenSize() {
        const width = window.innerWidth;
        if (width <= 576) return 'mobile';
        if (width <= 992) return 'tablet';
        return 'desktop';
    }
    
    // Обработчик клика на кнопку "Показать еще"
    loadMoreBtn.addEventListener('click', function() {
        loadMoreBtn.classList.add('loading');
        
        // Получаем текущий размер экрана
        const screenSize = getScreenSize();
        
        // Запрос к серверу
        fetch(`/load-more-projects/?offset=${offset}&screen=${screenSize}`)
            .then(response => response.json())
            .then(data => {
                if (data.projects && data.projects.length > 0) {
                    // Добавляем новые проекты на страницу
                    data.projects.forEach(project => {
                        const projectCard = createProjectCard(project);
                        projectsContainer.appendChild(projectCard);
                    });
                    
                    // Обновляем смещение
                    offset += data.projects.length;
                    
                    // Если это была последняя партия проектов, скрываем кнопку
                    if (data.is_last_batch) {
                        loadMoreBtn.style.display = 'none';
                    }
                    
                    // Инициализируем анимации для новых проектов
                    initProjectAnimations();
                } else {
                    // Если проектов больше нет, скрываем кнопку
                    loadMoreBtn.style.display = 'none';
                }
                
                // Убираем статус загрузки
                loadMoreBtn.classList.remove('loading');
            })
            .catch(error => {
                console.error('Ошибка при загрузке проектов:', error);
                loadMoreBtn.classList.remove('loading');
            });
    });
    
    // Функция для создания карточки проекта из данных
    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        // Формируем HTML для карточки
        let cardHTML = '';
        
        // Изображение проекта
        if (project.image) {
            cardHTML += `
                <div class="project-image">
                    <img src="/media/${project.image}" alt="${project.title}">
                    <div class="project-overlay">
                        ${project.url ? `
                            <a href="${project.url}" class="project-link" target="_blank">
                                <i class="fas fa-external-link-alt"></i>
                                <span>${currentLanguage === 'ru' ? 'Открыть' : 'View'}</span>
                            </a>
                        ` : ''}
                    </div>
                </div>
            `;
        }
        
        // Информация о проекте
        cardHTML += `
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
        `;
        
        // Описание проекта (если есть)
        if (project.description) {
            const truncatedDescription = project.description.length > 100 ? 
                project.description.substring(0, 97) + '...' : 
                project.description;
            cardHTML += `<p class="project-description">${truncatedDescription}</p>`;
        }
        
        // Дата создания проекта
        if (project.created_at) {
            cardHTML += `
                <div class="project-date">
                    <i class="far fa-calendar-alt"></i>
                    ${project.created_at}
                </div>
            `;
        }
        
        // Добавляем стандартные теги
        cardHTML += `
                <div class="project-tags">
                    <span class="project-tag">Django</span>
                    <span class="project-tag">Python</span>
                    <span class="project-tag">HTML/CSS</span>
                </div>
            </div>
        `;
        
        card.innerHTML = cardHTML;
        return card;
    }
    
    // Инициализация анимаций для проектов
    function initProjectAnimations() {
        const projectCards = document.querySelectorAll('.project-card:not(.animate)');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const projectObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        projectCards.forEach(card => {
            projectObserver.observe(card);
        });
    }
    
    // Инициализируем анимации для начальных проектов
    initProjectAnimations();
    
    // Определяем текущий язык
    let currentLanguage = document.documentElement.lang || 'ru';
    
    // Обработка изменения языка, если есть функциональность переключения языка
    if (window.updateLanguage) {
        const originalUpdateLanguage = window.updateLanguage;
        window.updateLanguage = function(lang) {
            currentLanguage = lang;
            originalUpdateLanguage(lang);
        };
    }
});
