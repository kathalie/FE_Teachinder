export function fillImgElement(from: HTMLElement, selector: string, src: string, alt: string): void {
    const img = from.querySelector<HTMLImageElement>(selector);

    img.src = src;
    img.alt = alt;
}

export function fillAnchorElement(from: HTMLElement, selector: string, attr: string, text: string) {
    const anchorElement = from.querySelector<HTMLAnchorElement>(selector);

    anchorElement.href = attr;
    anchorElement.innerText = text;
}

export function setText(to: HTMLElement, text: string): void {
    to.innerText = text;
}

export function getHTMLElement(from: HTMLElement, by: string): HTMLElement {
    return from.querySelector<HTMLElement>(by);
}

export function toggleHidden(element: HTMLElement) {
    element.classList.toggle("hidden");
}

export function getRBValue(name: string): string | undefined {
    const radioButtons = document.getElementsByName(name);

    for(const radioButton of radioButtons) {
        if(radioButton.checked)
            return radioButton.value;
    }

    return undefined;
}

export function placePopup(popup: HTMLElement) {
    popup.style.marginTop = `${window.scrollY}px`;
}
