public with sharing class StylingContatViewFrom {
    public StylingContatViewFrom() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getConList(String SearchKey){
        SearchKey='%'+SearchKey+'%';
        List<Contact> conlist=[SELECT Id,Name,Phone,Email from Contact Where Name LIKE:SearchKey limit 10];
        return conlist;
    }
       @AuraEnabled
       public static Id returnCon(String Name){
        
        try{
           
            Contact getCon = [SELECT Id,Name,Phone,Email from Contact WHERE Name =: Name];
            
            return getCon.Id;
        }
        Catch(Exception e){
            
            throw new AurahandledException(e.getMessage());
        }
    } 


    @AuraEnabled(cacheable=true)
    public static List<Contact> returnSearchResult(String searchKey) 
    {
       try {
      String strKey = '%' + searchKey + '%';  
      System.debug('searchKey  = '+strKey);
        return [SELECT Id, FirstName,LastName,Email,Phone,Name,MailingStreet,MailingCity,MailingState,MailingPostalCode,MailingCountry FROM Contact WHERE Name LIKE : strKey LIMIT 5];  
    }
    catch(Exception e){

        throw new AuraHandledException(e.getMessage());
    }
}
}
