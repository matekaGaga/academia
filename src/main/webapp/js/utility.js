// Имя файла: utility.js
//Описание: полезные функции

//сохранить куки
function setCookie (name, value, expires, path, domain, secure) {
    var cookie = name + "=" + escape(value) +
    ((expires != null) ? "; expires=" + expires : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : "");
    document.cookie = cookie;
}

//взять значение куки по названию переменной name
function getCookie(name) {
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    if (cookie.length > 0) {
        offset = cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = cookie.indexOf(";", offset)
            if (end == -1) {
                end = cookie.length;
            }
            setStr = unescape(cookie.substring(offset, end));
        }
    }
    return(setStr);
}

// Get Url Parameter - возвращает параметр GET-запроса или пустую строку.
function gup( name )
{
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)" ;
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
        return "";
    else
        return results[1];
}

function sendAjaxRequestEtudiant(method, params, callback) {
    if (params == null) params = "";		
    $.ajax({
        url:"ListEtudiants",
        type: "POST",
        data:"action=" + method + "&" + params,
        success: function(response){
            // если ошибка
            var errIdx = response.indexOf("ERR_");
            if (errIdx > -1) {
                var errText = response.substr(errIdx);
                alert(errText);
            } else {
                // вызываем callback
                try {
                    callback(response);
                } catch (e) {
                    if (console) console.error(e);
                    alert('Error in callback: ' + e);
                }
            }
        },
        error: function(errMsg) {
            alert('Error: ' + errMsg);
        }
    });   
}
// Create AJAX HTTP request.
function get_http(){
    var xmlhttp;
    /*@cc_on
    @if (@_jscript_version >= 5)
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new
                ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xmlhttp = false;
            }
        }
    @else
        xmlhttp = false;
    @end @*/
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        try {
            xmlhttp = new XMLHttpRequest();
        } catch (e) {
            xmlhttp = false;
        }
    }
    return xmlhttp;
}
