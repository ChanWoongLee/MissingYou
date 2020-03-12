var console = require('console')
module.exports.function = function openCall (tel) {
  console.log(tel);
  return 'tel:' + tel
}
