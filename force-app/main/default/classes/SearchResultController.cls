public class SearchResultController {
	@AuraEnabled
    public static List<AccountApproval__c> getAccountApproval(String title){
        return [select Title__c,Account_Name__r.Name,Approver_Name__r.Name from AccountApproval__c where Title__c like :title];
    }
}