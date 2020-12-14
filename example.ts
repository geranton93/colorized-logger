import { ColorizedLogger } from '.';
import { Level } from './src/enums';

const logger = new ColorizedLogger(Level.debug);

logger.info('string', 1, [1, 2], [{ key: [NaN] }], { [1]: true }, undefined, NaN, true, Infinity, false);

logger.info('log with default settings');
logger.debug('debug');
logger.warn('warn');
logger.error('error');

logger.setTimeStampFormat('YY.MM.DD');

logger.info('log with custom timestamp');

logger.setBracesType({ timestamp: [' ', ' '], level: ['{', '}'] });

logger.warn('log with different braces');

logger.setBracesTypeForAll(['\\\\', '//']);

logger.warn('now log with unified braces');

logger.setLocation('dist/index.js');

logger.info('log with location');

logger.resetBraces();

logger.info('logger with default braces');

logger.setColors({ timestampColor: '\u001b[42m' });

logger.info('logger with new timestamp color');

logger.setShowOptions({ timestamp: false, level: false });

logger.info('logger without level and timestamp');

logger.setLocation('');

logger.info('message without anything');

logger.setColors({ message: '\u001b[43;1m' });

logger.info('message color');