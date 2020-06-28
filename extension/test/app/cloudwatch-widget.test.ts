import { AdoMock } from '../helpers/ado-mock';
const adoMock = AdoMock.initMock();
import { CloudWatchWidget } from '../../src/app/cloudwatch-widget';

describe('CloudWatchWidget', () => {
    beforeEach(() => jest.clearAllMocks());

    describe('class methods', () => {
        let sut: CloudWatchWidget;

        beforeEach(() => {
            sut = new CloudWatchWidget();
        });

        describe('preload', () => {
            it('should return nothing', async () => {
                const res = await sut.preload();
                expect(res).toEqual({});
            });
        });

        describe('load', () => {
            let querySpy: jest.SpyInstance;
            let fakeEle;

            beforeEach(() => {
                fakeEle = { innerText: '' };
                querySpy = jest.spyOn(document, 'querySelector');
                querySpy.mockReturnValue(fakeEle);
            });

            it('should notify loaded', async () => {
                const res = await sut.load({ customSettings: { data: 'I am alive' }});
                expect(res).toEqual({});
                expect(adoMock.notifyLoadSucceeded).toHaveBeenCalledTimes(1);
                expect(fakeEle.innerText).toBe('I am alive');
                expect(querySpy).toHaveBeenCalledWith('.widget');
            });
        });
    });
});
