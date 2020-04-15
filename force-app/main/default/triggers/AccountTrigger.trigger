trigger AccountTrigger on Account (before insert,after update) {
    If(Trigger.isAfter){
        If(Trigger.isUpdate){
            System.debug('In  Account update');
            Opportunity opp = [select id,Description from Opportunity where id='0066F00000uqt8UQAQ' limit 1];
            opp.Description = opp.Description + 1;
           // MyUtility.isTriggerSkip = true;
            update opp;
        }
    }
    
}