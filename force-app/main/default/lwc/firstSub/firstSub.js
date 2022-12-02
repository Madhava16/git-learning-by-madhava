import { LightningElement,wire } from 'lwc';
import {CurrentPageReference} from 'lightning/navigation';
import {registerListener} from 'c/pubsub';
export default class FirstSub extends LightningElement {
    counter=0;
    @wire(CurrentPageReference) pageRef;
    connectedCallback(){
      
        registerListener("Adding",this.handleAdding,this);
        registerListener("Subtract",this.handleSubtract,this);
        registerListener("Multiply",this.handleMultiply,this);
    }
    handleAdding(data){
        this.counter +=data;
    }
    handleSubtract(data){
        this.counter -=data;
    }
    handleMultiply(data){
        this.counter *=data;
    }
}