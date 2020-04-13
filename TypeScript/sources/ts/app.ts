import { Timer } from "./Timer";
import Digit from "./Digit";




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