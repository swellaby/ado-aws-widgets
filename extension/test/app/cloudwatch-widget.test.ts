import { AdoApiMock, AdoSdkMock, AdoServiceEndpointMock } from '../helpers';
const sdkMock = AdoSdkMock.initMock();
AdoApiMock.initMock();
AdoServiceEndpointMock.initMock();
import { CloudWatchWidget } from '../../src/app/cloudwatch-widget';

class TestHarness {
    constructor() {
        this.createEleSpy = jest.spyOn(document, 'createElement')
        this.createEleSpy.mockReturnValue(<any>this.img);
        jest.spyOn(document, 'querySelector').mockReturnValue(<any>this.ele);
        sdkMock.getService.mockReturnValue({ getProject: () => ({ id: 'c' }) });
        this.sut = new CloudWatchWidget(<any>{ executeServiceEndpointRequest: this.reqSpy });
    }

    public sut: CloudWatchWidget;
    public ele = { appendChild: jest.fn() };
    public img = { src: undefined };
    public reqSpy = jest.fn();
    public createEleSpy: jest.SpyInstance;
}

describe('CloudWatchWidget', () => {
    let harness: TestHarness;

    beforeEach(() => {
        harness = new TestHarness();
        jest.clearAllMocks();
    });

    it('can get its own endpointClient', async () => {
        sdkMock.getService.mockReturnValue({ getClient: () => ({}) });
        expect(new CloudWatchWidget()).not.toBeNull();
    });

    describe('preload', () => {
        it('should set project id', async () => {
            await harness.sut.preload();
            expect(harness.sut['projectId']).toBe('c');
        });
    });

    describe('load', () => {
        let settings;

        beforeEach(() => {
            settings = { size: { rowSpan: 2, columnSpan: 3 }, customSettings: { data: '{"widget":"{}"}' } };
            harness.reqSpy.mockImplementation(async () => ({ result: ['{"image":"imgstr"}'] }));
        });

        it('should notify loaded', async () => {
            await harness.sut.load(settings);
            expect(sdkMock.notifyLoadSucceeded).toHaveBeenCalledTimes(1);
        });

        it('should set dimensions correctly', async () => {
            await harness.sut.load(settings);
            expect(harness.sut['width']).toBe(485);
            expect(harness.sut['height']).toBe(320);
        });

        it('should create image element once', async () => {
            await harness.sut.load(settings);
            await harness.sut.load(settings);
            expect(harness.createEleSpy).toHaveBeenCalledTimes(1);
        });

        it('should configure image correctly', async () => {
            await harness.sut.load(settings);
            expect(harness.img.src).toBe('data:image/png;base64, imgstr');
        });
    });
});
