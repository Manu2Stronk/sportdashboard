class Plan {
  constructor() {
    // this.dropdown = dropdown;
  }

  create(divWorkout) {
    console.log("plan.create()");

    let block = this.arrayToString(Object.values(document.getElementById("divWorkout").style.display));
    if (block === "block") {
      divWorkout.style.display = "none";
    } else {
      divWorkout.style.display = "block";
    }
  }

  changeDistance() {
    console.log("plan.changeDistance()");

    let distance = "";
    distance = document.getElementById("distance").value;
    console.log("change() distance: " + distance);
    document.getElementById("textDistance").innerHTML = "Duration";
    document.getElementById("distance").id = "duration";
    document.getElementById("duration").placeholder = "0min";
    document.getElementById("duration").innerHTML = duration;

    return distance;
  }

  changeDuration() {
    console.log("plan.changeDuration()");

    let duration = "";
    duration = document.getElementById("duration").value;
    console.log("change() duration: " + duration);
    document.getElementById("textDistance").innerHTML = "Distance";
    document.getElementById("duration").id = "distance";
    document.getElementById("distance").placeholder = "0km";
    document.getElementById("distance").innerHTML = distance;

    return duration;
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
    console.log("plan.save()");

    //delete All Elements of dropdown
    while (dropdown.firstChild) {
      dropdown.removeChild(dropdown.firstChild);
    }

    divWorkout.style.display = "none";

    //creating new dropdown by generating new elements from each workout of workouts
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
      let distanceValue = "0km / 0min";

      if (this.arrayToString(Object.values(workouts[i].distance)) !== "") {
        distanceValue = this.arrayToString(Object.values(workouts[i].distance)) + "km";
      }
      if (this.arrayToString(this.arrayToString(Object.values(workouts[i].duration))) !== "") {
        distanceValue = this.arrayToString(this.arrayToString(Object.values(workouts[i].duration)) + "min");
      }
      if (this.arrayToString(Object.values(workouts[i].distance)) !== "" && this.arrayToString(Object.values(workouts[i].duration)) !== "") {
        distanceValue = this.arrayToString(Object.values(workouts[i].distance)) + "km / " + this.arrayToString(Object.values(workouts[i].duration)) + "min";
      }

      // console.log("was drin steht: " + this.arrayToString(Object.values(workouts[i].distance)) !== "" && this.arrayToString(Object.values(workouts[i].duration)) !== "");
      console.log("distanceValue: " + distanceValue);
      distancElement.className += "input_Distance inputGeneral";
      distancElement.type = "text";
      distancElement.disabled = true;
      distancElement.value += distanceValue;

      let kindOfSportElement = document.createElement("input");
      let kindOfSportValue = "";
      kindOfSportValue = this.arrayToString(Object.values(workouts[i].kindOfSport));
      kindOfSportElement.className += "inputKindOfSport inputGeneral";
      kindOfSportElement.type = "text";
      kindOfSportElement.disabled = true;

      if (kindOfSportValue === "Bike") {
        kindOfSportElement.value += "🚴";
      }
      if (kindOfSportValue === "Run") {
        kindOfSportElement.value += "🏃";
      }
      if (kindOfSportValue === "Swim") {
        kindOfSportElement.value += "🏊";
      }
      if (kindOfSportValue === "Athletics") {
        kindOfSportElement.value += "🏋️";
      }
      let lineElement = document.createElement("hr");

      // add to dropdown
      dropdown.appendChild(divElement);
      divElement.appendChild(buttonElement);
      divElement.appendChild(dateElement);
      divElement.appendChild(lineElement);
      divElement.appendChild(kindOfSportElement);
      divElement.appendChild(distancElement);
      divElement.appendChild(titleElement);

      //add delete function to buttonElement
      buttonElement.addEventListener("click", () => {
        divElement.parentNode.removeChild(divElement);
        workouts.splice(workouts.indexOf(workout), 1);
        for (var i = 0; i < workouts.length; i++) {
          console.log("workoutsDelete: " + Object.values(Object.values(workouts[i])));
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

  getDistance(distance) {
    try {
      distance = document.getElementById("distance").value;
    } catch {}
    return distance;
  }

  getDuration(duration) {
    try {
      duration = document.getElementById("duration").value;
      console.log("duration in get Duration: " + duration);
    } catch {}
    return duration;
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
  // Checking whether some inputs missing
  checkValues(title, date, divWorkout, divListOfWorkouts, workouts, workout, dropdown) {
    document.getElementById("workoutTitle").classList.remove("transformMissingInput");
    document.getElementById("date").classList.remove("transformMissingInput");
    if (title !== "" && date !== "") {
      this.addWorkout(workouts, workout);
      this.sortWorkouts(workouts);
      this.save(divWorkout, divListOfWorkouts, workouts, workout, dropdown);
    } else if (title !== "") {
      // document.getElementById("date").classList.remove("dateclass");
      document.getElementById("date").classList.add("transformMissingInput");
    } else if (date !== "") {
      // document.getElementById("workoutTitle").classList.remove("workoutTitle");
      document.getElementById("workoutTitle").classList.add("transformMissingInput");
    } else {
      // document.getElementById("date").classList.remove("dateclass");
      document.getElementById("date").classList.add("transformMissingInput");
      // document.getElementById("workoutTitle").classList.remove("workoutTitle");
      document.getElementById("workoutTitle").classList.add("transformMissingInput");
    }
  }

  //function to turn arrays to string
  arrayToString(array) {
    let string = "";
    for (var i = 0; i < array.length; i++) {
      string = string + array[i];
    }
    return "" + string;
  }
}
