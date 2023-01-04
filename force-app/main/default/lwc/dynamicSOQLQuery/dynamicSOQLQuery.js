import { LightningElement } from 'lwc';
import getAllSObjects from '@salesforce/apex/DynamicSOQLLWCController.getAllSObjects';
import getAllFields from '@salesforce/apex/DynamicSOQLLWCController.getAllFields';
import queryRecords from '@salesforce/apex/DynamicSOQLLWCController.queryRecords';
export default class DynamicSOQLQuery extends LightningElement {
    
    allSObjectsMap = {};
    isLoading = true;
    fieldValue = 'Id';
    areFieldsAvailable = false;
    allFieldsMap = {};
    isFieldsError = false;
    selectedFields = ['Id'];
    selectedSObject = '';
    queriedData = [];
    columnsList = [];
    orderBy = '';
    openModal = false;
    isDataAvailable = false;
    defaultSortDirection = 'asc';
    sortDirection = 'asc';
    sortedBy;


    connectedCallback() {
        getAllSObjects().then((res) => {
            let temp = res;
            this.allSObjectsMap = temp.sort(this.sortObject);
            this.isLoading = false;
        }).catch((err) => {
            console.log("file: dynamicSOQLLWC.js ~ line 16 ~ DynamicSOQLLWC ~ getAllSObjects ~ err", err);
        })
    }

    handleChange(event) {
        this.isLoading = true;
        this.selectedSObject = event.target.value;
        this.orderBy = '';
        this.selectedFields = ['Id'];
        if(this.selectedSObject != '') {
            getAllFields({sObjectName : this.selectedSObject}).then((res) => {
                // console.log("file: dynamicSOQLLWC.js ~ line 26 ~ DynamicSOQLLWC ~ getAllFields ~ res", res);
                this.allFieldsMap = res;
                this.isFieldsError = false;
                this.areFieldsAvailable = true;
                this.isLoading = false;
                console.log("file: dynamicSOQLLWC.js ~ line 47 ~ DynamicSOQLLWC ~ getAllFields ~ this.template.querySelector('.multiSelect')", this.template.querySelector('.multiSelect'));
                
            }).catch((err) => {
                console.log("file: dynamicSOQLLWC.js ~ line 28 ~ DynamicSOQLLWC ~ getAllFields ~ err", err);
                this.isFieldsError = true;
                this.areFieldsAvailable = false;
                this.isLoading = false;
            })
        }
    }

    handleFieldChange(event) {
        this.selectedFields = event.detail.value;
        console.log("file: dynamicSOQLLWC.js ~ line 52 ~ DynamicSOQLLWC ~ handleFieldChange ~ this.selectedFields", this.selectedFields);
        let combo = this.template.querySelector('.multiSelect');
        console.log("file: dynamicSOQLLWC.js ~ line 61 ~ DynamicSOQLLWC ~ handleFieldChange ~ combo", combo);
        console.log("file: dynamicSOQLLWC.js ~ line 63 ~ DynamicSOQLLWC ~ handleFieldChange ~ combo.querySelector('.slds-form-element')", combo.querySelector('.slds-form-element'));
        // console.log("file: dynamicSOQLLWC.js ~ line 63 ~ DynamicSOQLLWC ~ handleFieldChange ~ combo.querySelector('.slds-form-element')", combo.querySelector('.slds-form-element').querySelector('.slds-form-element__control'));
    }

    handleClick() {
        let inputField = this.template.querySelector('.limitClass');
        let inputValue = inputField.value;
        let limit = inputValue != '' && inputValue != undefined ? inputValue : '';
        if(this.selectedFields.length > 0) {
            if(!this.selectedFields.includes('Id')) {
                this.selectedFields.push('Id');
            }
            this.columnsList = [];
            this.queriedData = [];
            for (let index = 0; index < this.selectedFields.length; index++) {
                const element = this.selectedFields[index];
                let isSortable = element != 'Id';
                let temp = {label : element, fieldName : element, sortable: isSortable}
                this.columnsList.push(temp);
            }
            queryRecords({ sObjectName : this.selectedSObject, fieldsSelected : this.selectedFields, queryLimit : limit, orderBy : this.orderBy}).then((res) => {
                // console.log("file: dynamicSOQLLWC.js ~ line 53 ~ DynamicSOQLLWC ~ queryRecords ~ res", res);
                this.queriedData = res;
                this.isDataAvailable = this.queriedData.length > 0;
                this.openModal = true;
            }).catch((err) => {
                console.log("file: dynamicSOQLLWC.js ~ line 55 ~ DynamicSOQLLWC ~ queryRecords ~ err", err);
            })
        }
    }

    sortObject(a, b) {
        if(a.value < b.value){
            return -1;
        // a should come after b in the sorted order
        }else if(a.value > b.value){
            return 1;
        // and and b are the same
        }else{
            return 0;
        }
    }

    sortBy(field, reverse, primer) {
        console.log("file: dynamicSOQLLWC.js ~ line 108 ~ DynamicSOQLLWC ~ sortBy ~ primer", primer);
        const key = primer
        ? function (x) {
            return primer(x[field]);
        }
        : function (x) {
            return x[field];
        };
        console.log("file: dynamicSOQLLWC.js ~ line 110 ~ DynamicSOQLLWC ~ sortBy ~ key", key);
        return function (a, b) {
            a = key(a);
            b = key(b);
            return reverse * ((a > b) - (b > a));
        };
    }

    onHandleSort(event) {
        const { fieldName: sortedBy, sortDirection } = event.detail;
        const cloneData = [...this.queriedData];

        cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
        this.queriedData = cloneData;
        this.sortDirection = sortDirection;
        this.sortedBy = sortedBy;
    }

    get showButton() {
        return this.selectedFields.length <= 0;
    }

    closeModal() {
        this.openModal = false;
    }

    get orderByValues() {
        
    }

    handleOrderByChange(e) {
        this.orderBy = e.target.value;
        console.log("file: dynamicSOQLLWC.js ~ line 146 ~ DynamicSOQLLWC ~ handleOrderByChange ~ this.orderBy", this.orderBy);
    }
}
