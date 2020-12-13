import { ColorizedLogger } from './src/ColorizedLogger';

const logger = new ColorizedLogger().setLocation('index.ts');

logger.info('keksfa', 'dsdf', { sd: 'afasf', sdb: 1}, [1, 3]);
logger.info({ sf: 2});
logger.warn('dsaf');
logger.error('alarm');