const WRAPPER_STYLE='style="margin-bottom=10px;"'
const getLabel = (id: string, title: string): string => `<label for="${id}" style="margin-bottom: 8px; color: rgba(0,0,0,.55); font-size: .875rem; font-family: Helvetica;">${title}</label>`;

export class DropdownOption {
    constructor(public label: string, public value: string) {}

    public getHtmlString(): string {
        return `<option value="${this.value}">${this.label}</option>`
    }
}

export function generatTextAreaField(id: string, title: string): string {
    return `
        <div ${WRAPPER_STYLE}>
            ${getLabel(id, title)}
            <textarea id="${id}"></textarea>
        </div>
    `;
}

export function generateDropdown(id: string, title: string, options: DropdownOption[]): string {
    const optionsHtml = options.map(option => option.getHtmlString()).reduce((prev, cur) => `${prev} ${cur}`)
    return `
    <div ${WRAPPER_STYLE}>
        ${getLabel(id, title)}
        <select id="${id}">
            ${optionsHtml}
        </select>
    </div>
    `;
}
