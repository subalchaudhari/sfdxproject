({
	updateValue : function(component, event, helper) {
		var name = component.find("myInput").getElement().value;
        component.set("v.greeting",name);
	}
})