import { LightningElement,api } from 'lwc';

export default class RecordFormParent extends LightningElement {
    @api caseNumber;

    handleCaseNoChange(event){

            this.caseNumber = event.target.value;
          //  console.log(this.caseNumber);
    }


    handleSearch(){

        this.template.querySelector('c-record-form-child').returnCase(this.caseNumber);


    }
}