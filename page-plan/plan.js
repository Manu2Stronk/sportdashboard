class Plan {
  constructor(buttonAddWorkout) {
    this.dropdown = dropdown;
  }
  create(divWorkout){
    console.log("create()");
    console.log(divWorkout);
    divWorkout.style.display = "block";
  }
  save(divWorkout, title){

    console.log("title: " + title);
    // let workout = new Workout();
    console.log("save()");
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

    return buttonElement;
  }
}
