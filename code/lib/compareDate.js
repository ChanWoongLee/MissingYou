module.exports.compareDate = function (animal1, animal2) {
  var a = animal1.happenDate.split(".");
  var b = animal2.happenDate.split(".");
  a = Number(a[0] + a[1] + a[2]);
  b = Number(b[0] + b[1] + b[2]);
  return b - a;
}