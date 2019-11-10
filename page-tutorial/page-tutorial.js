
class pageTutorial{
  constructor(app){
    this._app = app;
    pageTutorial.loadTutorialImgs();
    pageTutorial.loadTutorialText();
  }

async show(){
    let html = await fetch("page-tutorial/page-tutorial.html")
    let htmlContent = "";
    if(html.ok){
      htmlContent = await html.text();
    }
    this._app.setPageContent(htmlContent);
  }

async loadTutorialImgs() {
  let nextBtn = document.getElementById("buttonForward");
  let backBtn = document.getElementById("buttonBack");
  let tutImg = document.getElementById("tutImg");
  tutImg.src = "../page-tutorial/tutorial-images/Start-Page.PNG";
  let imgSrcArray = ["../page-tutorial/tutorial-images/Start-Page.PNG",
                     "../page-tutorial/tutorial-images/Start-Page-Activity.png",
                     "../page-tutorial/tutorial-images/Activity-Page.PNG",
                     "../page-tutorial/tutorial-images/Activity-Page-Add.png",
                     "../page-tutorial/tutorial-images/Add-Activity-Enter-Data.png",
                     "../page-tutorial/tutorial-images/Add-Activity-Save.png",
                     "../page-tutorial/tutorial-images/Add-Activity-Back.png",
                     "../page-tutorial/tutorial-images/Activity-Page-Refresh.png",
                     "../page-tutorial/tutorial-images/Activity-Page-Delete.png",
                     "../page-tutorial/tutorial-images/Start-Page-Analytics.png",
                     "../page-tutorial/tutorial-images/Analytical-Page.PNG",
                     "../page-tutorial/tutorial-images/Start-Page-Plan.png",
                     "../page-tutorial/tutorial-images/Plan-Page-Add-Workout.png",
                     "../page-tutorial/tutorial-images/Add-Data-To-Workout.png",
                     "../page-tutorial/tutorial-images/Save-Plan.png",
                     "../page-tutorial/tutorial-images/Save-Plan.png"];
  let countImg = 0;

  nextBtn.addEventListener("click", function() {
    countImg++;
    if (countImg != imgSrcArray.length) {
      tutImg.src = imgSrcArray[countImg];
    }else {
      countImg = 0;
      tutImg.src = imgSrcArray[countImg]
    }
    console.log(countImg);
  });

  backBtn.addEventListener("click", function() {
    countImg--;
    if (countImg >= 0) {
      tutImg.src = imgSrcArray[countImg];
    }else {
      countImg = imgSrcArray.length-1;
      tutImg.src = imgSrcArray[countImg]
    }
  });

}

async loadTutorialText(){
  let nextBtn = document.getElementById("buttonForward");
  let backBtn = document.getElementById("buttonBack");
  let textDiv = document.getElementById("tutText");
  textDiv.innerHTML = "Welcome to our Sportdashboard 😊. This tutorial is here to help you get an overview of the features of our website. You can use the two buttons at the start of the page to navigate through this tutorial. To skip this tutorial just click one of the links at the very top of our page. So what are you waiting for, click on the forward button";
  let tutText = ["Welcome to our Sportdashboard 😊. This tutorial is here to help you get an overview of the features of our website. You can use the two buttons at the start of the page to navigate through this tutorial. To skip this tutorial just click one of the links at the very top of our page. So what are you waiting for, click on the forward button.",
                 "The first thing we would like you to do is click on the activity link as shown in the picture.",
                 "This page shows you all your past activities. This includes the name of your activity and the date on which it took place. The duration and distance of your activity is also displayed as well as your average speed. Finally, it also shows your average heartrate and the number of calories you burned. Now to the next step.",
                 "You can add a new Activity using the button at the top right-hand side.",
                 "This is where you add the Data of your last activity. The data you add here will also be displayed on the activity page you saw in the last two steps. Now click on forward again to go ahead.",
                 "If you are happy with your entries you can use the save button, as highlighted in the demo picture.",
                 "If you don’t want to save your entries however you can back out using the back button, as highlighted in the demo picture.",
                 "Now to see your new activity you need to refresh the page. You can do this by clicking the highlighted button as shown in the demo picture.",
                 "If you want to delete one of your activities you can do so by clicking on the delete button, as shown in our image",
                 "Now we´re going to move on to our analytics page. To do so plaese click on the analytics link at the top of our wesite.",
                 "The Analytical page shows you two types of data. The first four entries represent your last activity. The last four shows data from activities from the last seven days.",
                 "Now to move on to the final page, click on the plan link on the top of our page.",
                 "This page lets you create a workout plan. To do this click on the add Workout button.",
                 "Here is where you enter the data of the workout.",
                 "To save this workout simply click on the save button on the bottom right.",
                 "Okay that’s it. We hope you have fun on our Sportdashboard 😊"];

  let countText = 0;

  nextBtn.addEventListener("click", function() {
    countText++;
    if (countText != tutText.length) {
      textDiv.innerHTML = tutText[countText];
    }else {
      countText = 0;
      textDiv.innerHTML = tutText[countText]
    }
  });

  backBtn.addEventListener("click", function() {
    countText--;
    if (countText >= 0) {
      textDiv.innerHTML = tutText[countText];
    }else {
      countImg = tutText.length-1;
      textDiv.innerHTML = tutText[countText]
    }
  });
}
}
ActivityPage = new pageActivity();
