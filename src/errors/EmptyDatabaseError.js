/**
 * Dado requisitado de uma tabela vazia no banco de dados
 */
class EmptyDatabaseError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'EmptyDatabaseError';
  }
}

module.exports = EmptyDatabaseError;
