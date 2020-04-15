global class AccountApprovalController {
    @AuraEnabled
    public static boolean saveAccountApprovar(String title,String accountId,String approvalId){
        AccountApproval__c accApproval = new AccountApproval__c();
        accApproval.Title__c =title;
        accApproval.Account_Name__c = accountId;
        accApproval.Approver_Name__c = approvalId;
        
        try{
            insert accApproval;
            return true;
        }catch(Exception e){
            System.debug(e.getMessage());
            return false;
        }
    }
}