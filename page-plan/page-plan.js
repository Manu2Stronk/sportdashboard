class pagePlan{
  constructor(app){
    this._app = app;
  }
  async show(){
    console.log("page-plan: show() running");
    let html = await fetch("page-plan/page-plan.html")
    let htmlContent = "";
    if(html.ok){
      htmlContent = await html.text();
    }
    this._app.setPageContent(htmlContent);

    this.loadAllActivities();
  }

  async loadAllActivities() {
    console.log("page-plan.html running");
    let buttonAddWorkout = document.getElementById("buttonAddWorkout");
    let dropdown = document.getElementById("dropdown");
    let divWorkout = document.getElementById("divWorkout");
    let divListOfWorkouts = document.getElementById("divListOfWorkouts");

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
      let distance = plan.getDistance();
      let duration = plan.getDuration();
      let kindOfSport = plan.getKindOfSprot();
      let description = plan.getDescription();
      let workout = new Workout(id, title, date, distance, duration, kindOfSport, description);
      id = id + 1;
      console.log("workout: " + Object.values(workout));

      plan.addWorkout(workouts, workout);
      plan.sortWorkouts(workouts);
      plan.save(divWorkout, divListOfWorkouts, workouts, workout, dropdown);
    });

    buttonChangeLeft.addEventListener("click", () => {
      plan.change();
    });
    buttonChangeRight.addEventListener("click", () => {
      plan.change();
    });
  }
}
