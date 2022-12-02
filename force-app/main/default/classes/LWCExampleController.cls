public with sharing class LWCExampleController {
   
    @AuraEnabled
    public static void insertAccountAndContacts(Account accountToInsert, List<Contact> contactsToInsert) {
       // System.Savepoint sp = Database.setSavepoint();
        try {
            insert accountToInsert;
            for (Contact eachContact : contactsToInsert) {
                eachContact.AccountId = accountToInsert.Id;
            }
            insert contactsToInsert;
        } catch (Exception e) {
          //  Database.rollback(sp);
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<String> lstAccountFields(){
        
        List<String> lstFields = new List<String>();
        
  //    List<Schema.FieldSetMember> fieldSetMemberList =  Util.readFieldSet('fs','Contact');
for(Schema.FieldSetMember fieldSetMemberObj : SObjectType.Account.FieldSets.AccountFiledSet.getFields())
{
    lstFields.add(fieldSetMemberObj.getFieldPath());
    	system.debug(fieldSetMemberObj.getFieldPath());

}
        
      //for(
	//eturn SObjectType.Contact.FieldSets.fs.getFields();
	return lstFields;
    }
}
