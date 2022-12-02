import { api, LightningElement } from 'lwc';
import lstAccountFields from '@salesforce/apex/LWCExampleController.lstAccountFields';

export default class AccountDetailsChild1 extends LightningElement {
    accountDetailsToSend = {};

    @api

    allFields = [];

   
    
    connectedCallback(){

        lstAccountFields()
        
       .then(result=>{

        this.allFields = result;

        console.log('all fields-->',this.allFields)
       })
    //    insertAccountAndContacts()

}    

  @api  getAccountDetails() {
        let check = this.isInputValid();
        this.dispatchEvent(new CustomEvent('accountvalidated', {detail : {validation : check, data : JSON.stringify(this.accountDetailsToSend)}}));
    }

    isInputValid() {
        let isValid = true;
        let inputFields = this.template.querySelectorAll('.input');
        inputFields.forEach(inputField => {
            if(!inputField.checkValidity()) {
                inputField.reportValidity();
                isValid = false;
            }
            this.accountDetailsToSend[inputField.dataset.apiname] = inputField.value;
        });
        return isValid;
    }
}







