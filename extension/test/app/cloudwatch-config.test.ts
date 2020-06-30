import { AdoApiMock, AdoSdkMock, AdoServiceEndpointMock } from '../helpers';
const sdkMock = AdoSdkMock.initMock();
AdoApiMock.initMock();
AdoServiceEndpointMock.initMock();
import { CloudWatchConfig, CHANGE_EVENT } from '../../src/app/cloudwatch-config';

class TestHarness {
    constructor(queryFieldValue: string = '', endpointFieldValue: string = '', endpoints = []) {
        jest.spyOn(document, 'getElementById').mockImplementation(this.getByIdStub);
        jest.spyOn(document, 'querySelector').mockReturnValue(<any>this.ele);
        this.fakeEndpointField.value = endpointFieldValue;
        this.fakeQueryField.value = queryFieldValue;
        sdkMock.getService.mockReturnValue({ getProject: () => ({ id: 'c' })});
        this.sut = new CloudWatchConfig(<any>{ getServiceEndpoints: async () => endpoints });
    }

    public sut: CloudWatchConfig;
    public fakeEndpointField = { onchange: undefined, value: undefined };
    public fakeQueryField = { onchange: undefined, value: undefined };
    public ele = { innerHTML: undefined };

    private readonly getByIdStub = (id: string): any => {
        if (id.includes('endpoint')) {
            return this.fakeEndpointField;
        } else if (id.includes('query')) {
            return this.fakeQueryField;
        }
        return null;
    }
}

describe('CloudWatchConfig', () => {
    let harness: TestHarness;

    it('can get its own endpointClient', async () => {
        sdkMock.getService.mockReturnValue({ getClient: () => ({})});
        expect(new CloudWatchConfig()).not.toBeNull();
    });

    describe('load', () => {
        let settings;
        const endpoints = [{ name: 'a', id: '1'}, { name: 'b', id: '2' }];

        beforeEach(() => {
            harness = new TestHarness('', '', endpoints);
            settings = { customSettings: { data: '' } };
        });

        it('should return status 0', async () => {
            const res = await harness.sut.load(settings, { notify: () => {}});
            expect(res.statusType).toBe(0);
        });

        it('should create options for each endpoint', async () => {
            await harness.sut.load(settings, { notify: () => {}});
            expect(harness.ele.innerHTML).toContain('value="1"');
            expect(harness.ele.innerHTML).toContain('value="2"');
        });

        it('should set existing value if present', async () => {
            settings.customSettings.data = '{"widget":"w","connectionId":"c"}'
            await harness.sut.load(settings, { notify: () => {}});
            expect(harness.fakeEndpointField.value).toBe('c');
            expect(harness.fakeQueryField.value).toBe('w');
        });

        it('should notify on endpoint change', async () => {
            const notifySpy = jest.fn();
            await harness.sut.load(settings, { notify: notifySpy });
            harness.fakeEndpointField.value = 'v';
            harness.fakeEndpointField.onchange();
            expect(notifySpy).toHaveBeenCalledWith(CHANGE_EVENT, { data: '{"widget":"","connectionId":"v"}'});
        });

        it('should notify on query change', async () => {
            const notifySpy = jest.fn();
            await harness.sut.load(settings, { notify: notifySpy });
            harness.fakeQueryField.value = 'v';
            harness.fakeQueryField.onchange();
            expect(notifySpy).toHaveBeenCalledWith(CHANGE_EVENT, { data: '{"widget":"v","connectionId":""}'});
        });
    });

    describe('onSave', () => {
        it('should send value', async () => {
            harness = new TestHarness('query', 'ep');
            harness.sut['configureFields'](null);
            const res = await harness.sut.onSave();
            expect(res.isValid).toBeTruthy();
            expect(res.customSettings.data).toBe('{"widget":"query","connectionId":"ep"}');
        });
    });
});
