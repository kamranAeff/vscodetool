export default class Digit {
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