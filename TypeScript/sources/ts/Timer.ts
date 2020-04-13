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

export class Timer {
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