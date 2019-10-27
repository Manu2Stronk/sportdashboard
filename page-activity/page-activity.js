class pageActivity{
  constructor(app){
    this._app = app;
  }
  async show(){
    let html = await fetch("page-activity/page-activity.html")
    let htmlContent = "";
    if(html.ok){
      htmlContent = await html.text();
    }
    this._app.setPageContent(htmlContent);

    this.loadAllActivities();
  }

    async loadAllActivities() {
      //clear the table
      var oActivityTable = document.getElementById("idActivityTableBody");
      while (oActivityTable.firstChild) {
        oActivityTable.removeChild(oActivityTable.firstChild);
      }

      //load activities from the firebase firestore
      var oQuerySnapshot = await firebase.firestore().collection("activities").get();
      oQuerySnapshot.docs.forEach((oDocument) => {
        var oActivity = oDocument.data();
        console.log(oActivity);
        this.renderActivity(oActivity);
      })
    }

    renderActivity(oActivity) {
      var oActivityTable = document.getElementById("idActivityTableBody"),
          temp = document.createElement('tr'),
          sRow = "";

      sRow += "<td>" + this.formatDate(oActivity) + "<br/>" + oActivity.date.getFullYear() + "</td>";
      sRow += "<td>" + oActivity.name + "<br/>" + oActivity.type + "</td>";
      sRow += "<td>" + oActivity.distance + " km" + "</td>";
      sRow += "<td>" + this.formatDuration(oActivity) + "</td>";
      sRow += "<td>" + this.formatAverageSpeed(oActivity) + "</td>";
      sRow += "<td>" + oActivity.cal + " kcal" + "</td>";

      temp.innerHTML = sRow;
      oActivityTable.appendChild(temp);
    }

    formatDate(oActivity) {
        var monthNames = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        var day = oActivity.date.getDate(),
            monthIndex = oActivity.date.getMonth();
        return monthNames[monthIndex] + " "+ day;
    }


    formatDuration(oActivity) {
      return oActivity.dauerHH + ":" + oActivity.dauerMM + ":" + oActivity.dauerSS;
    }

    formatAverageSpeed(oActivity) {
      return this.calculateAverageSpeed(oActivity) + " km/h";
    }

    calculateAverageSpeed(oActivity) {
      var iDuraitonInSeconds = oActivity.dauerHH * 60 * 60 +
          oActivity.dauerMM * 60 +
          oActivity.dauerSS,
          iAvgSpeed = oActivity.distance / iDuraitonInSeconds * 3600;

      return Math.floor(iAvgSpeed * 100) / 100;
    }
}

ActivityPage = new pageActivity();

setTimeout(() => {ActivityPage.loadAllActivities()}, 2000);
