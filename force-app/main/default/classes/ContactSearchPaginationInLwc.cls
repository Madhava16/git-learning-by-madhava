public with sharing class ContactSearchPaginationInLwc {
    public ContactSearchPaginationInLwc() {

    }
    // @AuraEnabled(cacheable=true)
    // public static List<Contact> getContacts(String searchKey){
    //     try {
    //         if(!String.isNotEmpty(searchKey)){
    //             searchKey='%'+searchKey+'%';
    //             return[select Id,Name,Phone,Email from Contact where Name like :searchKey OR Email like:searchKey];
    //         }
    //         else{
    //             return[select id,Name,Phone,Email from Contact ORDER BY Name];
    //         }
          
    //     } catch (Exception e) {
    //         throw new AuraHandledException(e.getMessage());
    //     }
    // }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String searchKey) {        
       // String query = 'SELECT Id, Name,Phone,Type FROM Account';            
        if (String.isNotEmpty(searchKey)) {
            String key = '%' + searchKey + '%';
            return[select Id,Name,Phone,Email from Contact where Name like :key OR Email like:key];
        }
        else{
            return[select id,Name,Phone from Contact ORDER BY Name];
        }        
        //return Database.query(query);
    }
    
}
