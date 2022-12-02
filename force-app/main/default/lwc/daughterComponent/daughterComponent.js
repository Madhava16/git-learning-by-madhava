import { LightningElement } from 'lwc';

export default class DaughterComponent extends LightningElement {
    name='Jasmin';
    handleSuccess(){
      
        this.dispatchEvent(new CustomEvent("sendmessage"));
    }
}