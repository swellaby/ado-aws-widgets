import { getClient } from 'azure-devops-extension-api';
import { ServiceEndpointRestClient, ServiceEndpoint } from 'azure-devops-extension-api/ServiceEndpoint';
import { getProjectId } from './utils';
import { generateDropdown, DropdownOption, generateTextAreaField } from './field-generators';

export const CHANGE_EVENT = 'ms.vss-dashboards-web.configurationChange';

export class CloudWatchConfig {
    constructor(
        private endpointClient: ServiceEndpointRestClient = getClient(ServiceEndpointRestClient)
    ) { }

    private projectId: string;

    private readonly endpointFieldId: string = `cw-endpoint-field-${Math.round(Math.random() * 100)}`;
    private endpointField: HTMLSelectElement;
    private serviceEndpoints: ServiceEndpoint[] = [];

    private readonly queryFieldId: string = `cw-query-field-${Math.round(Math.random() * 100)}`;
    private queryField: HTMLTextAreaElement;

    public async load(settings, context) {
        await this.collectData();
        this.render();
        this.configureFields(context);
        this.setValueFromData(settings.customSettings.data);
        return { statusType: 0 };
    }

    public async onSave() {
        return { customSettings: this.getValue(), isValid: true };
    }

    private getValue() {
        return { data: JSON.stringify({
            widget: this.queryField.value,
            connectionId: this.endpointField.value
        })};
    }

    private configureFields(context) {
        this.queryField = <HTMLTextAreaElement>document.getElementById(this.queryFieldId);
        this.queryField.onchange = () => context.notify(CHANGE_EVENT, this.getValue());

        this.endpointField = <HTMLSelectElement>document.getElementById(this.endpointFieldId);
        this.endpointField.onchange = () => context.notify(CHANGE_EVENT, this.getValue());
    }

    private setValueFromData(data: string) {
        if (data) {
            const parsedData = JSON.parse(data);
            this.queryField.value = parsedData.widget;
            this.endpointField.value = parsedData.connectionId;
        }
    }

    private async collectData(): Promise<void> {
        this.projectId = await getProjectId();
        this.serviceEndpoints = await this.endpointClient.getServiceEndpoints(this.projectId, 'swellabyAws');
    }

    private render() {
        const container = document.querySelector('.container');
        container.innerHTML = `
            ${generateDropdown(this.endpointFieldId, 'Service Connection', this.serviceEndpoints.map(endpoint => new DropdownOption(endpoint.name, endpoint.id)))}
            ${generateTextAreaField(this.queryFieldId, 'Widget JSON')}
        `;
    }
}
