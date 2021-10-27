const {
  existsAsync,
  setAsync,
  selectAsync,
  redisCli,
  blacklistDb,
} = require('./index');
const jwt = require('jsonwebtoken');
const {createHash} = require('crypto');

function generateHashToken(token) {
  return createHash('sha256').update(token).digest('hex');
}
async function addToken(token) {
  const expiryDate = jwt.decode(token).exp;
  const hashToken = generateHashToken(token);
  await selectAsync(blacklistDb);
  await setAsync(hashToken, '');
  redisCli.expireat(hashToken, expiryDate);
}

async function hasToken(token) {
  const hashToken = generateHashToken(token);
  const result = await existsAsync(hashToken);
  return result === 1;
}

module.exports = {
  addToken,
  hasToken,
};
