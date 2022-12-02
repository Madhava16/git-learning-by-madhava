import { api, LightningElement, wire } from 'lwc';
import getPortalFeedItems from '@salesforce/apex/NewsComponentController.getPortalFeedItems';
import { refreshApex } from '@salesforce/apex';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation'
import { fireEvent } from 'c/pubsub';

export default class NewsComponent extends NavigationMixin(LightningElement) {

    url = '';
    wholeWiredData = []
    portalFeedItems = [];
    loading = true;
    totalPortalItems = 0;
    firstRecord = 0;
    lastRecord = 0;
    showSearchBar = false;
    searchValue;
    // showButtonAndCombo = false;
    isModalOpen = false;
    pageSize = 6;
    gotoNumber = 1;
    currentPageNumber =  1;
    isThereItem = false;
    isWholePageView = false;
    isOneThree = false;
    isTwoThree = false;
    isSingleTile = false;
    typeComboBoxData = [];
    selectedTypeData = [];
    @api typeValue;
    @api dynamicTypeValue;
    @api displayThumbnailInFeed;
    @api displaySearchbar;
    @api ignoreDates;
    showButtons = false;
    wholeTypesData = {};
    articleId = undefined;
    // @api componentSize;
    modalLoader = false;
    isSearchedDataAvailable = true;

    // @wire(getObjectInfo, { objectApiName : Portal_Feed_Item }) portalFeedItemMetaData;
    // @wire(getPicklistValues, { recordTypeId : '$portalFeedItemMetaData.data.defaultRecordTypeId', fieldApiName : Type_Field })typePicklistValues(result) {
    //     if(result.data) {
    //         this.typeComboBoxData = result.data.values;
    //         console.log(this.typeComboBoxData);
    //     }
    // };


    @wire(CurrentPageReference) pageRef;

    // @wire(getPortalFeedItems) portalFeed(result){
    //     const {data , error} = result;
    //     this.wholeWiredData = result;
    //     if(data) {
    //         this.loading = false;
    //         this.portalFeedItems = this.processPortalFeedItemData(data);
    //         this.wholeTypesData = this.processPortalFeedItemDataAccordingToType(data);
    //         console.log('New Portal =====>', data);
    //         if(this.portalFeedItems.length > 0) {
    //             this.isThereItem = true;
    //             console.log('typeVlaue ==> ', this.typeValue);
    //             this.totalPortalItems = Object.keys(this.wholeTypesData[this.typeValue]).length
    //             this.showButtons = Math.ceil(this.totalPortalItems / this.pageSize) <= 10 ? true : false;
    //             console.log("file: newsComponent.js ~ line 62 ~ NewsComponent ~ @wire ~ showButtons", this.showButtons);
    //             // this.showButtons = this.totalPortalItems > 6 ? true : false;
    //             // console.log('totalPortalItems == >', this.totalPortalItems)
    //             // this.showButtonAndCombo = this.totalPortalItems > this.pageSize ? true : false
    //         }
    //     } else {
    //         console.log(error);
    //         this.loading = false;
    //         this.isThereItem = false;
    //     }
    // } 


    connectedCallback() {
        console.log('dynamicTypeValue',this.dynamicTypeValue);
        getPortalFeedItems({dynamicTypeValue : this.dynamicTypeValue, ignoreDates : this.ignoreDates}).then((result) => {
            if(result) {
                
                // this.portalFeedItems = this.processPortalFeedItemData(result);
                this.wholeTypesData = this.processPortalFeedItemDataAccordingToType(result);
                this.pageSize = this.dynamicTypeValue == 'Archive' ? 15 : 6;
                this.showSearchBar = this.displaySearchbar;
                console.log("file: newsComponent.js ~ line 79 ~ NewsComponent ~ getPortalFeedItems ~ this.pageSize", this.pageSize);
                console.log("file: newsComponent.js ~ line 78 ~ NewsComponent ~ getPortalFeedItems ~ this.wholeTypesData", this.wholeTypesData);
                console.log('New Portal =====>', result);
                if(result != null && result.length > 0) {
                    // this.isThereItem = true;
                    this.initializeValues();
                    // this.showButtons = this.totalPortalItems > 6 ? true : false;
                    // console.log('totalPortalItems == >', this.totalPortalItems)
                    // this.showButtonAndCombo = this.totalPortalItems > this.pageSize ? true : false
                }
                this.loading = false;
            }
        }).catch((err) => {
            console.log(err);
            this.loading = false;
            this.isThereItem = false;
        });
    }

    // get displayThumbnailInFeed() {
    //     return this.dynamicTypeValue == 'Launch';
    // }

    get bodyClass() {
        return this.dynamicTypeValue == 'Launch' ? 'slds-grid' : '';
    }

    get pageNumbers() {
        return [
            {label : '5', value : 5},
            {label : '10', value : 10},
            {label : '15', value : 15},
            {label : '20', value : 20}
        ]
    }

    initializeValues() {
        console.log('typeVlaue ==> ', this.dynamicTypeValue);
        this.totalPortalItems = this.wholeTypesData[this.dynamicTypeValue] != null ? Object.keys(this.wholeTypesData[this.dynamicTypeValue]).length : 0;
        this.portalFeedItems =  this.wholeTypesData[this.dynamicTypeValue];
        this.isThereItem = this.totalPortalItems != 0;
        this.showButtons = Math.ceil(this.totalPortalItems / this.pageSize) <= 10 ? true : false;
        this.isSearchedDataAvailable = this.portalFeedItems.length > 0;
        console.log("file: newsComponent.js ~ line 62 ~ NewsComponent ~ @wire ~ showButtons", this.showButtons);
    }

    // connectedCallback() {
    //     if(this.componentSize == 'Whole Page') {
    //             this.isWholePageView = true;
    //             this.isOneThree = false;
    //             this.isSingleTile = false;
    //             this.isTwoThree = false;
    //         } else if(this.componentSize == '2/3rd of Page'){
    //             this.isWholePageView = false;
    //             this.isOneThree = false;
    //             this.isSingleTile = false;
    //             this.isTwoThree = true;
    //         } else if(this.componentSize == '1/3rd of Page'){
    //             this.isWholePageView = false;
    //             this.isOneThree = true;
    //             this.isSingleTile = false;
    //             this.isTwoThree = false;
    //         } else if(this.componentSize == 'Single Tile'){
    //             this.isWholePageView = false;
    //             this.isOneThree = false;
    //             this.isSingleTile = true;
    //             this.isTwoThree = false;
    //         }
    //         console.log(this.isWholePageView, this.isOneThree, this.isSingleTile, this.isTwoThree)
    // }


    // get layoutSize() {
    //     if(this.componentSize == 'Whole Page') {
    //         return 12;
    //     } else if(this.componentSize == '2/3rd of Page'){
    //         return 8;
    //     } else if(this.componentSize == '1/3rd of Page'){
    //         return 4;
    //     } else if(this.componentSize == 'Single Tile'){
    //         return 5;
    //     }
    // }

    // get typeFiltersForComboBox() {
    //     let typeFilters = [];
    //     typeFilters.push({label : 'All', value : 'All'})
    //     if(this.typeComboBoxData != null) {
    //         this.typeComboBoxData.forEach(type => {
    //             typeFilters.push({label : type.label, value : type.value})
    //         })
    //     }
    //     return typeFilters;
    // }

    get comboBoxTypes() {
        let filters = [];
        filters.push({label : 'Home Page', value : 'HomePage'});
        filters.push({label : 'Launch Page', value : 'LaunchPage'});
        return filters;
    }

    // get showButtons() {
    //     if(this.totalPortalItems < this.pageSize) {
    //         return false;
    //     }
    //     return true;
    // }

    // get showButtonAndCombo() {
    //     return this.totalPortalItems > this.pageSize ? true : false
    // }

    get gotoNumberComboBox() {
        let buttonList = [];
        var totalButtons = Math.ceil(this.totalPortalItems / this.pageSize)
        for(var number = 1; number <= totalButtons; number++){
            buttonList.push({label: 'Page '+ number + ' of ' + totalButtons, value: number})
        }
        return buttonList;
    }

    get pageIcons() {
        let iconList = [];
        var totalButtons = Math.ceil(this.totalPortalItems / this.pageSize)
        if(totalButtons <= 10) {
            for(var number = 1; number <= totalButtons; number++){
                iconList.push({
                    value: number,
                    show : number ==  this.currentPageNumber ? true : false,
                })
            }
        }
        // console.log('current number', Math.ceil(this.firstRecord / this.totalPortalItems) + 1) 
        // console.log('')
        return iconList;
    }

    // get currentPageNumber() {
    //     console.log('In currentPageNumber')
    //     return 'Showing ' + (this.firstRecord + 1) + ' - ' + this.lastRecord + ' of ' + this.totalPortalItems + ' results';
    // }

    handlePageSize(event) {
        this.pageSize = parseInt(event.target.value);
        this.firstRecord = 0;
    }

    handleTypeChange(event) {
        console.log(event.target.value)
        this.dynamicTypeValue = event.target.value;
        this.isThereItem = true;
        if(this.dynamicTypeValue != 'All') {
            this.portalFeedItems = this.wholeTypesData[this.dynamicTypeValue];
            this.totalPortalItems = this.portalFeedItems.length != 0 || this.portalFeedItems != undefined ? Object.keys(this.portalFeedItems).length : 0 ;
            this.showButtons = Math.ceil(this.totalPortalItems / this.pageSize) <= 10 ? true : false;
            console.log(this.totalPortalItems)
            this.firstRecord = 0;
            this.lastRecord = 0;
            this.gotoNumber = Math.ceil(this.firstRecord / parseInt(this.pageSize)) + 1
            this.currentPageNumber = this.gotoNumber;
            if(this.totalPortalItems == 0) {
                this.isThereItem = false;
            } 
        } else {
            this.firstRecord = 0;
            this.lastRecord = 0;
        }
    }

    handleGoToNumber(event) {
        // this.gotoNumber = parseInt(event.target.value);
        this.gotoNumber = parseInt(event.currentTarget.dataset.id);
        this.firstRecord = this.pageSize * (this.gotoNumber - 1)
        this.currentPageNumber = this.gotoNumber;
        // console.log(event.target.value)

    }

    get portalFeedItemsList() {
        // if(this.typeValue == 'All') {
        // this.totalPortalItems = Object.keys(this.portalFeedItems).length
        // }
        this.lastRecord = this.firstRecord + this.pageSize;
        if(this.pageSize > this.totalPortalItems || (this.firstRecord + this.pageSize) > this.totalPortalItems ){
            this.lastRecord = this.totalPortalItems;
        }
        console.log(this.totalPortalItems)
        // this.currentPageNumber = 'Showing ' + (this.firstRecord + 1) + ' - ' + this.lastRecord + ' of ' + this.totalPortalItems + ' results';
        // console.log(this.currentPageNumber)
        // if(this.typeValue != 'All') {
        //     console.log(this.selectedTypeData)
        //     return this.selectedTypeData.slice(this.firstRecord, this.lastRecord);
        // }
        return this.portalFeedItems.slice(this.firstRecord, this.lastRecord);
    }

    get showPreviousButton() {
        if(this.currentPageNumber != 1){
            // console.log('in previous if')
            return false;
        } 
        return true;
    }

    get showNextButton() {
        if(this.currentPageNumber != Math.ceil(this.totalPortalItems / this.pageSize)){
            // console.log('in next if')
            return false;
        } 
        return true;
    }

    handleNext() {
        if(this.currentPageNumber != Math.ceil(this.totalPortalItems / this.pageSize)){
            this.firstRecord +=  this.pageSize;
            this.gotoNumber = Math.ceil(this.firstRecord / parseInt(this.pageSize)) + 1
            this.currentPageNumber++;
        }
    }

    handleFirst() {
        this.firstRecord =  0;
        this.gotoNumber = Math.ceil(this.firstRecord / parseInt(this.pageSize)) + 1
        
    }

    handleLast() {
        this.firstRecord = this.totalPortalItems - (this.totalPortalItems % this.pageSize)
        this.gotoNumber = Math.ceil(this.firstRecord / parseInt(this.pageSize)) + 1
    }

    handlePrevious() {
        if(this.currentPageNumber != 1) {
            this.firstRecord -=  this.pageSize;
            this.gotoNumber = Math.ceil(this.firstRecord / parseInt(this.pageSize)) + 1
            this.currentPageNumber--;
        }
    }

    processPortalFeedItemData(data) {
        let modifiedPortalFeed = [];
        data.forEach(eachRow => {
                let rowData = {};
                rowData.Id = eachRow.Id;
                rowData.Title = eachRow.title != null ? eachRow.title : 'No Title' ;
                rowData.Body = eachRow.body;
                rowData.subtitle = eachRow.subtitle;
                rowData.showSubtitle = eachRow.subtitle != '' ? true : false;
                rowData.Type = eachRow.type;
                // console.log('date ->',Date.parse(eachRow.articleDate))
                rowData.date = eachRow.articleDate;
                if(eachRow.imageUrl != 'No Image') {
                    rowData.imageUrl = eachRow.imageUrl;
                }
                modifiedPortalFeed.push(rowData);
            })
        return modifiedPortalFeed;
    }

    processPortalFeedItemDataAccordingToType(data) {
        let modifiedPortalFeedToTypes = {}
        let portalFeeds = [];
        // let launchPagePortalFeed = [];
        // let historicalPortalFeed = [];
        data.forEach(eachRow => {
            let rowData = {};
            rowData.Id = eachRow.Id;
            rowData.Title = eachRow.title != null ? eachRow.title : 'No Title' ;
            rowData.Body = eachRow.body;
            rowData.subtitle = eachRow.subtitle;
            rowData.showSubtitle = eachRow.subtitle != '' ? true : false;
            rowData.Type = eachRow.type;
            // console.log('date ->',Date.parse(eachRow.articleDate))
            rowData.date = eachRow.articleDate;
            if(eachRow.imageUrl != 'No Image') {
                rowData.imageUrl = eachRow.imageUrl;
            }
            rowData.isImageAvailable = eachRow.isImageAvailable;
            // if(eachRow.isNews) {
            // }  
            // if(eachRow.isLaunch){
            //     launchPagePortalFeed.push(rowData)
            // }
            portalFeeds.push(rowData)
            // historicalPortalFeed.push(rowData);
        })
        
        modifiedPortalFeedToTypes[this.dynamicTypeValue] = portalFeeds;
        // modifiedPortalFeedToTypes['Launch'] = launchPagePortalFeed;
        // modifiedPortalFeedToTypes['Archive'] = historicalPortalFeed;
        return modifiedPortalFeedToTypes;
        // console.log(this.wholeTypesData);
    }

    showFull(event) {
        console.log(event.target)
        let textClassList = []
        textClassList = this.template.querySelector('[data-id="' + event.target.dataset.id + '"]').classList
        if(!textClassList.contains('showLess')) {
            this.template.querySelector('[data-id="' + event.target.dataset.id + '"]').classList.add('showLess')
            event.target.title = 'Read More...'
            event.target.textContent = 'Read More...'
        } else {
            this.template.querySelector('[data-id="' + event.target.dataset.id + '"]').classList.remove('showLess')
            event.target.title = 'Read less...'
            event.target.textContent = 'Read less...'
        }
    }

    openNews(event) {
        let recordId = event.target.dataset.id;
        // console.log(event.target.dataset.id)
        fireEvent(this.pageRef, "getNews", recordId)
    }

    refreshNow() {
        this.loading = true;
        refreshApex(this.wholeWiredData).then(() => {
            this.loading = false;
        }).catch(() => {
            this.loading = false;
        });
    }

    handleNavigate(event) {
        this.articleId = event.currentTarget.dataset.id;
        console.log(this.articleId)
        this.isModalOpen = true;
        this.modalLoader = true
        setTimeout(() => {
            this.modalLoader = false
        }, 2000);
    }

    closeModal() {
        this.isModalOpen = false;
        articleId = undefined;
    }

    handleArticleSearch(event) {
        let searchTerm = event.target.value;
       
        console.log("file: newsComponent.js ~ line 421 ~ NewsComponent ~ handleArticleSearch ~ searchTerm", searchTerm);
        if( this.searchTerm != ''){
           // if(this.wholeTypesData[this.dynamicTypeValue]){
                this.portalFeedItems = this.wholeTypesData[this.dynamicTypeValue].filter(eachRow => {
                    return (eachRow.Title.includes((searchTerm)) || eachRow.subtitle.includes((searchTerm)))
                })
                this.totalPortalItems = this.portalFeedItems != null ? this.portalFeedItems.length : 0;
                this.showButtons = Math.ceil(this.totalPortalItems / this.pageSize) <= 10 ? true : false;
                this.isSearchedDataAvailable = this.portalFeedItems.length > 0;
          //  }
            return;
        } 
        this.initializeValues();
    }
}