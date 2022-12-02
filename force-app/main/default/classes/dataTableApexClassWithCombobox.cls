public with sharing class dataTableApexClassWithCombobox {
   
  @AuraEnabled
  public static List<Account> getAccountlistFormCombpbox(){
    try {
        List<Account> acclist=[SELECT ID,Name FROM Account];
        return acclist;
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled(cacheable=true)
  public static List<Contact> getContacts(Id recordId){
    try {
        List<Contact> conlist=[SELECT Id,Name,Email,AccountId FROM Contact where AccountId=:recordId];
        return conlist;
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
  }
}
