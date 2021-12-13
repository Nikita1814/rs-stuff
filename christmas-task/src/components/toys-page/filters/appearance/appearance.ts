class Appearance {
  private color: {
    white: boolean;
    yellow: boolean;
    red: boolean;
    blue: boolean;
    green: boolean;
  };
  private shape: {
    ball: boolean;
    bell: boolean;
    cone: boolean;
    snowflake: boolean;
    figurine: boolean;
  };
  private size: {
    big: boolean;
    medium: boolean;
    small: boolean;
  };

  constructor() {
    this.color = {
      white: true,
      yellow: true,
      red: true,
      blue: true,
      green: true,
    };
    this.shape = {
      ball: true,
      bell: true,
      cone: true,
      snowflake: true,
      figurine: true,
    };
    this.size = {
      big: true,
      medium: true,
      small: true,
    };
  }
  addListeners() {
    return;
    /*TODO: function that adds listeners*/
  }

  UpdCriterea() {
    return;
    /*TODO: function that updates criterea based on chosen elems and events */
  }
}
