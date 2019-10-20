class pageBike{
  constructor(app){
    this._app = app;
  }
  async show(){
    let html = await fetch("page-bike/page-bike.html")
    let htmlContent = "";
    if(html.ok){
      htmlContent = await html.text();
    }
    this._app.setPageContent(htmlContent);
  }
}
