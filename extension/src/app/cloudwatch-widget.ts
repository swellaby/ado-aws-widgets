import * as SDK from 'azure-devops-extension-sdk';

export class CloudWatchWidget {
    private widget: HTMLDivElement;

    public async preload() {
        return {};
    }

    public async load(settings) {
        this.render(settings.customSettings.data);
        return {};
    }

    private render(query: string) {
        this.widget = document.querySelector('.widget');
        this.widget.innerText = query;
        SDK.notifyLoadSucceeded();
    }
}
