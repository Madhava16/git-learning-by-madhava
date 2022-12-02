public with sharing class getChild {
    public getChild() {

    }
    @AuraEnabled
    public static List<Account> getDetailsOfChild(){
        try {
            List<Account> acclist=[select id,Name,(select Name,Firstname,LastName from Contacts) from Account ];
            if(!acclist.isEmpty()){
                return acclist;
            }
            return null;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
