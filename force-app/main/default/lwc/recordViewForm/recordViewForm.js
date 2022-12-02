import { LightningElement ,api} from 'lwc';
import Contact_Object from '@salesforce/schema/Account';
import Name_field from'@salesforce/schema/Account.Name';
import AccountNumber from '@salesforce/schema/Account.AccountNumber';
import Active__c from '@salesforce/schema/Account.Active__c';
import Email__c from '@salesforce/schema/Account.Email__c';

export default class RecordViewForm extends LightningElement {
    objectApiName=Contact_Object;
    nameField=Name_field;
    AccountNumberField=AccountNumber;
    Active__cField=Active__c;
    Email__cField=Email__c;
    @api recordId='0015i00000LIrBWAA1';
  
}