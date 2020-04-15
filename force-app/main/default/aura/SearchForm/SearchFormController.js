({
	onFormSubmit : function(component, event, helper) {
	var ev = component.getEvent("formSubmit");
        ev.setParams({"title": component.get("v.title")});
        ev.fire();
	}
})