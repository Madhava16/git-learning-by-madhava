public with sharing class RelatedContactsCreated {
    public RelatedContactsCreated() {

    }
   
    @AuraEnabled
    public static List<Account> getaccountlist()
    {
        List<Account> accountdetails = [select Id,Name,Phone from Account];
        return accountdetails;
    }
    @AuraEnabled
    public static Contact insertion(Contact  objcontact)
    {    
        insert objcontact;
        return objcontact;
 }
}

