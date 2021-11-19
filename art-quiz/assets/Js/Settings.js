class Settings {
    constructor() {
  this.html= /*html*/ `
    <div class="content-container">
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

                    <input type="range" class="volume-range">
                    <input type="checkbox" class="volume-check">
                    <label>on/off</label>
                </div>
                <h1>Volume</h1>
            </div>
            <div class="setting-option time">
                <div class="setting-image time-image"></div>
                <div class="setting-option-wrapper">
                    <input type="range" class="volume-range">
                    <input type="checkbox">
                    <label>on/off</label>
                </div>
                <h1>Timer</h1>
            </div>
        </div>
        <button class="setting-button save-btn" id="save-button">Save</button>
    </div>
</div>
            </div>
    `
    }
};

export default Settings;
