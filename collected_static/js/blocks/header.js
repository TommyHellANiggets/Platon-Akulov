/**
 * Header Component JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    initHeaderScroll();
    initActiveNavLink();
    initThemeToggle();
    initLanguageSelector();
    initMobileMenu();
});

/**
 * Add scroll effect to header
 */
function initHeaderScroll() {
    const header = document.querySelector('header');
    const headerContainer = header.querySelector('.container');
    
    // Сохраняем исходную высоту контейнера
    const originalHeight = headerContainer.offsetHeight;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            // Scrolled down - make header more compact
            headerContainer.style.padding = '12px 24px';
            // Фиксируем высоту, чтобы не было скачков
            headerContainer.style.height = originalHeight + 'px';
        } else {
            // At top - restore original padding
            headerContainer.style.padding = '16px 24px';
            // Сбрасываем фиксированную высоту
            headerContainer.style.height = 'auto';
        }
    });
}

/**
 * Highlight active navigation link based on scroll position
 */
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a, .sidebar-nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollY = window.scrollY;
        
        // Get current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        // Update active link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Initialize theme toggle functionality
 */
function initThemeToggle() {
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const sidebarThemeToggle = document.querySelector('.sidebar-theme-toggle .theme-toggle');
    const headerThemeToggle = document.querySelector('.header-right .theme-toggle');
    const body = document.body;
    const htmlDocument = document.getElementById('html-document');
    
    console.log('Инициализация переключателя темы');
    console.log('Найдено переключателей темы:', themeToggles.length);
    console.log('Найден переключатель в сайдбаре:', !!sidebarThemeToggle);
    console.log('Найден переключатель в хедере:', !!headerThemeToggle);
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    console.log('Сохраненная тема:', savedTheme);
    
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggles.forEach(toggle => toggle.classList.add('active'));
        console.log('Применена светлая тема из localStorage');
    } else {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
        themeToggles.forEach(toggle => toggle.classList.remove('active'));
        console.log('Применена темная тема из localStorage');
    }
    
    // Функция переключения темы
    function toggleTheme() {
        console.log('Переключение темы');
        body.classList.toggle('light-theme');
        body.classList.toggle('dark-theme');
        const isLight = body.classList.contains('light-theme');
        
        // Save theme preference
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        
        // Toggle active class on all theme toggles
        themeToggles.forEach(t => t.classList.toggle('active', isLight));
        
        console.log('Тема переключена на:', isLight ? 'светлую' : 'темную');
    }
    
    // Add click events to all theme toggles
    if (headerThemeToggle) {
        headerThemeToggle.addEventListener('click', function(e) {
            console.log('Клик по переключателю темы в хедере');
            e.preventDefault();
            e.stopPropagation();
            toggleTheme();
        });
    }
    
    if (sidebarThemeToggle) {
        sidebarThemeToggle.addEventListener('click', function(e) {
            console.log('Клик по переключателю темы в сайдбаре');
            e.preventDefault();
            e.stopPropagation();
            toggleTheme();
        });
    }
}

/**
 * Initialize language selector dropdown
 */
function initLanguageSelector() {
    const languageSelectors = document.querySelectorAll('.language-selector, .sidebar-language');
    
    console.log('Инициализация селектора языка');
    console.log('Найдено селекторов языка:', languageSelectors.length);
    
    languageSelectors.forEach(selector => {
        const currentLanguage = selector.querySelector('.current-language');
        const languageDropdown = selector.querySelector('.language-dropdown');
        const languageOptions = selector.querySelectorAll('.language-option');
        
        console.log('Опции селектора:', selector.className, {
            hasCurrentLanguage: !!currentLanguage,
            hasDropdown: !!languageDropdown,
            optionsCount: languageOptions.length
        });
        
        if (currentLanguage) {
            currentLanguage.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Клик по переключателю языка:', selector.className);
                
                // Закрываем все другие селекторы
                languageSelectors.forEach(s => {
                    if (s !== selector) {
                        s.classList.remove('active');
                    }
                });
                
                // Переключаем текущий селектор
                selector.classList.toggle('active');
                console.log('Состояние селектора после клика:', selector.classList.contains('active') ? 'открыт' : 'закрыт');
            });
        }
        
        // Language options click event
        languageOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Выбор языка');
                
                // Get selected language
                const lang = this.getAttribute('data-lang');
                console.log('Выбранный язык:', lang);
                
                // Update all language displays
                const allCurrentFlags = document.querySelectorAll('.current-language .flag-icon');
                const allCurrentTexts = document.querySelectorAll('.current-language span');
                
                // Update language in all selectors
                allCurrentFlags.forEach(flag => {
                    flag.src = this.querySelector('img').src;
                    flag.alt = lang.toUpperCase();
                });
                
                allCurrentTexts.forEach(text => {
                    text.textContent = lang.toUpperCase();
                });
                
                // Close dropdown
                languageSelectors.forEach(s => s.classList.remove('active'));
                
                // Update language active state
                document.querySelectorAll('.language-option').forEach(opt => {
                    opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
                });
                
                // Translate content
                translateContent(lang);
            });
        });
    });
    
    // Close language dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        languageSelectors.forEach(selector => {
            if (!selector.contains(e.target)) {
                selector.classList.remove('active');
            }
        });
    });
}

/**
 * Translate content based on data attributes
 * @param {string} lang - Language code (e.g., 'ru', 'uk')
 */
function translateContent(lang) {
    console.log('Перевод контента на язык:', lang);
    // Find all elements with translation data attributes
    const elementsToTranslate = document.querySelectorAll(`[data-${lang}]`);
    
    elementsToTranslate.forEach(element => {
        const translation = element.getAttribute(`data-${lang}`);
        if (translation) {
            element.innerHTML = translation;
        }
    });
}

/**
 * Initialize mobile menu/sidebar
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarClose = document.querySelector('.sidebar-close');
    
    if (menuToggle && sidebar) {
        // Отладочные сообщения
        console.log('Меню и сайдбар найдены');
        
        // Open sidebar
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Клик по меню');
            sidebar.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when sidebar is open
        });
        
        // Close sidebar
        if (sidebarClose) {
            sidebarClose.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Закрытие сайдбара');
                sidebar.classList.remove('active');
                document.body.style.overflow = ''; // Re-enable scrolling
            });
        }
        
        // Close sidebar when clicking outside
        document.addEventListener('click', function(e) {
            if (sidebar.classList.contains('active') && 
                !sidebar.contains(e.target) && 
                e.target !== menuToggle) {
                console.log('Клик вне сайдбара');
                sidebar.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Prevent closing sidebar when clicking inside it
        sidebar.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    } else {
        console.log('Элементы меню не найдены:', {
            menuToggle: !!menuToggle,
            sidebar: !!sidebar,
            sidebarClose: !!sidebarClose
        });
    }
}
