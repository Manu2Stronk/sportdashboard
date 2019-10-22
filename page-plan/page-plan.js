class pagePlan{
  constructor(app){
    this._app = app;
  }
  async show(){
    let html = await fetch("page-plan/page-plan.html")
    let htmlContent = "";
    if(html.ok){
      htmlContent = await html.text();
    }
    this._app.setPageContent(htmlContent);
  }
}
