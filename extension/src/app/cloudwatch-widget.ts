import { notifyLoadSucceeded } from 'azure-devops-extension-sdk';
import { ServiceEndpointRestClient } from 'azure-devops-extension-api/ServiceEndpoint';
import { getClient } from 'azure-devops-extension-api';
import { getProjectId, getSideLength } from './utils';

export class CloudWatchWidget {
    private widget: HTMLDivElement;
    private image: HTMLImageElement;
    private projectId: string;
    private endpointId: string;
    private widgetJson: any;
    private height: number; s
    private width: number;

    constructor(
        private endpointClient: ServiceEndpointRestClient = getClient(ServiceEndpointRestClient)
    ) { }

    public async preload() {
        this.projectId = await getProjectId();
        return {};
    }

    public async load(settings) {
        const { customSettings, size } = settings;
        this.setDimensions(size);
        this.render(customSettings.data);
        await notifyLoadSucceeded();
        return {};
    }

    private async render(data: string) {
        this.setSettings(data);
        this.setupElements();
        this.image.src = await this.retrieveImageSrc();
    }

    private setupElements(): void {
        if (!this.widget) {
            this.widget = document.querySelector('.widget');
        }
        if (!this.image) {
            this.image = document.createElement('img');
            this.widget.appendChild(this.image);
        }
    }

    private setDimensions({ columnSpan, rowSpan }): void {
        this.height = getSideLength(rowSpan);
        this.width = getSideLength(columnSpan);
    }

    private setSettings(data): void {
        const parsedData = JSON.parse(data);
        this.endpointId = parsedData.connectionId;
        this.widgetJson = JSON.parse(parsedData.widget);
        this.widgetJson.height = this.height;
        this.widgetJson.width = this.width;
    }

    private async retrieveImageSrc(): Promise<string> {
        const res = await this.endpointClient.executeServiceEndpointRequest({
            dataSourceDetails: {
                dataSourceName: null,
                dataSourceUrl: `{{endpoint.url}}/cloudwatch-widget?asstring=true&widget=${encodeURIComponent(JSON.stringify(this.widgetJson))}`,
                headers: [],
                initialContextTemplate: null,
                parameters: {},
                requestContent: null,
                requestVerb: 'get',
                resourceUrl: null,
                resultSelector: 'jsonpath:$'
            },
            resultTransformationDetails: null,
            serviceEndpointDetails: null
        }, this.projectId, this.endpointId);
        const encodedImg = JSON.parse(res.result[0]).image;
        return `data:image/png;base64, ${encodedImg}`;
    }
}
