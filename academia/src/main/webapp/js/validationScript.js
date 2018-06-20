
(function() {
    
    window.validation = window.validation || {}
    var number_Reg= /^[0-9a-zA-Zа-яА-Я]+$/;
    var page_urlReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    
    
    window.validation.validatePage_url = function validatePage_url(page_url){
        if(page_url==''){
            return false;
        }
        return page_urlReg.test(page_url); 
    }
    window.validation.validateNumber = function validateNumber(number){
        if(number==''){
            return false;
        }
        return number_Reg.test(number);
    }
    
})();

function isAlphanumeric(elem){
    var alphaExp = /^[0-9a-zA-Zа-яА-Я]+$/;
    if(elem.value.match(alphaExp)){
        return true;
    }else{
	
        elem.focus();
        return false;
    }
}

//    Проверка валидности введенных знаков
function validinput(word){
    var invalid = new Array(',',';','\\','&','#','^','!','%','^','?','*','~','/','<','>','=',':');
    var isvalid = true;
    var i = 0;
    while(i<= word.length-1 ){
        if(invalid.indexOf(word[i],0)>=0){
            isvalid =false;
            return isvalid;          
            break;
        }
        i++;
    }        
    return isvalid;
}