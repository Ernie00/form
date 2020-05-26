function laneModel(){
    var self = this;
    self.laneId = ko.observable();
    self.laneName = ko.observable();
    self.rangeId = ko.observable();
    self.participantName = ko.observable();
    self.timer = ko.observable();
    self.isMember = ko.observable(false);
    self.isStarted = ko.observable(false);
    self.remainingTime = ko.observable();

    var timeout;   

    self.startTimer = function(){
        if(!self.isStarted()) {
            self.isStarted(true);
        }
        var timer = self.remainingTime();
        var timeInSec = convertToSec(timer);
        if (timeInSec > 0) {
            timeInSec--;
        }
        var timeInFormat = convertToFormat(timeInSec);
        self.remainingTime(timeInFormat);
        if(timeInSec > 0){
            timeout=setTimeout(self.startTimer, 1000);
        }
        
    };

    self.stopTimer = function(){
        self.isStarted(false);
        clearTimeout(timeout);
        self.remainingTime(timeInFormat);

    };
    self.resetTimer = function(){
        self.isStarted(false);
        clearTimeout(timeout);
        self.remainingTime("00:60:00");
    };
}

function rangesViewModel(){
    var self = this;
    self.rangeOne = [];
    self.rangeTwo = [];
    self.rangeThree = [];
    self.rangeFour = []; 

    for(var i = 1; i < 11; i++){
        var lane = new laneModel();
        lane.laneId("lane_"+i);
        lane.rangeId("range1");
        lane.laneName(i);
        lane.remainingTime("00:60:00");
        self.rangeOne.push(lane);
    }

    for(var i = 11; i < 21; i++){
        var lane = new laneModel();
        lane.laneId("lane_"+i);
        lane.rangeId("range2");
        lane.laneName(i);
        lane.remainingTime("00:60:00");
        self.rangeTwo.push(lane);
    }

    for(var i = 21; i < 31; i++){
        var lane = new laneModel();
        lane.laneId("lane_"+i);
        lane.rangeId("range3");
        lane.laneName(i);
        lane.remainingTime("00:60:00");
        self.rangeThree.push(lane);
    }

    for(var i = 31; i < 34; i++){
        var lane = new laneModel();
        lane.laneId("lane_"+i);
        lane.rangeId("range4");
        lane.laneName(i);
        lane.remainingTime("00:60:00");
        self.rangeFour.push(lane);
    }

}

var rangesViewModelInstance = new rangesViewModel();
$(document).ready(function(){
    ko.applyBindings(rangesViewModelInstance, document.getElementById("main"));
});

function convertToSec(time) {
    var timeArray = time.split(":");
    var total = 0;
    total = total + Number(timeArray[0]) * 3600;
    total = total + Number(timeArray[1]) * 60;
    total = total + Number(timeArray[2]);
    return total;
  }
  function convertToFormat(seconds) {
    var string = "";
    var hours = Math.floor(seconds / 3600);
    var remainder = seconds % 3600;
    string = string + hours + ":";
    var minutes = Math.floor(remainder / 60);
    remainder = remainder % 60;
    string = string + minutes + ":" + remainder;
    return string;
  }