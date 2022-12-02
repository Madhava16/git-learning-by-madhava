public with sharing class leadcontactandAccount {
    public leadcontactandAccount() {

    }
    @AuraEnabled(cacheable=true)
    public static sObject getleadconacc(List<Account> lstAccToInsert ,List<Contact> lstContactToInsert,List<Lead> lstLeadToInsert){
        
            System.debug('list' + lstAccToInsert);        
		
         set<Id> idSet= new  Set<Id>();

           insert lstAccToInsert;
          
           for(Account accObj: lstAccToInsert){
               if(accObj.Id!=null)
                {
                   idSet.add(accObj.Id);
                }
        }
        
		// return [SELECT Id, Type, Name, ShippingStreet, ShippingCity, ShippingState, ShippingPostalCode, 
        //         ShippingCountry, ShippingAddress, Phone FROM Account WHERE Id = :idSet];  
        
    
    
    
    // @AuraEnabled
    // public static List<Contact> getContacts(List<Contact> lstContactToInsert){
          
        System.debug('list' + lstContactToInsert); 
        
          insert lstContactToInsert;
       // return lstContactToInsert; 
    //}	
    
     
    // @AuraEnabled
    // public static List<Lead> getLeads(List<Lead> lstLeadToInsert){
    System.debug('list' + lstLeadToInsert);        
		 
        insert lstLeadToInsert;
        
       // return lstLeadToInsert;
        //} 
        return [SELECT Id, Type, Name, ShippingStreet, ShippingCity, ShippingState, ShippingPostalCode, 
        ShippingCountry, ShippingAddress, Phone FROM Account WHERE Id = :idSet];  
    }

}