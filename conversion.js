// ========== DECIMAL TO ANY BASE ==========

function afPoint(boh, fracStr, digit = 10) {
    let frac = parseFloat("0." + fracStr);
    let binary = "";
    let count = 0;

    if (boh === 16) {
        while (frac > 0 && count < digit) {
            frac *= boh;
            let bit = Math.floor(frac);
            frac -= bit;

            if (bit === 10) bit = 'A';
            else if (bit === 11) bit = 'B';
            else if (bit === 12) bit = 'C';
            else if (bit === 13) bit = 'D';
            else if (bit === 14) bit = 'E';
            else if (bit === 15) bit = 'F';

            binary += bit;
            count++;

            if (frac < Number.EPSILON) break;
        }
        if (frac > 0) binary += "...";
        return binary;

    } else {
        while (frac > 0 && count < digit) {
            frac *= boh;
            let bit = Math.floor(frac);
            binary += bit;
            frac -= bit;
            count++;

            if (frac < Number.EPSILON) break;
        }
        if (frac > 0) binary += "...";
        return binary;
    }
}

const decimalToOctal = (DecimalValue) => {
    let num = DecimalValue || prompt("Enter Decimal Value: ");
    num = num.toString();

    let Nmbr = "", deci = "", part2 = "", rem = "";
    if (num.includes(".")) {
        [Nmbr, deci] = num.split(".");
        part2 = afPoint(8, deci);
    } else {
        Nmbr = num;
    }

    if (Nmbr === "0") {
        rem = "0";
    } else {
        while (Nmbr > 0) {
            rem = (Nmbr % 8) + rem;
            Nmbr = Math.floor(Nmbr / 8);
        }
    }

    part2 ? console.log(rem + "." + part2) : console.log(rem);
};

const decimalToBinary = (DecimalValue) => {
    let num = DecimalValue || prompt("Enter Decimal Value: ");
    num = num.toString();

    let Nmbr = "", deci = "", part2 = "", rem = "";
    if (num.includes(".")) {
        [Nmbr, deci] = num.split(".");
        part2 = afPoint(2, deci);
    } else {
        Nmbr = num;
    }

    if (Nmbr === "0") {
        rem = "0";
    } else {
        while (Nmbr > 0) {
            rem = (Nmbr % 2) + rem;
            Nmbr = Math.floor(Nmbr / 2);
        }
    }

    part2 ? console.log(rem + "." + part2) : console.log(rem);
};

const decimalToHexa = (DecimalValue) => {
    let num = DecimalValue || prompt("Enter Decimal Value: ");
    num = num.toString();

    let Nmbr = "", deci = "", part2 = "", rem = "", hexArr = [];
    if (num.includes(".")) {
        [Nmbr, deci] = num.split(".");
        part2 = afPoint(16, deci);
    } else {
        Nmbr = num;
    }

    if (Nmbr === "0") {
        rem = "0";
    } else {
        while (Nmbr > 0) {
            hexArr.unshift(Nmbr % 16);
            if (hexArr[0] === 10) hexArr[0] = 'A';
            else if (hexArr[0] === 11) hexArr[0] = 'B';
            else if (hexArr[0] === 12) hexArr[0] = 'C';
            else if (hexArr[0] === 13) hexArr[0] = 'D';
            else if (hexArr[0] === 14) hexArr[0] = 'E';
            else if (hexArr[0] === 15) hexArr[0] = 'F';

            Nmbr = Math.floor(Nmbr / 16);
        }
        rem = hexArr.join("");
    }

    part2 ? console.log(rem + "." + part2) : console.log(rem);
};

//       ANY BASE TO DECIMAL 

const binPoint = (hob, value) => {
    let sum = 0, pow = -1;
    for (let i = 0; i < value.length; i++) {
        let bit = hob ** pow * parseInt(value[i], 16);
        sum += bit;
        pow--;
    }
    return sum;
};

const binaryToDecimal = () => {
    let str = prompt("Enter Binary value: ").trim();
    let part1 = "", part2 = "", pValue = 0;

    if (str.includes(".")) {
        [part1, part2] = str.split(".");
        pValue = binPoint(2, part2);
    } else {
        part1 = str;
    }

    let revStr = part1.split('').reverse().join('');
    let result = 0;
    for (let i = 0; i < revStr.length; i++) {
        result += 2 ** i * parseInt(revStr[i]);
    }

    return part2 ? (result + pValue) : result;
};

const octalToDecimal = () => {
    let str = prompt("Enter Octal value: ").trim();
    let part1 = "", part2 = "", pValue = 0;

    if (str.includes(".")) {
        [part1, part2] = str.split(".");
        pValue = binPoint(8, part2);
    } else {
        part1 = str;
    }

    let revStr = part1.split('').reverse().join('');
    let result = 0;
    for (let i = 0; i < revStr.length; i++) {
        result += 8 ** i * revStr[i];
    }

    return part2 ? (result + pValue) : result;
};

const hexaToDecimal = () => {
    let str = prompt("Enter Hex value: ").trim().toUpperCase();
    let part1 = "", part2 = "", pValue = 0;

    if (str.includes(".")) {
        [part1, part2] = str.split(".");
        pValue = binPoint(16, part2);
    } else {
        part1 = str;
    }

    let revStr = part1.split('').reverse().join('');
    let result = 0;
    for (let i = 0; i < revStr.length; i++) {
        result += 16 ** i * parseInt(revStr[i], 16);
    }

    return part2 ? (result + pValue) : result;
};

// ========== MASTER CONVERTER ==========

(function () {
    alert("After pressing 'OK', you'll see two input fields: 'From' and 'To'. Please enter a key to choose the conversion type:\n'b' for Binary\n'o' for Octal\n'd' for Decimal\n'h' for Hexadecimal");

    let From = prompt("From: ").toUpperCase();
    let To = prompt("To: ").toUpperCase();

    if (From === 'D' && To === 'B') {
        decimalToBinary();
    } else if (From === 'D' && To === 'O') {
        decimalToOctal();
    } else if (From === 'D' && To === 'H') {
        decimalToHexa();
    } else if (From === 'B' && To === 'D') {
        console.log(binaryToDecimal());
    } else if (From === 'O' && To === 'D') {
        console.log(octalToDecimal());
    } else if (From === 'H' && To === 'D') {
        console.log(hexaToDecimal());
    } else if (From === 'B' && To === 'O') {
        decimalToOctal(binaryToDecimal());
    } else if (From === 'B' && To === 'H') {
        decimalToHexa(binaryToDecimal());
    } else if (From === 'O' && To === 'B') {
        decimalToBinary(octalToDecimal());
    } else if (From === 'O' && To === 'H') {
        decimalToHexa(octalToDecimal());
    } else if (From === 'H' && To === 'B') {
        decimalToBinary(hexaToDecimal());
    } else if (From === 'H' && To === 'O') {
        decimalToOctal(hexaToDecimal());
    }
})();
