public with sharing class GetChildrenRecords {
   @AuraEnabled
   
    public static List<Account> getChildRecords(String recId){
        List<Account> acclist=[Select id,(select id,Name from Contacts),(select id,Name from Opportunities) from Account where id=:recId];
     System.debug(acclist);
   
   if(!acclist.isEmpty()){
    return acclist;
   }
   return null;
    }
    
}

