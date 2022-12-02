public with sharing class DisplayContacts {
    // 
  
    @AuraEnabled (cacheable=true)
    public static List<Contact> getcontacts(String searchkeys){
        try{
        if(searchkeys!=null && searchkeys!=''){
            String name='%'+searchkeys+'%';
            List<Contact> searchlist=[select id,Name,Phone,Email from Contact where Name like:name OR Email like:name];
            return searchlist;
        }
         return null;
        // else{
        //     List<Contact> contactlist=[SELECT id,Name,Phone,Email from Contact];
        //     return contactlist;
        // }  
        }
         catch(Exception e){
                
                throw new AuraHandledException(e.getMessage());
            }
        }
            @AuraEnabled(cacheable=true)
            public static List<Contact> Conlist(Integer pageSize){
                try {
                    List<Contact> conlist=[select id,Name,Email,Phone from Contact limit:pageSize];
                    return conlist;
                } catch (Exception e) {
                    throw new AuraHandledException(e.getMessage());
                }
            }
          
           
     
          
}
