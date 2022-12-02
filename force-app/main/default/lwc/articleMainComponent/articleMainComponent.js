import { api, LightningElement, wire } from 'lwc';
import getArticle from '@salesforce/apex/ArticleMainComponentController.getArticle';

export default class ArticleMainComponent extends LightningElement {
    article = {};
    loading = false;
    isThereError = false;
    @api recordId;
    @api articleId;
    connectedCallback(){
        if(this.recordId){            
            this.articleId = this.recordId;
            console.log('record id --> ',this.recordId);
        }
    }

    @wire(getArticle, {recordId : '$articleId'}) articleFromOrg({data, error}) {
        console.log(this.articleId)
        this.loading = true;
        if(data) {
            // loading = true;
            console.log('Or data +======>',data)
            this.article.title = data.title;
            this.article.body = data.body;
            this.article.subtitle = data.subtitle;
            this.article.articleDate = Date.parse(data.articleDate);
            this.article.imgUrl = data.imgUrl;
            this.article.isImageAvailable = data.isImageAvailable;
            this.article.autherName = data.autherName;
            console.log("file: articleMainComponent.js ~ line 29 ~ ArticleMainComponent ~ @wire ~ this.article", this.article);
            this.loading = false;
            this.isThereError = false;
            console.log(location.host)
            // console.log('Or art +======>',this.article)
        } else if(error){
            console.log('Error Child',error)
            this.isThereError = true;
            this.loading = false;
            // this.loading = false;
        }
        this.loading = false;
    }
}