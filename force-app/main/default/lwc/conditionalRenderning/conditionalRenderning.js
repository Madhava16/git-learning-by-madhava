import { LightningElement } from 'lwc';

export default class ConditionalRenderning extends LightningElement {
    booleanflag=false;
    hideformHandler(){
      this.booleanflag=false;
    }
    showformHandler(){
        this.booleanflag=true;
    }
}