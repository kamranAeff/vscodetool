/*
*** Developed by Kamran A-eff *** 
*/

declare global {
    interface HTMLLIElement {
        setTimer: (timer: Timer) => HTMLUListElement;
        children: HTMLCollection;
    }
}

HTMLUListElement.prototype.setTimer = function (timer: Timer): boolean {
    let that = this;
    let timerValue = timer.getValue();
    let valArray = timerValue.split('');
    that.setAttribute('data-timer-value', timerValue);
    let digitIndex = new Array(0, 1, 3, 4, 6, 7);

    digitIndex.forEach(function (index) {
        that.children[index].classList.remove('d-0', 'd-1', 'd-2', 'd-3', 'd-4', 'd-5', 'd-6', 'd-7', 'd-8', 'd-9');
        that.children[index].classList.add(`d-${valArray[index]}`);
    });
    let state = !timer.isStoped();

    if (state && !that.classList.contains('running'))
        that.classList.add('running');
    else if(!state)
        that.classList.remove('running');

    return state;
}

class Timer {
    hours: number;
    minutes: number;
    seconds: number;

    public setValue(value: string): void {
        if (/\d{2}:\d{2}:\d{2}/.test(value)) {
            let parts = value.split(':');
            this.hours = parseInt(parts[0]);
            this.minutes = parseInt(parts[1]);
            this.seconds = parseInt(parts[2]);
        }
    }
    public getValue(): string {
        return `${this.hours.toString2(2)}:${this.minutes.toString2(2)}:${this.seconds.toString2(2)}`;
    }
    public isStoped(): boolean {
        return this.hours <= 0 && this.minutes <= 0 && this.seconds <= 0;
    }

    public tickMinus(): Timer {
        if (this.seconds > 0) {
            this.seconds--;
        }
        else {
            if (this.minutes > 0) {
                this.minutes--;
                this.seconds = 59;
            }
            else {
                if (this.hours > 0) {
                    this.hours--;
                    this.minutes = 59;
                    this.seconds = 59;
                }
            }
        }
        return this;
    }
}
class Digit {
    public static createDigit(id: number): HTMLLIElement {
        let digit = document.createElement('li');
        digit.classList.add('digit');
        digit.setAttribute('id', `digit-${id}`);


        let ledTop = document.createElement('span');
        ledTop.classList.add('led-top');
        digit.appendChild(ledTop);

        let ledCenter = document.createElement('span');
        ledCenter.classList.add('led-center');
        digit.appendChild(ledCenter);

        let ledBottom = document.createElement('span');
        ledBottom.classList.add('led-bottom');
        digit.appendChild(ledBottom);

        let ledLeftTop = document.createElement('span');
        ledLeftTop.classList.add('led-left-top');
        digit.appendChild(ledLeftTop);

        let ledLeftBottom = document.createElement('span');
        ledLeftBottom.classList.add('led-left-bottom');
        digit.appendChild(ledLeftBottom);

        let ledRightTop = document.createElement('span');
        ledRightTop.classList.add('led-right-top');
        digit.appendChild(ledRightTop);

        let ledRightBottom = document.createElement('span');
        ledRightBottom.classList.add('led-right-bottom');
        digit.appendChild(ledRightBottom);

        return digit;
    }

    public static createSplitter(): HTMLSpanElement {
        let splitter = document.createElement('span');
        splitter.classList.add('splitter');
        return splitter;
    }

    public static createCountDown(id: string): HTMLUListElement {
        let countdown = document.createElement('ul');
        countdown.classList.add('timer-countdown');
        countdown.setAttribute('id', id);
        return countdown;
    }
}




$(document).ready(function () {

    let countDown = Digit.createCountDown('countdown');

    let digit1 = Digit.createDigit(1);
    countDown.appendChild(digit1);

    let digit2 = Digit.createDigit(2);
    countDown.appendChild(digit2);

    let sp1 = Digit.createSplitter();
    countDown.appendChild(sp1);

    let digit3 = Digit.createDigit(3);
    countDown.appendChild(digit3);

    let digit4 = Digit.createDigit(4);
    countDown.appendChild(digit4);

    let sp2 = Digit.createSplitter();
    countDown.appendChild(sp2);

    let digit5 = Digit.createDigit(5);
    countDown.appendChild(digit5);

    let digit6 = Digit.createDigit(6);
    countDown.appendChild(digit6);

    document.getElementById('monitor').appendChild(countDown);

    let timer = new Timer();

    timer.setValue('01:00:10');
    let timerState = countDown.setTimer(timer);

    if (timerState) {
        let pid = setInterval(function () {
            timer.tickMinus();
            timerState = countDown.setTimer(timer);
            if (!timerState) {
                clearInterval(pid);
                return;
            }
        }, 1000);
    }


    console.log(timer);
});
interface Number {
    toString2: (digitLenth: number) => string;
}

Number.prototype.toString2 = function (digitLenth: number): string {
    let repeatCount = 0;
    if (digitLenth > this.toString().length)
        repeatCount = digitLenth - this.toString().length;

    return `${'0'.repeat(repeatCount)}${this}`;
}
