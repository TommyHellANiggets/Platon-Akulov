/**
 * Header Component JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    initHeaderScroll();
    initActiveNavLink();
    initLanguageSelector();
    initMobileMenu();
});

/**
 * Add scroll effect to header
 */
function initHeaderScroll() {
    const header = document.querySelector('header');
    const headerContainer = header.querySelector('.container');
    
    // РЎРѕС…СЂР°РЅСЏРµРј РёСЃС…РѕРґРЅСѓСЋ РІС‹СЃРѕС‚Сѓ РєРѕРЅС‚РµР№РЅРµСЂР°
    const originalHeight = headerContainer.offsetHeight;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            // Scrolled down - make header more compact
            headerContainer.style.padding = '12px 24px';
            // Р¤РёРєСЃРёСЂСѓРµРј РІС‹СЃРѕС‚Сѓ, С‡С‚РѕР±С‹ РЅРµ Р±С‹Р»Рѕ СЃРєР°С‡РєРѕРІ
            headerContainer.style.height = originalHeight + 'px';
        } else {
            // At top - restore original padding
            headerContainer.style.padding = '16px 24px';
            // РЎР±СЂР°СЃС‹РІР°РµРј С„РёРєСЃРёСЂРѕРІР°РЅРЅСѓСЋ РІС‹СЃРѕС‚Сѓ
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
 * Initialize language selector dropdown
 */
function initLanguageSelector() {
    const languageSelectors = document.querySelectorAll('.language-selector, .sidebar-language');
    
    console.log('РРЅРёС†РёР°Р»РёР·Р°С†РёСЏ СЃРµР»РµРєС‚РѕСЂР° СЏР·С‹РєР°');
    console.log('РќР°Р№РґРµРЅРѕ СЃРµР»РµРєС‚РѕСЂРѕРІ СЏР·С‹РєР°:', languageSelectors.length);
    
    languageSelectors.forEach(selector => {
        const currentLanguage = selector.querySelector('.current-language');
        const languageDropdown = selector.querySelector('.language-dropdown');
        const languageOptions = selector.querySelectorAll('.language-option');
        
        console.log('РћРїС†РёРё СЃРµР»РµРєС‚РѕСЂР°:', selector.className, {
            hasCurrentLanguage: !!currentLanguage,
            hasDropdown: !!languageDropdown,
            optionsCount: languageOptions.length
        });
        
        if (currentLanguage) {
            currentLanguage.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('РљР»РёРє РїРѕ РїРµСЂРµРєР»СЋС‡Р°С‚РµР»СЋ СЏР·С‹РєР°:', selector.className);
                
                // Р—Р°РєСЂС‹РІР°РµРј РІСЃРµ РґСЂСѓРіРёРµ СЃРµР»РµРєС‚РѕСЂС‹
                languageSelectors.forEach(s => {
                    if (s !== selector) {
                        s.classList.remove('active');
                    }
                });
                
                // РџРµСЂРµРєР»СЋС‡Р°РµРј С‚РµРєСѓС‰РёР№ СЃРµР»РµРєС‚РѕСЂ
                selector.classList.toggle('active');
                console.log('РЎРѕСЃС‚РѕСЏРЅРёРµ СЃРµР»РµРєС‚РѕСЂР° РїРѕСЃР»Рµ РєР»РёРєР°:', selector.classList.contains('active') ? 'РѕС‚РєСЂС‹С‚' : 'Р·Р°РєСЂС‹С‚');
            });
        }
        
        // Language options click event
        languageOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Р’С‹Р±РѕСЂ СЏР·С‹РєР°');
                
                // Get selected language
                const lang = this.getAttribute('data-lang');
                console.log('Р’С‹Р±СЂР°РЅРЅС‹Р№ СЏР·С‹Рє:', lang);
                
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
 * @param {string} lang - Language code (e.g., 'ru', 'en')
 */
function translateContent(lang) {
    console.log('РџРµСЂРµРІРѕРґ РєРѕРЅС‚РµРЅС‚Р° РЅР° СЏР·С‹Рє:', lang);
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
        // РћС‚Р»Р°РґРѕС‡РЅС‹Рµ СЃРѕРѕР±С‰РµРЅРёСЏ
        console.log('РњРµРЅСЋ Рё СЃР°Р№РґР±Р°СЂ РЅР°Р№РґРµРЅС‹');
        
        // Open sidebar
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('РљР»РёРє РїРѕ РјРµРЅСЋ');
            sidebar.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when sidebar is open
        });
        
        // Close sidebar
        if (sidebarClose) {
            sidebarClose.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Р—Р°РєСЂС‹С‚РёРµ СЃР°Р№РґР±Р°СЂР°');
                sidebar.classList.remove('active');
                document.body.style.overflow = ''; // Re-enable scrolling
            });
        }
        
        // Close sidebar when clicking outside
        document.addEventListener('click', function(e) {
            if (sidebar.classList.contains('active') && 
                !sidebar.contains(e.target) && 
                e.target !== menuToggle) {
                console.log('РљР»РёРє РІРЅРµ СЃР°Р№РґР±Р°СЂР°');
                sidebar.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Prevent closing sidebar when clicking inside it
        sidebar.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    } else {
        console.log('Р­Р»РµРјРµРЅС‚С‹ РјРµРЅСЋ РЅРµ РЅР°Р№РґРµРЅС‹:', {
            menuToggle: !!menuToggle,
            sidebar: !!sidebar,
            sidebarClose: !!sidebarClose
        });
    }
}

function initSmoothScroll() {
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    const links = document.querySelectorAll('a[href^="#"], .logo');
    const sidebar = document.querySelector('.sidebar');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href) return;
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                if (sidebar) sidebar.classList.remove('active');
                document.body.style.overflow = '';
                return;
            }
            if (href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 10;
                    window.scrollTo({ top, behavior: 'smooth' });
                    if (sidebar) sidebar.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
}

// Р¤СѓРЅРєС†РёСЏ РїР»Р°РІРЅРѕР№ РїСЂРѕРєСЂСѓС‚РєРё РїРµСЂРµРјРµС‰РµРЅР° РІ global.js
