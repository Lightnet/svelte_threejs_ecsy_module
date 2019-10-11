//testing...

class Settings{
  constructor(){
    if(Settings.instance instanceof Settings){
      return Settings.instance;
    }

    this.settingObject={
      'background':'#ff0000',
      version:Math.floor(Math.random()*4000)
    }

    Object.freeze(this.settingObject);
    Object.freeze(this);
    Settings.instance = this;
  }
}