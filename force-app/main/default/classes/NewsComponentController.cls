/**
 *  Class Name : NewsComponentController
 *  Author : 
 *  Date : 05 Sep 2021
 *  Description : This controller is used to
                * Get the News items from the Portal_Feed_Item__c to display in the LWC Component
                
 */

public without sharing class NewsComponentController {
    // public NewsComponentController() {    // }

    // getting the portal feed items to show in the component
    @AuraEnabled(cacheable = true)
    public static List<NewsComponentController.PortalFeedItemWithImageURL> getPortalFeedItems(String dynamicTypeValue, Boolean ignoreDates){
        try {
            List<NewsComponentController.PortalFeedItemWithImageURL> portalFeedItemWithImageURLList = new List<NewsComponentController.PortalFeedItemWithImageURL>();
            User currentUser = [Select Id, ContactId, Contact.Account.Sales_Market_Code__c From User Where Id =: UserInfo.getUserId() LIMIT 1];
            String userMarket = '';
            Boolean isExperience = currentUser != null &&  currentUser.ContactId != null ? true : false;
            System.debug('isExperience ==> ' + isExperience);
            List<Portal_Feed_Item__c> portalFeedItemList = new List<Portal_Feed_Item__c>();
            
            if(currentUser != null &&  currentUser.ContactId != null) {
                portalFeedItemList = ignoreDates ? [Select Id, Body__c, CreatedDate, Image_URL__c, Subtitle__c, Publish_Date__c, Markets__c, Subject__c, Type__c, Start_Date__c, End_Date__c, Display_in_News__c, Display_in_Launch__c From Portal_Feed_Item__c WHERE News_Feeds_to_Display_in__c includes (:dynamicTypeValue) Order By Publication_start_date__c DESC] : [Select Id, Body__c, CreatedDate, Image_URL__c, Subtitle__c, Publish_Date__c, Markets__c, Subject__c, Type__c, Start_Date__c, End_Date__c, Display_in_News__c, Display_in_Launch__c From Portal_Feed_Item__c WHERE News_Feeds_to_Display_in__c includes (:dynamicTypeValue) AND  Publication_start_date__c != null AND Publication_start_date__c <= Today AND Publication_End_Date__c >= Today  Order By Publication_start_date__c DESC] ; 
                userMarket = currentUser.Contact.Account.Sales_Market_Code__c;
            } else {
                portalFeedItemList = ignoreDates ? [Select Id, Body__c, CreatedDate, Image_URL__c, Subtitle__c, Publish_Date__c, Markets__c, Subject__c, Type__c, Start_Date__c, Display_in_News__c, Display_in_Launch__c From Portal_Feed_Item__c WHERE News_Feeds_to_Display_in__c includes (:dynamicTypeValue) Order By Publication_start_date__c DESC] : [Select Id, Body__c, CreatedDate, Image_URL__c, Subtitle__c, Publish_Date__c, Markets__c, Subject__c, Type__c, Start_Date__c, Display_in_News__c, Display_in_Launch__c From Portal_Feed_Item__c WHERE News_Feeds_to_Display_in__c includes (:dynamicTypeValue) AND  Publication_start_date__c != null AND Publication_start_date__c <= Today AND Publication_End_Date__c >= Today Order By Publication_start_date__c DESC];
            }
            System.debug('portalFeedItemList == > ' +portalFeedItemList);
            Set<Id> portalFeedItemIds = new Set<Id>();
            // String baseUrl = URL.getSalesforceBaseUrl().toExternalForm();
            String baseUrl = Site.getBaseUrl().toLowerCase();
            // Id defaultContentVersionId = [Select Id From ContentVersion Where ContentDocumentId = '069g0000001tnNhAAI']?.Id;
            if(portalFeedItemList !=null && portalFeedItemList.size() > 0) {
                for(Portal_Feed_Item__c portalFeedItem : portalFeedItemList) {
                    portalFeedItemIds.add(portalFeedItem.Id);
                }
                List<Id> contentDocumentIds = new List<Id>();
                Map<Id, Id> contentDocumentLinkMap = getContentDocumentLinks(portalFeedItemIds);
                Map<Id, Id> contentVersionMap = new Map<Id, Id>();
                if(contentDocumentLinkMap.size() > 0) {
                    contentDocumentIds = contentDocumentLinkMap.values();
                    if(contentDocumentIds.size() > 0) {
                        contentVersionMap = getContentVersion(contentDocumentIds);
                    }
                }
                if(isExperience) {
                    for(Portal_Feed_Item__c portalFeedItem : portalFeedItemList) {
                        if(checkForMarkets(portalFeedItem.Markets__c, userMarket)) {
                            NewsComponentController.PortalFeedItemWithImageURL portalFeedItemWithImageUrl = new NewsComponentController.PortalFeedItemWithImageURL();
                            // portalFeedItemWithImageUrl.portalFeedItem = portalFeedItem;
                            portalFeedItemWithImageUrl.title = portalFeedItem.Subject__c;
                            portalFeedItemWithImageUrl.body = String.isNotBlank(portalFeedItem.Body__c) ? portalFeedItem.Body__c.normalizeSpace().stripHtmlTags() : '';
                            portalFeedItemWithImageUrl.type = portalFeedItem.Type__c;
                            portalFeedItemWithImageUrl.Id = portalFeedItem.Id;
                            portalFeedItemWithImageUrl.subtitle = String.isNotBlank(portalFeedItem.Subtitle__c) ? portalFeedItem.Subtitle__c : '' ;
                            portalFeedItemWithImageUrl.isLaunch = portalFeedItem.Display_in_Launch__c;
                            portalFeedItemWithImageUrl.isNews = portalFeedItem.Display_in_News__c;
                            DateTime articleDate = portalFeedItem.Start_Date__c;
                            portalFeedItemWithImageUrl.articleDate = articleDate != null ? String.valueof(articleDate) : '';
                            portalFeedItemWithImageUrl.imageUrl = 'No image';
                            if(portalFeedItem.Image_URL__c != Null) {
                                portalFeedItemWithImageUrl.imageUrl = portalFeedItem.Image_URL__c;
                            } else {
                                if(contentDocumentLinkMap != null && contentDocumentLinkMap.containsKey(portalFeedItem.Id) && contentVersionMap != null) {
                                    Id contentDocumentLinkId = contentDocumentLinkMap.containsKey(portalFeedItem.Id) ? contentDocumentLinkMap.get(portalFeedItem.Id) : null;
                                    Id contentVersionId = contentVersionMap.containsKey(contentDocumentLinkId) ? contentVersionMap.get(contentDocumentLinkId) : null ;
                                    portalFeedItemWithImageUrl.imageUrl = contentVersionId != null ? baseUrl + '/sfc/servlet.shepherd/version/download/' + contentVersionId : 'No Images';
                                }
                            }
                            portalFeedItemWithImageUrl.isImageAvailable = portalFeedItemWithImageUrl.imageUrl != 'No Image' && portalFeedItemWithImageUrl.imageUrl != null;
                            // if(portalFeedItem.Image_URL__c != Null) {
                            //     portalFeedItemWithImageUrl.imageUrl = portalFeedItem.Image_URL__c;
                            // } else {
                            //     if(contentDocumentLinkMap != null && contentDocumentLinkMap.containsKey(portalFeedItem.Id) && contentVersionMap != null) {
                            //         Id contentDocumentLinkId = contentDocumentLinkMap.get(portalFeedItem.Id);
                            //         Id contentVersionId = contentVersionMap.containsKey(contentDocumentLinkId) ? contentVersionMap.get(contentDocumentLinkId) : null ;
                            //         portalFeedItemWithImageUrl.imageUrl = contentVersionId != null ? baseUrl + '/sfc/servlet.shepherd/version/download/' + contentVersionId : portalFeedItemWithImageUrl.imageUrl;
                            //     }
                            // }
                            portalFeedItemWithImageURLList.add(portalFeedItemWithImageUrl);
                        }
                    }
                } else {
                    for(Portal_Feed_Item__c portalFeedItem : portalFeedItemList) {
                        NewsComponentController.PortalFeedItemWithImageURL portalFeedItemWithImageUrl = new NewsComponentController.PortalFeedItemWithImageURL();
                        // portalFeedItemWithImageUrl.portalFeedItem = portalFeedItem;
                        portalFeedItemWithImageUrl.title = portalFeedItem.Subject__c;
                        portalFeedItemWithImageUrl.body = String.isNotBlank(portalFeedItem.Body__c) ? portalFeedItem.Body__c.normalizeSpace().stripHtmlTags() : '';
                        portalFeedItemWithImageUrl.type = portalFeedItem.Type__c;
                        portalFeedItemWithImageUrl.Id = portalFeedItem.Id;
                        portalFeedItemWithImageUrl.isNews = portalFeedItem.Display_in_News__c;
                        portalFeedItemWithImageUrl.isLaunch = portalFeedItem.Display_in_Launch__c;
                        portalFeedItemWithImageUrl.subtitle = String.isNotBlank(portalFeedItem.Subtitle__c) ? portalFeedItem.Subtitle__c : '' ;
                        DateTime articleDate = portalFeedItem.Start_Date__c;
                        portalFeedItemWithImageUrl.articleDate = articleDate != null ? String.valueof(articleDate) : '';
                        portalFeedItemWithImageUrl.imageUrl = 'No image';
                        if(portalFeedItem.Image_URL__c != Null) {
                            portalFeedItemWithImageUrl.imageUrl = portalFeedItem.Image_URL__c;
                        } else {
                            if(contentDocumentLinkMap != null && contentDocumentLinkMap.containsKey(portalFeedItem.Id) && contentVersionMap != null) {
                                Id contentDocumentLinkId = contentDocumentLinkMap.containsKey(portalFeedItem.Id) ? contentDocumentLinkMap.get(portalFeedItem.Id) : null;
                                Id contentVersionId = contentVersionMap.containsKey(contentDocumentLinkId) ? contentVersionMap.get(contentDocumentLinkId) : null ;
                                portalFeedItemWithImageUrl.imageUrl = contentVersionId != null ? baseUrl + '/sfc/servlet.shepherd/version/download/' + contentVersionId : 'No Images';
                            }
                        }
                        portalFeedItemWithImageUrl.isImageAvailable = portalFeedItemWithImageUrl.imageUrl != 'No Image' && portalFeedItemWithImageUrl.imageUrl != null;
                        // if(portalFeedItem.Image_URL__c != Null) {
                        //     portalFeedItemWithImageUrl.imageUrl = portalFeedItem.Image_URL__c;
                        // } else {
                        //     if(contentDocumentLinkMap != null && contentDocumentLinkMap.containsKey(portalFeedItem.Id) && contentVersionMap != null) {
                        //         Id contentDocumentLinkId = contentDocumentLinkMap.get(portalFeedItem.Id);
                        //         Id contentVersionId = contentVersionMap.containsKey(contentDocumentLinkId) ? contentVersionMap.get(contentDocumentLinkId) : null ;
                        //         portalFeedItemWithImageUrl.imageUrl = contentVersionId != null ? baseUrl + '/sfc/servlet.shepherd/version/download/' + contentVersionId : portalFeedItemWithImageUrl.imageUrl;
                        //     }
                        // }
                        portalFeedItemWithImageURLList.add(portalFeedItemWithImageUrl);
                    }
                }
            }
            return portalFeedItemWithImageURLList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    //Wrapper class to send to the LWC
    public class PortalFeedItemWithImageURL {
        // @AuraEnabled
        // public Portal_Feed_Item__c portalFeedItem;
        @AuraEnabled
        public String title;
        @AuraEnabled
        public String body;
        @AuraEnabled
        public String Id;
        @AuraEnabled
        public String type;
        @AuraEnabled
        public Boolean isNews;
        @AuraEnabled
        public Boolean isLaunch;
        @AuraEnabled
        public String imageUrl;
        @AuraEnabled
        public Boolean isImageAvailable;
        @AuraEnabled
        public String subtitle;
        @AuraEnabled
        public String articleDate;
    }

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


     // Method to check if Market code is available in the Market Set of the Portal_Feed_Item__c field
     public static boolean checkForMarkets(String markets, String userMarket) {
        Boolean returnBool = false;
        if(markets != null) {
            Set<String> marketSet = new Set<String>(markets.split(';'));
            returnBool = !marketSet.isEmpty()  && marketSet.contains(userMarket) ? true : false;
        } else {
            return true;    
        }
        return returnBool;
    }

    // @AuraEnabled(cacheable = true)
    // public static string getPublicLink(){
    //     try {
    //         // ContentDistribution contentDistribution = [SELECT DistributionPublicUrl, ContentDownloadUrl, Id, ContentDocumentId, ContentVersionId, ContentVersion.ContentBodyId FROM ContentDistribution Where ContentDocumentId = '069g0000001tn6RAAQ'];
    //         String fileType = 'JPG';
    //         String cVersionId = '068g0000001tpxSAAQ';
    //         String cBodyId = '05Tg0000007uFY3EAM';
    //         String originalUrl = String.valueOf('https://mascocabinetry--itedge.my.salesforce.com/sfc/p/g0000006Nvq9/a/g0000000D41I/Sd5bM8BXXkXmG1kK064UR7pue3hVVpuqJhNCtyB6ucg');
    //         String cDistParam = originalUrl.substring(originalUrl.indexOf('/a/'));
    //         String orgId = ConnectApi.Organization.getSettings().orgId;
    //         String baseDomain = NewsComponentController.getLoginURL();
    //         baseDomain = baseDomain.substringBefore('.') + '--c.documentforce.com';
    //         String theUrl = baseDomain + '/sfc/dist/version/renditionDownload?rendition=ORIGINAL_' +
    //         fileType + '&versionId=' + cVersionId + '&operationContext=DELIVERY&contentId=' + cBodyId +
    //         '&page=0&d=' + cDistParam + '&oid=' + orgId + '&dpt=null&viewId=';
    //         return theUrl;
    //     } catch (Exception e) {
    //         throw new AuraHandledException(e.getMessage());
    //     }
    // }

    // public static String getLoginURL(){
    //     String baseURL = System.URL.getSalesforceBaseUrl().toExternalForm();
    //     User userRecord = [Select Id, AccountId, ContactId FROM User Where Id = :UserInfo.getUserId()];
    //     if(userRecord.ContactId != null){
    //         baseUrl = getExperienceURL();
    //     }
    //     return baseUrl;
    // }

    // public static String getExperienceURL(){
    //     String baseUrl = Network.getLoginUrl(Network.getNetworkId());
    //     baseURL =  baseURL.replace('/s/login', '');
    //     baseURL =  baseURL.replace('/s/Login', '');
    //     baseURL =  baseURL.replace('/login', '');
    //     baseURL =  baseURL.replace('/Login', '');
    //     return baseURL;
    // }
}
