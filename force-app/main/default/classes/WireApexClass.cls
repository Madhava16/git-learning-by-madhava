public with sharing class WireApexClass {
   @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [
            SELECT Id, Name, Phone, Email
            FROM Contact
            LIMIT 10
        ];
    }
}
