import { LightningElement ,track,api } from 'lwc';
import getaccountlist from '@salesforce/apex/RelatedContactsCreated.getaccountlist';
import Name from '@salesforce/schema/Contact.LastName';
import Phone from '@salesforce/schema/Contact.Phone';
import insertion from '@salesforce/apex/RelatedContactsCreated.insertion';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class CreatedRelatedContacts extends LightningElement {
@track ContactId;
@track AccountId;
    @track value;
    Acclist=[];
   get options(){
return this.Acclist;
    }
    handleChangecombo(event){
        this.value=event.target.value;
    }
    @track conRecord={
        LastName:Name,
        Phone:Phone
    }
   
    connectedCallback(){
        getaccountlist().then(result=>{
            let arr=[];
            for(let i=1;i<result.length;i++){
                arr.push({label:result[i].Name,value:result[i].Id})
            }
            this.Acclist=arr;
        })
    }

    handleChangeInput(event){
         this.conRecord[event.target.dataset.apiname]=event.target.value;
         this.conRecord['AccountId']=this.value;
         console.log('this.accRecord ==> ', this.conRecord);
        
    }
    handleSave(){
       
insertion({objcontact:this.conRecord})
.then(results=>{
    this.conRecord={
        
    };
   
   this.ContactId=results.Id;
  //this.AccountId=this.Acclist.id;
    window.console.log('result ===> '+results);

this.dispatchEvent(new ShowToastEvent({
                title: 'Success!!',
                message: 'Account Created Successfully!!',
                variant: 'success'
            }),);
        })
        .catch(error => {
            this.error = error.message;
        });
    }


//     @track conname;
//     @track conphone;
//    @track  conemail;
//    contact = {};
  
  
//    @api objectApiName;
//    @track optionsArray; // this array will store the options for combo box
//    @track isvisible = false; // used for show/hide card functionality
//   // @track data = [];   // used for storing contact details in data-table
//   // @track columns = columns;

//    // now store the options by returning the optionsArray
//    get options() {
//        return this.optionsArray;
//    }
//    connectedCallback() {
//        getaccountlist()
//        .then(response => {
//            let arr=[];   // this array will store the account details in label and value pair
//            for(var i=0;i<response.length;i++)
//            {
//                // add account name as label and Id as value in arr[]
//                arr.push({ label : response[i].Name, value:response[i].Id });
//            }

//            // store the arr objects into optionsArray 
//            this.optionsArray = arr ;
//        })
//    }

//    handleChangecombo(event) {
//        // whenever user selected an account then the cardVisible will become true and the contact datatable will be displayed to user
//       this.isvisible = true;
//        // store selected account "Id" in value property
//        this.value = event.detail.value;
//        // window.alert(this.value);
// }



// handlerChange(e){
//     this.contact[e.target.dataset.name]=e.target.value;
//     // const contactArray=this.template.querySelectorAll('.conInput');
//     // contactArray=e.target.value;
// }
// handlerfinal(){
//     const conArray=this.template.querySelectorAll('.conInput');
    
// }

// // name1(event)
// // {
// //    this.conname = event.detail.value;

// // }
// // phone(event)
// // {
// //    this.conphone=event.detail.value;

// // }
// // email(event)
// // {
// //    this.conemail=event.detail.value;

// // }
// // handlerfinal()
// // {
// //    this.contact = {
// //                     'sobjectType' : 'Contact',
// //                     'LastName' : this.conname, 
// //                     'Phone' : this.conphone,
// //                     'Email': this.conemail,
// //                     'AccountId' : this.value
                   
                    
// //    }
// //    console.log('inside handler',  this.contact)
// //    insertion({objcontact : this.contact})
// //    .then(results => {console.log('inserted')})
// //    const evt = new ShowToastEvent({
           
// //        message: 'successfully updated record',
// //        variant: 'success',
// //    });
// //    this.dispatchEvent(evt); 
   
// // }

}
