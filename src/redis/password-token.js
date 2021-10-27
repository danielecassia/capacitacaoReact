const {
  setAsync,
  selectAsync,
  getAsync,
  delAsync,
  redisCli,
  passwordTokenDb,
} = require('./index');
const {randomBytes} = require('crypto');

async function generateToken(email) {
  const token = randomBytes(128).toString('hex');
  await selectAsync(passwordTokenDb);
  await setAsync(token, email);
  const oneHourFromNow = Date.now() + 3600;
  redisCli.expireat(token, oneHourFromNow);
  return token;
}

async function getEmail(token) {
  await selectAsync(passwordTokenDb);
  const email = await getAsync(token);
  return email;
}

async function removeToken(token) {
  await delAsync(token);
}

module.exports = {
  generateToken,
  getEmail,
  removeToken,
};
