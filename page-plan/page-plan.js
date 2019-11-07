class pagePlan {
  constructor(app) {
    this._app = app;
  }
  async show() {
    console.log("page-plan: show() running");
    let html = await fetch("page-plan/page-plan.html")
    let htmlContent = "";
    if (html.ok) {
      htmlContent = await html.text();
    }
    this._app.setPageContent(htmlContent);

    this.loadAllActivities();
  }

  async loadAllActivities() {
      //load activities from the firebase firestore
      var oQuerySnapshotPlan = await firebase.firestore().collection("workouts").get();
      oQuerySnapshot.docs.forEach((oDocument) => {
        //Funktion die Pro Eintrag ausgeführt werden soll
      })
    }

    console.log("page-plan.html running");
    let buttonAddWorkout = document.getElementById("buttonAddWorkout");
    let dropdown = document.getElementById("dropdown");
    let divWorkout = document.getElementById("divWorkout");
    let divListOfWorkouts = document.getElementById("divListOfWorkouts");
    let textDistance = document.getElementById("textDistance").textContent;

    console.log("textDistance: " + textDistance);
    let distance = "";
    let duration = "";

    let plan = new Plan();
    let workouts = new Array();
    let workout = new Workout();
    let id = 0;
    // plan.getInputs();
    // plan.save(divWorkout, divListOfWorkouts, workouts, workout);

    buttonAddWorkout.addEventListener("click", () => {
      console.log("buttonAddWorkout clicked");
      // let title = document.getElementById("workoutTitle").value;
      // console.log("title:" + title);
      let buttonElement = plan.create(divWorkout);
    });

    buttonSave.addEventListener("click", () => {
      console.log("buttonSave clicked");
      let title = plan.getTitle();
      let date = plan.getDate();
      distance = plan.getDistance(distance);
      duration = plan.getDuration(duration);
      console.log("Duration: " + duration);
      let kindOfSport = plan.getKindOfSprot();
      let description = plan.getDescription();
      let workout = new Workout(id, title, date, distance, duration, kindOfSport, description);
      id = id + 1;
      console.log("workout: " + Object.values(workout));
      plan.checkValues(title, date, divWorkout, divListOfWorkouts, workouts, workout, dropdown);
    });

    buttonChangeLeft.addEventListener("click", () => {
      textDistance = document.getElementById("textDistance").textContent;
      if (textDistance.trim() === "Distance") {
        try {
          distance = plan.changeDistance();
          console.log("distance: " + distance);
        } catch {}
      }
      if (textDistance.trim() === "Duration") {
        try {
          duration = plan.changeDuration();
        } catch {}
      }
    });
    buttonChangeRight.addEventListener("click", () => {
      textDistance = document.getElementById("textDistance").textContent;
      textDistance.trim();
      if (textDistance.trim() === "Distance") {
        try {
          distance = plan.changeDistance();
          console.log("_distance: " + distance);
        } catch {}
      }
      if (textDistance.trim() === "Duration") {
        try {
          duration = plan.changeDuration();
          console.log("_duration: " + duration);
        } catch {}
      }
    });
  }
}
