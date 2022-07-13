class Component {
    constructor(selector) {
        this.$el = document.querySelector(selector)               // элемент который двигаем

        this.$arrowLeft = document.querySelector('#left') // кнопка
    }

    // функция slideEl вызывается по клику
    slideEl() {
        // Если элемент уже сдвинут, то возвращаем его в начальное положение и удаляем класс активности
        if (this.$el.classList.contains('active')) {

            this.$el.style.left = '0%';
            this.$el.classList.remove('active');

        // Иначе
        } else {
            // с нулевого левого положения, двигается на  ...%
            let box = this.$el;

            box.style.left = '87%';

            this.$el.classList.toggle('active');
        }


    }
    init() {
        this.$arrowLeft.addEventListener('click', (e) => {
            if (e) {
                this.slideEl();
            }
        });
    }
}

class Box extends Component {
    constructor(options) {
        super(options.selector);
        console.log(this.$el)
        this.$el.style.width = this.$el.style.height = options.size + 'px';
        this.$el.style.background = options.color;
    }

}

const box1 = new Box({
    selector: '#box1',
    size: 100,
    color: 'red',
})



class UlList {

    constructor() {
        this.$ulListAll = document.querySelectorAll('.ul-list')
        this.$ulElemAll = document.querySelectorAll('.ul-elem')
        this.$ulTitleBtn = document.querySelectorAll('h3')
        this.$ulHideBtn = document.querySelectorAll('.hide')
        this.$ulMoreBtn = document.querySelectorAll('.show-more')
    }
    afterLoadDoc () {
        this.$ulListAll.forEach((elem) => {
            let liElem = elem.querySelectorAll('li');
            let lengthArr = liElem.length;
            liElem.forEach((ulElem, index) => {
                if (index >= 5) {
                    ulElem.classList.add('li-fade-now')
                    if(index === 5) {
                    ulElem.insertAdjacentHTML('beforebegin', '<a class="show-more"><b>Показать ещё</b></a>')
                    }
                    if (index === lengthArr - 1){
                        ulElem.insertAdjacentHTML('afterend', '<a class="hide display-none"><b>Скрыть</b></a>')
                    }
                }
            })
            this.clickOnTheMore(elem);
        })
        this.clickOnTheTitle();

    }
    clickOnTheTitle() {
        this.$ulTitleBtn.forEach((ulTitle) => {
            ulTitle.addEventListener('click', (evnt) => {
                let element = evnt.target.nextElementSibling;
                element.classList.toggle('ul-active')
                this.slideDownList(element)
            })
        })
    }
    clickOnTheMore(elem) {

        let showMore = elem.querySelector('.show-more')
        let hide = elem.querySelector('.hide')
        console.log(hide.classList.contains('display-none'));
        if (hide.classList.contains('display-none')) {
            showMore.addEventListener('click', (e) => {
                showMore.classList.add('ul-sublist')
                console.log('if showmore')
                hide.classList.remove('display-none')
                elem.style.maxHeight = elem.scrollHeight = 'px';
            })
        } else if (showMore.classList.contains('ul-sublist')) {
            hide.addEventListener('click', (e) => {
                showMore.classList.remove('ul-sublist')
                hide.classList.add('display-none')
            })
        }
    }
    slideDownList(element) {
        console.log(element.style.maxHeight);
        if (element.style.maxHeight == 0) {
            element.style.maxHeight = element.scrollHeight + 'px';
        } else {
            element.style.maxHeight = null;
        }

    }
}


const ulList = new UlList()

box1.init();

ulList.afterLoadDoc();