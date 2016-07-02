(function () {
    var init = function () {
        breathCycle();
    };

    window.addEventListener('load', init);
})();

var i = 0; // Current time in ms
var m = 0; // Multiplier for reset

// Breathing Class / Interface?
var Breathing = function(){
    this.state = "";
};

Breathing.prototype = {
    setStrategy: function(state){           // Change the behavior of Breathing.
        this.state = state;
    },

    breath: function(){                     // Calls the breath function of behavior.
        this.state.breath();
    }
};

// Breather class. This class manage the size of the #breather section.
var Breather = function(){
    this.width = document.getElementById('breather').clientWidth;
    this.height = document.getElementById('breather').clientHeight;

    this.adjustWidth = function(width){                                                 // Change width
        document.getElementById('userBreath').style.width = width + "px";
    };

    this.adjustHeight = function(height){                                               // Change height
        document.getElementById('userBreath').style.height = height + "px";
    };

    this.adjustSize = function(width, height){                                          // Change size
        this.adjustWidth(width);
        this.adjustHeight(height);
    }
};

var breather = new Breather();  //Instantiate the Breather class.

// BreathCycle function manages the Behavior of breathing and is a loop that makes the app running.
function breathCycle() {
    var breathIn = new BreathIn();                  // 3 instantiate breathing behaviors.
    var breathOut = new BreathOut();
    var breathStop = new BreathStop();

    var breathing = new Breathing();                // Instantiate breathing class.

    var breath = function(){                        // Breath function that calls the behavior breath function.
        breathing.breath()
    };

    var p = performance.now();                      // Amount of seconds have pass since begin.

    var checkState = function(){                    // Check when behavior has to change.
        if(i >= 0 && i < 4000){
            breathing.setStrategy(breathIn);
        } else if(i >= 4000 && i < 10000){
            breathing.setStrategy(breathOut);
        } else if(i >= 10000 && i < 12000) {
            breathing.setStrategy(breathStop);
        } else {
            i = 0;
            breathing.setStrategy(breathIn);
        }
    };

    if(i >= 12000){                                 // Check if a cycle is done
        m++;
    }

    var cycle = function(){                         // Loop that calls the checkState, breath, breathCycle and change i.
        checkState();
        breath();
        i =  p  - (m * 12000);
        breathCycle();
    };

    setTimeout(cycle, 1);                           //Each 1ms the cycle is called.
}

// BreathIn behavior, expands the breathcircle.
var BreathIn = function () {
    this.breath = function () {
        breather.adjustSize(i * (breather.width / 4000), i * (breather.height / 4000));
    }
};

// BreathOut behavior, shrinks the breathcircle.
var BreathOut = function () {
    this.breath = function () {
        var m = i - 4000;
        breather.adjustSize(breather.width - (breather.width / 6000 * m), breather.height - (breather.height / 6000 * m));
    }
};

// BreathStop behavior, doesn't nothing with the breathcircle but maybe something can happen with the border color.
var BreathStop = function () {
    this.breath = function () {
    }
};