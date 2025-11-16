document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const submitBtn = contactForm.querySelector('.submit-btn');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
        }

        setTimeout(() => {
            contactForm.reset();
            resetFloatingLabels(contactForm);
            showNotification('Сообщение отправлено! Вернусь в течение пары часов.', 'success');
            if (submitBtn) {
                submitBtn.innerHTML = '<span>Отправить</span><i class="fas fa-arrow-right"></i>';
                submitBtn.disabled = false;
            }
        }, 1500);
    });

    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(field => {
        if (field.value.trim() !== '') {
            field.classList.add('has-content');
            field.parentElement.classList.add('focused');
        }

        field.addEventListener('focus', () => {
            field.parentElement.classList.add('focused');
        });

        field.addEventListener('blur', () => {
            if (field.value.trim() === '') {
                field.parentElement.classList.remove('focused');
                field.classList.remove('has-content');
            } else {
                field.classList.add('has-content');
            }
        });

        field.addEventListener('input', () => {
            if (field.value.trim() !== '') {
                field.classList.add('has-content');
            } else {
                field.classList.remove('has-content');
                field.parentElement.classList.remove('focused');
            }
        });
    });
}

function resetFloatingLabels(form) {
    form.querySelectorAll('.form-field').forEach(wrapper => {
        wrapper.classList.remove('focused');
        const input = wrapper.querySelector('input, textarea');
        if (input) {
            input.classList.remove('has-content');
        }
    });
}

function showNotification(message, type = 'success') {
    const container = document.getElementById('notification-container');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    let icon = '<i class="fas fa-info-circle"></i>';
    if (type === 'success') icon = '<i class="fas fa-check-circle"></i>';
    if (type === 'error') icon = '<i class="fas fa-exclamation-circle"></i>';
    if (type === 'warning') icon = '<i class="fas fa-exclamation-triangle"></i>';

    notification.innerHTML = `
        ${icon}
        <p>${message}</p>
        <button class="close-btn"><i class="fas fa-times"></i></button>
    `;

    container.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    const closeBtn = notification.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });

    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}
