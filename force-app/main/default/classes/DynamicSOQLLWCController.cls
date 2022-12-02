public with sharing class DynamicSOQLLWCController {
    public DynamicSOQLLWCController() {

    }
    @AuraEnabled
    public static List<SobjectsWrapper> getAllSObjects(){
        try {
            List<SobjectsWrapper> returnList = new List<SobjectsWrapper>();
            Integer i = 0;
            for(String label : Schema.getGlobalDescribe().keySet()) {
                // if(Schema.getGlobalDescribe().get(label).getDescribe() != null) {
                SobjectsWrapper my = new SobjectsWrapper();
                String temp = Schema.getGlobalDescribe().get(label).getDescribe().getName();
                my.label = temp;
                my.value = temp;
                returnList.add(my);
                i++;
                if(i == 100)
                    break;
                // }
                //TEst 
                //Test 2
            }
            return returnList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<FieldsWrapper> getAllFields(String sObjectName){
        try {
            List<FieldsWrapper> returnList = new List<FieldsWrapper>();
            Map<String, Schema.SObjectField> schemaMap = Schema.getGlobalDescribe().get(sObjectName).getDescribe().fields.getMap();
            for (String fieldName: schemaMap.keySet()) {
                FieldsWrapper fw = new FieldsWrapper();
                String temp = schemaMap.get(fieldName).getDescribe().getName();
                fw.label = temp;
                fw.value = temp;
                returnList.add(fw);
            }
            return returnList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<SObject> queryRecords(String sObjectName, List<String> fieldsSelected, String queryLimit, String orderBy){
        try {
            String query = 'Select ';
            query += String.join(fieldsSelected, ' ,');
            query += ' From ' + sObjectName;
            if(orderBy != null && orderBy != '') {
                query += ' Order By ' + orderBy;
            }
            if (queryLimit != null && queryLimit != '') {
                query += ' limit '+ queryLimit;
            }
            return Database.query(query);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public class FieldsWrapper{
        @AuraEnabled
        public String label;
        @AuraEnabled
        public String value;
    }

    public class SobjectsWrapper{
        @AuraEnabled
        public String label;
        @AuraEnabled
        public String value;
    }
}
