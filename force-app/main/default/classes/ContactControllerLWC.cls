public with sharing class ContactControllerLWC {
    public ContactControllerLWC() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String searchText) {
        try {
            if(!String.isBlank(searchText)){
                searchText = '%' + searchText + '%';
                return [Select Id, Name, Email, Account.Name, Phone 
                        From Contact
                        Where Name Like : searchText
                            Or Email Like : searchText
                        Order By Name];
            } else {
                return [Select Id, Name, Email, Account.Name, Phone
                        From Contact 
                        Order By Name];
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }



    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        return [Select Id, Name From Account];
    }

    @AuraEnabled
    public static Id insertContact(String contact){
        System.debug('COntact String  ==> ' +  contact);
        Contact co = (Contact) JSON.deserialize(contact, Contact.class);
        System.debug('Contact  ==> ' +  co);
        //Contact c = (Contact) contact;
        insert co;
        return co.Id;
    }

}