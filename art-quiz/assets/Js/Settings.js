class Settings {
    constructor() {
    this.settingValues = {
        volume: 'checked',
        vVal:0,
        timer: '',
        tval:30,
        }
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

                    <input type="range" class="range volume-range" value="1" min="0" step="0.1" max="1">
                    <input type="checkbox" class="volume-check" >
                    <label>on/off</label>
                </div>
                <h1>Volume</h1>
            </div>
            <div class="setting-option time">
                <div class="setting-image time-image"></div>
                <div class="setting-option-wrapper">
                    <input type="range" class="range">
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

    updSound(){
    let soundRange = document.querySelector('.volume-range')
    /*console.log(soundRange.value)*/
    this.settingValues.vVal = soundRange.value  
    /*console.log(this.settingValues.vVal)*/
    document.querySelectorAll('.audio').forEach((s)=> {s.volume = this.settingValues.vVal
        })
    /*if(document.querySelector('.volume-check').checked = true){
        document.querySelectorAll('.audio').forEach((s)=> s.volume  = 0 )
    } */   
    }

    mute(){
        if (document.querySelector('.volume-check').checked === true){
        this.settingValues.volume = 'checked'
        } else if( document.querySelector('.volume-check').checked === false){
            this.settingValues.volume = ''
        }
    }

    updValues(){
        console.log(this.settingValues.volume)
        document.querySelector('.volume-range').value = this.settingValues.vVal
        this.updSound()
        if(this.settingValues.volume === 'checked'){document.querySelector('.volume-check').checked = true}
        if(this.settingValues.volume === ''){document.querySelector('.volume-check').checked = false}
        this.mute()
    }

};

export default Settings;
