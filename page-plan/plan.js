class Plan {
  constructor(buttonAddWorkout) {
    this.dropdown = dropdown;
  }
  create(){
    console.log("plan running");

    // def div-Element
    let divElement = document.createElement("div");
    divElement.className += "workoutElement";
    // def buttonElement
    let buttonElement = document.createElement("input");
    buttonElement.className += "buttonCloseWorkout";
    buttonElement.value += "x";
    buttonElement.type  = "button";

    // add to dropdown
    dropdown.appendChild(divElement);
    divElement.appendChild(buttonElement);
  }
}
