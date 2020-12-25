const NODE_ENV = 'NODE_ENV';

module.exports = process.env[NODE_ENV] || 'development';
