class Plan {
  constructor() {}

  async loadAll(divWorkout, divListOfWorkouts, workouts, dropdown, id) {
    let oWorkout = new Workout();
    var oQuerySnapshotPlan = await firebase.firestore().collection("workouts").get();
    oQuerySnapshotPlan.docs.forEach((oDocument) => {
      oWorkout = this.load(divWorkout, divListOfWorkouts, workouts, dropdown, id, oDocument);
      this.addWorkout(workouts, oWorkout);
    })

    this.sortWorkouts(workouts);
    this.save(divWorkout, divListOfWorkouts, workouts, oWorkout, dropdown);
  }

  load(divWorkout, divListOfWorkouts, workouts, dropdown, id, oDocument) {
    var oWorkout = oDocument.data();
    id = oDocument.id;
    let title = oWorkout.title;
    let date = oWorkout.date;
    let distance = oWorkout.distance;
    if (distance === 0) {
      distance = "";
    }
    let duration = oWorkout.durationMM;
    if (duration === 0) {
      duration = "";
    }
    let kindOfSport = oWorkout.sports;
    let discription = oWorkout.description;
    oWorkout = new Workout(id, title, date, distance, duration, kindOfSport, discription);
    return oWorkout;
  }

  saveAll(workout) {
    let distance = this.arrayToString(Object.values(workout.distance));
    let duration = this.arrayToString(Object.values(workout.duration));
    if (distance === "") {
      distance = 0;
    }
    if (duration === "") {
      duration = 0;
    }
    var oActivity = {
      title: workout.title,
      date: workout.date,
      distance: distance,
      durationMM: duration,
      sports: workout.kindOfSport,
      discription: workout.discription
    }
    let setData = firebase.firestore().collection("workouts").doc().set(oActivity);
  }

  save(divWorkout, divListOfWorkouts, workouts, workout, dropdown) {
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
      divElement.setAttribute("data-id", workouts[i].id);
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
      try {
        if (this.arrayToString(Object.values(workouts[i].distance)) !== "" || workouts[i].distance !== "") {
          distanceValue = this.arrayToString(Object.values(workouts[i].distance)) + "km";
        }
        if (this.arrayToString(this.arrayToString(Object.values(workouts[i].duration))) !== "" || workouts[i].duration !== "") {
          distanceValue = this.arrayToString(this.arrayToString(Object.values(workouts[i].duration)) + "min");
        }
        if (this.arrayToString(Object.values(workouts[i].distance)) !== "" && this.arrayToString(Object.values(workouts[i].duration)) !== "") {
          distanceValue = this.arrayToString(Object.values(workouts[i].distance)) + "km / " + this.arrayToString(Object.values(workouts[i].duration)) + "min";
        }
      } catch {}
      try {
        if (workouts[i].distance !== "") {
          distanceValue = workouts[i].distance + "km";
        }
        if (workouts[i].duration !== "") {
          distanceValue = workouts[i].duration + "min";
        }
        if (workouts[i].duration !== "" && workouts[i].distance !== "") {
          distanceValue = workouts[i].distance + "km / " + workouts[i].duration + "min";
        }
      } catch {}
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
      buttonElement.addEventListener("click", (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute("data-id");
        firebase.firestore().collection("workouts").doc(id).delete();
        divElement.parentNode.removeChild(divElement);
        workouts.splice(workouts.indexOf(workout), 1);
      });
    }
  }

  create(divWorkout) {
    let block = this.arrayToString(Object.values(document.getElementById("divWorkout").style.display));
    if (block === "block") {
      divWorkout.style.display = "none";
    } else {
      divWorkout.style.display = "block";
    }
  }

  changeDistance() {
    let distance = "";
    distance = document.getElementById("distance").value;
    document.getElementById("textDistance").innerHTML = "Duration";
    document.getElementById("distance").id = "duration";
    document.getElementById("duration").placeholder = "0min";
    document.getElementById("duration").innerHTML = duration;
    return distance;
  }

  changeDuration() {
    let duration = "";
    duration = document.getElementById("duration").value;
    document.getElementById("textDistance").innerHTML = "Distance";
    document.getElementById("duration").id = "distance";
    document.getElementById("distance").placeholder = "0km";
    document.getElementById("distance").innerHTML = distance;
    return duration;
  }

  addWorkout(workouts, workout) {
    workouts.push(workout);
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
