({
	saveRecord : function(component, event, helper) {
        var accountId =component.get("v.selAccount").val;
        var approvalId = component.get("v.selAprovar").val;
        var title= component.get("v.Title");
        console.log('AccountId: '+ accountId +' ApprovalId: '+approvalId+' Ttitle:'+ title);
        if(accountId != null && approvalId != null && title !=null){
            var action = component.get("c.saveAccountApprovar");
            console.log('action: '+ action);
            action.setParams({"title":title,"accountId":accountId,"approvalId":approvalId});
            $A.enqueueAction(action);
            action.setCallback(this,function(resp){
                if(resp.getState() == 'SUCCESS'){
                    if(resp.getReturnValue()){
                        var ev = $A.get("event.force:showToast");
                        ev.setParams({
                            "Title" :"Status",
                            "message" :"Record saved Successfully",
                            "type" :"success"
                        });
                        ev.fire();
                    }else{
                        var ev = $A.get("event.force:showToast");
                        ev.setParams({
                            "Title":"Status",
                            "message" :" Error in Saving Record",
                            "type" : "error"
                        });
                        ev.fire();
                    }
                }
            });
        }
	}
})