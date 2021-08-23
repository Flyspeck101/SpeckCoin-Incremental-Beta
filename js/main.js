// Tried to put into Core class, failed
function format(num, showDecimals=false) {
  const numInSciNot = {};
        [numInSciNot.coefficient, numInSciNot.exponent] =
          num.toExponential(2).split('e').map(item => Number(item));
        return (num >= 1000000) ? `${numInSciNot.coefficient}e${numInSciNot.exponent}` : (showDecimals ? String(num) : String(Math.floor(num)));
}






    

// Used in HTML for tabs 
    function openCity(evt, cityName) {
      // Declare all variables
      var i, tabcontent, tablinks;

      // Get all elements with class="tabcontent" and hide them
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }

      // Get all elements with class="tablinks" and remove the class "active"
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }

      // Show the current tab, and add an "active" class to the button that opened the tab
      document.getElementById(cityName).style.display = "block";
      evt.currentTarget.className += " active";
    }

const coins = {
	buyBuilding: function (lvl) {
        if (!(this.cost(lvl) > data.game.coins.amounts[0])) {
          data.game.coins.amounts[0] -= this.cost(lvl);
          data.game.coins.amounts[lvl]++;
        }
      },
      cost: function (lvl) {
        return Math.floor(data.game.coins.basePrices[lvl - 1] * Math.pow(1.1, (data.game.coins.amounts[lvl] - data.game.coins.produced[lvl - 1])));
      }
};

const diamonds = {
	buyBuilding: function (lvl) {
        if (!(this.cost(lvl) > data.game.diamonds.amounts[0])) {
          data.game.diamonds.amounts[0] -= this.cost(lvl);
          data.game.diamonds.amounts[lvl]++;
        } else {
          Core.notify("You cannot afford this!");
        }
      },
      cost: function (lvl) {
        return Math.floor(data.game.diamonds.basePrices[lvl - 1] * Math.pow(2, (data.game.diamonds.amounts[lvl] - data.game.diamonds.produced[lvl - 1])));
      }
};

const protons = {
	buyBuilding: function (lvl) {
        if (!(this.cost(lvl) > data.game.protons.amounts[0])) {
          data.game.protons.amounts[0] -= this.cost(lvl);
          data.game.protons.amounts[lvl]++;
        } else {
          Core.notify("You cannot afford this!");
        }
      },
      cost: function (lvl) {
        return Math.floor(data.game.protons.basePrices[lvl - 1] * Math.pow(4, (data.game.protons.amounts[lvl] - data.game.protons.produced[lvl - 1])));
      }
};

// Game data (VERY IMPORTANT)
const dataObject = {
  "game": {
    "coins": {
      "amounts": [100, 0, 0, 0, 0, 0],
      "basePrices": [100, 2000, 40000, 800000, 16000000],
      "produced": [0, 0, 0, 0, 0]
    },
    "diamonds": {
      "amounts": [0, 0, 0, 0, 0, 0],
      "basePrices": [1, 200, 40000, 8000000, 1600000000],
      "produced": [0, 0, 0, 0, 0]
    },
    "opals": 0,
    "protons": {
      "amounts": [0, 0, 0, 0, 0, 0],
      "basePrices": [1, 400, 160000, 64000000, 25600000000],
      "produced": [0, 0, 0, 0, 0]
    },
    "neutrons": 0
},
  "unlockedCoins": [true, true, false, false, false, false],
  "unlockedDiamonds": false,
  "unlockedProtons": false,
	
  "totalResets": 0,
    "prizesClaimed": [false, false]
};
var data = dataObject;
function reset() {
  data = dataObject;

}

// Global Variables (For display and stuff)
let timePassed = 0;
let secondsPassed = 0;
let keys = [];

$(document).ready(function() {
  
  

  document.getElementById("default").click();
  setInterval((function() { // Update
    timePassed++;
    Core.showById("pageContent");
	  
    if (timePassed % 200 == 0) secondsPassed++;

    document.getElementById("coinDisplay").innerHTML = format(data.game.coins.amounts[0]);
    document.getElementById("diamondDisplay").innerHTML = format(data.game.diamonds.amounts[0]);
    document.getElementById("protonDisplay").innerHTML = format(data.game.protons.amounts[0]);

    document.getElementById("coin1").innerHTML = `[${format(data.game.coins.amounts[1])}] Flyspeck (Currently: ${format(data.game.coins.amounts[1] * 10 * (data.game.opals * 0.1 + 1))} SpC/s) Cost: <b>${format(coins.cost(1))} SpeckCoin</b>`;
    document.getElementById("coin2").innerHTML = `[${format(data.game.coins.amounts[2])}] Cloner (Currently: ${format(data.game.coins.amounts[2] * (data.game.opals * 0.1 + 1))} Fpk/s) Cost: <b>${format(coins.cost(2))} SpeckCoin</b>`;
    document.getElementById("coin3").innerHTML = `[${format(data.game.coins.amounts[3])}] Daydream (Currently: ${format(data.game.coins.amounts[3] * (data.game.opals * 0.1 + 1))} Cln/s) Cost: <b>${format(coins.cost(3))} SpeckCoin</b>`
    document.getElementById("coin4").innerHTML = `[${format(data.game.coins.amounts[4])}] Lollipop (Currently: ${format(data.game.coins.amounts[4] * (data.game.opals * 0.1 + 1))} Drm/s) Cost: <b>${format(coins.cost(4))} SpeckCoin</b>`;
    document.getElementById("coin5").innerHTML = `[${format(data.game.coins.amounts[5])}] Fly King (Currently: ${format(data.game.coins.amounts[5] * (data.game.opals * 0.1 + 1))} Llp/s) Cost: <b>${format(coins.cost(5))} SpeckCoin</b>`;

    for (var index = 1; index < data.unlockedCoins.length; index++) {
      if (data.game.coins.amounts[0] >= coins.cost(index)/2 && !data.unlockedCoins[index]) {
        data.unlockedCoins[index] = true;
      }                      
    }
    for (var index = 1; index < data.unlockedCoins.length; index++) {    
      if (data.unlockedCoins[index]) {
        $("#coinDisp" + index).show();
      } else {
        $("#coinDisp" + index).hide();
      }
    }

    for (var index = 1; index < data.unlockedCoins.length; index++) {    
      if (coins.cost(index) > data.game.coins.amounts[0]) {
        document.getElementById("coin" + index).classList.add("not-available");
        document.getElementById("coin" + index).classList.remove("available");
      } else {
        document.getElementById("coin" + index).classList.remove("not-available");
        document.getElementById("coin" + index).classList.add("available");
      }
    }
  }), 5);

  setInterval(function() {
    data.game.coins.amounts[0] += Math.floor(data.game.coins.amounts[1]) * 10 * (data.game.opals * 0.1 + 1) / 100;

    for (var index = 2; index < data.game.coins.amounts.length; index++) {
      data.game.coins.amounts[index - 1] += Math.floor(data.game.coins.amounts[index] * (data.game.opals * 0.1 + 1)) / 100;
      data.game.coins.produced[index - 2] += Math.floor(data.game.coins.amounts[index] * (data.game.opals * 0.1 + 1)) / 100;
    }

    for (var index = 1; index < data.game.diamonds.amounts.length; index++) {
      data.game.opals += Math.floor(data.game.diamonds.amounts[index]) * Math.pow(4, index - 1) * 0.05;
    }

    for (var index = 1; index < data.game.protons.amounts.length; index++) {
      if (index != 1) {
        data.game.protons.amounts[index - 1] += data.game.protons.amounts[index] * 10;
      } else {
        data.game.neutrons += data.game.protons.amounts[1];
      }
    }
  }, 10);


  window.addEventListener("beforeunload", function (e) { Core.saveGame(data) });

document.getElementById("soundtrack").addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
}, false);

  if (document.addEventListener) {
    document.addEventListener('contextmenu', function(e) {
      Core.notify("Imagine right-clicking in 2021");
    }, false);
  } else {
    document.attachEvent('oncontextmenu', function() {
      Core.notify("Imagine right-clicking in 2021");
    });
  }

  window.addEventListener("keydown", keysPressed, false);
  window.addEventListener("keyup", keysReleased, false);


  function keysPressed(e) {
    // store an entry for every key pressed
    keys[e.keyCode] = true;

    
    if (keys[17] && (keys[49] || keys[50] || keys[51] || keys[52] || keys[53] || keys[54] || keys[55] || keys[56])) {
      // do something
      e.preventDefault();	
    }

    if (keys[17] && (keys[49] && keys[50] && keys[51] && keys[52] && keys[53] && keys[54] && keys[55] && keys[56]) && !data.prizesClaimed[1]) {
      Core.notify("You got <i><b>lots</b> of free money<i>!!!");
      data.game.coins.amounts[0] += Math.floor(data.game.coins.amounts[0] / 2);
      data.prizesClaimed[1] = true;
    }


    if (keys[17] && (keys[65] || keys[66] || keys[67] || keys[68] || keys[69] || keys[70])) {
      // do something
      e.preventDefault();	
    }

    if (keys[17] && (keys[65] && keys[66] && keys[67] && keys[68] && keys[69] && keys[70]) && !data.prizesClaimed[0]) {
      Core.notify("You got <i>free money<i>!!!");
      data.game.coins.amounts[0] += Math.floor(data.game.coins.amounts[0] / 10);
      data.prizesClaimed[0] = true;
    }
  }

  function keysReleased(e) {
    // mark keys that were released
    keys[e.keyCode] = false;
  }
	var myModal = document.getElementById("myModal");

	// Get the button that opens the modal
	var btn = document.getElementById("myBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks the button, open the modal 
	btn.onclick = function() {
	  myModal.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	  myModal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	if (event.target == myModal) {
	  myModal.style.display = "none";
	}
}
  document.getElementById("importSave").addEventListener("change", Core.importSave, false);
  document.getElementById("exportSave").addEventListener("click", Core.exportSave, false);
  Core.notify("Welcome to SpeckCoin Incremental! Click the icons to buy them. ");
});
