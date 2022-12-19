//import * as fs from "fs";
function randomInt(max) {
    return Math.floor(Math.random() * max);
}
function randomId(length) {
    let res = "";
    for (let i = 0; i < length; i++)
        res = `${res}${randomInt(10)}`;
    return res;
}
function randomHexColor() {
    const toHex = (number) => {
        const hex = number.toString(16);
        return hex.length < 2 ? `0${hex}` : hex;
    };
    const randomHexByte = () => toHex(randomInt(256));
    const randomHexBytes = new Array(3);
    for (let i = 0; i < randomHexBytes.length; i++)
        randomHexBytes[i] = randomHexByte();
    return `#${randomHexBytes.join("")}`;
}
function randomBoolean() {
    return randomInt(2) == 1;
}
function randomFromArray(arr) {
    const index = randomInt(arr.length);
    return arr[index];
}
function randomLine(fileName) {
    return "sample";
    // const lines: string[] = fs.readFileSync(fileName, 'utf-8').split("\n");
    // const index = randomInt(lines.length);
    //
    // return lines[index];
}
export { randomInt, randomId, randomBoolean, randomFromArray, randomHexColor, randomLine };
//# sourceMappingURL=random.js.map