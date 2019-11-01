class Plan {
  constructor() {
    // this.dropdown = dropdown;
  }

  create(divWorkout) {
    console.log("plan.create()");
    console.log(divWorkout);
    divWorkout.style.display = "block";
  }

  change() {
    console.log("plan.change()");
    let textDistance = document.getElementById("textDistance");

    if (document.getElementById("distance") !== "duration") {
      console.log("if");
      let inputDistance = document.getElementById("distance");
      inputDistance.setAttribute("id" , "duration");
      textDistance.innerHTML = "Duration";
      // inputDistance.placeholder = "0min";

    } else {
      console.log("else");
      let inputDuration = document.getElementById("duration");
      inputDuration.setAttribute("id", "distance");
      textDistance.innerHTML = "Distance";
      // inputDistance.placeholder = "0km";
    }

  }

  addWorkout(workouts, workout) {
    console.log("plan.addWorkout()");
    workouts.push(workout);
    for (var i = 0; i < workouts.length; i++) {
      console.log("workouts: " + Object.values(Object.values(workouts[i])));
    }
  }

  sortWorkouts(workouts) {
    var len = workouts.length;
    for (var i = len - 1; i >= 0; i--) {
      for (var j = 1; j <= i; j++) {
        if (workouts[j - 1].date > workouts[j].date) {
          var temp = workouts[j - 1];
          workouts[j - 1] = workouts[j];
          workouts[j] = temp;
        }
      }
    }
    for (var i = 0; i < workouts.length; i++) {
      console.log("workouts_sort: " + Object.values(Object.values(workouts[i])));
    }
  }

  save(divWorkout, divListOfWorkouts, workouts, workout, dropdown) {
    // let workout = new Workout();
    console.log("plan.save()");

    //delete All Elements of dropdown
    while (dropdown.firstChild) {
      dropdown.removeChild(dropdown.firstChild);
    }

    divWorkout.style.display = "none";
    for (var i = 0; i < workouts.length; i++) {
      // def div-Element
      let divElement = document.createElement("div");
      divElement.className += "workoutElement";
      divElement.id = "workoutElement";
      // def buttonElement
      let buttonElement = document.createElement("input");
      buttonElement.className += "buttonCloseWorkout";
      buttonElement.value += "x";
      buttonElement.type = "button";
      buttonElement.id = "buttonCloseWorkout";

      let titleElement = document.createElement("input");
      titleElement.className += "inputTitle inputGeneral";
      titleElement.type = "text";
      titleElement.disabled = true;
      let inputValue = Object.values(Object.values(workouts[i].title));
      let placeholder = this.arrayToString(inputValue);
      titleElement.value += placeholder;

      let dateElement = document.createElement("input");
      dateElement.className += "inputDate inputGeneral";
      dateElement.type = "text";
      dateElement.disabled = true;
      inputValue = Object.values(Object.values(workouts[i].date));
      placeholder = this.arrayToString(inputValue);
      dateElement.value += placeholder + ":";

      let distancElement = document.createElement("input");
      let distanceValue = "";
      distanceValue = this.arrayToString(Object.values(workouts[i].distance)) + "km / " + this.arrayToString(Object.values(workouts[i].duration)) + "min";
      distancElement.className += "inputDistance inputGeneral";
      distancElement.type = "text";
      distancElement.disabled = true;
      distancElement.value += distanceValue;

      let lineElement = document.createElement("hr");

      // add to dropdown
      dropdown.appendChild(divElement);
      divElement.appendChild(buttonElement);
      divElement.appendChild(dateElement);
      divElement.appendChild(lineElement);
      divElement.appendChild(titleElement);
      divElement.appendChild(distancElement);

      buttonElement.addEventListener("click", () => {
        divElement.parentNode.removeChild(divElement);
        workouts.splice(workouts.indexOf(workout), 1);
        for (var i = 0; i < workouts.length; i++) {
          console.log("workouts_delete: " + Object.values(Object.values(workouts[i])));
        }
      });
    }
  }

  getTitle() {
    return document.getElementById("workoutTitle").value;
  }

  getDate() {
    return document.getElementById("date").value;
  }

  getDistance() {
    let distance = "";
    try {
      distance = document.getElementById("distance").value;
    } catch {}
    return distance;
  }

  getDuration() {
    let duration = "";
    try {
      duration = document.getElementById("duration").value;
    } catch {}
    return duration = "";
  }

  getKindOfSprot() {
    var radios = document.getElementsByName('radio');
    let kindOfSport = "";
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        switch (i) {
          case 0:
            kindOfSport = "Bike";
            break;
          case 1:
            kindOfSport = "Run";
            break;
          case 2:
            kindOfSport = "Swim";
            break;
          case 3:
            kindOfSport = "Athletics";
            break;
          default:
            console.log("Radiogroup: nothing checked");
        }
        break;
      }
    }
    return kindOfSport;
  }

  getDescription() {
    return document.getElementById("discription").value;
  }

  arrayToString(array) {
    let string = "";
    for (var i = 0; i < array.length; i++) {
      string = string + array[i];
    }
    return "" + string;
  }

}
