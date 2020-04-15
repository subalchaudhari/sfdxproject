({
	search : function(component, event, helper) {
		var eventargs = event.getParam("title");
        var arg = event.getParam("arguments");
        component.set("v.title",arg.strTitle);
        helper.onSearch(component);
        
	}
})