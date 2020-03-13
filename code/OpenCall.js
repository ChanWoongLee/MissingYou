var console = require('console')
module.exports.function = function OpenCall (tel) {
  console.log(tel);
  return 'tel:' + tel
}
