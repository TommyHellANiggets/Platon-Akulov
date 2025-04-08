/**
 * Global JavaScript functions for the portfolio website
 */

// DOM Content Loaded - Initialize all event listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
});

/**
 * Translate content based on data attributes
 * @param {string} lang - Language code (e.g., 'ru', 'uk')
 */
function translateContent(lang) {
    // Find all elements with translation data attributes
    const elementsToTranslate = document.querySelectorAll(`[data-${lang}]`);
    
    elementsToTranslate.forEach(element => {
        const translation = element.getAttribute(`data-${lang}`);
        if (translation) {
            element.innerHTML = translation;
        }
    });
}
