export let mixin = {
  beforeCreate () {
    let prevVersion = localStorage.getItem("version");

    switch (prevVersion) {
      case "2.0.0": {
        ;
      }
      case undefined: {
        localStorage.clear();
        localStorage.setItem("version", "2.0.0");
      }
    }
  }
}
