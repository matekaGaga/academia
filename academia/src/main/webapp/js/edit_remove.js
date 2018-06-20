$(document).ready(function(){
     
     
    var apapartmentID;
    var apaddress;
    var apbuildingNumber ;
    var appage_url ;
    var aplon;
    var aplat ;
    
    //При нажатии на один элемент списка, все его своства  показываютя на полях
    $("#apartment_all").change(function(){
        reset(); 
        var aprtOptns = apartment_all.options[apartment_all.selectedIndex].apartment;
        
        apapartmentID =  aprtOptns.getApartmentID();
        if(apapartmentID=='' || apapartmentID== undefined ||apapartmentID==null){
            document.getElementById("successinfo").innerHTML ="Ident квартиры не найден!";
        }else{
          
            apaddress= aprtOptns.getAddress();
            apbuildingNumber = aprtOptns.getNumber();
            appage_url = aprtOptns.getPage_url();
            aplon= aprtOptns.getLon();
            aplat = aprtOptns.getLat();
            
            $("#apartmentid").val(apapartmentID);
            $("#address").val(apaddress);
            $("#number").val(apbuildingNumber);
            $("#page_url").val(appage_url);
            $("#lon").val( aplon);
            $("#lat").val( aplat);
            
            
        }
    })
    
    //Очистка полей
    function reset(){
        document.getElementById("successinfo").innerHTML ="";
        $("#apartmentid").val("");
        $("#address").val("");
        $("#number").val("");
        $("#page_url").val("");
        $("#lon").val("");
        $("#lat").val("");
    }
    
    $("#delete_apartment").click(function(){
        var all_data = new Array();
        
        var apartmentID =  document.getElementById("apartmentid").value;
        var address= document.getElementById("address").value;
        var buildingNumber = document.getElementById("number").value;
        var page_url = document.getElementById("page_url").value;
        
        var lon= document.getElementById("lon").value;
        var lat = document.getElementById("lat").value;
        //   var occupancy = document.getElementById("choosesign").value;
        
        var apartment = new apartmentObj();
        
        apartment.setApartmentID(apartmentID);
        apartment.setAddress(address); 
        apartment.setNumber(buildingNumber); 
        apartment.setPage_url(page_url); 
    
        apartment.setLat(lat);
        apartment.setLon(lon);
        
        all_data.push(apartment);
        
        var apartments = "{ apartments: " + JSON.stringify(all_data) + "}" 
        
        $.ajax({
            type : "POST",
            url : "RemoveApartment",
            data:  "apartments="+ apartments,
            success:function(data)
            { 
                // loadedit();
                var lab =document.getElementById("successinfo");
                lab.innerHTML = data;
                $("#delete_apartment").removeAttr('disabled');
                
                var apartments= Array();//Список квартир
                //Печать в виде таблицы все квартиры
                sendAjaxRequestApartment("ListApartment", null, function(response){
        
                
                    apartments.length = 0;// очичта Списка квартир
       
                    var apartments_data = response.split ("#@#");
                    for(var i = 0; i< apartments_data.length; i++){
                        //Преобразуем строку в массив, разделяя его символом ";"
                        var apartment_data = apartments_data[i].split(";");
                        //При преобразовании строки возможно появлениие пустых элементов
                        if((apartment_data==null) || (apartment_data == undefined) || (apartment_data =="")){
                            continue;
                        }
            
                        var apartment =  new apartmentObj();//сбор объекта квартир
                         
                        apartment.setApartmentID(apartment_data[0]); //идентификатор квартиры;
                        apartment.setAddress(apartment_data[1]); 
                        apartment.setNumber(apartment_data[2]); 
                        apartment.setPage_url(apartment_data[3]); 
                        apartment.setOccupancy(apartment_data[4]);
                        apartment.setLat(apartment_data[5]);
                        apartment.setLon(apartment_data[6]);
                        
                        apartments.push(apartment);
                    }
                
          
                    print_all_apartments(); //Печать в виде таблицы все квартиры
        
        
                })
    
                //Печать в виде таблицы все квартиры
    
    
                function  print_all_apartments(){
     
                    var apartment_all = document.getElementsByName("apartment_all")[0];
                    apartment_all.options.length = 0;
                    //Заполняем комбобоксы routes_all элементами массива routes.
                    for (var i=0 ; i<apartments.length; i++){
            
                        var newOpt1 = apartment_all.appendChild(document.createElement("option"));
                        newOpt1.text =  apartments[i].getAddress() +","+ apartments[i].getNumber();
                        newOpt1.apartment = apartments[i];
         
                    }
                }
    
            }
              
        });
    });
    
    $("#save_apartment").click(function(){
        var all_data = new Array();
        
        var apartmentID = apapartmentID;
        var address= document.getElementById("address").value;
        var buildingNumber = document.getElementById("number").value;
        var page_url = document.getElementById("page_url").value;
        var lat =   aplat;
        var lon  = aplon;
        var occupancy = choosesign.options[choosesign.selectedIndex].value;
        
        var apartment =  new apartmentObj();//сбор объекта квартир
        
        apartment.setApartmentID(apartmentID);
        apartment.setAddress(address); 
        apartment.setNumber(buildingNumber); 
        apartment.setPage_url(page_url); 
        apartment.setOccupancy(occupancy);
        apartment.setLat(lat);
        apartment.setLon(lon);
        all_data.push(apartment);
        
    
        var apartment = all_data[0];
        
        //находит координаты адресов и изменяет атрибуты(свойства) lat, lon объекта apartment 
        var defs = []; //Массив deferreds объектов
            
        var deferred = $.Deferred(); //Инициализация
        defs.push(deferred); //Добавляем его в массив

        var callb =  getCallback(apartment, deferred); //Присвайвается функцией getCallback()
            
        showAddress(callb.callback, apartment); // в  showAddress() в качестве аргумента передаем callback из функции getCallback() 
        
        //вызывает функцию AddCoord для получения результата запроса геокодирование
        //результат есть-точка .Передается функцию deferred, чтобы избежать от замыкания.
        function getCallback(apartment, deferred) {
            return {
                callback: function(result){
                    var result1 = AddCoord(result);
                    if(!result1){

                        deferred.reject();
                    }else{
                        apartment.setLon(result1.getLng());
                        apartment.setLat(result1.getLat());
                        deferred.resolve();
                    }
                
                }
            }
        }
        //При успешного завершении вызывается функция  ajaxRegistration(apartments);
        //Иначе сообщение "Неправильный адрес!"
        $.when.apply($, defs).done(function(){
            var apartments = "{ apartments: " + JSON.stringify(all_data) + "}";
            ajaxEdition(apartments);
        }).fail(function(){
            alaert("Неправильный адрес!");
        });
        
       
          
        
        
        function ajaxEdition(apartments) {
          
            $.ajax({
                type : "POST",
                url : "EditApartment",
                data:  "apartments="+ apartments,
                success:function(data)
                { 
            
                }
            })
        } 
       
    })
})  

