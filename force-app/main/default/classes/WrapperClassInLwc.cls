public with sharing class WrapperClassInLwc {

  @AuraEnabled(cacheable=true)
    public static List<AccountWrapperclass> fetchAccounts(){

       

       
            List<AccountWrapperclass> listAccountWrapper=new List<AccountWrapperclass>();
           List<Account> acclist=[SELECT id,Name,Type,BillingStreet,BillingCity,BillingCountry,BillingPostalCode,BillingState FROM Account Where Name != null ORDER BY Name LIMIT 20 ];
        for(Account acc:acclist){
            listAccountWrapper.add(new AccountWrapperclass(acc));
        }
        return listAccountWrapper;
    
    }
   
public class AccountWrapperclass{
    @AuraEnabled
    public Account acc;
    @AuraEnabled
    public String  billingAddress;
    @AuraEnabled
    public string Type;
    @AuraEnabled
    public String AccountName;
    @AuraEnabled
    public String AccountLink;


    public AccountWrapperclass(Account acc){
 this.acc=acc;
 this.Type=acc.Type;
 this.AccountName=acc.Name;
 this.AccountLink='/'+acc.Id;
 if(acc.BillingStreet==null){
   acc.BillingStreet=' ';
 }
 if(acc.BillingCity==null){
    acc.BillingCity='';
  }
  if(acc.BillingCountry==null){
    acc.BillingCountry='';
  }
  if(acc.BillingPostalCode==null){
    acc.BillingPostalCode='';
  }
  if(acc.BillingState==null){
    acc.BillingState='';
  }
 this.billingAddress=acc.BillingStreet+' '+acc.BillingCity+' '+acc.BillingState+' '+acc.BillingPostalCode+' '+acc.BillingCountry;
    }
}



}
