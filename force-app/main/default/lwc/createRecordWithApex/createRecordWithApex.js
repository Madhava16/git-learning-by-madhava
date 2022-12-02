import { LightningElement,track,api } from 'lwc';
// import CreateContact from '@salesforce/apex/createRecord.CreateContact';
import getContact from '@salesforce/apex/CreateRecordApex.getContact';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import NAME_FIELD from '@salesforce/schema/Contact.LastName';
import Phone_FIELD from '@salesforce/schema/Contact.Phone';
export default class CreateRecordWithApex extends LightningElement {
@track ContactId;
    @track conRecord = {
        LastName : NAME_FIELD,
       
        Phone : Phone_FIELD,
       
    };

    @api handleChangeInput(event){
        this.conRecord[event.target.dataset.apiname] = event.target.value;
           console.log('this.accRecord ==> ', this.conRecord);

    }
    handleSave() {
        getContact({insertCon: this.conRecord})
        .then(result => {
            // Clear the user enter values
            this.conRecord = {};
          this.ContactId=result.Id;
            window.console.log('result ===> '+result);
            // Show success messsage
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success!!',
                message: 'Contact Created Successfully!!',
                variant: 'success'
            }),);
        })
        .catch(error => {
            this.error = error.message;
        });
    }

    // contactId;
    // contactName;
    // contactPhone;
    // handleChange(event){
    //  this.contactName=event.detail.value;
    // }
    // handleChange1(event){
    //     this.contactPhone=event.detail.value;
    // }
    // accountDetails={}
   
    // handleCreate(){
       
       
    //     CreateContact({contactName: this.contactName,contactPhone:this.contactPhone})
    //     .then(result=>{
    //         this.contactId=result[0].Id;
    //     })
    //     .catch(error=>{
    //         console.log(error);
    //     })
    // }
}