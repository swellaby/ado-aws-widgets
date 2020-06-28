import { CloudWatchWidget } from './cloudwatch-widget';

CloudWatchWidget.init().catch(err => console.error('Failed to load', err));
