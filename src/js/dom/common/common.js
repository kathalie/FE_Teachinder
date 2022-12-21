export function fillImgElement(from, selector, src, alt) {
    const img = from.querySelector(selector);
    img.src = src;
    img.alt = alt;
}
export function fillAnchorElement(from, selector, attr, text) {
    const anchorElement = from.querySelector(selector);
    anchorElement.href = attr;
    anchorElement.innerText = text;
}
export function setText(to, text) {
    to.innerText = text;
}
export function getHTMLElement(from, by) {
    return from.querySelector(by);
}
export function toggleHidden(element) {
    element.classList.toggle("hidden");
}
export function getRBValue(name) {
    const radioButtons = document.getElementsByName(name);
    for (const radioButton of radioButtons) {
        if (radioButton.checked)
            return radioButton.value;
    }
    return undefined;
}
export function placePopup(popup) {
    popup.style.marginTop = `${window.scrollY}px`;
}
//# sourceMappingURL=common.js.map