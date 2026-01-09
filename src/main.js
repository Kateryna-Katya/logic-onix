document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация иконок Lucide
    lucide.createIcons();

    // 2. Хедер: эффект при скролле
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '12px 0';
            header.style.background = 'rgba(10, 10, 12, 0.95)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = 'rgba(10, 10, 12, 0.8)';
        }
    });

    // 3. Мобильное меню
    const menuOpenBtn = document.getElementById('menu-open');
    const menuCloseBtn = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');

    const toggleMenu = () => {
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    };

    menuOpenBtn.addEventListener('click', toggleMenu);
    menuCloseBtn.addEventListener('click', toggleMenu);

    // Закрытие меню при клике на ссылку
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // 4. Форма контактов и Капча
    const aiForm = document.getElementById('ai-form');
    const successMsg = document.getElementById('success-msg');
    const captchaLabel = document.getElementById('captcha-label');
    const captchaInput = document.getElementById('captcha-input');
    const phoneInput = document.getElementById('phone');

    if (aiForm) {
        // Генерация капчи
        let num1 = Math.floor(Math.random() * 7) + 1;
        let num2 = Math.floor(Math.random() * 5) + 1;
        let captchaResult = num1 + num2;
        captchaLabel.textContent = `Сколько будет ${num1} + ${num2}?`;

        // Валидация телефона (только цифры)
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });

        // Отправка формы
        aiForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (parseInt(captchaInput.value) !== captchaResult) {
                captchaInput.style.borderColor = '#ff4d4d';
                alert('Неверный ответ капчи!');
                return;
            }

            const btn = aiForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Обработка...';
            btn.disabled = true;

            // Имитация AJAX
            setTimeout(() => {
                aiForm.style.opacity = '0';
                setTimeout(() => {
                    aiForm.style.display = 'none';
                    successMsg.style.display = 'block';
                }, 300);
            }, 1500);
        });
    }

    // 5. Cookie Popup
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieAccept = document.getElementById('cookie-accept');

    if (cookiePopup) {
        // Проверяем, было ли уже принято соглашение
        const isCookieAccepted = localStorage.getItem('logicOnixCookies');

        if (!isCookieAccepted) {
            setTimeout(() => {
                cookiePopup.classList.add('show');
            }, 2000);
        }

        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('logicOnixCookies', 'true');
            cookiePopup.classList.remove('show');
        });
    }

    // 6. Плавный скролл для всех внутренних ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});