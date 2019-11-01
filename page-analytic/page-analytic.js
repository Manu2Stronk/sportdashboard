class pageAnalytic{
  constructor(app){
    this._app = app;
  }
  async show(){
    let html = await fetch("page-analytic/page-analytic.html")
    let htmlContent = "";
    if(html.ok){
      htmlContent = await html.text();
    }
    this._app.setPageContent(htmlContent);
    this.loadAllActivities();
  }



async loadAllActivities() {
  var sLabelCalorie = 1;
  var oLabelCalorie = document.getElementById('calorieID');
  var today = new Date();
  var date1 = today.getDate();

  //load activities from the firebase firestore
  var oQuerySnapshot = await firebase.firestore().collection("activities").get();
  oQuerySnapshot.docs.forEach((oDocument) => {
    var oActivity = oDocument.data();
    var date2 = oActivity.date.getDate();
    var date3 = date1 + date2;
    this.getValues(oActivity, sLabelCalorie);
    sLabelCalorie = sLabelCalorie + oActivity.cal;
    console.log(date3);

  })
  oLabelCalorie.innerHTML = sLabelCalorie;
}
getValues(oActivity, sLabelCalorie){
  var oLabelHeart = document.getElementById('heartrateID'),
  sLabelHeart = oActivity.heart_rate;
  oLabelHeart.innerHTML = sLabelHeart;

  var oLabelDuration = document.getElementById('durationID'),
  sLabelDurationHH = oActivity.durationHH,
  sLabelDurationMM = oActivity.durationMM,
  sLabelDurationSS = oActivity.durationSS;
  oLabelDuration.innerHTML = sLabelDurationHH + ":" + sLabelDurationMM + ":" + sLabelDurationSS;

  // var oLabelCalorie = document.getElementById('calorieID');
  sLabelCalorie = sLabelCalorie + oActivity.cal;
  console.log(oActivity.cal, sLabelCalorie);
  // oLabelCalorie.innerHTML = sLabelCalorie;

  // var oLabelwklDuration = document.getElementById('wklDurationID'),
  // sLabelwklDuration = oActivity.cal;
  // oLabelwklDuration.innerHTML = sLabelwklDuration;

  // var oLabelwklDistance = document.getElementById('wklDistanceID'),
  // sLabelwklDistance = oActivity.cal;
  // oLabelwklDistance.innerHTML = sLabel;

  var oLabelDistance = document.getElementById('distanceID'),
  sLabelDistance = oActivity.distance;
  oLabelDistance.innerHTML = sLabelDistance;
}

}

AnalyticalPage = new pageAnalytic();

// setTimeout(() => {AnalyticalPage.loadAllActivities()}, 2000);
