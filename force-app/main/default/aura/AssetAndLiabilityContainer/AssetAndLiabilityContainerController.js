({
    doInit : function(component,event,helper){      
          
        
        
    },
	doAlert : function(component, event, helper) {
        var myobj ={
            '2015':{'assetId':'02i6F00000DC5wGQAT','libId':'a0a6F00000eoox9QAA'},
            '2016':{'assetId':'02i6F00000DC5wLQAT','libId':'a0a6F00000eooxAQAQ'}
        };
		var te=component.get('v.selectedYear');
        
        var ids = myobj[te];
        if(ids){
            component.set('v.assetId',ids.assetId);
            component.set('v.libId',ids.libId);
        }
       // Object.keys(te).forEach(key => console.log(te[key]));
       // $A.get('e.force:refreshView').fire();
	}
})