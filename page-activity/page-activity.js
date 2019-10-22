class pageActivity{
  constructor(app){
    this._app = app;
  }
  async show(){
    let html = await fetch("page-activity/page-activity.html")
    let htmlContent = "";
    if(html.ok){
      htmlContent = await html.text();
    }
    this._app.setPageContent(htmlContent);
  }
}
