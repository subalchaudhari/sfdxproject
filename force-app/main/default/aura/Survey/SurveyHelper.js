({
    createRadioGroup : function(component,question,options,isRequiered){
        var radioOptionSelected = component.getReference("v.optionSeleted");
        $A.createComponent(
            "lightning:radioGroup",
            {	
                "name":question,
                "label":question,
                "options" : options,
                "required" :isRequiered,
                "type":"radio",
                "value":component.get("v.optionSeletedForRadio"),
                "onchange":component.getReference("c.onSelect")},
            function(radioGroup){
                $A.createComponent(
    "aura:html",
     { 
         tag: "div",
         HTMLAttributes:{"aura:id": "Temp","class": "class name here"}
     },
     function(compo){
          var container = component.find("dtag");
          if (container.isValid()) {
              var body = container.get("v.body");
              body.push(compo);
              container.set("v.body", body);
          }
     }
);
                var dt = component.find("dtag").get("v.body");
                dt.push(radioGroup);
                component.find("dtag").set("v.body",dt);
            }
        );
    },
    createcheckboxGroup : function(component,question,options,isRequiered){
        $A.createComponent(
            "lightning:checkboxGroup",
            {
                "name":question,
                "label":question,
                "options": options,
                "required":isRequiered,                
                "value":component.get("v.optionSeletedForCheckbox"),
                "onchange":component.getReference("c.onSelect")},
            function(checkBoxGroup){
                var dt = component.find("dtag").get("v.body");
                dt.push(checkBoxGroup);
                component.find("dtag").set("v.body",dt);
            }
        );
    },
    createInputBox : function(component,question,options,isRequiered){
        $A.createComponent(
            "lightning:input",
            {
                "name":question,
                "label":question,
                "placeholder":"type here...",
                "required":isRequiered,                
                "value":component.get("v.inputTextResp"),
                "onblur":component.getReference("c.onSelect")},
            function(checkBoxGroup){
                var dt = component.find("dtag").get("v.body");
                dt.push(checkBoxGroup);
                component.find("dtag").set("v.body",dt);
            }
        );
    },
    
    getNextQuestionForSurvey : function(component,selectedValue){
        var currentQuestion = component.get("v.currentQuestion");
        var surveyId =component.get("v.surveyId");
        var action = component.get("c.getNextQuestion");
        action.setParams({"questionId":currentQuestion['questionId'],
                          "questionChoiceId":selectedValue,
                          "surveyId":surveyId});
        $A.enqueueAction(action);       
        action.setCallback(this,function(resp){
            if(resp.getState() == 'SUCCESS'){
                //component.set("v.currentQuestion",resp.getReturnValue());
                console.log('Resp for NextQuestion: '+JSON.stringify(resp.getReturnValue()));
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
                    this.createRadioGroup(component,queAndChoice.questionName,arrayOptions,true);
                }else if(queAndChoice.questionType == 'Checkbox'){
                    this.createcheckboxGroup(component,queAndChoice.questionName,arrayOptions,true);
                }else if(queAndChoice.questionType == 'Textbox'){
                    this.createInputBox(component,queAndChoice.questionName,arrayOptions,true);
                }
                
            }
        });
    },
    
    getLastQuestionIdsForSurvey : function(component){
        var surveyId = component.get("v.surveyId");
        var action = component.get("c.getLastQuestionIds");
        action.setParams({
            "surveyId":surveyId
        });
        $A.enqueueAction(action);
        action.setCallback(this,function(resp){
            if(resp.getState() == 'SUCCESS'){
                console.log('Last Question ids: '+ resp.getReturnValue());
                component.set("v.lastQuestionIds",resp.getReturnValue());
            }
        });
    },
    
    saveQuestionResponse : function(component,selectedValue){
        var accountId = component.get("v.recordId");
        var surveyId = component.get("v.surveyId");
        var currentQuestion = component.get("v.currentQuestion");
        var questionId = currentQuestion['questionId'];
        var resptext = null;
        console.log('check input resp: '+ component.get("v.inputTextResp"));
        if(currentQuestion['questionType'] == 'Textbox'){
            resptext = component.get("v.inputTextResp");
        }
        console.log('record to save : '+accountId +'-s- '+surveyId+' -q- '+questionId+' -c- '+selectedValue+' -resp- '+resptext);
        var action = component.get("c.recordQuestionResponse");
        action.setParams({
            "accountId":accountId,
            "surveyId":surveyId,
            "questionId":questionId,
            "choiceId":selectedValue,
            "respText":resptext
        });
      //  $A.enqueueAction(action);
        action.setCallback(this,function(resp){
            if(resp.getState() == 'SUCCESS'){
                console.log('Question response recorded successfully');
            }else{
                console.log('Error in saving question response');
            }
        });
    }
    
})