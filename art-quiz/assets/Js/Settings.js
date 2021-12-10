class Settings {
  constructor(state) {
    this.settingValues = state.settingValues;
    this.html = `
    <div class="content-container conceal-elem">
    <div class="settings">
    <div class="menu">
        <div class="settings-top">
            <div class="logo">
            </div>
            <h1>Settings</h1>
        </div>
        <div class="mode-select">
            <div class="setting-option volume">
                <div class="setting-image volume-image"></div>
                <div class="setting-option-wrapper">

                    <input type="range" class="range volume-range" value="1" min="0" step="0.1" max="1">
                    <input type="checkbox" class="volume-check" >
                    <label>on</label>
                </div>
                <h1>Volume</h1>
            </div>
            <div class="setting-option time">
                <div class="setting-image time-image"></div>
                <div class="setting-option-wrapper">
                    <input type="range" class="range timer-range" value ="5" min="5" step="5" max="30"> <p class="t-label">5</p>
                    <input type="checkbox" class="timer-check">
                    <label>on</label>
                </div>
                <h1>Timer</h1>
            </div>
        </div>
        <button class="setting-button save-btn" id="save-button">Save</button>
    </div>
</div>
            </div>
    `;
  }

  updSound() {
    if (document.querySelector(".volume-range")) {
      let soundRange = document.querySelector(".volume-range");

      this.settingValues.vVal = soundRange.value;
    }
    document.querySelectorAll(".audio").forEach((s) => {
      s.volume = this.settingValues.vVal;
    });
  }

  mute() {
    /*if (document.querySelector(".volume-check").checked === true) {
      this.settingValues.volume = "checked";
    } else if (document.querySelector(".volume-check").checked === false) {
      this.settingValues.volume = "";
    }*/
    this.settingValues.volume = document.querySelector(".volume-check").checked ? "checked" : "";
  }

  updValues() {
    document.querySelector(".volume-range").value = this.settingValues.vVal;
    this.updSound();
    /*if (this.settingValues.volume === "checked") {
      document.querySelector(".volume-check").checked = true;
    }
    if (this.settingValues.volume === "") {
      document.querySelector(".volume-check").checked = false;
    }*/
    document.querySelector(".volume-check").checked = this.settingValues.volume === "checked";
    this.mute();
    document.querySelector(".timer-range").value = this.settingValues.tVal;
    this.updTimer();
    if (this.settingValues.timer === "checked") {
      document.querySelector(".timer-check").checked = true;
    }
    if (this.settingValues.timer === "") {
      document.querySelector(".timer-check").checked = false;
    }
    this.turnTimer;
  }

  turnTimer() {
    if (document.querySelector(".timer-check").checked === true) {
      this.settingValues.timer = "checked";
    } else if (document.querySelector(".timer-check").checked === false) {
      this.settingValues.timer = "";
    }
  }
  updTimer() {
    if (document.querySelector(".timer-range")) {
      let tRange = document.querySelector(".timer-range");
      this.settingValues.tVal = tRange.value;
    }
    document.querySelector(".t-label").innerHTML = `${this.settingValues.tVal}`;
  }
}

export default Settings;
