class Plan {
  constructor() {
    // this.dropdown = dropdown;
  }

  create(divWorkout){
    console.log("plan.create()");
    console.log(divWorkout);
    divWorkout.style.display = "block";
  }

  addWorkout(workouts, workout){
    console.log("plan.addWorkout()");
    workouts[Object.values(workout.id)] = workout;
  }

  order(){

  }

  save(divWorkout){
    // let workout = new Workout();
    console.log("plan.save()");
    divWorkout.style.display = "none";
    // def div-Element
    let divElement = document.createElement("div");
    divElement.className += "workoutElement";
    // def buttonElement
    let buttonElement = document.createElement("input");
    buttonElement.className += "buttonCloseWorkout";
    buttonElement.value += "x";
    buttonElement.type  = "button";
    buttonElement.id = "buttonCloseWorkout";
    // add to dropdown
    dropdown.appendChild(divElement);
    divElement.appendChild(buttonElement);
  }
}
