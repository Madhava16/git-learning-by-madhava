import { api, LightningElement, track } from 'lwc';
import insertAccountAndContacts from '@salesforce/apex/LWCExampleController.insertAccountAndContacts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Parent extends LightningElement {



    accRecord;
    conRecord=[];
    accountId;
    conarray=[];
    @track recordList=[{key:0}];
    handleAccount(event){
    this.accRecord=JSON.parse((event.detail))
    console.log('rec==>',this.accRecord)
   
    }
    handleContact(event){
       this.conarray.push(event.detail.value);
       if(event.detail.value){
        this.conRecord.push(JSON.parse(event.detail))
       }
    }
 @api handleSave() {

 console.log('Saved');
    let accountDetails=this.template.querySelector('.accountDetails');
    accountDetails.handleChangeInput();
    let contactDetails=this.template.querySelectorAll('.contactDetails');
    for(let i=0;i<contactDetails.length;i++){
        const elemnt=contactDetails[i];
        elemnt.handleChangeInput1();
    }

    insertAccountAndContacts({accountToInsert : this.accountDetailsToInsert, contactsToInsert : this.contactDetailsToInsert}).then(() => {
        this.showToast('Success', 'Account and Contact inserted successfully', 'success');
        this.showSpinner = false;
    }).catch((err) => {
        console.log("file: MainComponent.js ~ line 31 ~ MainComponent ~ insertAccountAndContacts ~ err", err);
        this.showToast('Error', 'Error while inserting records', 'error');
        this.showSpinner = false;
    });
   
    
        
    }
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }

   
    handleAddCon(){
        // let temp = this.recordList;
        // this.recordList = []; 
        // temp.push({key : 2});
        // this.recordList = temp;
        this.recordList.push({key:1});
    
    
    }
   
    }
