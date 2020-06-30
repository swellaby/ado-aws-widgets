export class AdoApiMock {
    constructor(
        public getClient = jest.fn()
    ) {}

    static initMock(): AdoApiMock {
        const mock = new AdoApiMock();
        jest.mock('azure-devops-extension-api', () => mock);
        return mock;
    }
}
