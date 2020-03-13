var console = require('console')
module.exports.function = function OpenApp (tel,loc) {
  var obj = new Object();
  let result = new Object();
  if(tel != undefined){
    result.tel = 'tel:' + tel
  }else{
    result.url = 'https://m.map.naver.com/search2/search.nhn?query='+loc+'&sm=hty&style=v4#/map'
  }

  return result
}
