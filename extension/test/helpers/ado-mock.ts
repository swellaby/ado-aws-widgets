export class AdoMock {
    constructor(
        public init = jest.fn(),
        public notifyLoadSucceeded = jest.fn(),
        public ready = jest.fn(),
        public register = jest.fn()
    ) {}

    static initMock(): AdoMock {
        const mock = new AdoMock();
        jest.mock('azure-devops-extension-sdk', () => mock);
        return mock;
    }
}
