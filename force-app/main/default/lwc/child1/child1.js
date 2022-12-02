import { LightningElement,api } from 'lwc';


import NAME_FIELD from '@salesforce/schema/Account.Name';
import Phone_FIELD from '@salesforce/schema/Account.Phone';
export default class Child1 extends LightningElement {
     @api accRecord = {};
        


    //   getAccountDetails(){
    //     var check=this.isInputField();
    //     this.dispatchEvent(new CustomeEvent('accountvalid',{detail:{validation:check, data:JSON.stringify(this.accRecord)}}))
    //   }
    //   isInputField(){
    //     let valid=true;
    //     var inputfields=this.template.querySelector('.input');
    //     inputfields.forEach(inputfield => {
    //         if(!inputfield.checkValidity){
    //             inputfield.reportValidity();
    //             valid=false;
    //         }
    //         this.accRecord[inputfieldn.dataset.apiname] = inputfield.target.value;
    //     });
    //     return valid;
    //   }
      
    @api handleChangeInput(event){
        this.accRecord[event.target.dataset.apiname] = event.target.value;
           console.log('this.accRecord ==> ', this.accRecord);

           this.dispatchEvent(new CustomEvent('goparent',{detail:JSON.stringify(this.accRecord)}));

    }
   
}