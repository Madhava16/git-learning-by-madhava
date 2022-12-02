import { LightningElement } from 'lwc';

export default class ShowingTime extends LightningElement {
    startButton=true;
    timeval='0:0:0:0';
    totalTimeInstance;
    totalMilliSeconds=0;
    startHandler(event){
       this.startButton=false;
       var parentThis=this;

       this.totalTimeInstance=setInterval(function(){
        var hours=Math.floor((parentThis.totalMilliSeconds % (1000*60*60*24))/(1000*60*60));
        var minutes=Math.floor((parentThis.totalMilliSeconds % (1000*60*60))/(1000*60));
        var seconds=Math.floor((parentThis.totalMilliSeconds % (1000*60))/(1000));
        var Milliseconds=Math.floor((parentThis.totalMilliSeconds % (1000)));
        parentThis.timeval=hours+':'+minutes+':'+seconds+':'+Milliseconds;
        parentThis.totalMilliSeconds += 100;
       },100);

    }
    stopHandler(event){
        this.startButton=true;
        clearInterval(this.totalTimeInstance);
    }
    resetHandler(event){
        this.startButton=true;
        this.timeval='0:0:0:0';
        this.totalMilliSeconds=0;
        clearInterval(this.totalTimeInstance);
    }

}