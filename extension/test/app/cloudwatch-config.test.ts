// import { CloudWatchConfig } from '../../src/app/cloudwatch-config';


// describe('CloudWatchConfig', () => {
//     let sut: CloudWatchConfig;
//     let querySpy: jest.SpyInstance;
//     let appendChildSpy: jest.SpyInstance;
//     let createElementSpy: jest.SpyInstance;
//     let queryField;

//     beforeEach(() => {
//         sut = new CloudWatchConfig();
//         appendChildSpy = jest.fn();
//         querySpy = jest.spyOn(document, 'querySelector');
//         querySpy.mockReturnValue({ appendChild: appendChildSpy });
//         queryField = { onchange: undefined, value: undefined };
//         createElementSpy = jest.spyOn(document, 'createElement');
//         createElementSpy.mockReturnValue(queryField);
//     });

//     describe('load', () => {
//         it('should return status 0', async () => {
//             const res = await sut.load(undefined, { notify: () => {}});
//             expect(res.statusType).toBe(0);
//         });

//         it('should setup config form', async () => {
//             await sut.load(undefined, { notify: () => {}});

//             expect(createElementSpy).toHaveBeenCalledWith('input');
//             expect(querySpy).toHaveBeenCalledWith('.container');
//             expect(appendChildSpy).toHaveBeenCalledWith(queryField);
//         });

//         it('should send notification when field changes', async () => {
//             const notifySpy = jest.fn();
//             await sut.load(undefined, { notify: notifySpy });

//             queryField.value = 'something';
//             queryField.onchange();
//             expect(notifySpy).toHaveBeenCalledWith('ms.vss-dashboards-web.configurationChange', { data: 'something' });
//         });
//     });

//     describe('onSave', () => {
//         it('should send value', async () => {
//             queryField.value = '55';
//             await sut.load(undefined, { notify: () => {}});
//             const res = await sut.onSave();
//             expect(res.isValid).toBeTruthy();
//             expect(res.customSettings.data).toBe('55');
//         });
//     });
// });
