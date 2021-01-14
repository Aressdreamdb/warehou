class Banner {

    constructor(element, imgArr) {

        this.ele = element;
        this.arr = imgArr;

        this.oUl = this.ele.querySelector('ul');
        this.oOl = this.ele.querySelector('ol');

        this.imgLength = this.arr.length;

        this.index = 1;

        this.time;

        this.bool = true;

        this.liWidth;

        this.oOlLis;
    }

    init(){
        this.setLi();
        this.autoLoop();
        this.mouseInOut();
        this.setActive();
        this.hid();
    }


    setLi() {
        let ulLiStr = '';

        let olLiStr = '';

        this.arr.forEach((v, k) => {

            if (k === 0) {
                olLiStr += `<li class="active" name="olli" num="${k}"></li>`;
            } else {
                olLiStr += `<li name="olli" num="${k}"></li>`;
            }

            ulLiStr += `<li><img src="./img/${v.path}"></li>`;

        })

        this.oUl.innerHTML = ulLiStr;
        this.oOl.innerHTML = olLiStr;

        this.oOlLis = this.oOl.querySelectorAll('li');

        const cloneFirst = this.oUl.querySelectorAll('li')[0].cloneNode(true);
        const cloneLast = this.oUl.querySelectorAll('li')[this.imgLength - 1].cloneNode(true);

        this.oUl.appendChild(cloneFirst);

        this.oUl.insertBefore(cloneLast, this.oUl.querySelectorAll('li')[0]);

        this.liWidth = cloneFirst.offsetWidth;

        this.oUl.style.width = this.liWidth * (this.imgLength + 2) + 'px';

        this.oUl.style.left = - this.index * this.liWidth + 'px';
    }


    autoLoop() {

        this.time = setInterval(() => {

            this.index++;

            this.setLiStyle();

            move(this.oUl, { left: -this.index * this.liWidth }, () => {

                this.loopEnd();
            });

        }, 3000);
    }

    loopEnd() {
        console.log(this);

        if (this.index === this.imgLength + 1) {
            this.index = 1;
        } else if (this.index === 0) {
            this.index = this.imgLength;
        }


        this.oUl.style.left = `-${this.index * this.liWidth}px`;

        this.bool = true;
    }


    setLiStyle() {

        this.oOlLis.forEach((v, k) => {

            myRemoveClass(v, 'active');
        })

        if (this.index === this.imgLength + 1) {

            this.oOlLis[0].className += ' active';
        } else if (this.index === 0) {

            this.oOlLis[this.imgLength - 1].className += ' active';

        } else {

            this.oOlLis[this.index - 1].className += ' active';
        }
    }


    mouseInOut() {

        this.ele.addEventListener('mouseenter', () => {
            clearInterval(this.time);
        })

        this.ele.addEventListener('mouseleave', () => {
            this.autoLoop();
        })
    }


    setActive() {
        this.ele.addEventListener('click', e => {

            if (e.target.getAttribute('name') === 'l') {

                if (!this.bool) return;
                this.bool = false;

                this.index--;

                this.setLiStyle()

                move(this.oUl, { left: -this.index * this.liWidth }, this.loopEnd.bind(this));

            } else if (e.target.getAttribute('name') === 'r') {
                if (!this.bool) return;
                this.bool = false;

                this.index++;

                this.setLiStyle()

                move(this.oUl, { left: -this.index * this.liWidth }, this.loopEnd.bind(this))

            } else if (e.target.getAttribute('name') === 'olli') {

                if (!this.bool) return;
                this.bool = false;

                this.index = e.target.getAttribute('num') - 0 + 1;

                this.setLiStyle()

                move(this.oUl, { left: -this.index * this.liWidth }, this.loopEnd.bind(this))
            }
        })
    }


    hid() {

        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {

                clearInterval(this.time);
            } else if (document.visibilityState === 'visible') {

                this.autoLoop();
            }
        })
    }
}
