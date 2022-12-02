public with sharing class ContactQuery {
    public ContactQuery() {

    }
    
    @AuraEnabled( cacheable = true )
    public static void ContacttList(Account accObj, List<Contact> conObj){
       insert accObj;
       for(Contact eachCon:conObj){
        eachCon.Accountdid=accObj.Id;
       }
       insert conObj;
    }
}
