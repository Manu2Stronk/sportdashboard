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

  //load activities from the firebase firestore
  var oQuerySnapshot = await firebase.firestore().collection("activities").get();
  oQuerySnapshot.docs.forEach((oDocument) => {
    var oActivity = oDocument.data();
    this.getValues(oActivity);
    var calories
  })
}
getValues(oActivity){
  var oLabelHeart = document.getElementById('heartrateID'),
  sLabelHeart = oActivity.heart_rate;
  oLabelHeart.innerHTML = sLabelHeart;

  var oLabelDuration = document.getElementById('durationID'),
  sLabelDurationHH = oActivity.durationHH,
  sLabelDurationMM = oActivity.durationMM,
  sLabelDurationSS = oActivity.durationSS;
  oLabelDuration.innerHTML = sLabelDurationHH + ":" + sLabelDurationMM + ":" + sLabelDurationSS;

  var oLabelCalorie = document.getElementById('calorieID'),
  sLabelCalorie = oActivity.cal;
  oLabelCalorie.innerHTML = sLabelCalorie;

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

setTimeout(() => {AnalyticalPage.loadAllActivities()}, 2000);
