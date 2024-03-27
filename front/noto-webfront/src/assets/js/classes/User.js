class User {
  constructor() {
    this.show = false;
    this.showExistsUsers = false;
    this.showFormEmails = false;
    this.showFormMobiles = false;
  }

  modalStopEnrolment() {
    this.show = !this.show;
  }
  modalExistUsers() {
    this.showExistsUsers = !this.showExistsUsers;
  }
  modalCloseEmails(event) {
    if (event) event.preventDefault();
    this.showFormEmails = !this.showFormEmails;
  }

  modalCloseMobiles(event) {
    if (event) event.preventDefault();
    this.showFormMobiles = !this.showFormMobiles;
  }
}

export { User };
