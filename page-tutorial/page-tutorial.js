class tutorialPage {
  constructor(){
  }

async loadTutorial() {
  let nextBtn = document.getElementById("buttonForward");
  let backBtn = document.getElementById("buttonBack");
  let tutImg = document.getElementById("tutImg");
  let textDiv = document.getElementById("tutText");
  tutImg.src = "../page-tutorial/tutorial-images/firstImg.png";

  let imgSrcArray = ["../page-tutorial/tutorial-images/firstImg.png",
                     "../page-tutorial/tutorial-images/Activity-Page.PNG",
                     "../page-tutorial/tutorial-images/Activity-Page-Add.png",
                     "../page-tutorial/tutorial-images/Add-Activity-Enter-Data.png",
                     "../page-tutorial/tutorial-images/Add-Activity-Save.png",
                     "../page-tutorial/tutorial-images/Add-Activity-Back.png",
                     "../page-tutorial/tutorial-images/Activity-Page-Refresh.png",
                     "../page-tutorial/tutorial-images/Activity-Page-Delete.png",
                     "../page-tutorial/tutorial-images/Analytical-Page.PNG",
                     "../page-tutorial/tutorial-images/Plan-Page.PNG",
                     "../page-tutorial/tutorial-images/Plan-Page-Add-Workout.png",
                     "../page-tutorial/tutorial-images/Add-Data-To-Workout.png",
                     "../page-tutorial/tutorial-images/Save-Plan.png"];
console.log(imgSrcArray.length);

  var count = 0;

  nextBtn.addEventListener("click", function() {
    count++;
    if (count != imgSrcArray.length) {
      tutImg.src = imgSrcArray[count];
    }else {
      count = 0;
      tutImg.src = imgSrcArray[count]
    }
    console.log(count);
  });

  backBtn.addEventListener("click", function() {
    count--;
    if (count >= 0) {
      tutImg.src = imgSrcArray[count];
    }else {
      count = imgSrcArray.length-1;
      tutImg.src = imgSrcArray[count]
    }
    console.log(count);
  });

}







}


pageTutorial = new tutorialPage();
