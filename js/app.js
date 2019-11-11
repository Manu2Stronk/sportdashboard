class App{
  constructor (pageList){
    this._pages = pageList;

    //when page is reloaded -> it shows the last screen
    this._handleRoute();
  }

  run(){
    window.addEventListener("hashchange", ()=> {
        this._handleRoute();
    });
  }

  _handleRoute(){
    let pageUrl = location.hash.slice(1);
    let matches = null;

    //set default page to the tutorial page (ideally a condstant)
    if (!pageUrl) {
      pageUrl = this._pages[3].url;
    }

    let page = this._pages.find(p => matches = pageUrl.match(p.url));

    this.currentPageObj = new page.klasse(this);
    this.currentPageObj.show();
  }

  setPageContent(htmlContent){
    let container = document.querySelector("#content");
    container.innerHTML = htmlContent;
  }
}
