import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import insertAccountAndContacts from '@salesforce/apex/LWCExampleController.insertAccountAndContacts';

export default class MainComponent extends LightningElement {

    activeSections = ['Account', 'Contact'];
    accountDetailsToInsert;
    contactDetailsToInsert = [];
    numberOfContacts = [{ key : 0}];
    accountCheck;
    contactChecks = [];
    showSpinner = false;

    handleSave() {
        this.contactChecks = [];
        this.contactDetailsToInsert = [];
        let accountDetails = this.template.querySelector('.accountDetails');
        accountDetails.getAccountDetails();
        let contactDetails = this.template.querySelectorAll('.testClass');
        for (let index = 0; index < contactDetails.length; index++) {
            const element = contactDetails[index];
            element.getContactDetails();
        }
        console.log("file: MainComponent.js ~ line 18 ~ MainComponent ~ handleSave ~ this.contactDetailsToInsert", this.contactDetailsToInsert);
        // console.log("file: MainComponent.js ~ line 30 ~ MainComponent ~ handleContactValidation ~ this.contactDetailsToInsert", this.contactDetailsToInsert);
        // // console.log("file: MainComponent.js ~ line 18 ~ MainComponent ~ handleSave ~ contactChecks", this.contactChecks);

        if(this.accountCheck && !this.contactChecks.includes(false)) {
            this.showSpinner = true;
            insertAccountAndContacts({accountToInsert : this.accountDetailsToInsert, contactsToInsert : this.contactDetailsToInsert}).then(() => {
                this.showToast('Success', 'Account and Contact inserted successfully', 'success');
                this.showSpinner = false;
            }).catch((err) => {
                console.log("file: MainComponent.js ~ line 31 ~ MainComponent ~ insertAccountAndContacts ~ err", err);
                this.showToast('Error', 'Error while inserting records', 'error');
                this.showSpinner = false;
            });
        }
    }

    handleAccountValidation(e) {
        this.accountCheck = e.detail.validation;
        if(e.detail.validation) {
            this.accountDetailsToInsert = JSON.parse(e.detail.data);
            // console.log("file: MainComponent.js ~ line 17 ~ MainComponent ~ handleAccountValidation ~ this.accountDetailsToInsert", this.accountDetailsToInsert);
            // return true;
        } else {
            this.showToast('Error', 'Please fill all required fields in account section.', 'error');
        }
        // return false;
    }

    handleContactValidation(e) {
        this.contactChecks.push(e.detail.validation);
        if(e.detail.validation) {
            this.contactDetailsToInsert.push(JSON.parse(e.detail.data));
            // console.log("file: MainComponent.js ~ line 30 ~ MainComponent ~ handleContactValidation ~ this.contactDetailsToInsert", this.contactDetailsToInsert);
        } else {
            this.showToast('Error', 'Please fill all required fields in contact section.', 'error');
        }
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }

    handleAddContact(e) {
        let currentKey = e.detail.key + 1;
        let temp = this.numberOfContacts;
        this.numberOfContacts = undefined;
        // // console.log("file: MainComponent.js ~ line 52 ~ MainComponent ~ handleAddContact ~ currentKey", currentKey);
        temp.push({key : currentKey});
        // console.log("file: MainComponent.js ~ line 54 ~ MainComponent ~ handleAddContact ~ this.numberOfContacts", this.numberOfContacts);
        this.numberOfContacts = temp;
    }

    handleRemoveContact(e) {
        let currentKey = e.detail.key;
        // console.log("file: MainComponent.js ~ line 68 ~ MainComponent ~ handleRemoveContact ~ currentKey", currentKey);
        let temp = this.numberOfContacts;
        this.numberOfContacts = undefined;
        this.numberOfContacts = temp.filter((eachCon) => eachCon.key !== currentKey);
        // console.log("file: MainComponent.js ~ line 72 ~ MainComponent ~ handleRemoveContact ~ this.numberOfContacts", this.numberOfContacts);
        // // console.log("file: MainComponent.js ~ line 69 ~ MainComponent ~ handleRemoveContact ~ temp", temp);
        // this.numberOfContacts = temp;
    }

    get lastContactKey() {
        return this.numberOfContacts != undefined ? this.numberOfContacts[this.numberOfContacts.length - 1].key : 0;
    }
}

