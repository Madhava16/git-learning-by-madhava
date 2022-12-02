public with sharing class createRecord {
    public createRecord() {

    }
    @AuraEnabled
    public static List<Contact>  CreateContact(String contactName,String contactPhone){
        try {
            List<Contact> conlist=new List<Contact>();
            if(contactName!=Null){
                Contact obj=new Contact();
                obj.LastName=contactName;
                obj.Phone=contactPhone;
                conlist.add(obj);
            }
            if(!conlist.isEmpty()){
                insert conlist;
                return conlist;
            }
            return null;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
