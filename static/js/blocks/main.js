// JavaScript РґР»СЏ СЃРµРєС†РёРё Hero

document.addEventListener('DOMContentLoaded', function() {
    // РРЅРёС†РёР°Р»РёР·Р°С†РёСЏ Р°РЅРёРјР°С†РёР№ РґР»СЏ РїР»Р°РІР°СЋС‰РёС… СЌР»РµРјРµРЅС‚РѕРІ
    initFloatingElements();
    
    // Р”РѕР±Р°РІР»РµРЅРёРµ СЌС„С„РµРєС‚Р° РїР°СЂР°Р»Р»Р°РєСЃР° Рє РїР»Р°РІР°СЋС‰РёРј СЌР»РµРјРµРЅС‚Р°Рј
    initParallaxEffect();
    
    // РђРЅРёРјР°С†РёСЏ РґР»СЏ СЃРєСЂРѕР»Р»Р° РІРЅРёР·
    initScrollIndicator();
    
    // РџРѕРґСЃРІРµС‚РєР° РёРєРѕРЅРѕРє С‚РµС…РЅРѕР»РѕРіРёР№ РїСЂРё РЅР°РІРµРґРµРЅРёРё
    initTechBadges();
    // Инициализируем эффект печати в приветствии
    initHeroTitleTyping();
    
    // РРЅРёС†РёР°Р»РёР·Р°С†РёСЏ С‚РµСЂРјРёРЅР°Р»Р°
    initTerminal();
});

// РРЅРёС†РёР°Р»РёР·Р°С†РёСЏ СЂР°РЅРґРѕРјРЅС‹С… Р°РЅРёРјР°С†РёР№ РґР»СЏ РїР»Р°РІР°СЋС‰РёС… СЌР»РµРјРµРЅС‚РѕРІ
function initFloatingElements() {
    const elements = document.querySelectorAll('.floating-element');
    
    elements.forEach(element => {
        // Р”РѕР±Р°РІР»РµРЅРёРµ СЃР»СѓС‡Р°Р№РЅРѕР№ РЅР°С‡Р°Р»СЊРЅРѕР№ Р·Р°РґРµСЂР¶РєРё РґР»СЏ Р±РѕР»РµРµ РµСЃС‚РµСЃС‚РІРµРЅРЅРѕРіРѕ РІРёРґР°
        const delay = Math.random() * 2;
        element.style.animationDelay = `${delay}s`;
    });
}

// Р”РѕР±Р°РІР»РµРЅРёРµ СЌС„С„РµРєС‚Р° РїР°СЂР°Р»Р»Р°РєСЃР° РїСЂРё РґРІРёР¶РµРЅРёРё РјС‹С€Рё
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const floatingElements = document.querySelectorAll('.floating-element');
    
    if (window.innerWidth > 768) { // РўРѕР»СЊРєРѕ РґР»СЏ Р±РѕР»СЊС€РёС… СЌРєСЂР°РЅРѕРІ
        hero.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            floatingElements.forEach((element, index) => {
                // РЎРѕР·РґР°РµРј СЂР°Р·РЅСѓСЋ С‡СѓРІСЃС‚РІРёС‚РµР»СЊРЅРѕСЃС‚СЊ РґР»СЏ СЂР°Р·РЅС‹С… СЌР»РµРјРµРЅС‚РѕРІ
                const speed = 1 + index * 0.5;
                const xOffset = (x - 0.5) * 20 * speed;
                const yOffset = (y - 0.5) * 20 * speed;
                
                // РџСЂРёРјРµРЅСЏРµРј СЃРјРµС‰РµРЅРёРµ СЃ РїРѕРјРѕС‰СЊСЋ CSS РїРµСЂРµРјРµРЅРЅС‹С…
                element.style.setProperty('--parallax-x', `${xOffset}px`);
                element.style.setProperty('--parallax-y', `${yOffset}px`);
                element.style.transform = `translate(var(--parallax-x), var(--parallax-y))`;
            });
        });
        
        // РЎР±СЂР°СЃС‹РІР°РµРј РїРѕР·РёС†РёСЋ РїСЂРё РІС‹С…РѕРґРµ РёР· СЃРµРєС†РёРё
        hero.addEventListener('mouseleave', () => {
            floatingElements.forEach(element => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }
}

// РРЅРёС†РёР°Р»РёР·Р°С†РёСЏ Р°РЅРёРјР°С†РёРё РґР»СЏ РёРЅРґРёРєР°С‚РѕСЂР° СЃРєСЂРѕР»Р»Р°
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            // РќР°С…РѕРґРёРј СЃР»РµРґСѓСЋС‰СѓСЋ СЃРµРєС†РёСЋ
            const nextSection = document.querySelector('#about');
            if (nextSection) {
                // РџР»Р°РІРЅРѕ СЃРєСЂРѕР»Р»РёРј Рє СЃР»РµРґСѓСЋС‰РµР№ СЃРµРєС†РёРё
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // РЎРєСЂС‹РІР°РµРј РёРЅРґРёРєР°С‚РѕСЂ РїСЂРё СЃРєСЂРѕР»Р»Рµ
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '0.7';
            }
        });
    }
}

// РРЅРёС†РёР°Р»РёР·Р°С†РёСЏ СЌС„С„РµРєС‚РѕРІ РґР»СЏ Р±РµР№РґР¶РµР№ С‚РµС…РЅРѕР»РѕРіРёР№
function initTechBadges() {
    const badges = document.querySelectorAll('.tech-badge');
    
    badges.forEach(badge => {
        // Р­С„С„РµРєС‚ РїСЂРё РЅР°РІРµРґРµРЅРёРё РјС‹С€Рё
        badge.addEventListener('mouseenter', () => {
            // РЎРѕР·РґР°РµРј СЌС„С„РµРєС‚ РїСѓР»СЊСЃР°С†РёРё РґР»СЏ РѕСЃС‚Р°Р»СЊРЅС‹С… Р±РµР№РґР¶РµР№
            badges.forEach(otherBadge => {
                if (otherBadge !== badge) {
                    otherBadge.style.transform = 'scale(0.95)';
                    otherBadge.style.opacity = '0.7';
                }
            });
        });
        
        badge.addEventListener('mouseleave', () => {
            // Р’РѕСЃСЃС‚Р°РЅР°РІР»РёРІР°РµРј СЃРѕСЃС‚РѕСЏРЅРёРµ РІСЃРµС… Р±РµР№РґР¶РµР№
            badges.forEach(otherBadge => {
                otherBadge.style.transform = '';
                otherBadge.style.opacity = '';
            });
        });
    });
}

// РРЅРёС†РёР°Р»РёР·Р°С†РёСЏ С‚РµСЂРјРёРЅР°Р»Р° СЃ СЌС„С„РµРєС‚РѕРј РїРµС‡Р°С‚Рё
function initTerminal() {
    const terminal = document.getElementById('hero-terminal');
    if (!terminal) return;

    const content = terminal.querySelector('.terminal-lines');
    if (!content) return;
    content.innerHTML = '';

    const terminalLines = [
        { number: 1, tag: 'hello', text: 'const intro = \"Привет! Я Платон — fullstack разработчик.\";', type: 'command' },
        { number: 2, tag: 'build', text: 'const value = \"Создаю продукты, которые растят бизнес.\";', type: 'note' },
        { number: 3, tag: 'xp', text: 'const projects = 50 + \" завершённых платформ\";', type: 'stack' },
        { number: 4, tag: 'stack', text: 'const stack = [\"Django\", \"DRF\", \"React\", \"PostgreSQL\", \"Celery\", \"Docker\"];', type: 'stack' },
        { number: 5, tag: 'contact', text: 'const contact = \"Telegram → t.me/+zuZmNbiYp5djYzJi\";', type: 'highlight', pause: 1600 }
    ];

    let currentLineIndex = 0;

    function schedule(callback, delay) {
        return window.setTimeout(callback, delay);
    }

    function typeLine(lineData) {
        const row = document.createElement('div');
        row.className = 'terminal-line' + (lineData.type ? ` ${lineData.type}` : '');

        const gutter = document.createElement('div');
        gutter.className = 'line-number';
        gutter.textContent = String(lineData.number || currentLineIndex).padStart(2, '0');

        const code = document.createElement('div');
        code.className = 'code-line' + (lineData.type ? ` ${lineData.type}` : '');

        if (lineData.tag) {
            const tag = document.createElement('span');
            tag.className = 'code-tag';
            tag.textContent = lineData.tag;
            code.appendChild(tag);
        }

        const textSpan = document.createElement('span');
        textSpan.className = 'code-text';
        code.appendChild(textSpan);

        row.appendChild(gutter);
        row.appendChild(code);
        content.appendChild(row);
        content.scrollTop = content.scrollHeight;
        row.classList.add('typing');

        let charIndex = 0;

        function typeNextChar() {
            if (charIndex < lineData.text.length) {
                textSpan.textContent += lineData.text.charAt(charIndex);
                charIndex += 1;
                schedule(typeNextChar, lineData.speed || 45 + Math.random() * 35);
            } else {
                row.classList.remove('typing');
                schedule(renderNextLine, lineData.pause || 900);
            }
        }

        schedule(typeNextChar, lineData.initialDelay || 0);
    }

    function renderNextLine() {
        if (currentLineIndex >= terminalLines.length) {
            schedule(function() {
                content.innerHTML = '';
                currentLineIndex = 0;
                renderNextLine();
            }, 3500);
            return;
        }

        const lineData = terminalLines[currentLineIndex];
        currentLineIndex += 1;
        typeLine(lineData);
    }

    schedule(renderNextLine, 400);
}

function initHeroTitleTyping() {
    const greetingEl = document.getElementById('hero-greeting');
    const roleEl = document.getElementById('hero-role');
    if (!greetingEl || !roleEl) return;

    let typingTimeouts = [];

    function clearTyping() {
        typingTimeouts.forEach(clearTimeout);
        typingTimeouts = [];
    }

    function scheduleTyping(callback, delay) {
        const timeoutId = window.setTimeout(callback, delay);
        typingTimeouts.push(timeoutId);
        return timeoutId;
    }

    function getCurrentLang() {
        const dataLang = document.documentElement.getAttribute('data-current-lang');
        if (dataLang) return dataLang;
        const htmlLang = document.documentElement.getAttribute('lang');
        if (htmlLang) return htmlLang.toLowerCase();
        const activeOption = document.querySelector('.language-option.active');
        if (activeOption && activeOption.getAttribute('data-lang')) {
            return activeOption.getAttribute('data-lang');
        }
        const current = document.querySelector('.current-language span');
        return current ? current.textContent.trim().toLowerCase() : 'ru';
    }

    function getText(element, lang) {
        const translation = element.getAttribute(`data-${lang}`);
        return translation || element.textContent.trim();
    }

    function typeValue(element, text, delay, onComplete) {
        let index = 0;
        element.textContent = '';
        element.classList.add('is-typing');

        function typeNext() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index += 1;
                scheduleTyping(typeNext, 55 + Math.random() * 35);
            } else {
                element.classList.remove('is-typing');
                if (typeof onComplete === 'function') {
                    onComplete();
                }
            }
        }

        scheduleTyping(typeNext, delay);
    }

    function startTyping(lang) {
        clearTyping();
        greetingEl.classList.remove('is-typing');
        roleEl.classList.remove('is-typing');
        greetingEl.textContent = '';
        roleEl.textContent = '';

        const greetingText = getText(greetingEl, lang);
        const roleText = getText(roleEl, lang);

        typeValue(greetingEl, greetingText, 200, function() {
            typeValue(roleEl, roleText, 120);
        });
    }

    startTyping(getCurrentLang());

    document.addEventListener('contentTranslated', function(event) {
        const lang = event && event.detail && event.detail.lang ? event.detail.lang : getCurrentLang();
        startTyping(lang);
    });
}

