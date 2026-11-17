// ==============================
// МОБИЛЬНОЕ МЕНЮ
// ==============================

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');

menuToggle.addEventListener('click', function () {

    navigation.classList.toggle('active');
    menuToggle.classList.toggle('active');

    const isOpen = navigation.classList.contains('active');

    menuToggle.setAttribute('aria-expanded', isOpen);

});

// Закрытие меню после выбора раздела

const navLinks = document.querySelectorAll('.navigation a');

navLinks.forEach(link => {

    link.addEventListener('click', function () {

        navigation.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');

    });

});


// ==============================
// ПЛАВНАЯ ПРОКРУТКА
// ==============================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener('click', function (event) {

        const targetId = this.getAttribute('href');

        const targetElement = document.querySelector(targetId);

        if (targetElement) {

            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        }

    });

});


// ==============================
// АНИМАЦИЯ ПОЯВЛЕНИЯ БЛОКОВ
// ==============================

const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver(function (entries) {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add('visible');

            observer.unobserve(entry.target);

        }

    });

}, observerOptions);


const revealElements = document.querySelectorAll('.reveal');

revealElements.forEach(element => {

    observer.observe(element);

});


// ==============================
// ФОРМА ОБРАТНОЙ СВЯЗИ
// ==============================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const toast = document.getElementById('toast');

const phoneInput = document.getElementById('phone');


// Проверка номера телефона

phoneInput.addEventListener('input', function () {

    let value = this.value;

    // Разрешаем вводить цифры, пробелы и символы телефона
    value = value.replace(/[^\d+\-()\s]/g, '');

    this.value = value;

});


// Обработка отправки формы

contactForm.addEventListener('submit', function (event) {

    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = phoneInput.value.trim();
    const service = document.getElementById('service').value;

    // Проверка имени
    if (name.length < 2) {

        showFormMessage('Введите корректное имя.', true);

        return;

    }

    // Проверка номера телефона
    const phoneDigits = phone.replace(/\D/g, '');

    if (phoneDigits.length < 10 || phoneDigits.length > 15) {

        showFormMessage('Введите корректный номер телефона.', true);

        return;

    }

    // Проверка выбора услуги
    if (service === '') {

        showFormMessage('Пожалуйста, выберите услугу.', true);

        return;

    }

    // Демонстрационная отправка формы.
    // Данные не передаются на сервер и не сохраняются в базе данных.

    showFormMessage(
        'Спасибо, ' + name + '! Ваша заявка успешно обработана в демонстрационном режиме.',
        false
    );

    // Показываем уведомление
    toast.classList.add('show');

    // Очищаем форму
    contactForm.reset();

    // Убираем уведомление через 4 секунды
    setTimeout(function () {

        toast.classList.remove('show');

    }, 4000);

});


// ==============================
// ВЫВОД СООБЩЕНИЙ ФОРМЫ
// ==============================

function showFormMessage(message, isError) {

    formMessage.textContent = message;

    formMessage.style.display = 'block';

    if (isError) {

        formMessage.classList.add('error');

    } else {

        formMessage.classList.remove('error');

    }

}