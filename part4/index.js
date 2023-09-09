require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

logger.info(config.PORT)