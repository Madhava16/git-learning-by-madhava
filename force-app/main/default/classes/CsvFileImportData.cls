public with sharing class CsvFileImportData {
    public CsvFileImportData() {

    }

   public static List<Sobject> getAccConLead(List<Account> accInsert,Contact conInsert,Lead leadInsert){
       // public static List<Sobject> getAccConLead(){

        set<Id> idSet= new  Set<Id>();

        //  insert accInsert;
        
           for(Account accObj: accInsert){
             if(accObj.Id!=null)
               {
                 idSet.add(accObj.Id);
              }
           }
      List<Sobject> listobj = new List<Sobject>();
    // Account a=new Account(Name='Test Account1');
    // Contact c = new Contact(LastName='Test Contact1');
    // Lead l= new Lead(LastName='Test Lead',Company='Lead Company1');
      listobj.addAll(accInsert);
       listobj.add(conInsert);
        listobj.add(leadInsert);  
    //    listobj.add(a);
    //    listobj.add(c);
    //     listobj.add(l);
       insert listobj;
             System.debug('Inserted'+listobj);
             return [SELECT Id, Type, Name, ShippingStreet, ShippingCity, ShippingState, ShippingPostalCode,  
                     ShippingCountry, ShippingAddress, Phone FROM Account WHERE Id = :idSet];  
      
   }

    
    // @AuraEnabled
    //  public static List<Account> getAccounts(List<Account> lstAccToInsert){
        
    //      System.debug('list' + lstAccToInsert);        
		
    //       set<Id> idSet= new  Set<Id>();

    //        insert lstAccToInsert;
          
    //         for(Account accObj: lstAccToInsert){
    //           if(accObj.Id!=null)
    //             {
    //                idSet.add(accObj.Id);
    //             }
    //    }
        
	//  	return [SELECT Id, Type, Name, ShippingStreet, ShippingCity, ShippingState, ShippingPostalCode, 
    //              ShippingCountry, ShippingAddress, Phone FROM Account WHERE Id = :idSet];  
        
    
    //  }
    
    //  @AuraEnabled
    //  public static List<Contact> getContacts(List<Contact> lstContactToInsert){
          
    //     System.debug('list' + lstContactToInsert); 
        
    //        insert lstContactToInsert;
    //     return lstContactToInsert; 
    // }	
    
     
    //  @AuraEnabled
    //  public static List<Lead> getLeads(List<Lead> lstLeadToInsert){
    //  System.debug('list' + lstLeadToInsert);        
		 
    //      insert lstLeadToInsert;
        
    //      return lstLeadToInsert;
    //  }
}

