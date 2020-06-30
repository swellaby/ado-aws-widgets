export class AdoSdkMock {
    constructor(
        public init = jest.fn(),
        public notifyLoadSucceeded = jest.fn(),
        public ready = jest.fn(),
        public register = jest.fn(),
        public getService = jest.fn()
    ) {}

    static initMock(): AdoSdkMock {
        const mock = new AdoSdkMock();
        jest.mock('azure-devops-extension-sdk', () => mock);
        return mock;
    }
}
