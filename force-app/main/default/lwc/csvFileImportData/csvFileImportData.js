import { LightningElement,wire,track } from 'lwc';
import getAllAccountWithContactsList from '@salesforce/apex/CsvFileImportData.getAllAccountWithContacts';
export default class CsvFileImportData extends LightningElement {
   
        @track accountsWithContacts;
        @track error;
        @wire(getAllAccountWithContactsList)
        wiredAccountsWithContacts({ error, data }) {
            if (data) {
                this.accountsWithContacts = data;
            } else if (error) {
                console.log(error);
                this.error = error;
            }
        }





}