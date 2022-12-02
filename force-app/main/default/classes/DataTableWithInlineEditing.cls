public with sharing class DataTableWithInlineEditing {
    public DataTableWithInlineEditing() {

    }
       @AuraEnabled(cacheable=true)
       public static List<Account> getAcclist(){
        List<Account> acclist =[select Id,Name,Phone from Account limit 10];
        return acclist;
       }

       @AuraEnabled
        public static string updatedacclist(Object accountdata){
            List<Account> accountlist=(List<Account> ) JSON.deserialize(JSON.serialize(accountdata), List<Account>.class);
            update accountlist;
            return null;
        }
       
       

}
