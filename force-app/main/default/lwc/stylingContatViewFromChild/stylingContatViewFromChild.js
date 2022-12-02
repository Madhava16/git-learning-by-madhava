import { LightningElement ,track,api} from 'lwc';
import returnCon from '@salesforce/apex/StylingContatViewFrom.returnCon';
import conApi from '@salesforce/schema/Contact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
export default class StylingContatViewFromChild extends LightningElement {

   @api ViewRec;


   @api getSelectedRecId(data){

    console.log('view rec--> ',JSON.stringify(data))

    this.viewRec = data;


}
    // @track conApiName = conApi;
    // @track recordId;
    // @track openViewForm = false;

    // @api returnCon(event){

    //     console.log('data--> ',event)

    //     returnCon({Name : event})
    //     .then(responce=>{

    //         this.recordId = responce;

    //         this.openViewForm = true;


    //         console.log(this.recordId)

    //         this.dispatchEvent(new ShowToastEvent({

    //             title:'success',
    //             message:'case fethched successfully !',
    //             variant:'success'
    //         }))
    //     })
    //     .catch(error=>{

    //         console.log('Error->',error)

    //         this.openViewForm = true;

    //         this.dispatchEvent(new ShowToastEvent({

    //             title:'error',
    //             message:'No contact exist!',
    //             variant:'error'
    //         }))

    //     })
    // }
}