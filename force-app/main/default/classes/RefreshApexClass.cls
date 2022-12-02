public with sharing class RefreshApexClass {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountDetails(){
       return [select id,Name,Type,Phone from Account limit 10];
    }
}
