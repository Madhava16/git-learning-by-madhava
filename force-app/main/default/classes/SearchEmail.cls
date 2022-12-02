public with sharing class SearchEmail {
   @AuraEnabled(cacheable=true)
   public static List<Contact> getContact(String searchkey){
   
        if(searchkey!=null && searchkey!=''){
          searchkey ='%'+searchkey+'%';

           //List<Contact> searchlist=[Select id,Name,Phone,Email from Contact where Email LIKE:searchkey];
          // searchkey ='%'+searchkey+'%';
          List<Contact> searchlist=[SELECT Id, Name,Phone, Email FROM Contact WHERE Email LIKE :searchkey];
            return searchlist;
       
     
        
        }  
        return null;
    
   }
    
}
