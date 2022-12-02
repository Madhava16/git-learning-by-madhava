import { LightningElement , track } from 'lwc';

export default class ParentLwc extends LightningElement {
    countValue=0;
    @track result;

  
    handleDecrement(event){

        console.log('inside');


      
    this.result=parseInt(event.detail.fNum) - parseInt(event.detail.sNum);
    }
    handleIncrement(event){

      
        this.result=parseInt(event.detail.fNum) + parseInt(event.detail.sNum);
    }
}