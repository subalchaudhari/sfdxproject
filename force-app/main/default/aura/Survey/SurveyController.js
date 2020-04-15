({
    doInit : function(component,event,helper){
        var accountId = component.get("v.recordId");
        var action = component.get("c.getSurveyIdForAccount");
        action.setParams({
            "accountId":accountId
        });
        $A.enqueueAction(action);
        
        action.setCallback(this,function(resp){
            if(resp.getState() == 'SUCCESS'){
                component.set("v.surveyId",resp.getReturnValue());
                console.log('Survey Id: '+ resp.getReturnValue());
            }
        });
    },
    
    startSurvey : function(component,event,helper){
        component.set("v.currentQuestion",'');
        var dt = component.find("dtag").set("v.body",[]);
        var surveyId = component.get("v.surveyId");
        console.log('In start survey: '+surveyId);
        var action = component.get("c.getFirstQuestionForSurvey");
        action.setParams({
            "surveyId":surveyId
        });
        $A.enqueueAction(action);
        
        action.setCallback(this,function(resp){
            console.log(resp.getState()+' --- '+JSON.stringify(resp.getReturnValue()));
            if(resp.getState() == 'SUCCESS'){
                var queAndChoice = JSON.parse(resp.getReturnValue());
                component.set("v.currentQuestion",queAndChoice);
                console.log('Resp: '+ queAndChoice);
                var arrayOptions =[];                
                if(queAndChoice.questionType == 'Textbox'){
                    console.log('chkbox: '+queAndChoice['questionChoice'] +'--> '+queAndChoice['questionChoice'].Id)
                    arrayOptions.push(queAndChoice['questionChoice'].Id);
                }else{
                queAndChoice['questionChoice'].forEach(function(v){
                    var options ={};
                    options["label"] = v.Name;
                    options["value"] =v.Id;
                    arrayOptions.push(options);
                });
                }
                console.log('Array options: '+JSON.stringify(arrayOptions));
                if(queAndChoice.questionType == 'Radio button'){
                    helper.createRadioGroup(component,queAndChoice.questionName,arrayOptions,true);
                }else if(queAndChoice.questionType == 'Checkbox'){
                    helper.createcheckboxGroup(component,queAndChoice.questionName,arrayOptions,true);
                }else if(queAndChoice.questionType == 'Checkbox'){
                    helper.createInputBox(component,queAndChoice.questionName,arrayOptions,true);
                }
            }
        });
        
        helper.getLastQuestionIdsForSurvey(component);
        
    },
    
    onSelect: function (component,event,helper) {
        var selectedValue = event.getParam("value");
        var currentQuestion = component.get("v.currentQuestion");
        var lastQuestionIds = component.get("v.lastQuestionIds");
        console.log('Last quesIds in alert: '+JSON.stringify(lastQuestionIds));
        console.log('current question: '+JSON.stringify(currentQuestion));
        helper.saveQuestionResponse(component,selectedValue);
        console.log('is Next Question available: '+ !lastQuestionIds.includes(currentQuestion['questionId']));
       
        if(!lastQuestionIds.includes(currentQuestion['questionId'])){
            helper.getNextQuestionForSurvey(component,selectedValue);
        }else{
            alert('Thank you..Your Survey is completed');
        }
        //var changeValue = event.getParam("value");
        //alert(changeValue);
    }
    
    
})