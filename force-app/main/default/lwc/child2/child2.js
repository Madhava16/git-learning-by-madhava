import { LightningElement,api} from 'lwc';
import Name from '@salesforce/schema/Contact.LastName';
import phone from '@salesforce/schema/Contact.Phone';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecordInputFilteredByEditedFields } from 'lightning/uiRecordApi';
export default class Child2 extends LightningElement {
//    @api  conKey;
//   @api lastKey;
    @api conRecord = {};
    
//  getContactDetails(){
//     let check=isInputfield();
//     this.dispatchEvent(new CustomeEvent('contactvalidation',{detail : {Validation:check,data:JSON.stringify(this.conRecord)}}));
//  }


//  isInputfield(){
//     let valid= true;
//     let inputfields=this.template.querySelectorAll('.input');
//     inputfields.forEach(inputfield =>
//        {
//           if(!inputfield.checkValidation())
//           {
//             inputfield.reportValidity();
//             valid=false
//           }
//          this.conRecord[inputfield.dataset.apiname]=inputfield.value;
//        });
//   return valid;
//  }
// handleAddContact(){
//   this.dispactchEvent(new CustomeEvent('addcontact',{detail:{key:conKey}}));
//  }
//  handleRemoveContact(){
//   this.dispatchEvent(new CustomeEvent('removecontact',{detail:{key:conKey}}));
//  }
//   get showAddButton(){
//     return this.conKey==this.lastKey;
//   }
//   get showRemoveButton(){
//     return this.conKey!=0;
    
//   }

     handleChangeInput1(event){

     

        this.conRecord[event.target.dataset.apiname] = event.target.value;
           console.log('this.accRecord ==> ', this.conRecord);

           this.dispatchEvent(new CustomEvent('goparent1',{detail:JSON.stringify(this.conRecord)}));


    }
  
    handleClick(){
      this.dispatchEvent(new CustomEvent('addcon'));
    }
   
   
   
  
          
        }
      
    
