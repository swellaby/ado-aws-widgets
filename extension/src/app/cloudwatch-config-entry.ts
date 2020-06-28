import { init, LOAD_ERR } from './utils';
import { CloudWatchConfig } from './cloudwatch-config';

init('cloudwatch-config', () => new CloudWatchConfig()).catch(err => console.error(LOAD_ERR, err));
