

class Home  {
    constructor(){
  this.html = /*html*/ `
<div class="content-container">
            <div class="main-page">
                <div class="menu">
                    <div class="logo">
                    </div>
                    <div class="mode-select">
                        <div class="mode artists" id="artists">
                            <div class="mode-image artists-image"></div>
                            <p class="mode-text"><span>Artists</span> quiz</p>
                        </div>
                        <div class="mode pictures" id="pictures">
                            <div class="mode-image pictures-image"></div>
                            <p class="mode-text"><span>Pictures</span> quiz</p>
                        </div>
                    </div>

                    <button class="setting-button open-settings" id="settings">
                        <div class="gear"></div>
                        <p>settings</p>

                    </button>

                </div>
            </div>
        </div>
`}
 
};

export default Home;
