import Board from "./board/board.controler";
import Issues from "./issues/issues.controller";
import {IssuesData} from "./issues/issues.mock";
import LogIn from "../login/login.controler";

class Dashboard {
  userInfo: HTMLElement = document.getElementById('userInfo');
  constructor(private userName: string) {
    this.userInfo.innerHTML = `
    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          ${this.sayHello(this.userName)}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a id="logout" class="dropdown-item" href="#">Log out</a>
          </div>`;
    
    let dashboardTempl: string = `
        <div class="container-fluid">
          <div class="row">
            <nav class="col-md-2 d-none d-md-block bg-light sidebar">
              <div class="sidebar-sticky">
                <ul class="nav flex-column" id="dash">
                  <li class="nav-item" id="nav-dash">
                    <a class="nav-link active" href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-home"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                      Dashboard <span class="sr-only">(current)</span>
                    </a>
                  </li>
                  <li class="nav-item" id="nav-board">
                    <a class="nav-link" href="#">
                    <svg class="bi bi-clipboard-data" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                    <path fill-rule="evenodd" d="M9.5 1h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                    <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z"/>
                  </svg>
                      Board
                    </a>
                  </li>
                  <li class="nav-item" id="nav-issues">
                    <a class="nav-link" href="#">
                    <svg class="bi bi-clipboard-data" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                      <path fill-rule="evenodd" d="M9.5 1h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                      <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z"/>
                    </svg>
                      Issues
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
            <main id="dashboard-main" role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
              <div
                class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom"
              >
                <h4 class="h4">Dashboard</h4>
              </div>
            </main>
          </div>
        </div>
        `;
    document.getElementById("root").innerHTML = dashboardTempl;

    let boardLInk = document.getElementById("nav-board");
    boardLInk.addEventListener("click", (e: Event) => {
      new Board(IssuesData)
    });
    document.getElementById('logout').addEventListener('click', ()=>{
      this.userInfo.innerHTML  = ``;
      new LogIn(true);
    });
    
    let issuesLInk = document.getElementById("nav-issues");
    let issueSpaceTmpl: string = `
    <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom"
    >
    <h4 class="h4">Issues</h4>
    </div>
    <div>
    <div id="success-msg" class="success"></div>
    <div class="board-layout">
        <div class="board-lists">
          <div class="issue-list">
            <div class="list-title" id="issue-list">
              Issues
            </div>
          </div>
        <div class="issue-container">
          <div class="list-title" id="issue-details">
              Details
          </div>
        <div id="issue-detailss" class="issue-details">
        </div>
      </div>
    </div>
    </div>`;

    issuesLInk.addEventListener("click", (e: Event) => {
      document.getElementById("dashboard-main").innerHTML = issueSpaceTmpl;
      new Issues(IssuesData);
    });
    
    var header = document.getElementById("dash");
    var btns = header.getElementsByClassName("nav-link");

    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
      });
    }
  }
  sayHello(name: string) {
    return `Hello ${name}`;
  }
}

export default Dashboard;
