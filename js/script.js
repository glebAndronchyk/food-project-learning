'use strict';

window.addEventListener('DOMContentLoaded', () => {
    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent')
    const tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add("show", 'fade');
        tabsContent[i].classList.remove('hide');

        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', event => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //Timer
    const deadLine = "2022-12-30";

    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date());
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t / (1000 * 60 * 60) % 24));
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const seconds = Math.floor((t / 1000) % 60);

        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector);
        const timerDays = timer.querySelector('#days');
        const timerHours = timer.querySelector('#hours');
        const timerMinutes = timer.querySelector('#minutes');
        const timerSeconds = timer.querySelector('#seconds');

        const timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);

            timerDays.textContent = t.days < 10 ? `0${t.days}` : t.days;
            timerHours.textContent = t.hours < 10 ? `0${t.hours}` : t.hours;
            timerMinutes.textContent = t.minutes;
            timerSeconds.textContent = t.seconds;

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadLine);


    //Modal
    const modalTriggers = document.querySelectorAll("[data-modal]");
    const modal = document.querySelector('.modal');
    const modalCloseBtn = document.querySelector('[data-close]');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerID);
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show')
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

    modalTriggers.forEach((btn) => {
        btn.addEventListener('click', openModal);
    });

    modalCloseBtn.addEventListener('click', closeModal);

    const modalTimerID = setTimeout(openModal, 100000000000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {//-> -1 в старых браузерах может быть баг
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    //Using Classes for cards
    class MenuCard {
        constructor(src, alt, title, desc, price, parentSelector,...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.desc = desc;
            this.price = price;
            this.classes = classes;
            this.USD = 41;
            this.UAH = this.changeToUAH();
            this.parent = document.querySelector(parentSelector);
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length == 0) {
                element.classList.add('menu__item')
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                    <img src="${this.src}" alt="${this.alt}}">
                    <h3 class="menu__item-subtitle">Меню \"${this.title}\"</h3>
                    <div class="menu__item-descr">${this.desc}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.UAH}</span> грн/день</div>
                    </div>
            `;
            this.parent.append(element);
        }

        changeToUAH() {
            return this.price * this.USD;
        }
    }

    const dataForMenuCards = [{
        src: "img/tabs/vegy.jpg",
        alt: "vegy",
        title: "Фитнес",
        desc: "Меню \"Фитнес\" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        price: 5
    }, {
        src: "img/tabs/elite.jpg",
        alt: "elite",
        title: "Премиум",
        desc: "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        price: 10
    }, {
        src: "img/tabs/post.jpg",
        alt: "post",
        title: "Постное",
        desc: "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        price: 8
    }];


    dataForMenuCards.forEach(content => {
        new MenuCard(
            content.src,
            content.alt,
            content.title,
            content.desc,
            content.price,
            '.menu .container',
        ).render();
    });

    // Forms

    const forms = document.querySelectorAll('form');

    const messsage = {
      loading: 'Loading',
      success: 'Thank you',
      failure: 'Something went wrong...'
    };

    forms.forEach(form => postData(form));
    function postData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = messsage.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST','server.php');
            request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            });
            const json = JSON.stringify(object);

            request.send(json);
            request.addEventListener('load', () => {
               if (request.status === 200) {
                   console.log(request.response);
                   statusMessage.textContent = messsage.success;
                   form.reset();
                   setTimeout(() => {
                       statusMessage.remove();
                   }, 2000);
               } else {
                   statusMessage.textContent = messsage.failure;
               }
            });
        });
    }
});
