import { AdoMock } from '../helpers/ado-mock';
const adoMock = AdoMock.initMock();
import { init, getSideLength } from '../../src/app/utils';
import { CloudWatchWidget } from '../../src/app/cloudwatch-widget';

describe('init', () => {
    it('should initialize plugin and register widget', async () => {
        await init('cloudwatch-widget', () => new CloudWatchWidget());

        expect(adoMock.init).toHaveBeenCalledTimes(1);
        expect(adoMock.ready).toHaveBeenCalledTimes(1);
        expect(adoMock.register).toHaveBeenCalledTimes(1);
        expect(adoMock.register.mock.calls[0][0]).toBe('cloudwatch-widget');
        expect(adoMock.register.mock.calls[0][1]()).toBeInstanceOf(CloudWatchWidget);
    });
});

describe('getSideLength', () => {
    it('should be correct for 1 unit', () => expect(getSideLength(1)).toBe(160));
    it('should be correct for multiple units', () => expect(getSideLength(5)).toBe(840));
});
