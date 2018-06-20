
var arr_etudiants= Array();//Tableau d'etudiants'
function load() {
    sendAjaxRequestEtudiant("ListEtudiants", null, function(response){
        
        arr_etudiants.length = 0;//Initialiser le tableau d'etudiants a zero
        var etudiants_data =response.split ("#@#");
        for(var i = 0; i< etudiants_data.length; i++){
            //Преобразуем строку в массив, разделяя его символом ";"
            var etudiant_data = etudiants_data[i].split(";");
            //При преобразовании строки возможно появлениие пустых элементов
            if((etudiant_data==null) || (etudiant_data == undefined) || (etudiant_data =="")){
                continue;
            }
            var etudiant  = new Object();
            etudiant.Id = etudiant_data[0];
            etudiant.nom = etudiant_data[1];
            etudiant.prenom = etudiant_data[2];
            etudiant.faculte = etudiant_data[3];
            
            arr_etudiants.push(etudiant);
        }
        print_etudiants(arr_etudiants);
    })
    
    
    function addOption (oListbox, text, value, isDefaultSelected, isSelected)
    {
        var oOption = document.createElement("option");
        oOption.appendChild(document.createTextNode(text));
        oOption.setAttribute("value", value);
        if (isDefaultSelected)
            oOption.defaultSelected = true;
        else if (isSelected) oOption.selected = true;
        oListbox.appendChild(oOption);
    }
    function addCheckBox(chbox,id){
        chbox.setAttribute("type",'checkbox');
        chbox.setAttribute("name",'checkrow');
        chbox.setAttribute("value",id);
        chbox.setAttribute("style","width:20px; padding:4px;background-color:##F8F8F8");
    }
            
    //Imprimer tous les etudiants dans un tableau
    function print_etudiants(array){
        array = arr_etudiants;
        var len = array.length;
        for (var i=1; i<=len; i++){
            //Reference the output tale on the page
            var x=document.getElementById("tableauEtudiants").insertRow(i);
            //Add colons to the table
            var a0=x.insertCell(0);//ID du tableau
            var a=x.insertCell(1);
            var b=x.insertCell(2);
            var temp= x.insertCell(3);
            var c = x.insertCell(4);
            var d = x.insertCell(5);
            var e = x.insertCell(6);
            
            //get variables from the array of students
            var id = array[i-1].Id;
            var nom = array[i-1].nom;
            var prenom = array[i-1].prenom;
            var faculte = array[i-1].faculte;
            var tp = 0;
            var td = 0;
            var exam = 0;
            var nomPrenom = nom +"   "+ prenom;
            //create a checkbox element
            var chbox = document.createElement("input");
            addCheckBox(chbox,id);
            //create a textfield HTML element for TP
            var tp_input =document.createElement('input');
            tp_input.setAttribute('id','tp_input' );
            tp_input.setAttribute('name','tp_input');
            tp_input.setAttribute('type', 'text');
            tp_input.setAttribute('style', 'width: 30px;"')
            tp_input.setAttribute('value', tp);
            //create a TD HTML element
            var td_input =document.createElement('input');
            td_input.setAttribute('id','td_input' );
            td_input.setAttribute('name','td_input');
            td_input.setAttribute('type', 'text');
            td_input.setAttribute('style', 'width: 30px;"')
            td_input.setAttribute('value', td);
            
            //create an exam HTML element
            var exam_input =document.createElement('input');
            exam_input.setAttribute('id','exam_input' );
            exam_input.setAttribute('name','exam_input');
            exam_input.setAttribute('type', 'text');
            exam_input.setAttribute('style', 'width: 30px;"')
            exam_input.setAttribute('value', exam);
            
            //Add all elements on the HTML page
            a0.appendChild(chbox);
            a.innerHTML =  nomPrenom ;
            b.innerHTML = faculte;
            c.appendChild(tp_input);
            d.appendChild(td_input);
            e.appendChild(exam_input);
           
        }
    }
}

$(document).ready(function(){
    //    //Сохранение выбранных элементов и перепечатка
    //    $("#saveChanges").click(function(aparts){
    //        aparts = arr_apartments;
    //        var arr_changed = new Array();
    //       
    //        var apartTable = document.getElementById('resulttable');
    //        //gets table
    //        function getTableValue(row, cell) {
    //            return apartTable.rows[row].cells[cell].children[0];
    //        }
    //        var rowLength = apartTable.rows.length; //длина таблиц
    //        //
    //        // столбце Признак занятости, по каждой строке,
    //        // проверяется, если значение элеметна соответствует значению елемента в массиве помеченных объектов
    //        //Если да, то добавляется в массив элементов для далнейшей работы.
    //        for (var j = 1; j <= rowLength-1; j++){
    //            var id = getTableValue(j, 3).id;
    //            var value = getTableValue(j, 3).value;
    //            var purl =getTableValue(j, 2).value;
    //            var apartment = new apartmentObj();//сбор объекта квартир
    //            apartment.setApartmentID(id);
    //            for(var t=0;t< aparts.length;t++){
    //                if( aparts[t].getApartmentID()==id){
    //                    apartment =aparts[t]; 
    //                    apartment.setOccupancy(value);
    //                    apartment.setPage_url(purl);
    //                    break;
    //                }
    //            }
    //            arr_changed.push(apartment);
    //        }
    //        
    //        //отправка изменение на сервер
    //        if(arr_changed.length > 0){
    //            var apartments = "{ apartments: " + JSON.stringify(arr_changed) + "}";
    //            ajaxChangeOccupancyFlag(apartments);
    //        }
    //        function ajaxChangeOccupancyFlag(apartments) {
    //            $.ajax({
    //                type : "POST",
    //                url : "ChangeOccupancy",
    //                data: "apartments="+ apartments,
    //                success:function(response){
    //                    console.log(response);
    //                } 
    //            });
    //        } 
    ////        $("#resulttable").find("tr:gt(0)").remove();//Удаляеем сначала что было кроме заголовки таблицы, и потом печатаем таблицу
    ////        print_apartments(aparts);
    ////        $("#saveChanges").removeAttr('disabled');
    //    })
    //    //Удаление выбранных квартир
    //    $("#deleteChoosen").click(function(gapartments){
    //        gapartments = arr_apartments;
    //        var checkedelems = new Array();
    //        var arr_changed = new Array();
    //        var inputchd = $('input:checked'); 
    //        //По массиву помеченных объектов выберается их значения
    //        //и они добавляются в массив. 
    //        for (var i = 0;i<= inputchd.length-1; i++){
    //            var res = $(inputchd[i]).val();
    //            checkedelems.push(res);  
    //        }
    //        var apartTable = document.getElementById('resulttable');
    //        //gets table
    //        function getTableValue(row, cell) {
    //            return apartTable.rows[row].cells[cell].children[0];
    //        }
    //        var rowLength = apartTable.rows.length; //длина таблиц
    //        //
    //        // столбце Признак занятости, по каждой строке,
    //        // проверяется, если значение элеметна соответствует значению елемента в массиве помеченных объектов
    //        //Если да, то добавляется в массив элементов для далнейшей работы.
    //        for (var j = 1; j <= rowLength-1; j++){
    //            var id = getTableValue(j, 3).id;
    //            if(checkedelems.indexOf(id, 0)!=-1){
    //                var apartment = new apartmentObj();//сбор объекта квартир
    //                apartment.setApartmentID(id);
    //                var indx;
    //                for(var t=0;t< gapartments.length;t++){
    //                    if( gapartments[t].getApartmentID()==id){
    //                        indx = t;
    //                        apartment =gapartments[t]; 
    //                        break;
    //                    }
    //                }
    //                arr_changed.push(apartment);
    //                //убрать квартиру из списка
    //                if ( ~indx) gapartments.splice(indx, 1);
    //            }
    //        }
    //        //отправка изменение на сервер
    //        if(arr_changed.length > 0){
    //            var apartments = "{ apartments: " + JSON.stringify(arr_changed) + "}";
    //            ajaxDeleteApartments(apartments);
    //        }
    //        function ajaxDeleteApartments(apartments) {
    //            $.ajax({
    //                type : "POST",
    //                url : "DeleteApartments",
    //                data: "apartments="+ apartments,
    //                success:function(response){
    //                    console.log(response);
    //                } 
    //            });
    //        }
    //        $("#resulttable").find("tr:gt(0)").remove();//Удаляеем сначала что было кроме заголовки таблицы, и потом печатаем таблицу
    //        print_apartments(gapartments);     //Печать таблицу
    //        $("#deleteChoosen").removeAttr('disabled');
    //    })
    })
