({
	onSearch : function(component) {
		var action = component.get("c.getAccountApproval");
        action.setParams({"title": component.get("v.title")});
        $A.enqueueAction(action);
        
        action.setCallback(this,function(resp){
            if(resp.getState() == 'SUCCESS'){
                component.set("v.searchResults",resp.getReturnValue());
            }
        })
	}
})