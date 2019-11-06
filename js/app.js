class App{
  constructor (pageList){
    this._pages = pageList;

    //when page is reloaded -> it shows the last screen
    this._handleRoute();
  }

  run(){
    console.log("App running");
    window.addEventListener("hashchange", ()=> {
        console.log("hashchange");
        this._handleRoute();
    });
  }

  _handleRoute(){
    let pageUrl = location.hash.slice(1);
    let matches = null;

    let page = this._pages.find(p => matches = pageUrl.match(p.url));
    //location.href = ("." + page.resource);

    this.currentPageObj = new page.klasse(this);
    this.currentPageObj.show();
  }

  setPageContent(htmlContent){
    let container = document.querySelector("#content");
    container.innerHTML = htmlContent;
  }
}
