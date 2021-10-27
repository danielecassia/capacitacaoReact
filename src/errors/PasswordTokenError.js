/**
 * Token de redefinição de senha não é válido ou não existe.
 * Não abrange erros partidos de um JWT.
*/
class PasswordTokenError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'TokenError';
  }
}

module.exports = PasswordTokenError;
