export class AdoServiceEndpointMock {
    constructor(
        public getClient = jest.fn()
    ) {}

    static initMock(): AdoServiceEndpointMock {
        const mock = new AdoServiceEndpointMock();
        jest.mock('azure-devops-extension-api/ServiceEndpoint', () => mock);
        return mock;
    }
}
