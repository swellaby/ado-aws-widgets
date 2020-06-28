export class CloudWatchConfig {
    private queryField: HTMLInputElement;

    public async load(_settings, context) {
        this.queryField = document.createElement('input');
        const container = document.querySelector('.container');
        container.appendChild(this.queryField);
        this.queryField.onchange = () => context.notify('ms.vss-dashboards-web.configurationChange', this.getValue());
        return { statusType: 0 };
    }

    public async onSave() {
        return { customSettings: this.getValue(), isValid: true };
    }


    private getValue() {
        return { data: this.queryField.value };
    }
}
