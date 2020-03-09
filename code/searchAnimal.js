var config = require('config')
var http = require('http')
var console = require('console')
var fail = require('fail')
var secret = require('secret')
var Dateinfo = require('./lib/inputDate')
var Data = require('./lib/saveData')
var Compare = require('./lib/compareDate')


module.exports.function = function searchAnimal(keyword, city, county, dateTimeExpression,adoption) {

  var dogOrCat;
  keyword = keyword.replace(/(\s*)/g, "");
  if (keyword == "강아지" || keyword == "개" || keyword == "유기견" || keyword == "애완동물") dogOrCat = 417000;
  else if (keyword == "고양이" || keyword == "유기묘") dogOrCat = 422400;
  var checkKeyWord = true;
  var when = Dateinfo.inputDate(dateTimeExpression)
  whenStart = when[0];
  whenEnd = when[1];
  var input_adoption = 0;
  if(adoption == undefined) input_adoption=1;

  console.log(when[0] + " " + when[1]  + adoption);
  const cityData = require("./data/sido.js");
  city_code = cityData[city];

  const sigunguData = require("./data/sigungu.js");
  county_code = sigunguData[county];


  var api = config.get("api");
  var serviceKey = secret.get("key");
  api = api + 'ServiceKey=' + serviceKey;

  const kindData = require("./data/kind.js");
  datatype = (typeof (kindData[keyword]));
  var isKindNum = datatype == "object" ? true : false;


  if (!isKindNum) {
    var kind_code = kindData[keyword];
    if (kind_code == undefined && dogOrCat == undefined) checkKeyWord = false;
    var response = http.getUrl(api, {
      format: 'xmljs',
      query: {
        bgnde: whenStart,
        endde: whenEnd,
        pageNo: '1',
        numOfRows: '50',
        kind: kind_code,
        upr_cd: city_code,
        org_cd: county_code,
        upkind: dogOrCat
      }
    })
    var animal = [];
    if (response.response.body.items.item) {
      try { //  response.response.body.items.item 타입은 object 입니다. item이 여러개일때도 object인데 foreach문이 실행됩니다.
        //  iteml 이 한개일때는 foreach문 실행시 오류가 발생해 이를위해 catch문으로 따로 처리했습니다.
        response.response.body.items.item.forEach(function (r) {
          animal.push(Data.saveData(r));
        })
      } catch (e) {
        animal.push(Data.saveData(response.response.body.items.item));
      }
    }
  }
  else {
    var animal = [];
    for (var i = 0; i < Object.keys(kindData[keyword]).length; i++) {
      kindNumKey = Object.keys(kindData[keyword]);
      kind_code = kindData[keyword][kindNumKey[i]];
      if (kind_code == undefined && dogOrCat == undefined) checkKeyWord = false;
      var response = http.getUrl(api, {
        format: 'xmljs',
        query: {
          bgnde: whenStart,
          endde: whenEnd,
          pageNo: '1',
          numOfRows: '50',
          kind: kind_code,
          upr_cd: city_code,
          org_cd: county_code,
          upkind: dogOrCat
        }
      })
      if (response.response.body.items.item) {
        try {
          response.response.body.items.item.forEach(function (r) {
            animal.push(Data.saveData(r));
          })
        } catch (e) {
          animal.push(Data.saveData(response.response.body.items.item));
        }
      }
    }
    animal.sort(Compare.compareDate);
  }
  if (checkKeyWord)
    return animal;
  else
    return animal = [];

}