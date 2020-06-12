// import _ from 'lodash';

import Issues from "../issues/issues.controller";
import Issue from "../issues/issue.interface";
import { issueTypes } from "../issues/issues.mock";

class Board{
  modal: HTMLElement = document.getElementById("myModal");
  closeModalBtnElement: HTMLElement = document.getElementById("close");
  addIssueElement: HTMLElement;
  dashboardElement: HTMLElement = document.getElementById("dashboard-main");
  issueTodoCardTmpl: string = ``;
  issueInProgressCardTmpl: string = ``;
  issueInQaCardTmpl: string = ``;
  issueDoneCardTmpl: string = ``;
  board: Board = this;
  constructor(
    public issuesData: Array<Issue>
  ) {
    this.changeNav();
    this.modal.style.display = "none"; // closing the modal after adding the issue
    if (this.addIssueElement) {
      this.addIssueElement.addEventListener("click", (e: Event) => {
        this.modal.style.display = "block";
        let issue = new Issues(this.issuesData, true);
        let IssuesListn = issue.createIssue(this.cancel, this);
        this.issueDoneCardTmpl = this.issueInProgressCardTmpl = this.issueInQaCardTmpl = this.issueTodoCardTmpl = ``;
      });
    }
    this.closeModalBtnElement.onclick = ()=> {
      this.cancel(this);
    }
  }

  cancel(board?: Board, issuesData?: Issue){
    board.modal.style.display = "none";
    issuesData ? board.getIssueList([issuesData]): '';
  }

  changeNav() {
    let issueContTmpl :string = ``;
    issueTypes.map(
      (types: any, index:number)=>{
        issueContTmpl += this.createIssueTypeContainer(types, index)
      });
    let boardSpaceTmpl: string = `
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom"
      >
      <h4 class="h4">Board</h4>
      <div class="btn-toolbar mb-2 mb-md-0">
        <button type="button" id="addIssue" class="btn btn-sm btn-outline-secondary">
          Add Issue
        </button>
      </div>
    </div>
    <div class="board-layout">
      <div id='boardlists' class="board-lists">
        ${issueContTmpl}
      </div>
  </div>`;

  this.dashboardElement.innerHTML = boardSpaceTmpl;
  this.addIssueElement = document.getElementById("addIssue");
  let lists = document.getElementsByClassName('board-list');
  if(lists){
    Array.from(lists).forEach((element) =>{
      element.addEventListener('dragover', (e)=>{
        this.allowDrop(e);
      });
      element.addEventListener('drop', (e:DragEvent)=>{
        this.dropIt(e);
      });
    });
  }
  this.getIssueList(this.issuesData);
  }

  allowDrop(ev: Event) {
    ev.preventDefault();
    console.log("droped");
  }

  dragStart(ev: DragEvent) {
    console.log("droped");
    ev.dataTransfer.setData("text/plain", (ev.target as HTMLInputElement).id);
  }

  /**
   * [dropIt Droping the issue]
   * @param ev 
   */
  dropIt(ev: DragEvent) {
    console.log('innn')
    let sourceId = ev.dataTransfer.getData("text/plain");
    let sourceIdEl = document.getElementById(sourceId);
    let sourceIdParentEl = sourceIdEl.parentElement;
    let targetEl = document.getElementById((ev.target as HTMLInputElement).id);
    let targetParentEl = targetEl.parentElement;
    if (targetParentEl.id !== sourceIdParentEl.id) {
      if (targetEl.className === sourceIdEl.className) {
        targetParentEl.appendChild(sourceIdEl);
      } else {
        targetEl.appendChild(sourceIdEl);
      }
    } else {
      // swapping inside the list
      let holder = targetEl;
      let holderText = holder.textContent;
      targetEl.textContent = sourceIdEl.textContent;
      sourceIdEl.textContent = holderText;
      holderText = "";
    }
    let issueId = sourceId.split('_')[2];
    let targetIssue = this.issuesData.filter((issue)=>{
      return issue.id === parseInt(issueId);
    });
    // updating the status of the dragged elemnt ad the targets content status
    let temp = _.find(issueTypes, {divId:targetEl.id.split('_').length <2? targetEl.id.split('_')[0] :
    targetParentEl.id.split('_')[0]});
    targetIssue[0].status = temp.title;
  }

  /**
   * [Creates the issue types container for statusses in the tmpl]
   * @param types 
   * @param index 
   */
  createIssueTypeContainer(types:any, index:number): string{
    return `
    <div id='${types.divId}_list' class="board-list">
      <div class="list-title" id="${types.divId}">
        ${types.title}
      </div>  
    </div>`;
  }

  /**
   * [setIssueTypeContainerBlocks Sets the blocke contents]
   * @param divId Div id to where the content to be appended
   * @param content COntent to appened
   */
  setIssueTypeContainerBlocks(divId: string, content: string){
    document
    .getElementById(divId)
    .insertAdjacentHTML("afterend", content)
  }

  /**
   * [createIssueBlock Creates the draggable issue block]
   * @param issue Issue
   */
  createIssueBlock(issue: Issue): string {
    return `
      <div id="borad_issue_${issue.id}" class="card" draggable="true">
        ${issue.title}
      </div>
      `;
  }

  /**
   * [getIssueList Builds the List of issues according to the statuses]
   * @param IssuesList 
   */
  getIssueList(IssuesList: Array<Issue>): string {
    IssuesList.map((issue) => {
      switch (issue.status) {
        case "To do":
          this.issueTodoCardTmpl += this.createIssueBlock(issue);
          break;
        case "In progress":
          this.issueInProgressCardTmpl += this.createIssueBlock(issue);
          break;
        case "In QA":
          this.issueInQaCardTmpl += this.createIssueBlock(issue);
          break;
        case "Done":
          this.issueDoneCardTmpl += this.createIssueBlock(issue);
          break;
        default:
          break;
      }
    });
    this.issueTodoCardTmpl? this.setIssueTypeContainerBlocks("to-do", this.issueTodoCardTmpl) : "";
    this.issueInProgressCardTmpl? this.setIssueTypeContainerBlocks("in-progress", this.issueInProgressCardTmpl) : "";
    this.issueInQaCardTmpl? this.setIssueTypeContainerBlocks("in-qa", this.issueInQaCardTmpl) : "";
    this.issueDoneCardTmpl? this.setIssueTypeContainerBlocks("done", this.issueDoneCardTmpl): "";
    IssuesList.map((issue)=>{
      document
          .getElementById("borad_issue_" + JSON.stringify(issue.id))
          .addEventListener("dragstart", (e) => {
            this.dragStart(e);
          });
    });
    return this.issueTodoCardTmpl;
  }
}
export default Board;
