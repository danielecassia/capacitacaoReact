const redis = require('redis');
const {promisify} = require('util');

const redisCli = redis.createClient({
  host: process.env.REDIS_HOST,
});

const existsAsync = promisify(redisCli.exists).bind(redisCli);
const setAsync = promisify(redisCli.set).bind(redisCli);
const selectAsync = promisify(redisCli.select).bind(redisCli);
const getAsync = promisify(redisCli.get).bind(redisCli);
const delAsync = promisify(redisCli.del).bind(redisCli);

module.exports = {
  existsAsync,
  setAsync,
  selectAsync,
  getAsync,
  delAsync,
  redisCli,
  blacklistDb: 0,
  passwordTokenDb: 1,
};
