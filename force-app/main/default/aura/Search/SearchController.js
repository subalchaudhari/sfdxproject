({
	formSubmit : function(component, event, helper) {
		var title = event.getParam("title");        
        var SRC = component.find("SRC");
        SRC.search(title);
	}
})