import { LightningElement,wire,track } from 'lwc';
//import getAccounts from '@salesforce/apex/ImportCsvFileConvertToJson.getAccounts';
//import getContacts from '@salesforce/apex/ImportCsvFileConvertToJson.getContacts';
//import getLeads from '@salesforce/apex/ImportCsvFileConvertToJson.getLeads';
import getaccconlead from '@salesforce/apex/CsvFileImportData.getAccConLead';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadScript } from 'lightning/platformResourceLoader';
import Importing from '@salesforce/resourceUrl/Importing';
import {NavigationMixin} from 'lightning/navigation';

const actions = [
    { label: 'View', name: 'view' },
    
];

const accountColumns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Type', fieldName: 'Type' },
    { label: 'Phone', fieldName: 'Phone' },
    { label: 'ShippingAddress', fieldName: 'ShippingAddress'},

    
   
    {
        type: 'button',
    
        typeAttributes: { label : 'View' , name : 'view'}
    }


];

const contactColumns = [
    { label: 'FistName', fieldName: 'FirstName' },
    { label: 'LastName', fieldName: 'LastName' },
    { label: 'Email', fieldName: 'Email' },
    { label: 'Phone', fieldName: 'Phone' },
    {
        type: 'button',
    
        typeAttributes: { label : 'View' , name : 'view'}
    }

];

const leadColumns = [
    { label: 'FirstName', fieldName: 'FirstName' },
    { label: 'LastName', fieldName: 'LastName' },
    { label: 'Company', fieldName: 'Company' },
    { label: 'Email', fieldName: 'Email' },
    { label: 'Phone', fieldName: 'Phone' },
    {
        type: 'button',
    
        typeAttributes: { label : 'View' , name : 'view'}
    }
   
];

export default class CsvFileImportData extends LightningElement {
   
    afterTableShow = true;
    accoptions=[];

    showAccTable = false;
    showContactTable = false;
    showLeadTable  = false;

    accountData = [];
    contactData = [];
    leadData = [];

    accountColumns = accountColumns;
    contactColumns = contactColumns;
    leadColumns = leadColumns;

    accountDetails = [];
  

    value;
    papa;

   
    get options() {
        return [
            { label: 'Account', value: 'Account'},
            { label: 'Contact', value: 'Contact' },
            { label: 'Lead', value: 'Lead' }
             
        ]
    }

    handleChange(event) {
        this.value = event.detail.value;

    }

    handleObject(event) {
        let files = event.target.files
        console.log('files --> ', files);
        let self = this;
        console.log('self-->',self);
        this.papa.parse(files[0], {
            complete: function (results) {
                console.log(results);
             
                    let firstRow = results?.data[0];
                    for (let index = 1; index < results?.data?.length; index++) {
                        const element = results.data[index];
                        let eachAccount = {};
                        /* 
                                eachAccout = {
                                'name' :  test,
                                phone : 8273
                            }
                        */
                        for (let innerIndex = 0; innerIndex < element.length; innerIndex++) {
                            const innerElement = element[innerIndex];
                            eachAccount[firstRow[innerIndex]] = innerElement;
                            // eachAccount['name'] = 'test'
                            // eachAccountp['phonw] = 7234
                        } 
                        if (eachAccount && self.value == 'Account'){
                            self.accountDetails.push(eachAccount);
                        }
                        else if(eachAccount && self.value == 'Contact'){

                            self.contactData.push(eachAccount);
                        }
                        else if(eachAccount && self.value == 'Lead'){

                            self.leadData.push(eachAccount);
                        }
                 }
             
            }
        })
    }


    showDetails() {
    

        console.log('insert button ')

        if (this.value == 'Account'){

            console.log('acc apex call--> ',this.accountDetails)
           
            getaccconlead({accInsert :this.accountDetails})
            .then(result=>{
                if(result.length>0){
    
                 
                    console.log('result -> ',result)
                    let arr=[];

                    for( var i=0;i<result.length;i++){
                        arr.push({ShippingAddress :  result[i].ShippingStreet +' '+result[i].ShippingCity +' '+
                         result[i].ShippingState +' '+result[i].ShippingPostalCode+' '+ result[i].ShippingCountry 
                         ,Name:result[i].Name , Type:result[i].Type , Phone:result[i].Phone , Id:result[i].Id});

                       
                    }

            
                   
                   
                    console.log('this.accoptions--> ',this.accoptions);
                    this.accountData=arr;
                    console.log('this.accountData--> ',this.accountData.ShippingAddress);

                    this.afterTableShow = false;
    
                    this.showAccTable = true;
                }
                else {
                    this.accountData = undefined;
                }
            })
            .catch(error=>{
                console.log('error',error);
            })


        }
        else if(this.value == 'Contact'){
            console.log('this.contactData',this.contactData);
            
            getaccconlead ({conInsert :(this.contactData)})
        .then(result=>{
            console.log('result=>',result)
            if(result.length>0){
                this.contactData=result;
                this.afterTableShow = false;
    
            
                this.showContactTable = true;            
            }else {
                this.getContacts = undefined;
            }
        })
        .catch(error=>{
            console.log('error',error);
        })


        }
        else if(this.value == 'Lead'){
            console.log('this.leadData',this.leadData);
            
            getaccconlead({leadInsert :(this.leadData)})
            .then(result=>{  
                console.log('result=>',result)
                if(result.length>0){
                    this.leadData=result;
                    this.afterTableShow = false;
    

                    this.showLeadTable=true;
                }
                else {
                    this.getLeads= undefined;
                }
            })
            .catch(error=>{
                console.log('error',error);
            })



        }       



    }


    connectedCallback() {

        Promise.all([
            loadScript(this, Importing + '/papaparse.min.js')
        ])
            .then((message) => {
                console.log(message);
                this.papa = Papa;
                console.log(this.papa)
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error loading Importing',
                        message: error.message,
                        variant: 'error'
                    })
                );
            });
    }


    onrowactionAccount(event){
        this[NavigationMixin.Navigate]({
       type :'standard__recordPage',
       attributes:{
        recordId:event.detail.row.Id,
        objectApiName:'Account',
        actionName:'view'
       }
        });
    }
      

    onrowactionContact(event){
        this[NavigationMixin.Navigate]({
       type :'standard__recordPage',
       attributes:{
        recordId:event.detail.row.Id,
        objectApiName:'Contact',
        actionName:'view'
       }
        });
    }


    onrowactionLead(event){
        this[NavigationMixin.Navigate]({
       type :'standard__recordPage',
       attributes:{
        recordId:event.detail.row.Id,
        objectApiName:'Lead',
        actionName:'view'
       }
        });
    }
       




}