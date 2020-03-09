var dates = require('dates');

module.exports.inputDate = function (dateTimeExpression) {
  var when = []
  
  var whenStart;
  var whenEnd = new dates.ZonedDateTime("Asia/Seoul").format("yyyyMMdd");
  if (dateTimeExpression) {
    if (dateTimeExpression.date) {
      // Add time endpoints using the beginning and end of the day
      whenStart = dates.ZonedDateTime.fromDate(dateTimeExpression.date).format("yyyyMMdd");
      whenEnd = dates.ZonedDateTime.fromDate(dateTimeExpression.date).format("yyyyMMdd");
    }
    else if (dateTimeExpression.dateInterval) {
      // Add time endpoints using start time of first day and end time of last day.
      whenStart = dates.ZonedDateTime.of(
        dateTimeExpression.dateInterval.start.year,
        dateTimeExpression.dateInterval.start.month,
        dateTimeExpression.dateInterval.start.day).format("yyyyMMdd");
      whenEnd = dates.ZonedDateTime.of(
        dateTimeExpression.dateInterval.end.year,
        dateTimeExpression.dateInterval.end.month,
        dateTimeExpression.dateInterval.end.day,
        23, 59, 59).format("yyyyMMdd");
    }
  }

  when[0] = whenStart;
  when[1] = whenEnd;


  
  return when;
}