import { LightningElement, wire } from 'lwc';
import {CurrentPageReference} from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
export default class FirstPub extends LightningElement {

      @wire(CurrentPageReference) pageRef;
      handleIncrement(){
        fireEvent(this.pageRef,"Adding",1);
      }
      handleDecrement(){
        fireEvent(this.pageRef,"Subtract",1);
      }
      handleMultiply(){
        fireEvent(this.pageRef,"Multiply",2);
      }

}