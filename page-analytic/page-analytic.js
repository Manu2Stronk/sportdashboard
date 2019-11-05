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
    this.getAndLoadData();
  }


// Receive Data from Firebase and insert it into Labels on Analytical Page
async getAndLoadData() {
  //Declaration of Label variables
  var oLabelCalorie = document.getElementById('calorieID');
  var oLabelHeart = document.getElementById('heartrateID');
  var oLabelDuration = document.getElementById('durationID');
  var oLabelDistance = document.getElementById('distanceID');
  var oLabelwklDuration = document.getElementById('wklDurationID');
  var oLabelwklDistance = document.getElementById('wklDistanceID');
  var oLabelwklHeart = document.getElementById('wklHeartID');
  var oLAbelwklCal = document.getElementById('wklCalID');
  // Declaration of Label help variables
  var sLabelCalorie = 0;
  var sLabelHeart = 0;
  var sLabelDurationHH = 0;
  var sLabelDurationMM = 0;
  var sLabelDurationSS = 0;
  var sLabelwklDurationHH = 0;
  var sLabelwklDurationMM = 0;
  var sLabelwklDurationSS = 0;
  var sLabelDistance = 0;
  var sLabelwklDistance = 0;
  var sLabelwklHeart = 0;
  var sLabelwklCal = 0;
  //Declaration of current Time object, empty Time object and count variable
  var today = new Date();
  var dateNow = today.getTime();
  var count = 0;
  var helpdate = new Date(null);

  //load activities from the firebase firestore
  var oQuerySnapshot = await firebase.firestore().collection("activities").get();
  oQuerySnapshot.docs.forEach((oDocument) => {
    var oActivity = oDocument.data();
    var dateAct = oActivity.date.getTime();
    var dateTemp = dateNow - dateAct
    if (dateTemp <= 604800000) {
      sLabelwklDistance += oActivity.distance;
      sLabelwklDurationHH += oActivity.durationHH;
      sLabelwklDurationMM += oActivity.durationMM;
      sLabelwklDurationSS += oActivity.durationSS;
      sLabelwklCal += oActivity.cal;
      sLabelwklHeart += oActivity.heart_rate;
      count++;
    }
    sLabelCalorie = oActivity.cal;
    sLabelDistance = oActivity.distance;
    sLabelHeart = oActivity.heart_rate;
    sLabelwklDurationHH += oActivity.durationHH;
    sLabelwklDurationMM += oActivity.durationMM;
    sLabelwklDurationSS += oActivity.durationSS;

  })
  var helpdate = new Date(null);
  helpdate.setHours(sLabelwklDurationHH);
  helpdate.setMinutes(sLabelwklDurationMM);
  helpdate.setSeconds(sLabelwklDurationSS);
  var helphours = helpdate.getHours();
  var helpminutes = helpdate.getMinutes();
  var helpseconds = helpdate.getSeconds();


  oLabelCalorie.innerHTML = sLabelCalorie + "kcal";
  oLabelHeart.innerHTML = sLabelHeart + "BPM";
  oLabelDuration.innerHTML = sLabelDurationHH + ":" + sLabelDurationMM + ":" + sLabelDurationSS;
  oLabelDistance.innerHTML = sLabelDistance + "km";
  oLabelwklDistance.innerHTML = sLabelwklDistance + "km";
  oLabelwklDuration.innerHTML = helphours + ":" + helpminutes + ":" + helpseconds;
  oLAbelwklCal.innerHTML = sLabelwklCal + "kcal";
  if (count != 0) {
    oLabelwklHeart.innerHTML = Math.round(sLabelwklHeart / count);
    // sLabelwklDurationHH  + ":" + sLabelwklDurationMM + ":" + sLabelwklDurationSS
  }


}

}

AnalyticalPage = new pageAnalytic();

// setTimeout(() => {AnalyticalPage.loadAllActivities()}, 2000);
