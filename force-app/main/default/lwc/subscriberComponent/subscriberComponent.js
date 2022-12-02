import { LightningElement,wire } from 'lwc';
import {registerListener,unregisterAllListeners} from 'c/pubsub';
import{ CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
export default class SubscriberComponent extends LightningElement {
    
    @wire(CurrentPageReference) pageRef;
    message; 

    userDetails={};
    connectedCallback(){
        registerListener("showData",this.handleMessage,this);
        registerListener("sendDetails",this.handleDetails,this)
    }
    handleMessage(data){
    this.message=data;
    }
    handleDetails(data){
      this.userDetails={
             username:data[0].value,
             email:data[1].value
      }
    }

    sendPublisher(){
        fireEvent(this.pageRef,"sendToPublisher","I am coming from Subscriber");
    }
      disconnectedCallback(){
        unregisterAllListeners(this);
      }
}