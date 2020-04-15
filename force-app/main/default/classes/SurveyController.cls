public class SurveyController {
    
    //Method to get assigned surveyId for Account
    @AuraEnabled
    public static String getSurveyIdForAccount(Id accountId){
        Account acc = [select Survey__c from Account where Id= :accountId limit 1];
        return acc.Survey__c;
    } 
    
    //Method to get fist question for assigned survey
    @AuraEnabled
    public static String getFirstQuestionForSurvey(Id surveyId){
        SurveyQuestionnaire__c sq = [select id,Survey__c,SurveyQuestionChoice__c,Next_Question__c,Next_Question__r.Name,
                                     Next_Question__r.QuestionType__c
                                     from SurveyQuestionnaire__c where SurveyQuestion__c = null and Survey__c = :surveyId limit 1];
        QuestionWithOptions qwa = new QuestionWithOptions();
        qwa.questionId = sq.Next_Question__c;
        qwa.questionName = sq.Next_Question__r.Name;
        qwa.questionType =sq.Next_Question__r.QuestionType__c;
        qwa.questionChoice =getChoicesForQuestion(sq.Next_Question__c);
       // qwa.nextQuestionId = sq.Next_Question__c;
        System.debug('query result: '+ sq);
        System.debug('wrapper: ' +qwa);
        return JSON.serialize(qwa);
    }
    
    //Methos to get LastQuestion Ids for survey
    @AuraEnabled
    public static List<Id> getLastQuestionIds(Id surveyId){
        List<SurveyQuestionnaire__c> surveyQuestions = [select Surveyquestion__c from SurveyQuestionnaire__c where Survey__c = :surveyId];
        List<Id> queIds = new List<Id>();
        Set<Id> lastQueIds = new Set<Id>();
        for(SurveyQuestionnaire__c sq:surveyQuestions){
            queIds.add(sq.SurveyQuestion__c);
        }
        System.debug('queIds'+queIds);
        List<SurveyQuestionnaire__c> lastQuestions = [select Next_Question__c from SurveyQuestionnaire__c where Next_Question__c NOT IN :queIds];
        for(SurveyQuestionnaire__c sqc:lastQuestions){
            lastQueIds.add(sqc.Next_Question__c);
        }
         System.debug('lastQueIds'+lastQueIds);
        return new List<Id>(lastQueIds);
    }
    
    //Method to get the next Question details with possible answers
    @AuraEnabled
    public static String getNextQuestion(Id surveyId,Id questionId,Id questionChoiceId){
        /*SurveyQuestionnaire__c  sq= [select id,Next_Question__c,Next_Question__r.Name,Next_Question__r.QuestionType__c
                                      from SurveyQuestionnaire__c 
                                      where Survey__c = :surveyId and SurveyQuestion__c = :questionId and SurveyQuestionChoice__c = :questionChoiceId limit 1];*/
        SurveyQuestionnaire__c  sq1= [select id,Next_Question__c,Next_Question__r.Name,Next_Question__r.QuestionType__c,isDependent__c
                                      from SurveyQuestionnaire__c 
                                      where Survey__c = :surveyId and SurveyQuestion__c = :questionId  limit 1];
        if(sq1.isDependent__c){
				SurveyQuestionnaire__c  sq2= [select id,Next_Question__c,Next_Question__r.Name,Next_Question__r.QuestionType__c,isDependent__c
                                      from SurveyQuestionnaire__c 
                                      where Survey__c = :surveyId and SurveyQuestion__c = :questionId and 
				      				  SurveyQuestionChoice__c = :questionChoiceId  limit 1];
                QuestionWithOptions qwa = new QuestionWithOptions();
        		qwa.questionId = sq2.Next_Question__c;
        		qwa.questionName = sq2.Next_Question__r.Name;
        		qwa.questionType =sq2.Next_Question__r.QuestionType__c;
        		qwa.questionChoice =getChoicesForQuestion(sq2.Next_Question__c);
        		//qwa.nextQuestionId = sq.Next_Question__c;        
        		return JSON.serialize(qwa);
    	}
        else{
				SurveyQuestionnaire__c  sq= [select id,Next_Question__c,Next_Question__r.Name,Next_Question__r.QuestionType__c,isDependent__c
                                      from SurveyQuestionnaire__c 
                                      where Survey__c = :surveyId and SurveyQuestion__c = :questionId limit 1];
        

       			QuestionWithOptions qwa = new QuestionWithOptions();
        		qwa.questionId = sq.Next_Question__c;
        		qwa.questionName = sq.Next_Question__r.Name;
        		qwa.questionType =sq.Next_Question__r.QuestionType__c;
        		qwa.questionChoice =getChoicesForQuestion(sq.Next_Question__c);
        		//qwa.nextQuestionId = sq.Next_Question__c;        
        		return JSON.serialize(qwa);
    		}
    }
    @AuraEnabled
    public static Boolean recordQuestionResponse(String accountId,String surveyId,String questionId,String choiceId,String respText){
   	    SurveyResponse__c surveyResponse = new SurveyResponse__c();
        surveyResponse.Account__c = accountId;
        SurveyResponse.Survey__c =surveyId;
        SurveyResponse.SurveyQuestion__c = questionId;
        SurveyResponse.SurveyQuestionChoice__c = choiceId;
        SurveyResponse.ResponseText__c = respText;
        
        try{
            insert surveyResponse;
            return true;
        }catch(Exception e){
            System.debug('Exception in saving question response: ' +e.getMessage());
            return false;
        }
        
        
       }
    
    public static List<SurveyQuestionChoice__c> getChoicesForQuestion(Id questionId){
        return [select id,name from SurveyQuestionChoice__c where SurveyQuestion__c = :questionId];    
    }
    
    public class QuestionWithOptions{
        public String questionId {set;get;}
        public String questionName {set;get;}
        public String questionType {set;get;}
        public List<SurveyQuestionChoice__c> questionChoice {set;get;}
       // public String nextQuestionId {set;get;}
    }
    
    
}