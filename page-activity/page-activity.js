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

    /**
     * Loads the activities from the backend and renders them to the page
     * @public
     */
    async loadAllActivities() {
      //Clear the table
      var oActivityTable = document.getElementById("idActivityTableBody");
      while (oActivityTable.firstChild) {
        oActivityTable.removeChild(oActivityTable.firstChild);
      }

      //load activities from the firebase firestore
      var oQuerySnapshot = await firebase.firestore().collection("activities").get();
      oQuerySnapshot.docs.forEach((oDocument) => {
        var oActivity = oDocument.data();
        //console.log(oActivity);
        this.renderActivity(oActivity);
      })
    }

    /**
     * Renders a given activity to the activity table
     * @public
     */
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
      sRow += "<td>" + oActivity.heart_rate + "</td>";

      temp.innerHTML = sRow;
      oActivityTable.appendChild(temp);
    }

    /**
     * Opens the add activity form/Modal
     * @public
     */
    openAddActivityModal() {
        var oModal = document.getElementById("idAddActivityModal");
        oModal.style.display = "block";
    }

    /**
     * Closes the add activity form/Modal
     * @public
     */
    closeAddActivityModal() {
      var oModal = document.getElementById("idAddActivityModal");
      oModal.style.display = "none";
      oModal.keypress(function(e) {
        if (e.keyCode === 27) {
        oModal("#popdiv").fadeOut(500);
    }
});
    }

    /**
     * Saves the activity and reloads the table
     * @public
     */
    onSaveNewActivity(oEvent) {
      oEvent.preventDefault(); //prevents default reload/redirect mechanic

      var oActivity = {
        name: document.getElementById("idAddActivityForm-nameField").value,
        type: document.getElementById("idAddActivityForm-typeField").selectedOptions[0].text,
        distance: parseFloat(document.getElementById("idAddActivityForm-distanceField").value),
        cal: parseInt(document.getElementById("idAddActivityForm-caloriesField").value),
        date: new Date(document.getElementById("idAddActivityForm-dateField").value),

        durationHH: parseFloat(document.getElementById("idAddActivityForm-time-hour").value),
        durationMM: parseFloat(document.getElementById("idAddActivityForm-time-minute").value),
        durationSS: parseFloat(document.getElementById("idAddActivityForm-time-second").value),

        heart_rate: parseInt(document.getElementById("idAddActivityForm-heartField").value),
      }

      console.log(oActivity);
      firebase.firestore().collection("activities").doc().set(oActivity)
        .then(() => {
            this.closeAddActivityModal();
            this.loadAllActivities();
        });

        return false;
    };

    /* Formatter */

    /**
     * Format function for the date
     * @protcted
     */
    formatDate(oActivity) {
        var monthNames = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        var day = oActivity.date.getDate(),
            monthIndex = oActivity.date.getMonth();
        return monthNames[monthIndex] + " "+ day;
    }

    /**
     * Format function for the duration
     * @protcted
     */
    formatDuration(oActivity) {
      return oActivity.durationHH + ":" + oActivity.durationMM + ":" + oActivity.durationSS;
    }

    /**
     * Format function for the average Speed
     * @protcted
     */
    formatAverageSpeed(oActivity) {
      return this.calculateAverageSpeed(oActivity) + " km/h";
    }

    /**
     * Calculation function for the average speed
     * @protcted
     */
    calculateAverageSpeed(oActivity) {
      var iDuraitonInSeconds = oActivity.durationHH * 60 * 60 +
          oActivity.durationMM * 60 +
          oActivity.durationSS,
          iAvgSpeed = oActivity.distance / iDuraitonInSeconds * 3600;

      return Math.floor(iAvgSpeed * 100) / 100;
    }
}

ActivityPage = new pageActivity();

// Timeout to load the data from the database -> duration ~68ms
setTimeout(() => {ActivityPage.loadAllActivities()}, 2000);
