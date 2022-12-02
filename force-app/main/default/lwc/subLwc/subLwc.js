import { LightningElement ,wire} from 'lwc';
import {subscribe,MessageContext} from 'lightning/messageService';
import Count_Increased from '@salesforce/messageChannel/Count_Increased__c';
export default class SubLwc extends LightningElement {
    counter = 0;
    subscription = null;

    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel(){
        this.subscription = subscribe(
            this.messageContext,
            Count_Increased,
            (message) => this.handleMessage(message)
        );
    }

    handleMessage(message){
        //alert("message:"+JSON.stringify(message));

        if(message.operator == 'add'){

            this.counter += message.constant;
        }
        else if(message.operator == 'subtract'){

            this.counter -= message.constant;
        }
        else if(message.operator == 'multiply'){

            this.counter *= message.constant;
        }
    }
}