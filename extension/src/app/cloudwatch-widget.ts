import * as SDK from 'azure-devops-extension-sdk';

export class CloudWatchWidget {
    private widget: HTMLDivElement;

    public async preload() {
        return {};
    }

    public async load(_settings) {
        this.render();
        return {};
    }

    private render() {
        this.widget = document.querySelector('.widget');
        this.widget.innerText = 'I am alive';
        SDK.notifyLoadSucceeded();
    }

    static async init(): Promise<void> {
        SDK.init();
        await SDK.ready();
        SDK.register('cloudwatch-widget', () => {
            return new CloudWatchWidget();
        });
    }
}
