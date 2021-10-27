/**
 * Acessa o objeto dentro de request, passado pelo parâmtro,
 * e deleta todas as chaves que não estão presentes no array.
 *
 * @param {string} object Nome de um objeto contido no request, ex.: 'body'
 * @param {string[]} keys Nomes das chaves desejadas dentro do objeto passado
 * @return {null}
 */
function requestFilter(object, keys) {
  return (req, res, next) => {
    try {
      for (const key in req[object]) {
        if (!keys.includes(key)) {
          delete req[object][key];
        }
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  requestFilter,
};
