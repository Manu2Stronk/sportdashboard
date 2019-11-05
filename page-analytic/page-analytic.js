class pageAnalytic {
  constructor(app) {
    this._app = app;
  }
  async show() {
    let html = await fetch("page-analytic/page-analytic.html")
    let htmlContent = "";
    if (html.ok) {
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
    //Declaration of current Time object, empty Time object, time help variables and count variable
    var today = new Date();
    var dateNow = today.getTime();
    var helpDateWkl = new Date(null);
    var helpDateLast = new Date(null);
    var helpHoursWkl = 0;
    var helpMinutesWkl = 0;
    var helpSecondsWkl = 0;
    var helpHoursLast = 0;
    var helpMinutesLast = 0;
    var helpSecondsLast = 0;
    var count = 0;

    // Object Array and index help variable to sort Activitie by date
    var objectArray = [];
    var i = 0;
    //load activities from the firebase firestore
    var oQuerySnapshot = await firebase.firestore().collection("activities").get();
    oQuerySnapshot.docs.forEach((oDocument) => {
      var oActivity = oDocument.data();
      var dateAct = oActivity.date.getTime();
      var dateTemp = dateNow - dateAct
      objectArray[i] = oActivity;
      i++
      // check if Activity happened in the last seven days and add data to form weekly variables
      if (dateTemp <= 604800000) {
        sLabelwklDistance += oActivity.distance;
        sLabelwklDurationHH += oActivity.durationHH;
        sLabelwklDurationMM += oActivity.durationMM;
        sLabelwklDurationSS += oActivity.durationSS;
        sLabelwklCal += oActivity.cal;
        sLabelwklHeart += oActivity.heart_rate;
        count++;
      }
    })
    // sort object array by Date and add newest activity to variables
    this.sortActivitiesByDate(objectArray);
    sLabelCalorie = objectArray[0].cal;
    sLabelDistance = objectArray[0].distance;
    sLabelHeart = objectArray[0].heart_rate;
    sLabelDurationHH = objectArray[0].durationHH;
    sLabelDurationMM = objectArray[0].durationMM;
    sLabelDurationSS = objectArray[0].durationSS;

    // Format the Time Variables through Date object in Universal Time for duration of activities from last seven days
    helpDateWkl.setUTCHours(sLabelwklDurationHH);
    helpDateWkl.setUTCMinutes(sLabelwklDurationMM);
    helpDateWkl.setUTCSeconds(sLabelwklDurationSS);
    helpHoursWkl = helpDateWkl.getUTCHours();
    helpMinutesWkl = helpDateWkl.getUTCMinutes();
    helpSecondsWkl = helpDateWkl.getUTCSeconds();

    // Format the Time Variables through Date object in Universal Time for duration of last activity
    helpDateLast.setUTCHours(sLabelDurationHH);
    helpDateLast.setUTCMinutes(sLabelDurationMM);
    helpDateLast.setUTCSeconds(sLabelDurationSS);
    helpHoursLast = helpDateLast.getUTCHours();
    helpMinutesLast = helpDateLast.getUTCMinutes();
    helpSecondsLast = helpDateLast.getUTCSeconds();

    // Write Data into the eight labels
    oLabelCalorie.innerHTML = sLabelCalorie + " kcal";
    oLabelHeart.innerHTML = sLabelHeart + " BPM";
    oLabelDuration.innerHTML = sLabelDurationHH + ":" + sLabelDurationMM + ":" + sLabelDurationSS;
    oLabelDistance.innerHTML = sLabelDistance + " km";
    oLabelwklDistance.innerHTML = sLabelwklDistance + " km";
    oLabelwklDuration.innerHTML = helpHoursWkl + ":" + helpMinutesWkl + ":" + helpSecondsWkl;
    oLabelDuration.innerHTML = helpHoursLast + ":" + helpMinutesLast + ":" + helpSecondsLast;
    oLAbelwklCal.innerHTML = sLabelwklCal + " kcal";
    if (count != 0) {
      oLabelwklHeart.innerHTML = Math.round(sLabelwklHeart / count) + " BPM";
    }
  }

  // Function to sort an object array by date
  sortActivitiesByDate(oArray) {
    var len = oArray.length;
    for (var i = len - 1; i >= 0; i--) {
      for (var j = 1; j <= i; j++) {
        if (oArray[j - 1].date < oArray[j].date) {
          var temp = oArray[j - 1];
          oArray[j - 1] = oArray[j];
          oArray[j] = temp;
        }
      }
    }
  }

}

AnalyticalPage = new pageAnalytic();

// setTimeout(() => {AnalyticalPage.loadAllActivities()}, 2000);
