/**
 * Р“Р»Р°РІРЅС‹Р№ JavaScript С„Р°Р№Р»
 */

/**
 * РРЅРёС†РёР°Р»РёР·РёСЂСѓРµС‚ Р°РЅРёРјР°С†РёСЋ СЃРёСЃС‚РµРјС‹ С‡С‘СЂРЅС‹С… С‚СЂСѓР± СЃРѕ СЃРІРµС‚СЏС‰РµР№СЃСЏ Р»РёРЅРёРµР№
 */
function initPipes() {
    // РџРѕР»СѓС‡Р°РµРј РІСЃРµ СЃРІРµС‚РѕРІС‹Рµ СЌР»РµРјРµРЅС‚С‹
    const lightElements = document.querySelectorAll('.pipe-light');
    const indicators = document.querySelectorAll('.pipe-indicator');
    
    // РќР°СЃС‚СЂР°РёРІР°РµРј РјР°СЂС€СЂСѓС‚С‹ РґРІРёР¶РµРЅРёСЏ СЃРІРµС‚Р°
    setupLightRoutes(lightElements);
    
    // Р—Р°РїСѓСЃРєР°РµРј Р°РЅРёРјР°С†РёСЋ СЃРІРµС‚Р°
    animateLights(lightElements, indicators);
    
    // Р”РѕР±Р°РІР»СЏРµРј СЌС„С„РµРєС‚ РїСЂРё РЅР°РІРµРґРµРЅРёРё РЅР° С‚СЂСѓР±С‹
    setupPipeHoverEffects();
    
    // Р”РѕР±Р°РІР»СЏРµРј СЌС„С„РµРєС‚ РїСЂРё РїСЂРѕРєСЂСѓС‚РєРµ СЃС‚СЂР°РЅРёС†С‹
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = scrollY / maxScroll;
        
        // РР·РјРµРЅСЏРµРј РёРЅС‚РµРЅСЃРёРІРЅРѕСЃС‚СЊ Р°РєС‚РёРІРЅС‹С… РёРЅРґРёРєР°С‚РѕСЂРѕРІ РїСЂРё РїСЂРѕРєСЂСѓС‚РєРµ
        const activeIndicators = document.querySelectorAll('.pipe-indicator.active');
        activeIndicators.forEach(indicator => {
            const brightness = 1 + (scrollPercent * 0.5);
            indicator.style.filter = `brightness(${brightness})`;
        });
    });
}

/**
 * РќР°СЃС‚СЂР°РёРІР°РµС‚ РјР°СЂС€СЂСѓС‚С‹ РґРІРёР¶РµРЅРёСЏ СЃРІРµС‚Р° РїРѕ С‚СЂСѓР±Р°Рј
 * @param {NodeList} lightElements - Р­Р»РµРјРµРЅС‚С‹ СЃРІРµС‚Р° РґР»СЏ С‚СЂСѓР±
 */
function setupLightRoutes(lightElements) {
    // РћРїСЂРµРґРµР»СЏРµРј ID РґР»СЏ РєР°Р¶РґРѕРіРѕ СЃРІРµС‚РѕРІРѕРіРѕ СЌР»РµРјРµРЅС‚Р°
    lightElements.forEach((light, index) => {
        light.dataset.lightId = index;
        
        // РќР°СЃС‚СЂР°РёРІР°РµРј РЅР°С‡Р°Р»СЊРЅС‹Рµ РїРѕР·РёС†РёРё СЃРІРµС‚Р°
        if (light.classList.contains('horizontal')) {
            light.style.setProperty('--light-position', '0px');
        } else {
            light.style.setProperty('--light-position', '0px');
        }
    });
}

/**
 * РђРЅРёРјРёСЂСѓРµС‚ РґРІРёР¶РµРЅРёРµ СЃРІРµС‚Р° РїРѕ С‚СЂСѓР±Р°Рј Рё Р°РєС‚РёРІРёСЂСѓРµС‚ РёРЅРґРёРєР°С‚РѕСЂС‹
 * @param {NodeList} lightElements - Р­Р»РµРјРµРЅС‚С‹ СЃРІРµС‚Р° РґР»СЏ С‚СЂСѓР±
 * @param {NodeList} indicators - РРЅРґРёРєР°С‚РѕСЂС‹ РЅР° С‚СЂСѓР±Р°С…
 */
function animateLights(lightElements, indicators) {
    // РџСЂРµРѕР±СЂР°Р·СѓРµРј NodeList РІ РјР°СЃСЃРёРІС‹ РґР»СЏ СѓРґРѕР±СЃС‚РІР°
    const lights = Array.from(lightElements);
    const allIndicators = Array.from(indicators);
    
    // РЎРѕР·РґР°РµРј РѕР±СЉРµРєС‚ РґР»СЏ С…СЂР°РЅРµРЅРёСЏ С‚РµРєСѓС‰РµР№ РїРѕР·РёС†РёРё СЃРІРµС‚Р°
    const lightPositions = {};
    
    // РћРїСЂРµРґРµР»СЏРµРј РјР°РєСЃРёРјР°Р»СЊРЅС‹Рµ РґРёСЃС‚Р°РЅС†РёРё РґР»СЏ РєР°Р¶РґРѕР№ С‚СЂСѓР±С‹
    const pipeMaxDistances = {
        'left-vertical': 600,    // РњР°РєСЃРёРјР°Р»СЊРЅР°СЏ РІС‹СЃРѕС‚Р° Р»РµРІРѕР№ РІРµСЂС‚РёРєР°Р»СЊРЅРѕР№ С‚СЂСѓР±С‹
        'right-vertical': 500,   // РњР°РєСЃРёРјР°Р»СЊРЅР°СЏ РІС‹СЃРѕС‚Р° РїСЂР°РІРѕР№ РІРµСЂС‚РёРєР°Р»СЊРЅРѕР№ С‚СЂСѓР±С‹
        'top-horizontal': 800,   // РњР°РєСЃРёРјР°Р»СЊРЅР°СЏ С€РёСЂРёРЅР° РІРµСЂС…РЅРµР№ РіРѕСЂРёР·РѕРЅС‚Р°Р»СЊРЅРѕР№ С‚СЂСѓР±С‹
        'bottom-horizontal': 800 // РњР°РєСЃРёРјР°Р»СЊРЅР°СЏ С€РёСЂРёРЅР° РЅРёР¶РЅРµР№ РіРѕСЂРёР·РѕРЅС‚Р°Р»СЊРЅРѕР№ С‚СЂСѓР±С‹
    };
    
    // РћРїСЂРµРґРµР»СЏРµРј С‚РёРїС‹ РґР»СЏ СЃРІРµС‚РѕРІС‹С… СЌР»РµРјРµРЅС‚РѕРІ
    const lightTypes = [
        'left-vertical',
        'right-vertical',
        'top-horizontal',
        'bottom-horizontal'
    ];
    
    // РќР°СЃС‚СЂР°РёРІР°РµРј С‚РёРїС‹ РґР»СЏ РєР°Р¶РґРѕРіРѕ СЃРІРµС‚РѕРІРѕРіРѕ СЌР»РµРјРµРЅС‚Р°
    lights.forEach((light, index) => {
        if (index < lightTypes.length) {
            light.dataset.lightType = lightTypes[index];
            lightPositions[lightTypes[index]] = {
                position: 0,
                direction: 1, // 1 - РІРїРµСЂРµРґ, -1 - РЅР°Р·Р°Рґ
                speed: 2 + Math.random() * 2 // Р Р°Р·РЅР°СЏ СЃРєРѕСЂРѕСЃС‚СЊ РґР»СЏ РєР°Р¶РґРѕРіРѕ СЃРІРµС‚Р°
            };
        }
    });
    
    // Р—Р°РїСѓСЃРєР°РµРј Р°РЅРёРјР°С†РёСЋ РґРІРёР¶РµРЅРёСЏ СЃРІРµС‚Р°
    function animationLoop() {
        // РћР±РЅРѕРІР»СЏРµРј РїРѕР·РёС†РёРё СЃРІРµС‚РѕРІ
        lights.forEach(light => {
            const lightType = light.dataset.lightType;
            if (!lightType || !lightPositions[lightType]) return;
            
            const lightData = lightPositions[lightType];
            const maxDistance = pipeMaxDistances[lightType];
            
            // Р’С‹С‡РёСЃР»СЏРµРј РЅРѕРІСѓСЋ РїРѕР·РёС†РёСЋ
            let newPosition = lightData.position + (lightData.direction * lightData.speed);
            
            // РџСЂРѕРІРµСЂСЏРµРј РґРѕСЃС‚РёР¶РµРЅРёРµ РіСЂР°РЅРёС† Рё РјРµРЅСЏРµРј РЅР°РїСЂР°РІР»РµРЅРёРµ
            if (newPosition >= maxDistance) {
                newPosition = maxDistance;
                lightData.direction = -1;
            } else if (newPosition <= 0) {
                newPosition = 0;
                lightData.direction = 1;
            }
            
            // РћР±РЅРѕРІР»СЏРµРј РїРѕР·РёС†РёСЋ СЃРІРµС‚Р°
            lightData.position = newPosition;
            
            // РџСЂРёРјРµРЅСЏРµРј РЅРѕРІСѓСЋ РїРѕР·РёС†РёСЋ Рє СЃРІРµС‚РѕРІРѕРјСѓ СЌР»РµРјРµРЅС‚Сѓ
            if (light.classList.contains('horizontal')) {
                light.style.setProperty('--light-position', `${newPosition}px`);
            } else {
                light.style.setProperty('--light-position', `${newPosition}px`);
            }
            
            // РџСЂРѕРІРµСЂСЏРµРј РїРµСЂРµСЃРµС‡РµРЅРёРµ СЃ РёРЅРґРёРєР°С‚РѕСЂР°РјРё
            checkIndicatorIntersection(light, allIndicators, lightType, newPosition);
        });
        
        // Р—Р°РїСЂР°С€РёРІР°РµРј СЃР»РµРґСѓСЋС‰РёР№ РєР°РґСЂ Р°РЅРёРјР°С†РёРё
        requestAnimationFrame(animationLoop);
    }
    
    // Р—Р°РїСѓСЃРєР°РµРј Р°РЅРёРјР°С†РёРѕРЅРЅС‹Р№ С†РёРєР»
    animationLoop();
}

/**
 * РџСЂРѕРІРµСЂСЏРµС‚ РїРµСЂРµСЃРµС‡РµРЅРёРµ СЃРІРµС‚Р° СЃ РёРЅРґРёРєР°С‚РѕСЂР°РјРё Рё Р°РєС‚РёРІРёСЂСѓРµС‚ РёС…
 * @param {HTMLElement} light - РЎРІРµС‚РѕРІРѕР№ СЌР»РµРјРµРЅС‚
 * @param {Array} indicators - Р’СЃРµ РёРЅРґРёРєР°С‚РѕСЂС‹
 * @param {string} lightType - РўРёРї СЃРІРµС‚РѕРІРѕРіРѕ СЌР»РµРјРµРЅС‚Р°
 * @param {number} position - РўРµРєСѓС‰Р°СЏ РїРѕР·РёС†РёСЏ СЃРІРµС‚Р°
 */
function checkIndicatorIntersection(light, indicators, lightType, position) {
    // РћРїСЂРµРґРµР»СЏРµРј СЂРѕРґРёС‚РµР»СЊСЃРєРёР№ РєРѕРЅС‚РµР№РЅРµСЂ РґР»СЏ С‚РµРєСѓС‰РµРіРѕ СЃРІРµС‚Р°
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
    
    // Р’С‹Р±РёСЂР°РµРј С‚РѕР»СЊРєРѕ РёРЅРґРёРєР°С‚РѕСЂС‹, РєРѕС‚РѕСЂС‹Рµ РїСЂРёРЅР°РґР»РµР¶Р°С‚ СЃРѕРѕС‚РІРµС‚СЃС‚РІСѓСЋС‰РµР№ СЃРёСЃС‚РµРјРµ С‚СЂСѓР±
    const relevantIndicators = indicators.filter(indicator => {
        return indicator.closest(parentSystem) !== null;
    });
    
    // РџСЂРѕРІРµСЂСЏРµРј РєР°Р¶РґС‹Р№ РёРЅРґРёРєР°С‚РѕСЂ РЅР° РїРµСЂРµСЃРµС‡РµРЅРёРµ СЃРѕ СЃРІРµС‚РѕРј
    relevantIndicators.forEach(indicator => {
        const indicatorRect = indicator.getBoundingClientRect();
        const lightRect = light.getBoundingClientRect();
        
        // РћРїСЂРµРґРµР»СЏРµРј, РїРµСЂРµСЃРµРєР°РµС‚СЃСЏ Р»Рё СЃРІРµС‚ СЃ РёРЅРґРёРєР°С‚РѕСЂРѕРј
        let isIntersecting = false;
        
        if (light.classList.contains('horizontal')) {
            // Р”Р»СЏ РіРѕСЂРёР·РѕРЅС‚Р°Р»СЊРЅС‹С… С‚СЂСѓР± РїСЂРѕРІРµСЂСЏРµРј РїРѕ X
            const indicatorX = indicatorRect.left + indicatorRect.width / 2;
            const lightLeft = lightRect.left;
            const lightRight = lightRect.right;
            
            isIntersecting = indicatorX >= lightLeft && indicatorX <= lightRight;
        } else {
            // Р”Р»СЏ РІРµСЂС‚РёРєР°Р»СЊРЅС‹С… С‚СЂСѓР± РїСЂРѕРІРµСЂСЏРµРј РїРѕ Y
            const indicatorY = indicatorRect.top + indicatorRect.height / 2;
            const lightTop = lightRect.top;
            const lightBottom = lightRect.bottom;
            
            isIntersecting = indicatorY >= lightTop && indicatorY <= lightBottom;
        }
        
        // РђРєС‚РёРІРёСЂСѓРµРј РёР»Рё РґРµР°РєС‚РёРІРёСЂСѓРµРј РёРЅРґРёРєР°С‚РѕСЂ
        if (isIntersecting) {
            // РђРєС‚РёРІРёСЂСѓРµРј РёРЅРґРёРєР°С‚РѕСЂ
            indicator.classList.add('active');
            
            // РЎРѕР·РґР°РµРј СЃР»СѓС‡Р°Р№РЅРѕРµ РІСЂРµРјСЏ РґР»СЏ РґРµР°РєС‚РёРІР°С†РёРё
            const deactivationTime = 200 + Math.random() * 300;
            
            // Р”РµР°РєС‚РёРІРёСЂСѓРµРј РёРЅРґРёРєР°С‚РѕСЂ С‡РµСЂРµР· СЃР»СѓС‡Р°Р№РЅРѕРµ РІСЂРµРјСЏ
            setTimeout(() => {
                indicator.classList.remove('active');
            }, deactivationTime);
        }
    });
}

/**
 * Р”РѕР±Р°РІР»СЏРµС‚ СЌС„С„РµРєС‚С‹ РїСЂРё РЅР°РІРµРґРµРЅРёРё РЅР° С‚СЂСѓР±С‹
 */
function setupPipeHoverEffects() {
    const pipes = document.querySelectorAll('.pipe');
    const indicators = document.querySelectorAll('.pipe-indicator');
    
    pipes.forEach(pipe => {
        pipe.addEventListener('mouseenter', function() {
            // РќР°С…РѕРґРёРј РІСЃРµ РёРЅРґРёРєР°С‚РѕСЂС‹, РєРѕС‚РѕСЂС‹Рµ РїСЂРёРЅР°РґР»РµР¶Р°С‚ СЌС‚РѕР№ С‚СЂСѓР±Рµ
            const pipeIndicators = Array.from(indicators).filter(indicator => {
                return pipe.contains(indicator);
            });
            
            // РђРєС‚РёРІРёСЂСѓРµРј РІСЃРµ РёРЅРґРёРєР°С‚РѕСЂС‹ РїСЂРё РЅР°РІРµРґРµРЅРёРё РЅР° С‚СЂСѓР±Сѓ
            pipeIndicators.forEach(indicator => {
                indicator.classList.add('active');
            });
        });
        
        pipe.addEventListener('mouseleave', function() {
            // РќР°С…РѕРґРёРј РІСЃРµ РёРЅРґРёРєР°С‚РѕСЂС‹, РєРѕС‚РѕСЂС‹Рµ РїСЂРёРЅР°РґР»РµР¶Р°С‚ СЌС‚РѕР№ С‚СЂСѓР±Рµ
            const pipeIndicators = Array.from(indicators).filter(indicator => {
                return pipe.contains(indicator);
            });
            
            // Р”РµР°РєС‚РёРІРёСЂСѓРµРј РІСЃРµ РёРЅРґРёРєР°С‚РѕСЂС‹ РїСЂРё СѓС…РѕРґРµ СЃ С‚СЂСѓР±С‹
            pipeIndicators.forEach(indicator => {
                // Р—Р°РґРµСЂР¶РєР°, С‡С‚РѕР±С‹ СЌС„С„РµРєС‚ Р±С‹Р» РїР»Р°РІРЅРµРµ
                setTimeout(() => {
                    indicator.classList.remove('active');
                }, 100 + Math.random() * 200);
            });
        });
    });
}

// Р”РѕР±Р°РІР»СЏСЋ РєРѕРґ РґР»СЏ РѕР±СЂР°Р±РѕС‚РєРё СЃР°Р№РґР±Р°СЂР° РІ РЅР°С‡Р°Р»Рѕ С„Р°Р№Р»Р°

// РћР±СЂР°Р±РѕС‚РєР° СЃР°Р№РґР±Р°СЂР°
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarClose = document.querySelector('.sidebar-close');
    
    // РЎРѕР·РґР°РµРј РЅРѕРІСѓСЋ РєРЅРѕРїРєСѓ Р·Р°РєСЂС‹С‚РёСЏ, РµСЃР»Рё РµС‘ РЅРµС‚ РёР»Рё РѕРЅР° СЃРєСЂС‹С‚Р°
    function createCloseButton() {
        // РЈРґР°Р»СЏРµРј СЃСѓС‰РµСЃС‚РІСѓСЋС‰СѓСЋ РєРЅРѕРїРєСѓ Р·Р°РєСЂС‹С‚РёСЏ, РµСЃР»Рё РѕРЅР° РµСЃС‚СЊ
        const existingCloseBtn = document.querySelector('.sidebar-close-btn');
        if (existingCloseBtn) {
            existingCloseBtn.remove();
        }
        
        // РЎРѕР·РґР°РµРј РЅРѕРІСѓСЋ РєРЅРѕРїРєСѓ Р·Р°РєСЂС‹С‚РёСЏ
        const newCloseBtn = document.createElement('button');
        newCloseBtn.className = 'sidebar-close-btn';
        newCloseBtn.setAttribute('aria-label', 'Р—Р°РєСЂС‹С‚СЊ РјРµРЅСЋ');
        newCloseBtn.innerHTML = '<i class="fas fa-times"></i>';
        
        // Р”РѕР±Р°РІР»СЏРµРј РєРЅРѕРїРєСѓ РІ РЅР°С‡Р°Р»Рѕ СЃР°Р№РґР±Р°СЂР°
        if (sidebar) {
            sidebar.insertBefore(newCloseBtn, sidebar.firstChild);
            
            // Р”РѕР±Р°РІР»СЏРµРј РѕР±СЂР°Р±РѕС‚С‡РёРє СЃРѕР±С‹С‚РёР№ РґР»СЏ Р·Р°РєСЂС‹С‚РёСЏ СЃР°Р№РґР±Р°СЂР°
            newCloseBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeSidebar();
            });
            
            // РџСЂРёРЅСѓРґРёС‚РµР»СЊРЅРѕ РґРµР»Р°РµРј РєРЅРѕРїРєСѓ РІРёРґРёРјРѕР№
            setTimeout(() => {
                newCloseBtn.style.display = 'block';
                newCloseBtn.style.opacity = '0.8';
            }, 100);
        }
        
        return newCloseBtn;
    }
    
    // Р¤СѓРЅРєС†РёСЏ РґР»СЏ Р·Р°РєСЂС‹С‚РёСЏ СЃР°Р№РґР±Р°СЂР°
    function closeSidebar() {
        if (sidebar) {
            sidebar.classList.remove('active');
            document.body.style.overflow = ''; // Р’РѕСЃСЃС‚Р°РЅР°РІР»РёРІР°РµРј РїСЂРѕРєСЂСѓС‚РєСѓ
        }
    }
    
    // РЈР±РµРґРёРјСЃСЏ, С‡С‚Рѕ СЃР°Р№РґР±Р°СЂ СЃРєСЂС‹С‚ РїСЂРё Р·Р°РіСЂСѓР·РєРµ СЃС‚СЂР°РЅРёС†С‹
    if (sidebar) {
        sidebar.classList.remove('active');
        createCloseButton(); // РЎРѕР·РґР°РµРј РєРЅРѕРїРєСѓ Р·Р°РєСЂС‹С‚РёСЏ
    }
    
    // РџРѕРєР°Р·С‹РІР°РµРј СЃР°Р№РґР±Р°СЂ С‚РѕР»СЊРєРѕ РїСЂРё РєР»РёРєРµ РЅР° РєРЅРѕРїРєСѓ РјРµРЅСЋ
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault(); // РџСЂРµРґРѕС‚РІСЂР°С‰Р°РµРј РґРµР№СЃС‚РІРёРµ РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ
            e.stopPropagation(); // РћСЃС‚Р°РЅР°РІР»РёРІР°РµРј РІСЃРїР»С‹С‚РёРµ СЃРѕР±С‹С‚РёСЏ
            if (sidebar) {
                sidebar.classList.add('active');
                document.body.style.overflow = 'hidden'; // Р‘Р»РѕРєРёСЂСѓРµРј РїСЂРѕРєСЂСѓС‚РєСѓ СЃС‚СЂР°РЅРёС†С‹ РїСЂРё РѕС‚РєСЂС‹С‚РѕРј СЃР°Р№РґР±Р°СЂРµ
            }
        });
    }
    
    // Р—Р°РєСЂС‹РІР°РµРј СЃР°Р№РґР±Р°СЂ РїСЂРё РєР»РёРєРµ РЅР° СЃСЃС‹Р»РєРё РІРЅСѓС‚СЂРё РЅРµРіРѕ
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            closeSidebar();
        });
    });
    
    // Р—Р°РєСЂС‹РІР°РµРј СЃР°Р№РґР±Р°СЂ РїСЂРё РєР»РёРєРµ РІРЅРµ РµРіРѕ РѕР±Р»Р°СЃС‚Рё
    document.addEventListener('click', function(e) {
        if (sidebar && sidebar.classList.contains('active')) {
            // РџСЂРѕРІРµСЂСЏРµРј, С‡С‚Рѕ РєР»РёРє Р±С‹Р» РЅРµ РїРѕ СЃР°Р№РґР±Р°СЂСѓ Рё РЅРµ РїРѕ РєРЅРѕРїРєРµ РѕС‚РєСЂС‹С‚РёСЏ РјРµРЅСЋ
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                closeSidebar();
            }
        }
    });
    
    // РџСЂРµРґРѕС‚РІСЂР°С‰Р°РµРј Р·Р°РєСЂС‹С‚РёРµ РїСЂРё РєР»РёРєРµ РІРЅСѓС‚СЂРё СЃР°Р№РґР±Р°СЂР° (РєСЂРѕРјРµ СЃСЃС‹Р»РѕРє)
    if (sidebar) {
        sidebar.addEventListener('click', function(e) {
            // РџСЂРѕРІРµСЂСЏРµРј, С‡С‚Рѕ РєР»РёРє РЅРµ Р±С‹Р» РїРѕ СЃСЃС‹Р»РєРµ
            if (!e.target.closest('a')) {
                e.stopPropagation(); // РџСЂРµРґРѕС‚РІСЂР°С‰Р°РµРј РІСЃРїР»С‹С‚РёРµ СЃРѕР±С‹С‚РёСЏ
            }
        });
    }
    
    // Р—Р°РєСЂС‹РІР°РµРј СЃР°Р№РґР±Р°СЂ РїСЂРё СЃРІР°Р№РїРµ РІР»РµРІРѕ РЅР° РјРѕР±РёР»СЊРЅС‹С… СѓСЃС‚СЂРѕР№СЃС‚РІР°С…
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
        
        // РћР±СЂР°Р±РѕС‚РєР° СЃРІР°Р№РїР°
        function handleSwipe() {
            // Р•СЃР»Рё СЃРІР°Р№Рї РІР»РµРІРѕ Р±РѕР»РµРµ 50 РїРёРєСЃРµР»РµР№, Р·Р°РєСЂС‹РІР°РµРј СЃР°Р№РґР±Р°СЂ
            if (touchStartX - touchEndX > 50) {
                closeSidebar();
            }
        }
    }
    
    // Р”РѕР±Р°РІР»СЏРµРј РѕР±СЂР°Р±РѕС‚С‡РёРє РєР»Р°РІРёС€Рё Escape РґР»СЏ Р·Р°РєСЂС‹С‚РёСЏ СЃР°Р№РґР±Р°СЂР°
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

    // РРЅРёС†РёР°Р»РёР·РёСЂРѕРІР°С‚СЊ Р±РµРіСѓС‰СѓСЋ СЃС‚СЂРѕРєСѓ СЃ СЂР°Р·Р»РёС‡РЅС‹РјРё С‚РµС…РЅРѕР»РѕРіРёСЏРјРё
    initMarquee();

    // Р”РѕР±Р°РІР»РµРЅРёРµ СЌС„С„РµРєС‚Р° СЃРІРµС‡РµРЅРёСЏ СЃРєСЂРѕР»Р»Р±Р°СЂР° РїСЂРё Р°РєС‚РёРІРЅРѕРј СЃРєСЂРѕР»Р»РёРЅРіРµ
    let scrollTimer;
    window.addEventListener('scroll', function() {
        // Р”РѕР±Р°РІР»СЏРµРј РєР»Р°СЃСЃ РїСЂРё СЃРєСЂРѕР»Р»Рµ
        document.body.classList.add('scrolling');
        
        // РћС‡РёС‰Р°РµРј РїСЂРµРґС‹РґСѓС‰РёР№ С‚Р°Р№РјРµСЂ
        clearTimeout(scrollTimer);
        
        // РЈСЃС‚Р°РЅР°РІР»РёРІР°РµРј РЅРѕРІС‹Р№ С‚Р°Р№РјРµСЂ РґР»СЏ СѓРґР°Р»РµРЅРёСЏ РєР»Р°СЃСЃР°
        scrollTimer = setTimeout(function() {
            document.body.classList.remove('scrolling');
        }, 1000); // РљР»Р°СЃСЃ СѓРґР°Р»СЏРµС‚СЃСЏ С‡РµСЂРµР· 1 СЃРµРєСѓРЅРґСѓ РїРѕСЃР»Рµ РѕРєРѕРЅС‡Р°РЅРёСЏ СЃРєСЂРѕР»Р»Р°
    });
});

/**
 * РРЅРёС†РёР°Р»РёР·Р°С†РёСЏ Р±РµРіСѓС‰РµР№ СЃС‚СЂРѕРєРё СЃ РЅР°СЃС‚СЂРѕР№РєРѕР№ РґСѓР±Р»РёСЂРѕРІР°РЅРёСЏ СЌР»РµРјРµРЅС‚РѕРІ
 */
function initMarquee() {
    const marqueeContent = document.querySelector('.marquee-content');
    
    if (!marqueeContent) return;
    
    // Р”РѕР±Р°РІР»РµРЅРёРµ РѕР±СЂР°Р±РѕС‚С‡РёРєР° СЃРѕР±С‹С‚РёСЏ РёР·РјРµРЅРµРЅРёСЏ СЏР·С‹РєР°
    document.addEventListener('languageChanged', function(e) {
        updateMarqueeLanguage(e.detail.lang);
    });
    
    // РџРµСЂРµРјРµС€Р°С‚СЊ СЌР»РµРјРµРЅС‚С‹ РґР»СЏ Р±РѕР»РµРµ СЃР»СѓС‡Р°Р№РЅРѕРіРѕ РїРѕСЂСЏРґРєР°
    shuffleMarqueeItems();
    
    // Р”РѕР±Р°РІР»СЏРµРј РїР»Р°РІРЅРѕСЃС‚СЊ РїСЂРё РЅР°РІРµРґРµРЅРёРё
    marqueeContent.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    marqueeContent.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
}

/**
 * РџРµСЂРµРјРµС€РёРІР°РµС‚ СЌР»РµРјРµРЅС‚С‹ Р±РµРіСѓС‰РµР№ СЃС‚СЂРѕРєРё РґР»СЏ СЂР°Р·РЅРѕРѕР±СЂР°Р·РёСЏ
 */
function shuffleMarqueeItems() {
    const marqueeContent = document.querySelector('.marquee-content');
    const items = Array.from(document.querySelectorAll('.marquee-item'));
    
    if (!marqueeContent || items.length === 0) return;
    
    // РСЃРєР»СЋС‡Р°РµРј РґСѓР±Р»РёСЂСѓСЋС‰РёРµ СЌР»РµРјРµРЅС‚С‹ (РїРѕСЃР»РµРґРЅРёРµ 4 РІ РЅР°С€РµРј СЃР»СѓС‡Р°Рµ)
    const uniqueItems = items.slice(0, items.length - 4);
    const duplicateItems = items.slice(items.length - 4);
    
    // РџРµСЂРµРјРµС€РёРІР°РµРј С‚РѕР»СЊРєРѕ СѓРЅРёРєР°Р»СЊРЅС‹Рµ СЌР»РµРјРµРЅС‚С‹
    const shuffledItems = uniqueItems.sort(() => Math.random() - 0.5);
    
    // РћС‡РёС‰Р°РµРј РєРѕРЅС‚РµР№РЅРµСЂ
    marqueeContent.innerHTML = '';
    
    // Р”РѕР±Р°РІР»СЏРµРј РїРµСЂРµРјРµС€Р°РЅРЅС‹Рµ СЌР»РµРјРµРЅС‚С‹
    shuffledItems.forEach(item => {
        marqueeContent.appendChild(item.cloneNode(true));
    });
    
    // Р”РѕР±Р°РІР»СЏРµРј РґСѓР±Р»РёСЂСѓСЋС‰РёРµ СЌР»РµРјРµРЅС‚С‹ РґР»СЏ РЅРµРїСЂРµСЂС‹РІРЅРѕСЃС‚Рё
    duplicateItems.forEach(item => {
        marqueeContent.appendChild(item.cloneNode(true));
    });
}

/**
 * РћР±РЅРѕРІР»СЏРµС‚ СЏР·С‹Рє СЌР»РµРјРµРЅС‚РѕРІ Р±РµРіСѓС‰РµР№ СЃС‚СЂРѕРєРё
 * @param {string} lang - РљРѕРґ СЏР·С‹РєР° ('ru' РёР»Рё 'en')
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
 * РРЅРёС†РёР°Р»РёР·Р°С†РёСЏ Р°РЅРёРјР°С†РёРё С‚РµС‡РµРЅРёСЏ РІРѕРґС‹ РїРѕ С‚СЂСѓР±Р°Рј
 */
function initWaterFlow() {
    const pipeSystem = document.querySelector('.pipe-system');
    if (!pipeSystem) return;
    
    // РџРѕР»СѓС‡Р°РµРј РІСЃРµ РёРЅРґРёРєР°С‚РѕСЂС‹
    const indicators = document.querySelectorAll('.pipe-indicator');
    
    // РћРїСЂРµРґРµР»СЏРµРј С‚РѕС‡РєРё РјР°СЂС€СЂСѓС‚Р° РґР»СЏ РєР°РїРµР»СЊ РІРѕРґС‹
    const waterFlowRoutes = [
        // РџСѓС‚СЊ 1: С†РµРЅС‚СЂР°Р»СЊРЅС‹Р№ РїСѓС‚СЊ РѕС‚ РёСЃС‚РѕС‡РЅРёРєР° Рє СЃС‚РѕРєСѓ
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
        // РџСѓС‚СЊ 2: РїСЂР°РІС‹Р№ РїСѓС‚СЊ
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
        // РџСѓС‚СЊ 3: Р»РµРІРѕРµ РѕС‚РІРµС‚РІР»РµРЅРёРµ
        [
            { x: 'calc(40% - 108px)', y: '350px', type: 'vertical', delay: 0 },
            { x: '70px', y: '396px', type: 'horizontal', delay: 1000 },
            { x: '120px', y: '396px', type: 'horizontal', delay: 1500 },
            { x: '170px', y: '396px', type: 'horizontal', delay: 2000 },
            { x: 'calc(40% - 108px)', y: '400px', type: 'vertical', delay: 2500 }
        ],
        // РџСѓС‚СЊ 4: РїСЂР°РІРѕРµ Р±РѕРєРѕРІРѕРµ РѕС‚РІРµС‚РІР»РµРЅРёРµ
        [
            { x: 'right: 70px', y: '266px', type: 'horizontal', delay: 0 },
            { x: 'right: 120px', y: '266px', type: 'horizontal', delay: 500 },
            { x: 'right: 170px', y: '266px', type: 'horizontal', delay: 1000 },
            { x: 'right: 28px', y: '210px', type: 'vertical', delay: 1500 }
        ]
    ];
    
    // РЎРѕР·РґР°РµРј Рё Р·Р°РїСѓСЃРєР°РµРј Р°РЅРёРјР°С†РёРё РєР°РїРµР»СЊ РІРѕРґС‹
    waterFlowRoutes.forEach(route => {
        animateWaterDrops(route, pipeSystem);
    });
    
    // Р”РѕР±Р°РІР»СЏРµРј РѕР±СЂР°Р±РѕС‚С‡РёРє СЃРѕР±С‹С‚РёР№ РґР»СЏ РїСЂРѕРєСЂСѓС‚РєРё СЃС‚СЂР°РЅРёС†С‹
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        // РЈРјРµРЅСЊС€Р°РµРј СЏСЂРєРѕСЃС‚СЊ/РІРёРґРёРјРѕСЃС‚СЊ СЃРёСЃС‚РµРјС‹ С‚СЂСѓР± РїСЂРё РїСЂРѕРєСЂСѓС‚РєРµ
        pipeSystem.style.opacity = 1 - Math.min(scrollY / 500, 0.7);
        
        // РћС‚РєР»СЋС‡Р°РµРј РёРЅРґРёРєР°С‚РѕСЂС‹ РїСЂРё РїСЂРѕРєСЂСѓС‚РєРµ
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Р’РѕСЃСЃС‚Р°РЅР°РІР»РёРІР°РµРј Р°РЅРёРјР°С†РёСЋ С‡РµСЂРµР· 1 СЃРµРєСѓРЅРґСѓ РїРѕСЃР»Рµ РѕРєРѕРЅС‡Р°РЅРёСЏ РїСЂРѕРєСЂСѓС‚РєРё
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            pipeSystem.style.opacity = 1;
        }, 1000);
    });
}

/**
 * РђРЅРёРјР°С†РёСЏ РєР°РїРµР»СЊ РІРѕРґС‹ РїРѕ СѓРєР°Р·Р°РЅРЅРѕРјСѓ РјР°СЂС€СЂСѓС‚Сѓ
 * @param {Array} route - РјР°СЂС€СЂСѓС‚ СЃ С‚РѕС‡РєР°РјРё РїСѓС‚Рё
 * @param {HTMLElement} container - РєРѕРЅС‚РµР№РЅРµСЂ РґР»СЏ РґРѕР±Р°РІР»РµРЅРёСЏ РєР°РїРµР»СЊ
 */
function animateWaterDrops(route, container) {
    // РЈСЃС‚Р°РЅР°РІР»РёРІР°РµРј РёРЅС‚РµСЂРІР°Р» РґР»СЏ РїРµСЂРёРѕРґРёС‡РµСЃРєРѕРіРѕ Р·Р°РїСѓСЃРєР° РєР°РїРµР»СЊ
    const startInterval = 5000 + Math.random() * 2000; // РРЅС‚РµСЂРІР°Р» Р·Р°РїСѓСЃРєР° РєР°РїРµР»СЊ
    
    // Р¤СѓРЅРєС†РёСЏ РґР»СЏ СЃРѕР·РґР°РЅРёСЏ Рё Р°РЅРёРјР°С†РёРё РєР°РїР»Рё
    function createDrop() {
        // РЎРѕР·РґР°РµРј РєР°РїР»СЋ РІРѕРґС‹
        const drop = document.createElement('div');
        drop.className = `water-drop ${route[0].type}`;
        container.appendChild(drop);
        
        // РЈСЃС‚Р°РЅР°РІР»РёРІР°РµРј РЅР°С‡Р°Р»СЊРЅРѕРµ РїРѕР»РѕР¶РµРЅРёРµ
        const start = route[0];
        if (start.x.includes('right')) {
            drop.style.right = start.x.replace('right: ', '');
        } else {
            drop.style.left = start.x;
        }
        drop.style.top = start.y;
        
        // Р¤СѓРЅРєС†РёСЏ РґР»СЏ Р°РЅРёРјР°С†РёРё РєР°РїР»Рё РїРѕ РјР°СЂС€СЂСѓС‚Сѓ
        function animateAlongRoute(index = 0) {
            if (index >= route.length) {
                drop.remove(); // СѓРґР°Р»СЏРµРј РєР°РїР»СЋ, РєРѕРіРґР° РѕРЅР° РґРѕСЃС‚РёРіР»Р° РєРѕРЅС†Р° РјР°СЂС€СЂСѓС‚Р°
                return;
            }
            
            const point = route[index];
            const nextIndex = index + 1;
            
            // РђРєС‚РёРІРёСЂСѓРµРј РёРЅРґРёРєР°С‚РѕСЂ РЅР° С‚РµРєСѓС‰РµР№ С‚РѕС‡РєРµ
            activateNearestIndicator(point);
            
            // Р—Р°РґР°РµРј СЃР»РµРґСѓСЋС‰СѓСЋ РїРѕР·РёС†РёСЋ РґР»СЏ РєР°РїР»Рё
            setTimeout(() => {
                // РћР±РЅРѕРІР»СЏРµРј РєР»Р°СЃСЃ С‚РёРїР° РєР°РїР»Рё (РіРѕСЂРёР·РѕРЅС‚Р°Р»СЊРЅР°СЏ/РІРµСЂС‚РёРєР°Р»СЊРЅР°СЏ)
                if (nextIndex < route.length && route[nextIndex].type !== point.type) {
                    drop.className = `water-drop ${route[nextIndex].type}`;
                }
                
                // РђРЅРёРјРёСЂСѓРµРј РґРІРёР¶РµРЅРёРµ Рє СЃР»РµРґСѓСЋС‰РµР№ С‚РѕС‡РєРµ
                if (nextIndex < route.length) {
                    const next = route[nextIndex];
                    
                    // РЈСЃС‚Р°РЅР°РІР»РёРІР°РµРј РЅРѕРІСѓСЋ РїРѕР·РёС†РёСЋ
                    if (next.x.includes('right')) {
                        drop.style.right = next.x.replace('right: ', '');
                        drop.style.left = 'auto';
                    } else {
                        drop.style.left = next.x;
                        drop.style.right = 'auto';
                    }
                    drop.style.top = next.y;
                    
                    // Р”Р»РёС‚РµР»СЊРЅРѕСЃС‚СЊ РїРµСЂРµС…РѕРґР° РјРµР¶РґСѓ С‚РѕС‡РєР°РјРё
                    const transitionDuration = 800;
                    drop.style.transition = `left ${transitionDuration}ms ease, right ${transitionDuration}ms ease, top ${transitionDuration}ms ease`;
                    
                    // РџРµСЂРµС…РѕРґРёРј Рє СЃР»РµРґСѓСЋС‰РµР№ С‚РѕС‡РєРµ РјР°СЂС€СЂСѓС‚Р°
                    setTimeout(() => animateAlongRoute(nextIndex), transitionDuration);
                } else {
                    // РљР°РїР»СЏ РґРѕСЃС‚РёРіР»Р° РєРѕРЅС†Р° РјР°СЂС€СЂСѓС‚Р°
                    setTimeout(() => drop.remove(), 500);
                }
            }, point.delay);
        }
        
        // Р—Р°РїСѓСЃРєР°РµРј Р°РЅРёРјР°С†РёСЋ РєР°РїР»Рё
        animateAlongRoute();
    }
    
    // РџРµСЂРёРѕРґРёС‡РµСЃРєРё Р·Р°РїСѓСЃРєР°РµРј РЅРѕРІС‹Рµ РєР°РїР»Рё
    setInterval(createDrop, startInterval);
    
    // Р—Р°РїСѓСЃРєР°РµРј РїРµСЂРІСѓСЋ РєР°РїР»СЋ СЃСЂР°Р·Сѓ
    setTimeout(createDrop, 1000);
}

/**
 * РђРєС‚РёРІРёСЂСѓРµС‚ Р±Р»РёР¶Р°Р№С€РёР№ РёРЅРґРёРєР°С‚РѕСЂ Рє СѓРєР°Р·Р°РЅРЅРѕР№ С‚РѕС‡РєРµ
 * @param {Object} point - С‚РѕС‡РєР° РјР°СЂС€СЂСѓС‚Р°
 */
function activateNearestIndicator(point) {
    // РќР°С…РѕРґРёРј РІСЃРµ РёРЅРґРёРєР°С‚РѕСЂС‹
    const indicators = document.querySelectorAll('.pipe-indicator');
    
    // РџСЂРµРѕР±СЂР°Р·СѓРµРј РєРѕРѕСЂРґРёРЅР°С‚С‹ С‚РѕС‡РєРё
    let x, y;
    if (point.x.includes('right')) {
        const rightValue = point.x.replace('right: ', '');
        x = window.innerWidth - parseInt(rightValue);
    } else if (point.x.includes('calc')) {
        // РЈРїСЂРѕС‰РµРЅРЅС‹Р№ РїР°СЂСЃРёРЅРі calc РІС‹СЂР°Р¶РµРЅРёР№ 
        // (РІ СЂРµР°Р»СЊРЅС‹С… РїСЂРѕРµРєС‚Р°С… Р»СѓС‡С€Рµ РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ Р±РѕР»РµРµ РЅР°РґРµР¶РЅС‹Р№ РјРµС‚РѕРґ)
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
    
    // РќР°С…РѕРґРёРј Р±Р»РёР¶Р°Р№С€РёР№ РёРЅРґРёРєР°С‚РѕСЂ
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
    
    // РђРєС‚РёРІРёСЂСѓРµРј Р±Р»РёР¶Р°Р№С€РёР№ РёРЅРґРёРєР°С‚РѕСЂ
    if (closestIndicator) {
        closestIndicator.classList.add('active');
        
        // Р”РµР°РєС‚РёРІРёСЂСѓРµРј С‡РµСЂРµР· РЅРµРєРѕС‚РѕСЂРѕРµ РІСЂРµРјСЏ
        setTimeout(() => {
            closestIndicator.classList.remove('active');
        }, 2000);
    }
}

/**
 * РРЅРёС†РёР°Р»РёР·РёСЂСѓРµС‚ Р°РЅРёРјР°С†РёСЋ СЃРёСЃС‚РµРјС‹ С†РІРµС‚РЅС‹С… Р»РёРЅРёР№
 */
function initTubeSystem() {
    // Р’РµСЃСЊ Р±Р»РѕРє С„СѓРЅРєС†РёРё СѓРґР°Р»РµРЅ
}

/**
 * РЎРѕР·РґР°РµС‚ С‡Р°СЃС‚РёС†С‹ РґР»СЏ РІСЃРµС… Р»РёРЅРёР№ РІ СЃРёСЃС‚РµРјРµ
 */
function createParticlesForTubes() {
    // Р’РµСЃСЊ Р±Р»РѕРє С„СѓРЅРєС†РёРё СѓРґР°Р»РµРЅ
}

/**
 * РЎРѕР·РґР°РµС‚ РѕРґРЅСѓ С‡Р°СЃС‚РёС†Сѓ РґР»СЏ СѓРєР°Р·Р°РЅРЅРѕР№ Р»РёРЅРёРё
 */
function createParticle(tube, type) {
    // Р’РµСЃСЊ Р±Р»РѕРє С„СѓРЅРєС†РёРё СѓРґР°Р»РµРЅ
}

/**
 * РђРЅРёРјРёСЂСѓРµС‚ РіРѕСЂРёР·РѕРЅС‚Р°Р»СЊРЅСѓСЋ С‡Р°СЃС‚РёС†Сѓ
 */
function animateHorizontalParticle(particle, tube, duration, direction) {
    // Р’РµСЃСЊ Р±Р»РѕРє С„СѓРЅРєС†РёРё СѓРґР°Р»РµРЅ
}

/**
 * РђРЅРёРјРёСЂСѓРµС‚ РІРµСЂС‚РёРєР°Р»СЊРЅСѓСЋ С‡Р°СЃС‚РёС†Сѓ
 */
function animateVerticalParticle(particle, tube, duration, direction) {
    // Р’РµСЃСЊ Р±Р»РѕРє С„СѓРЅРєС†РёРё СѓРґР°Р»РµРЅ
}

/**
 * РђРЅРёРјРёСЂСѓРµС‚ РґРёР°РіРѕРЅР°Р»СЊРЅСѓСЋ С‡Р°СЃС‚РёС†Сѓ
 */
function animateDiagonalParticle(particle, tube, duration, direction, type) {
    // Р’РµСЃСЊ Р±Р»РѕРє С„СѓРЅРєС†РёРё СѓРґР°Р»РµРЅ
}

/**
 * Р”РѕР±Р°РІР»СЏРµС‚ РёРЅС‚РµСЂР°РєС‚РёРІРЅРѕСЃС‚СЊ РїСЂРё РЅР°РІРµРґРµРЅРёРё РЅР° СЌР»РµРјРµРЅС‚С‹ СЃРёСЃС‚РµРјС‹ Р»РёРЅРёР№
 */
function addTubeInteractivity() {
    // Р’РµСЃСЊ Р±Р»РѕРє С„СѓРЅРєС†РёРё СѓРґР°Р»РµРЅ
}

/**
 * РЎРѕР·РґР°РµС‚ СЌС„С„РµРєС‚ СЂР°Р·Р»РµС‚Р°СЋС‰РёС…СЃСЏ С‡Р°СЃС‚РёС† РїСЂРё РєР»РёРєРµ РЅР° РїРµСЂРµСЃРµС‡РµРЅРёРё
 */
function createExplosionParticles(element, count) {
    // Р’РµСЃСЊ Р±Р»РѕРє С„СѓРЅРєС†РёРё СѓРґР°Р»РµРЅ
}

/**
 * РџРµСЂРёРѕРґРёС‡РµСЃРєРё СЃРѕР·РґР°РµС‚ РЅРѕРІС‹Рµ С‡Р°СЃС‚РёС†С‹ РІ СЃР»СѓС‡Р°Р№РЅС‹С… РјРµСЃС‚Р°С…
 */
function createRandomParticles() {
    // Р’РµСЃСЊ Р±Р»РѕРє С„СѓРЅРєС†РёРё СѓРґР°Р»РµРЅ
}

/**
 * Р”РѕР±Р°РІР»СЏРµС‚ СЌС„С„РµРєС‚ РїСЂРё РїСЂРѕРєСЂСѓС‚РєРµ СЃС‚СЂР°РЅРёС†С‹
 */
function addScrollEffect() {
    // Р’РµСЃСЊ Р±Р»РѕРє С„СѓРЅРєС†РёРё СѓРґР°Р»РµРЅ
}
