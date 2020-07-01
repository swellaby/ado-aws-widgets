const WRAPPER_STYLE='style="margin-bottom=10px;"'
const getLabel = (id: string, title: string): string => `<div>
    <label for="${id}" style="margin-bottom: 8px; color: rgba(0,0,0,.55); font-size: .875rem; font-family: Helvetica;">
        ${title}
    </label>
</div>`;

export class DropdownOption {
    constructor(public label: string, public value: string) {}

    public getHtmlString(): string {
        return `<option value="${this.value}">${this.label}</option>`
    }
}

export function generateTextAreaField(id: string, title: string): string {
    return `
        <div ${WRAPPER_STYLE}>
            ${getLabel(id, title)}
            <textarea style="width: 100%; hieght: 80px;" id="${id.trim()}"></textarea>
        </div>
    `;
}

export function generateDropdown(id: string, title: string, options: DropdownOption[]): string {
    const optionsHtml = options.map(option => option.getHtmlString()).reduce((prev, cur) => `${prev} ${cur}`)
    return `
    <div ${WRAPPER_STYLE}>
        ${getLabel(id, title)}
        <select style="width: 100%;" id="${id.trim()}">
            ${optionsHtml}
        </select>
    </div>
    `;
}
