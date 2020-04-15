({
	doInit : function(component, event, helper) {
//console.log('from Component: ' +component.getElementById('subal').innerHTML);
	},
    
    callServer : function(component,event,helper){
        component.set("v.resp","Hello from server");
    }
})