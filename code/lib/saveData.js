module.exports.saveData =function (r) {
  var it = new Object();
  it.happenDate = r.happenDt.replace(/([0-9]{4})([0-9]{2})([0-9]{2})/, "$1.$2.$3");
  it.happenPlace = r.happenPlace
  it.kind = r.kindCd.replace("[고양이] ","").replace("한국", "").replace("페르시안-","").replace("[개] ","")
  it.color = r.colorCd
  it.age = r.age
  it.weight = r.weight
  it.noticeStart = r.noticeSdt.replace(/([0-9]{4})([0-9]{2})([0-9]{2})/, "$1.$2.$3");
  it.noticeEnd = r.noticeEdt.replace(/([0-9]{4})([0-9]{2})([0-9]{2})/, "$1.$2.$3");
  it.profile = r.popfile
  it.neuterYN = r.neuterYn == "U" ? "미상" : r.neuterYn
  it.specialMark = r.specialMark
  it.carePlace = r.careNm
  it.careNumber = r.careTel
  it.careAddr = r.careAddr
  it.orgName = r.orgNm
  it.chargeName = r.chargeNm
  it.chargeNumber = r.officetel
  if (r.sexCd == "U") r.sexCd = "미상"
  else if (r.sexCd == "M") r.sexCd = "♂"
  else r.sexCd = "♀"
  it.gender = r.sexCd
  it.nowState = r.processState.replace("종료(","").replace(")","")
  it.link = "https://www.animal.go.kr/portal_rnl/abandonment/public_list.jsp";
  return it;
}
