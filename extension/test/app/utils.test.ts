import { AdoApiMock, AdoSdkMock, AdoServiceEndpointMock } from '../helpers';
AdoApiMock.initMock();
AdoServiceEndpointMock.initMock();
const sdkMock = AdoSdkMock.initMock();
import { init, getSideLength, getProjectId } from '../../src/app/utils';
import { CloudWatchWidget } from '../../src/app/cloudwatch-widget';

describe('init', () => {
    it('should initialize plugin and register widget', async () => {
        await init('cloudwatch-widget', () => new CloudWatchWidget(<any>''));

        expect(sdkMock.init).toHaveBeenCalledTimes(1);
        expect(sdkMock.ready).toHaveBeenCalledTimes(1);
        expect(sdkMock.register).toHaveBeenCalledTimes(1);
        expect(sdkMock.register.mock.calls[0][0]).toBe('cloudwatch-widget');
        expect(sdkMock.register.mock.calls[0][1]()).toBeInstanceOf(CloudWatchWidget);
    });
});

describe('getSideLength', () => {
    it('should be correct for 1 unit', () => expect(getSideLength(1)).toBe(155));
    it('should be correct for multiple units', () => expect(getSideLength(5)).toBe(815));
});

describe('getProjectId', () => {
    it('should retrieve id', async () => {
        sdkMock.getService.mockReturnValue({ getProject: () => ({ id: 'mine' })});
        const id = await getProjectId();
        expect(id).toBe('mine');
    });
});
