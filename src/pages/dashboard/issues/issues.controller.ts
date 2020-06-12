import Issue from "./issue.interface";
import { issueTypes } from "./issues.mock";
import Board from "../board/board.controler";

class Issues {
  issueFromTml?: string;
  issueTitleInput: HTMLInputElement;
  issueAssigneeInput: HTMLInputElement;
  issueStatusInput: HTMLInputElement;
  issueDescriptionInput: HTMLInputElement;
  cancelBtnElement: HTMLElement;
  saveBtnElement: HTMLElement;
  validationErrorMsgElement: HTMLElement;
  issueListElement: HTMLElement = document.getElementById("issue-list");
  issueDetailsElement: HTMLElement = document.getElementById("issue-detailss");
  modalElement: HTMLElement = document.getElementById("modal-cont");
  selectedIssue: Issue;
  successMsgElement: HTMLElement = document.getElementById('success-msg');
  formElement: HTMLElement;
  formUpdated:boolean;

  constructor(
    private IssuesData: Array<Issue>,
    private fromBoard: boolean = false
  ) {
    let typeOptiontml = ``;
    issueTypes.map((issueType: any) => {
      typeOptiontml += `<option value="${issueType.title}">${issueType.title}</option>`;
    });
    let formTitle = this.fromBoard
      ? `<div><h4 class="h4">Add issue</h4><hr></div>`
      : ``;
    this.issueFromTml = `
    <form id="issueForm">
        ${formTitle}
        <div id="add-issue-form-error" class="validation-error"></div>
         <div class="form-group">
             <label for="issueTittle">Issue</label>
             <input type="text" class="form-control" id="issueTittle" placeholder="Issue title" autofocus="">
         </div>
         <div class="form-group">
             <label for="issueAssignee">Assignee</label>
             <input type="text" class="form-control" id="issueAssignee" placeholder="Assignee">
         </div>
         <div class="form-group">
             <label for="issueStatus">Status</label>
             <select class="form-control" id="issueStatus">
             ${typeOptiontml}
             </select>
         </div>
         <div class="form-group">
             <label for="issueDescription">Description - <i>Optional</i></label>
             <textarea class="form-control" id="issueDescription" rows="3"></textarea>
         </div>
         <button id="issue-save-btn" class="btn btn-primary form-btn" type="button">
          Save
        </button>
        <button id="cancel-btn" class="btn form-btn" type="button">
          Cancel
        </button>  
     </form>
    `;

    if (!this.fromBoard) {
      this.init();
      this.setHtmlInputElements();
      this.getIssueDetails(this.IssuesData[0].id);
      this.IssuesData.map((issue) => {
        document
          .getElementById("issue_" + JSON.stringify(issue.id))
          .addEventListener("click", () => {
            this.getIssueDetails(issue.id);
          });
      });
      this.formElement.onchange = ()=>{
        this.formUpdated = true;
      }
      this.saveBtnElement.addEventListener("click", (e: Event) => {
        this.formUpdated ? this.updateIssue(): '';
      });
      this.cancelBtnElement.onclick = (e: Event)=>{
        this.getIssueDetails(this.selectedIssue.id);
      };
    }
  }

  init() {
    this.issueListElement.insertAdjacentHTML("afterend", this.getIssues());
    this.issueDetailsElement.innerHTML = this.issueFromTml;
  }

  /**
   * setHtmlInputElements sets all html elements to the class.
   */
  setHtmlInputElements() {
    this.issueTitleInput = document.getElementById("issueTittle") as HTMLInputElement;
    this.issueAssigneeInput = document.getElementById("issueAssignee") as HTMLInputElement;
    this.issueStatusInput = document.getElementById("issueStatus") as HTMLInputElement;
    this.issueDescriptionInput = document.getElementById("issueDescription") as HTMLInputElement;
    this.cancelBtnElement = document.getElementById("cancel-btn") as HTMLElement;
    this.validationErrorMsgElement = document.getElementById("add-issue-form-error");
    this.saveBtnElement = document.getElementById("issue-save-btn");
    this.formElement = document.getElementById('issueForm');
  }

  /**
   * [getIssues Loads all issues]
   */
  getIssues() {
    let issueCardTmpl: string = ``;
    this.IssuesData.map((issue) => {
      issueCardTmpl += `<div id="issue_${issue.id}" class="card">
        ${issue.title}
        </div>
        `;
    });
    return issueCardTmpl;
  }

  /**
   * [getIssueDetails Gets the issue details]
   * @param id The id of the issue
   */
  getIssueDetails(id: number) {
    this.selectedIssue = this.IssuesData.find((issue) => {
      return issue.id === id;
    });
    if (this.issueStatusInput) {
      this.issueTitleInput.value = this.selectedIssue.title;
      this.issueAssigneeInput.value = this.selectedIssue.assignee;
      this.issueStatusInput.value = this.selectedIssue.status;
      this.issueDescriptionInput.value = this.selectedIssue.discreption;
      document.getElementById(
        "issue_" + id
      ).innerText = this.selectedIssue.title;
    }
  }

  /**
   * [createIssue Crateing an issue]
   * @param callBack the function to called after adding or cancelling the issue
   * @param board board instance
   */
  createIssue(callBack: any, board: Board): Issue {
    this.modalElement.innerHTML = this.issueFromTml;
    this.setHtmlInputElements();
    this.cancelBtnElement.addEventListener("click", () => {
      callBack(board);
    });
    let newIssue: Issue;
    this.saveBtnElement.addEventListener("click", (ev) => {
        ev.preventDefault();
        newIssue = {
          id: this.IssuesData.length + 1,
          title: this.issueTitleInput.value,
          assignee: this.issueAssigneeInput.value,
          status: this.issueStatusInput.value,
          discreption: this.issueDescriptionInput.value
            ? this.issueDescriptionInput.value
            : "",
        };
        if (
          newIssue.title === "" ||
          newIssue.assignee === "" ||
          newIssue.status === ""
        ) {
          this.validationErrorMsgElement.innerText = "*Please fill in required data before submitting";
          return false;
        }
        this.IssuesData.push(newIssue);
        // this.IssuesData = [...this.IssuesData, newIssue];
        board.issuesData = this.IssuesData;
        callBack(board, newIssue);
        return newIssue;
      });
    return newIssue;
  }

  /**
   * [Updates the issue]
   */
  updateIssue() {
    this.selectedIssue.title = this.issueTitleInput.value;
    this.selectedIssue.assignee = this.issueAssigneeInput.value;
    this.selectedIssue.status = this.issueStatusInput.value;
    this.selectedIssue.discreption = this.issueDescriptionInput.value
      ? this.issueDescriptionInput.value
      : "";
    this.successMsgElement.innerText = "Updated Successfully.";
    setTimeout(()=>{
      this.successMsgElement.innerText = "";
    }, 5000);
    this.formUpdated = false;
    this.getIssueDetails(this.selectedIssue.id);
  }
}

export default Issues;
