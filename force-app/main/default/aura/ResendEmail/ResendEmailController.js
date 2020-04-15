({
	resendEmail : function(component, event, helper) {
		component.set("v.link",'https://s1832238445.t.eloqua.com/e/f2?elqFormName=eupc-resend-email&elqSiteID=1832238445&emailAddress=subal.chaudhari@aberdeen-asset.com&locale=dk-dk');
        helper.handleAjaxRequest(component, event, helper);
	}
})