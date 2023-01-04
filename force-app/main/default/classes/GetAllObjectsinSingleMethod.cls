public with sharing class GetAllObjectsinSingleMethod {
   
   @AuraEnabled(cacheable=true)
   public static List<EntityDefinition> getAllObjects(){
    string query='SELECT QualifiedApiName, DeveloperName FROM EntityDefinition order by QualifiedApiName';
    List<EntityDefinition> allObj=Database.query(query);
     
          System.debug('allObj-->'+allObj); 
          return allObj;
    }
    @AuraEnabled(cacheable=true)
    
    public static List<FieldDefinition> getfields(string objectname){
     string query = 'select DeveloperName,QualifiedApiName from FieldDefinition where EntityDefinition.QualifiedApiName = :objectname ORDER BY DeveloperName ASC';
         list<FieldDefinition> lstObject = Database.query(query);
         system.debug('lstObject==> '+lstObject);
         return lstObject;
    }
}
