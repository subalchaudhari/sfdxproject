trigger OpportunityTrigger on Opportunity (before insert,before update) {
    system.debug('Boolean variable value: ' + MyUtility.isTriggerSkip);
    if(!MyUtility.isTriggerSkip){
        
        System.debug('In Opportunity trigger - before update');
    }
	
    
}