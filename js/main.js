// CORE FUNCTIONS
class Core {
  static notify(text) {
    alert(text);
  }
  static hideById(id) {
    document.getElementById(id).style.display = "none";
  }
  static showById(id) {
    document.getElementById(id).style.display = "block";
  }
  static randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  static romanize(num) {
    var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
    for ( i in lookup ) {
      while ( num >= lookup[i] ) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  }

  static saveGame() {
    localStorage.setItem("local_game_saved",true)
  }

  static loadGame() {
    if (localStorage.getItem("local_game_saved") != "true") {
      console.log("No save was found, starting new game...")
      return
    }

  }
}

let timePassed = 0;
function update() {
  timePassed++;
  console.log("Update");
  if (timePassed < 120) {
    Core.showById("loader");
    Core.hideById("pageContent");
  } else {
    Core.hideById("loader");
    Core.showById("pageContent");
  }
}

