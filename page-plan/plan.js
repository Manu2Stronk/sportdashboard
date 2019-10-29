class Plan {
  constructor() {
    // this.dropdown = dropdown;
  }

  create(divWorkout) {
    console.log("plan.create()");
    console.log(divWorkout);
    divWorkout.style.display = "block";
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
  }


  save(divWorkout, divListOfWorkouts, workouts, workout) {
    // let workout = new Workout();
    console.log("plan.save()");
    divWorkout.style.display = "none";
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
    titleElement.className += "inputTitle";
    titleElement.type = "text";
    titleElement.disabled = true;
    titleElement.id = "titleElement";
    titleElement.value += "test";
    //document.getElementById("titleElement").innerHTML = "test";

    // add to dropdown
    dropdown.appendChild(divElement);
    divElement.appendChild(buttonElement);
    divElement.appendChild(titleElement);

    buttonElement.addEventListener("click", () => {
      divElement.parentNode.removeChild(divElement);
      workouts.splice(workouts.indexOf(workout), 1);
      for (var i = 0; i < workouts.length; i++) {
        console.log("workouts_delete: " + Object.values(Object.values(workouts[i])));
      }
    });


  }

  getInputs() {
    // get Information from inputs
    let title = document.getElementById("workoutTitle").value;
    let date = document.getElementById("date").value;
    let distance = "";
    let duration = "";
    try {
      distance = document.getElementById("distance").value;
    } catch {

    }
    try {
      duration = document.getElementById("duration").value;
    } catch {}
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
    let description = document.getElementById("discription").value;
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
}
