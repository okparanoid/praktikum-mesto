export class UserInfo {
  constructor(nameImput, jobImput, nameContainer, jobContainer, avatarContainer, name, job, avatar, id) {
    this.nameImput = nameImput;
    this.jobImput = jobImput;
    this.nameContainer = nameContainer;
    this.jobContainer = jobContainer;
    this.avatarContainer = avatarContainer;
    this.name = name;
    this.job = job;
    this.avatar = avatar;
    this.id = id;
  }

  setUserInfo(name, job) {
    this.name = name;
    this.job = job;
    this.updateUserInfo();
  }

  setAvatar(avatar) {
    this.avatar = `url(${avatar})`;
    this.updateAvatar();
  }

  set userId(value) {
    this.id = value;
  }

  get userId() {
    return this.id;
  }

  updateInputs() {
    this.nameImput.value = this.name;
    this.jobImput.value = this.job;
  }

  updateUserInfo() {
    this.nameContainer.textContent = this.name;
    this.jobContainer.textContent = this.job;
  }

  updateAvatar() {
    this.avatarContainer.style.backgroundImage = this.avatar;
  }
}
