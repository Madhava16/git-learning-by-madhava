import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAccounts from '@salesforce/apex/ContactControllerLWC.getAccounts';
import insertContact from '@salesforce/apex/ContactControllerLWC.insertContact';

export default class InsertContactWithAccount extends LightningElement {


    @track accountList = [{label : 'None', value : ''}];
    @track selectedAccount = ""
    @track contactId = ""
    @track error = ""
    contactData = {
        
    };

    get designationOptions(){
        return [
            {label: 'Clerk', value: 'Clerk'},
            {label: 'Manager', value: 'Manager'},
            {label: 'Accountant', value: 'Accountant'}
        ];
    }

    @wire(getAccounts) accounts({error, data}){
        if(data){
            for(let i = 0; i < data.length; i++)
                this.accountList = [...this.accountList, {label : data[i].Name, value : data[i].Id}]
        } else {
            console.log(error)
        }
    }

    get accountOptions(){
        return this.accountList;
    }

    handleAccounts(event){
        this.selectedAccount = event.detail.value;
        this.contactData['AccountId'] = this.selectedAccount;
    }

    handleInputChange(e) {
        this.contactData[e.target.dataset.name] = e.target.value;
    }

    handleSave(){
        const contactArray = this.template.querySelectorAll('.contactInput');
        console.log('this.contactData : ',this.contactData);
        insertContact({contact: JSON.stringify(this.contactData)}).then(result => {
            this.contactId = result;
            this.error = ""
            const evnt = new ShowToastEvent({
                title: 'Contact Created Successfully',
                message: 'New Contact Created with Id: ' + this.contactId,
                variant: 'success',
            })
            this.dispatchEvent(evnt)
            contactArray.forEach(eachContact => {
                eachContact.value = '';
            });
            this.selectedAccount = "";
            this.contactData = {};
        }).catch(error => {
            this.error = error;
            this.contactId = ""
            const evnt = new ShowToastEvent({
                title: 'Error Insering Contact',
                message: 'Please fill all the required fields',
                variant: 'error',
            })
            this.dispatchEvent(evnt)
        })
    }

}