document.addEventListener('DOMContentLoaded', function() {
    const splash = document.getElementById('languageSplash');
    if (!splash) return;

    const panels = splash.querySelectorAll('.language-panel');
    const loader = document.getElementById('splashLoader');
    const stored = sessionStorage.getItem('langReady');
    const body = document.body;
    const html = document.documentElement;
    body.classList.add('with-splash');
    html.classList.add('with-splash');

    function hideSplash() {
        splash.classList.add('language-splash--loading');
        setTimeout(() => {
            splash.classList.add('language-splash--hide');
            body.classList.remove('with-splash');
            html.classList.remove('with-splash');
            body.classList.add('bg-loaded');
        }, 600);
    }

    if (stored) {
        if (typeof translateContent === 'function') {
            translateContent(stored);
        }
        hideSplash();
        return;
    }

    panels.forEach(panel => {
        panel.addEventListener('click', () => {
            const lang = panel.dataset.lang || 'ru';
            document.documentElement.setAttribute('lang', lang);
            sessionStorage.setItem('langReady', lang);
            if (typeof translateContent === 'function') {
                translateContent(lang);
            }
            splash.appendChild(loader);
            hideSplash();
        });
    });

    splash.addEventListener('transitionend', (event) => {
        if (event.propertyName === 'opacity' && splash.classList.contains('language-splash--hide')) {
            splash.style.display = 'none';
        }
    });
});
