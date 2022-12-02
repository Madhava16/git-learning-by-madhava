import { LightningElement,api } from 'lwc';

export default class ContactDetailsChild2 extends LightningElement {
    contactDetailsToSend = {};
    @api conKey;
    @api lastKey;

    @api
    getContactDetails() {
        let check = this.isInputValid();
        this.dispatchEvent(new CustomEvent('contactvalidated', {detail : {validation : check, data : JSON.stringify(this.contactDetailsToSend)}}));
    }

    isInputValid() {
        let isValid = true;
        let inputFields = this.template.querySelectorAll('.input');
        inputFields.forEach(inputField => {
            if(!inputField.checkValidity()) {
                inputField.reportValidity();
                isValid = false;
            }
            this.contactDetailsToSend[inputField.dataset.apiname] = inputField.value;
        });
        return isValid;
    }
    handleAddContact() {
        this.dispatchEvent(new CustomEvent('addcontact', {detail : {key : this.conKey}}));
    }

    handleRemoveContact() {
        this.dispatchEvent(new CustomEvent('removecontact', {detail : {key : this.conKey}}));
    }

    get showAddButton() {
        return this.conKey == this.lastKey
    }

    get showRemoveButton() {
        return this.conKey != 0
    }
}