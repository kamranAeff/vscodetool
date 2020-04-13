interface Number {
    toString2: (digitLenth: number) => string;
}

Number.prototype.toString2 = function (digitLenth: number): string {
    let repeatCount = 0;
    if (digitLenth > this.toString().length)
        repeatCount = digitLenth - this.toString().length;

    return `${'0'.repeat(repeatCount)}${this}`;
}