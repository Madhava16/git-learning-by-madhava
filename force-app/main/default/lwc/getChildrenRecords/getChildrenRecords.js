import { api, LightningElement } from 'lwc';
import getChildRecords from '@salesforce/apex/GetChildrenRecords.getChildRecords';

// Declaring columns for Opportunity Data table
const columns1 = [ 
    {label:"Opportunity Id", fieldName:"Id"},
    {label:"Opportunity Name", fieldName:"Name"}
]

// // Declaring columns for Contact Data table
const columns2 = [ 
    {label:"Contact Id", fieldName:"Id"},
    {label:"Contact Name", fieldName:"Name"}
]

export default class GetChildrenRecordInLWC extends LightningElement {

    @api buttonLabel = "Show";
    opportunityData = [];       // this array will store Opportunity details
    contactData = [];       // this array will store Contact details

    columns1 = columns1;
    columns2 = columns2;

    @api recordId;      // this property will store the current account recordID
    @api showDataTable = false;

    opportunityTempArray = [];
    contactTempArray = [];

    // this method is called when the user clicks the show button
    handleShow(event) {

        // If user clicks on the Show button then the DataTable should be visible and the button will become hide 
        if(event.target.label == "Show") {
            this.buttonLabel = "Hide";
            this.showDataTable = true;
        }

        // If user clicks on the Hide Button the the DataTable will invisible and the button will become show
        else if(event.target.label == "Hide") {
            this.buttonLabel = "Show";
            this.showDataTable = false;
        }
    }

    connectedCallback() {

        // calling apex method by passing current account record Id
        getChildRecords({ recId : this.recordId })
        .then( res => {

            let tempRecords = res;
            console.log("tempRecords " + JSON.stringify(tempRecords));

            // create two Objects for storing opportunity and contact details
            let temp = tempRecords.map(row => {
                return Object.assign({ OppName : row.Opportunities , ContactName : row.Contacts })
            })

            console.log("temp >>" + JSON.stringify(temp));

            // store opportunity and contact details in different array
            temp.forEach(element => {

                // Opportunity Array
                this.opportunityTempArray = element.OppName;
                console.log("this.opportunityTempArray:"+JSON.stringify(this.opportunityTempArray));

                // contact Array
                this.contactTempArray = element.ContactName;
                console.log("this.contactTempArray:"+JSON.stringify(this.contactTempArray));

            });

            // data for opportunity DataTable
            this.opportunityData = this.opportunityTempArray;

            // data for contact DataTable
            this.contactData = this.contactTempArray;
        })
        .catch(error => {

            console.log("error : " + JSON.stringify(error));
        })
    }
}