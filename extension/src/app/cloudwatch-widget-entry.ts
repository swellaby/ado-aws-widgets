import { init, LOAD_ERR } from './utils';
import { CloudWatchWidget } from './cloudwatch-widget';

init('cloudwatch-widget', () => new CloudWatchWidget()).catch(err => console.error(LOAD_ERR, err));
