import {LightningElement,track, wire,api} from 'lwc';
import getContacts  from '@salesforce/apex/ContactSearchPaginationInLwc.getContacts';
const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone' },
    { label: 'Email', fieldName: 'Email'}
];
export default class PageNationLwc extends LightningElement {
     @track loader = false;
    @track isModalOpen = false;
    @track value;
    @track error;
    @track data;
    @api sortedDirection = 'asc';
    @api sortedBy = 'Name';
    @api searchKey = '';
    result;
    @track allSelectedRows = [];
    @track page = 1;
    @track items = [];
    @track data = [];
    @track columns;
    @track startingRecord = 1;
    @track endingRecord = 0;
    @track pageSize = '5';
    @track totalRecountCount = 0;
    @track totalPage = 0;
    isPageChanged = false;
    initialLoad = true;
    mapAccount = new Map();
    get options() {
        return [
            { label: '5', value: '5' },
            { label: '10', value: '10' },
            { label: '15', value: '15' },
           
        ];
    }

    handleChange(event) {
        this.pageSize = event.detail.value;
        
        this.processRecords(this.items);
        this.displayRecordPerPage(this.page);
    }

    @wire(getContacts, { searchKey: '$searchKey' })
    wiredAccounts({ error, data }) {
        
        if (data) {
           
            this.processRecords(data);
            this.error = undefined;
        } else if (error) {
           
            this.error = error;
            this.data = undefined;
        }
    }

    processRecords(data) {
        this.items = data;
        this.totalRecountCount = data.length;
        this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize);
        this.data = this.items.slice(0, this.pageSize);
       // this.endingRecord = this.pageSize;
        this.columns = columns;
    }

    //clicking on previous button this method will be called
    previousHandler() {
        this.isPageChanged = true;
        if (this.page > 1) {
            this.page = this.page - 1; //decrease page by 1
            this.displayRecordPerPage(this.page);
        }
        var selectedIds = [];
        for (var i = 0; i < this.allSelectedRows.length; i++) {
            selectedIds.push(this.allSelectedRows[i].Id);
        }
        this.template.querySelector('[data-id="table"]').selectedRows = selectedIds;
    }

    //clicking on next button this method will be called
    nextHandler() {
        this.isPageChanged = true;
        if ((this.page < this.totalPage) && this.page !== this.totalPage) {
            this.page = this.page + 1; //increase page by 1
            this.displayRecordPerPage(this.page);
        }
        var selectedIds = [];
        for (var i = 0; i < this.allSelectedRows.length; i++) {
            selectedIds.push(this.allSelectedRows[i].Id);
        }
        this.template.querySelector('[data-id="table"]').selectedRows = selectedIds;
    }
    firstHandler(){
        if (this.page > 1){
            this.page=1;
            this.displayRecordPerPage(this.page);
        }
    }
    lastHandler(){
        if ((this.page < this.totalPage) && this.page !== this.totalPage) {
            this.page=this.totalPage;
            this.displayRecordPerPage(this.page);
        }
    }

    //Method to displays records page by page
    displayRecordPerPage(page) {
        this.startingRecord = ((page - 1) * this.pageSize);
        this.endingRecord = (this.pageSize * page);
       this.endingRecord = (this.endingRecord > this.totalRecountCount) ? this.totalRecountCount : this.endingRecord;
        this.data = this.items.slice(this.startingRecord, this.endingRecord);
        this.startingRecord = this.startingRecord + 1;
    }
    handleKeyChange(event) {
        this.searchKey = event.target.value;
        this.page=1;
        var data = [];
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i] != undefined && this.items[i].Name.includes(this.searchKey)) {
                data.push(this.items[i]);
            }
        }
        this.processRecords(data);
    }

    sortColumns(event) {
        this.sortedBy = event.detail.fieldName;
        this.sortedDirection = event.detail.sortDirection;
        return refreshApex(this.result);
    }

   

    onRowSelection(event) {
        if (!this.isPageChanged || this.initialLoad) {
            if (this.initialLoad) this.initialLoad = false;
            this.processSelectedRows(event.detail.selectedRows);
        } else {
            this.isPageChanged = false;
            this.initialLoad = true;
        }

    }

    processSelectedRows(selectedAccounts) {
        var newMap = new Map();
        for (var i = 0; i < selectedAccounts.length; i++) {
            if (!this.allSelectedRows.includes(selectedAccounts[i])) {
                this.allSelectedRows.push(selectedAccounts[i]);
            }
            this.mapAccount.set(selectedAccounts[i].Name, selectedAccounts[i]);
            newMap.set(selectedAccounts[i].Name, selectedAccounts[i]);
        }
        for (let [key, value] of this.mapAccount.entries()) {
            if (newMap.size <= 0 || (!newMap.has(key) && this.initialLoad)) {
                const index = this.allSelectedRows.indexOf(value);
                if (index > -1) {
                    this.allSelectedRows.splice(index, 1);
                }
            }
        }

    }

    showSelectedAccounts() {
        if (this.allSelectedRows != null && this.allSelectedRows.length > 0) {            
            this.isModalOpen = true;
        }
        else {
            alert('Please select account record..!!');
        }
    }

    closeModal() {
        this.isModalOpen = false;
     }
}
