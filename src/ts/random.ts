//import * as fs from "fs";

function randomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

function randomId(length: number): string {
    let res: string = "";

    for (let i = 0; i < length; i++)
        res = `${res}${randomInt(10)}`;

    return res;
}

function randomHexColor(): string {
    const toHex = (number: number) => {
        const hex: string = number.toString(16);
        return hex.length < 2 ? `0${hex}` : hex;
    };
    const randomHexByte = () => toHex(randomInt(256));

    const randomHexBytes = new Array(3);
    for(let i=0; i<randomHexBytes.length; i++)
        randomHexBytes[i] = randomHexByte();

    return `#${randomHexBytes.join("")}`;
}

function randomBoolean(): boolean {
    return randomInt(2) == 1;
}

function randomFromArray<T>(arr: T[]): T {
    const index = randomInt(arr.length);

    return arr[index];
}

// function randomLine(fileName: string): string {
//     return "sample";
//     // const lines: string[] = fs.readFileSync(fileName, 'utf-8').split("\n");
//     // const index = randomInt(lines.length);
//     //
//     // return lines[index];
// }

export {randomInt, randomId, randomBoolean, randomFromArray, randomHexColor};
