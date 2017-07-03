export let mixin = {
  beforeCreate () {
    let prevVersion = localStorage.getItem("version");

    switch (prevVersion) {
      case "2.1.0": {
        break;
      }
      case "2.0.0": {
        break;
      }
      case undefined: {
        localStorage.clear();
        localStorage.setItem("version", "2.0.0");
      }
    }
  }
};
