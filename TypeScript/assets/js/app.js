HTMLUListElement.prototype.setTimer = function (timer) {
    var that = this;
    var timerValue = timer.getValue();
    var valArray = timerValue.split('');
    that.setAttribute('data-timer-value', timerValue);
    var digitIndex = new Array(0, 1, 3, 4, 6, 7);
    digitIndex.forEach(function (index) {
        that.children[index].classList.remove('d-0', 'd-1', 'd-2', 'd-3', 'd-4', 'd-5', 'd-6', 'd-7', 'd-8', 'd-9');
        that.children[index].classList.add("d-" + valArray[index]);
    });
    var state = !timer.isStoped();
    if (state && !that.classList.contains('running'))
        that.classList.add('running');
    else if (!state)
        that.classList.remove('running');
    return state;
};
var Timer = (function () {
    function Timer() {
    }
    Timer.prototype.setValue = function (value) {
        if (/\d{2}:\d{2}:\d{2}/.test(value)) {
            var parts = value.split(':');
            this.hours = parseInt(parts[0]);
            this.minutes = parseInt(parts[1]);
            this.seconds = parseInt(parts[2]);
        }
    };
    Timer.prototype.getValue = function () {
        return this.hours.toString2(2) + ":" + this.minutes.toString2(2) + ":" + this.seconds.toString2(2);
    };
    Timer.prototype.isStoped = function () {
        return this.hours <= 0 && this.minutes <= 0 && this.seconds <= 0;
    };
    Timer.prototype.tickMinus = function () {
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
    };
    return Timer;
}());
var Digit = (function () {
    function Digit() {
    }
    Digit.createDigit = function (id) {
        var digit = document.createElement('li');
        digit.classList.add('digit');
        digit.setAttribute('id', "digit-" + id);
        var ledTop = document.createElement('span');
        ledTop.classList.add('led-top');
        digit.appendChild(ledTop);
        var ledCenter = document.createElement('span');
        ledCenter.classList.add('led-center');
        digit.appendChild(ledCenter);
        var ledBottom = document.createElement('span');
        ledBottom.classList.add('led-bottom');
        digit.appendChild(ledBottom);
        var ledLeftTop = document.createElement('span');
        ledLeftTop.classList.add('led-left-top');
        digit.appendChild(ledLeftTop);
        var ledLeftBottom = document.createElement('span');
        ledLeftBottom.classList.add('led-left-bottom');
        digit.appendChild(ledLeftBottom);
        var ledRightTop = document.createElement('span');
        ledRightTop.classList.add('led-right-top');
        digit.appendChild(ledRightTop);
        var ledRightBottom = document.createElement('span');
        ledRightBottom.classList.add('led-right-bottom');
        digit.appendChild(ledRightBottom);
        return digit;
    };
    Digit.createSplitter = function () {
        var splitter = document.createElement('span');
        splitter.classList.add('splitter');
        return splitter;
    };
    Digit.createCountDown = function (id) {
        var countdown = document.createElement('ul');
        countdown.classList.add('timer-countdown');
        countdown.setAttribute('id', id);
        return countdown;
    };
    return Digit;
}());
$(document).ready(function () {
    var countDown = Digit.createCountDown('countdown');
    var digit1 = Digit.createDigit(1);
    countDown.appendChild(digit1);
    var digit2 = Digit.createDigit(2);
    countDown.appendChild(digit2);
    var sp1 = Digit.createSplitter();
    countDown.appendChild(sp1);
    var digit3 = Digit.createDigit(3);
    countDown.appendChild(digit3);
    var digit4 = Digit.createDigit(4);
    countDown.appendChild(digit4);
    var sp2 = Digit.createSplitter();
    countDown.appendChild(sp2);
    var digit5 = Digit.createDigit(5);
    countDown.appendChild(digit5);
    var digit6 = Digit.createDigit(6);
    countDown.appendChild(digit6);
    document.getElementById('monitor').appendChild(countDown);
    var timer = new Timer();
    timer.setValue('01:00:10');
    var timerState = countDown.setTimer(timer);
    if (timerState) {
        var pid_1 = setInterval(function () {
            timer.tickMinus();
            timerState = countDown.setTimer(timer);
            if (!timerState) {
                clearInterval(pid_1);
                return;
            }
        }, 1000);
    }
    console.log(timer);
});
Number.prototype.toString2 = function (digitLenth) {
    var repeatCount = 0;
    if (digitLenth > this.toString().length)
        repeatCount = digitLenth - this.toString().length;
    return "" + '0'.repeat(repeatCount) + this;
};
