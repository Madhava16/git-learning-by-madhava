import { LightningElement, wire } from 'lwc';
import {publish,MessageContext} from 'lightning/messageService';
import Count_Increased from '@salesforce/messageChannel/Count_Increased__c';
export default class PubLwc extends LightningElement {
  @wire(MessageContext)
  messageContext;

  handleIncrement(){
      const payload = {
          operator:'add',
          constant:1
      };

      publish(this.messageContext ,Count_Increased,payload );

  }

  handleDecrement(){
      const payload = {
          operator:'subtract',
          constant:1
      };

      publish(this.messageContext ,Count_Increased,payload );


  }

  handleMultiply(){
      const payload = {
          operator:'multiply',
          constant:2
      };

      publish(this.messageContext ,Count_Increased,payload );

  }
}