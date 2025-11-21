document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('leadForm');
    const statusEl = document.getElementById('leadStatus');
    const submitBtn = form ? form.querySelector('.lead-button') : null;

    if (!form || !submitBtn || !statusEl) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        submitBtn.disabled = true;
        statusEl.textContent = 'Отправляю запрос...';

        setTimeout(() => {
            form.reset();
            submitBtn.disabled = false;
            statusEl.textContent = 'Спасибо! Ответ пришлю в течение рабочего дня.';
            setTimeout(() => (statusEl.textContent = ''), 4000);
        }, 1200);
    });
});
