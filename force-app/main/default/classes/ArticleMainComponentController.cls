/**
 *  Class Name : ArticleMainComponentController
 *  Author : 
 *  Date : 10 Sep 2021
 *  Description : This class is used to get the Article with the RecordId 
 */

public with sharing class ArticleMainComponentController {
    // public ArticleMainComponentController() {    }

    // This method will accept one parameter recordId of Portal_Feed_Item__c which will get the portal Feed Item
    // This method is used to send ArticleToSend Wrapper class to the LWC so to show the details 
    @AuraEnabled(cacheable=true)
    public static ArticleToSend getArticle(Id recordId){
        try {
            ArticleToSend articleToSend = new ArticleToSend();
            Portal_Feed_Item__c portalFeedItem = [Select Id, Body__c, CreatedDate, Start_Date__c, Image_URL__c, Owner.Name, Subject__C, Subtitle__c, Type__c From Portal_Feed_Item__c Where Id =: recordId];
            // Set<Id> portalFeedItemIds = new Set<Id>();
            // String baseUrl = URL.getSalesforceBaseUrl().toExternalForm();
            String baseUrl = Site.getBaseUrl().toLowerCase();
            List<Id> contentDocumentIds = new List<Id>();
            Map<Id, Id> contentDocumentLinkMap = ArticleMainComponentController.getContentDocumentLinks(new Set<Id>{portalFeedItem.Id});
            Map<Id, Id> contentVersionMap = new Map<Id, Id>();
            if(contentDocumentLinkMap.size() > 0) {
                contentDocumentIds = contentDocumentLinkMap.values();
                if(contentDocumentIds.size() > 0) {
                    contentVersionMap = ArticleMainComponentController.getContentVersion(contentDocumentIds);
                }
            }
            Datetime articleDate = portalFeedItem.Start_Date__c;
            articleToSend.articleDate = articleDate.formatGmt('M/d/yy');
            articleToSend.body = portalFeedItem.Body__c;
            articleToSend.subtitle = portalFeedItem.Subtitle__c != null ? portalFeedItem.Subtitle__c.toLowerCase() : portalFeedItem.Subtitle__c;
            articleToSend.title = portalFeedItem.Subject__C != null ? portalFeedItem.Subject__C.toLowerCase() : portalFeedItem.Subject__C;
            articleToSend.autherName = portalFeedItem.Owner.Name;
            articleToSend.imgUrl = 'No image';
            if(portalFeedItem.Image_URL__c != Null) {
                articleToSend.imgUrl = portalFeedItem.Image_URL__c;
            } else {
                if(contentDocumentLinkMap != null && contentDocumentLinkMap.containsKey(portalFeedItem.Id) && contentVersionMap != null) {
                    Id contentDocumentLinkId = contentDocumentLinkMap.containsKey(portalFeedItem.Id) ? contentDocumentLinkMap.get(portalFeedItem.Id) : null;
                    Id contentVersionId = contentVersionMap.containsKey(contentDocumentLinkId) ? contentVersionMap.get(contentDocumentLinkId) : null ;
                    articleToSend.imgUrl = contentVersionId != null ? baseUrl + '/sfc/servlet.shepherd/version/download/' + contentVersionId : 'No Images';
                }
            }
            articleToSend.isImageAvailable = articleToSend.imgUrl != 'No Image' && articleToSend.imgUrl != null;
            return articleToSend;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    // Wrapper class to store data
    public class ArticleToSend {
        @AuraEnabled
        public String title;
        @AuraEnabled
        public String body;
        @AuraEnabled
        public String subtitle;
        @AuraEnabled
        public String articleDate;
        @AuraEnabled
        public String imgUrl;
        @AuraEnabled
        public Boolean isImageAvailable;
        @AuraEnabled
        public String autherName;
    }
// temp uncommented 9/9 JK IT Edge to deploy to data2
     /*@AuraEnabled(cacheable=true)
     public static List<ArticleToSend> getRelatedArticles(String promoType){
         try {
             List<ArticleToSend> articleToSendList = new List<ArticleToSend>();
             List<Portal_Feed_Item__c> portalFeedItemList = [Select Id,  CreatedDate, Image_URL__c, Subject__C, Subtitle__c, Type__c From Portal_Feed_Item__c Where Type__c =: promoType];
             Set<Id> portalFeedItemIds = new Set<Id>();
             // String baseUrl = URL.getSalesforceBaseUrl().toExternalForm();
             String baseUrl = Site.getBaseUrl().toLowerCase();
             // Id defaultContentVersionId = [Select Id From ContentVersion Where ContentDocumentId = '069g0000001tnNhAAI']?.Id;
             if(portalFeedItemList.size() > 0) {
                 for(Portal_Feed_Item__c portalFeedItem : portalFeedItemList) {
                     portalFeedItemIds.add(portalFeedItem.Id);
                 }
                 List<Id> contentDocumentIds = new List<Id>();
                 Map<Id, Id> contentDocumentLinkMap = ArticleMainComponentController.getContentDocumentLinks(portalFeedItemIds);
                 Map<Id, Id> contentVersionMap = new Map<Id, Id>();
                 if(contentDocumentLinkMap.size() > 0) {
                     contentDocumentIds = contentDocumentLinkMap.values();
                     if(contentDocumentIds.size() > 0) {
                         contentVersionMap = ArticleMainComponentController.getContentVersion(contentDocumentIds);
                     }
                 }
                 for(Portal_Feed_Item__c portalFeedItem : portalFeedItemList) {
                     ArticleToSend articleToSend = new ArticleToSend();
                     articleToSend.articleDate = portalFeedItem.CreatedDate.format('dd-MM-yyyy');
                     articleToSend.subtitle = portalFeedItem.Subtitle__c;
                     articleToSend.title = portalFeedItem.Subject__C;
                     if(portalFeedItem.Image_URL__c != Null) {
                         articleToSend.imgUrl = portalFeedItem.Image_URL__c;
                     } else {
                         if(contentDocumentLinkMap != null && contentDocumentLinkMap.containsKey(portalFeedItem.Id) && contentVersionMap != null) {
                             Id contentDocumentLinkId = contentDocumentLinkMap.get(portalFeedItem.Id);
                             Id contentVersionId = contentVersionMap.containsKey(contentDocumentLinkId) ? contentVersionMap.get(contentDocumentLinkId) : null ;
                             articleToSend.imgUrl = contentVersionId != null ? baseUrl + '/sfc/servlet.shepherd/version/download/' + contentVersionId : '';
                         }
                     }
                     articleToSendList.add(articleToSend);
                 }
             }
             return articleToSendList;
         } catch (Exception e) {
             throw new AuraHandledException(e.getMessage());
         }
     } */

    //  To get the content Document liks from the portalFeedItemId
    public static Map<Id, Id> getContentDocumentLinks(Set<id> portalFeedItemIds) {
        Map<Id, Id> contentDocumentLinkMap = new Map<Id, Id>();
        List<ContentDocumentLink> contentDocumentLinkList = new List<ContentDocumentLink>();
        if(portalFeedItemIds.size() > 0) {
            contentDocumentLinkList = [Select Id, ContentDocumentId, LinkedEntityId From ContentDocumentLink Where LinkedEntityId In : portalFeedItemIds Order By ContentDocument.CreatedDate];
        }
        if(contentDocumentLinkList.size() > 0) {
            for(ContentDocumentLink contentDocumentLink : contentDocumentLinkList) {
                contentDocumentLinkMap.put(contentDocumentLink.LinkedEntityId, contentDocumentLink.ContentDocumentId);
            }
        }
        return contentDocumentLinkMap;
    }

    //  To get the content Version from the portalFeedItemId
    public static Map<Id, Id> getContentVersion(List<id> contentDocumentIds) {
        Set<Id> contentDocumentIdSet = new Set<Id>();
        Map<Id, Id> contentVersionMap = new Map<Id, Id>();
        if(contentDocumentIds.size() > 0) {
            contentDocumentIdSet = new Set<Id>(contentDocumentIds);
            if(contentDocumentIdSet.size() > 0) {
                List<ContentVersion> contentVersionList = [SELECT Id, ContentDocumentId FROM ContentVersion Where ContentDocumentId In : contentDocumentIds];
                if(contentVersionList.size() > 0) {
                    for(ContentVersion contentVersion : contentVersionList) {
                        contentVersionMap.put(contentVersion.ContentDocumentId, contentVersion.Id);
                    }
                }
            }
        }
        System.debug(contentVersionMap);
        return contentVersionMap;
    }

    //  public static String getLoginURL(){
    //      String baseURL = System.URL.getSalesforceBaseUrl().toExternalForm();
    //      User userRecord = [Select Id, AccountId, ContactId FROM User Where Id = :UserInfo.getUserId()];
    //      if(userRecord.ContactId != null){
    //          baseUrl = getExperienceURL() + '/lms/s';
    //      }
    //      return baseUrl;
    //  }

    //  public static String getExperienceURL(){
    //      String baseUrl = Network.getLoginUrl(Network.getNetworkId());
    //      baseURL =  baseURL.replace('/s/login', '');
    //      baseURL =  baseURL.replace('/s/Login', '');
    //      baseURL =  baseURL.replace('/login', '');
    //      baseURL =  baseURL.replace('/Login', '');
    //      return baseURL;
    //  }
}