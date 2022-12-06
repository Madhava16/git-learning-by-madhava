public with sharing class CsvFileImportData {
    public CsvFileImportData() {

    }
    public class AccountWrapper
    {
        @auraenabled
        public string Name{get;set;}
        @auraenabled
        public integer NumberOfEmployees{get;set;}
        @AuraEnabled
        public List<Contact> Contacts { get; set; }
    }
    @auraenabled
    public static void createAccountContacts(string wrapperText)
    {
        system.debug('wrapperText:'+wrapperText);
        AccountWrapper wrapper=(AccountWrapper)JSON.deserialize(wrapperText,AccountWrapper.class);
        system.debug('wrapper:'+wrapper);
        if(wrapper!=null)
        {
            Account act=new Account();
            act.Name=wrapper.Name;
            act.NumberOfEmployees=wrapper.NumberOfEmployees;
            insert act;
            
            if(wrapper.Contacts!=null)
            {
                for(Contact ct:wrapper.Contacts)
                {
                    ct.AccountId=act.id;
                }
                insert wrapper.Contacts;
            }
        }
    }
}

