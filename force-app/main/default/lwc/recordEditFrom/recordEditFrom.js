import { LightningElement,api, track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import Contact from '@salesforce/schema/Contact';
import LastName from '@salesforce/schema/Contact.LastName';
import Phone from '@salesforce/schema/Contact.Phone';
import LeadSource from '@salesforce/schema/Contact.LeadSource';



export default class RecordEditFrom extends LightningElement {
    objectApiName=Contact;
 @track   Name =LastName;
 @track  Phone=Phone;
 @track  LeadSource=LeadSource;
   
  @api  ContactId='id created here'
  showSubmit=false;
  showNewAcc=true;
    handleSuccess(event){

        console.log('in success')

       this.ContactId=event.detail.id;
       const events=new ShowToastEvent({
            title:this.ContactId,
            // message:"your acoount is created",
            variant:"success"

         });
            this.dispatchEvent(events);
           this.showSubmit=true;
           this.showNewAcc=false;

    }

    createNewAccount(){
      
      this.ContactId=null;
      this.Name=null;
      this.Phone=null;
      this.LeadSource=null;
      this.showSubmit=false;
      this.showNewAcc=true;
    }

}