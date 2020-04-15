({
	handleAjaxRequest : function(component, event, helper) {
        const xhr = new XMLHttpRequest();

        var url = component.get('v.link');
        
console.log(url);
        xhr.open('POST', url, true);

        xhr.onload = function() {
            console.log(this.status);
          /*  if(this.status === 200) {
                const response = JSON.parse(this.responseText);

                console.log('Resp from server: '+ response);

                if(response.type === 'success') {
                    alert('Email Sent');
                }
            }*/
        }; 

        xhr.send();
    }
})