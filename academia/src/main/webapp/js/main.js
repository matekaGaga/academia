
var gThis =
{
    faculties: null,
    timerId: null
};

function facFillList()
{
    $.ajax
    (
        {
            type: "POST",
            dataType: "json",
            url: '/StudentsManager/DatabaseServlet',
            data: { req: "reqGetFaculty" },
            success:
                function(result)
                {
                    if (null !== result.faculties)
                    {
                        var facList = document.getElementById("faculties_list");
                        var fac = gThis.faculties = result.faculties
                        var facListHtml = "";
                        for (var i = 0; i < fac.length; i++)
                        {
                            
                            facListHtml += "<div id=\"fac-id-" + fac[i].id + "\" onclick=\"facSel(" + fac[i].id + ");\"><span>" + fac[i].appelation +  "</span></div>";
                        }
                        facList.innerHTML = facListHtml;
                    }
                },
            error:
                function(jqXHR, textStatus, errorThrown)
                {
                }
        }
    );
}


function drvSetEnabled()
{
    var fields = drvGetInputValues();
    var enabled = -1 !== parseInt(fields.driver.organizationId)
                  && "" !== fields.driver.firstName
                  && "" !== fields.driver.lastName
                  && "" !== fields.driver.middleName
                  && "" !== fields.driver.licence
                  && "" !== fields.driver.licenceCategory
                  && "" !== fields.driver.regNumber
                  && "" !== fields.driver.regSeries
                  && "" !== fields.driver.vehicleLicenceNum
                  && "" !== fields.driver.model
                  && "" !== fields.driver.fuelDetail
                  && "" !== fields.driver.mileage
                  && false === isNaN(parseInt(fields.driver.mileage))
                  && "" !== fields.vehicle.realNumber
                  && false === isNaN(parseInt(fields.vehicle.realNumber))
                  && "" !== fields.vehicle.comments
                  && "" !== fields.vehicle.numTel
                  && "" !== fields.vehicle.numSim;
    var addBtn = $('#drv-add-button');
    if (addBtn.length > 0)
    {
        addBtn[0].disabled = (false === enabled);
    }
    var updateBtn = $('#drv-update-button');
    if (updateBtn.length > 0)
    {
        updateBtn[0].disabled = (false === enabled);
    }
}

function drvGetInputValues()
{
    var result =
    {
        driver:
        {
            organizationId: $('#drv-org').val(),
            firstName: $('#drv-first-name').val(),
            lastName: $('#drv-last-name').val(),
            middleName: $('#drv-middle-name').val(),
            licence: $('#drv-licence').val(),
            licenceCategory: $('#drv-licence-category').val(),
            regNumber: $('#drv-reg-number').val(),
            regSeries: $('#drv-reg-series').val(),
            regTime: $('#drv-reg-time').val(),
            vehicleLicenceNum: $('#drv-licence-num').val(),
            model: $('#drv-model').val(),
            fuelDetail: $('#drv-fuel-detail').val(),
            mileage: $('#drv-mileage').val()
        },
        vehicle:
        {
            realNumber: $('#drv-real-veh-number').val(),
            comments: $('#drv-comments').val(),
            numTel: $('#drv-num-tel').val(),
            numSim: $('#drv-num-sim').val()
        }
    };
    return result;
}
    
function studAdd()
{
    $('#myModal').on( 'hide', function()
    {
        $('#yes_button').unbind('click');
        $('#myModal').off( 'hide' );
    });
    $('#yes_button').click(function ()
    {
        $('#myModal').modal('hide');
        var newDrv = drvGetInputValues();
        $.ajax(
            {
                type: "POST",
                dataType: "json",
                url: '/COManager/DatabaseServlet',
                data:
                {
                    req: "reqAddDriver",
                    organizationId: newDrv.driver.organizationId,
                    vehicleNumber: newDrv.driver.vehicleNumber,
                    firstName: newDrv.driver.firstName,
                    lastName: newDrv.driver.lastName,
                    middleName: newDrv.driver.middleName,
                    licence: newDrv.driver.licence,
                    licenceCategory: newDrv.driver.licenceCategory,
                    regNumber: newDrv.driver.regNumber,
                    regSeries: newDrv.driver.regSeries,
                    regTime: newDrv.driver.regTime,
                    licenceNum: newDrv.driver.vehicleLicenceNum,
                    model: newDrv.driver.model,
                    fuelDetail: newDrv.driver.fuelDetail,
                    mileage: newDrv.driver.mileage,
                    realNumber: newDrv.vehicle.realNumber,
                    comments: newDrv.vehicle.comments,
                    numTel: newDrv.vehicle.numTel,
                    numSim: newDrv.vehicle.numSim
                },
                success:
                    function (result)
                    {
                        if (false !== result.success
                            && null !== result.id
                            && -1 !== result.id)
                        {
                            newDrv.driver.id = result.id;
                            newDrv.driver.organizationId = parseInt(newDrv.driver.organizationId);
                            gThis.drivers.push(newDrv);
                            drvSel(result.id);
                            drvFillList();
                        }
                        else
                        {
                            $('#operation_controls').html("<label class=\"control-label\">Addition failed.</label>");
                        }
                    },
                error:
                    function(jqXHR, textStatus, errorThrown)
                    {
                        alert(" DB request for organization's addition failed,check if data format is correct=.");
                    }
            }
        );
    });
    $('#myModal').modal( { keyboard: true, backdrop:true } );
}

(function ()
{
    window.drvUpdate = function(id) {}; // реализация ниже

    var drvIdToUpdate;

    function drvUpdate(id)
    {
        drvIdToUpdate = id;
        $('#myModal').on( 'hide', function()
        {
            $('#yes_button').unbind('click');
            $('#myModal').off( 'hide' );
        });
        $('#yes_button').click(function ()
        {
            $('#myModal').modal('hide');

            var newDrv = drvGetInputValues();
            $.ajax(
                {
                    type: "POST",
                    dataType: "json",
                    url: '/COManager/DatabaseServlet',
                    data:
                    {
                        req: "reqUpdateDriver",
                        id: drvIdToUpdate,
                        organizationId: newDrv.driver.organizationId,
                        vehicleNumber: newDrv.driver.vehicleNumber,
                        firstName: newDrv.driver.firstName,
                        lastName: newDrv.driver.lastName,
                        middleName: newDrv.driver.middleName,
                        licence: newDrv.driver.licence,
                        licenceCategory: newDrv.driver.licenceCategory,
                        regNumber: newDrv.driver.regNumber,
                        regSeries: newDrv.driver.regSeries,
                        regTime: newDrv.driver.regTime,
                        licenceNum: newDrv.driver.vehicleLicenceNum,
                        model: newDrv.driver.model,
                        fuelDetail: newDrv.driver.fuelDetail,
                        mileage: newDrv.driver.mileage,
                        realNumber: newDrv.vehicle.realNumber,
                        comments: newDrv.vehicle.comments,
                        numTel: newDrv.vehicle.numTel,
                        numSim: newDrv.vehicle.numSim
                    },
                    success:
                        function (result)
                        {
                            if (false !== result.success)
                            {
                                drvFillList();
                            }
                            else
                            {
                                $('#operation_controls').html("<label class=\"control-label\">Изменение данных не удалось.</label>");
                            }
                        },
                    error:
                        function(jqXHR, textStatus, errorThrown)
                        {
                            alert("Запрос к БД на добавление организации закончился неудачей, проверьте корректность указанных данных.");
                        }
                }
            );
        });
        $('#myModal').modal( { keyboard: true, backdrop:true } );
    }

    window.drvUpdate = drvUpdate;
})();

(function ()
{
    window.drvDelete = function(id) {}; // реализована ниже

    var drvIdToDelete;

    function drvDelete(id)
    {
        drvIdToDelete = id;
        $('#myModal').on( 'hide', function()
        {
            $('#yes_button').unbind('click');
            $('#myModal').off( 'hide' );
        });
        $('#yes_button').click(function ()
        {
            $('#myModal').modal('hide');
            $.ajax(
                {
                    type: "POST",
                    dataType: "json",
                    url: '/COManager/DatabaseServlet',
                    data: { req: "reqDeleteDriver", id: drvIdToDelete },
                    success:
                        function (result)
                        {
                            if (false !== result.success)
                            {
                                drvFillList();
                                $('#operation_controls').html("<label class=\"control-label\">Успешно удалено.</label>");
                            }
                        },
                    error:
                        function(jqXHR, textStatus, errorThrown)
                        {
                            alert("Запрос к БД на добавление организации закончился неудачей.");
                        }
                }
            );
        });
        $('#myModal').modal( { keyboard: true, backdrop:true } );
    }

    window.drvDelete = drvDelete;
})();

function studAddForm()
{
    if (null !== gThis.faculties)
    {
        var formStud = gThis.formStud;
        formStud.removeAllValues();
        formStud.removeAllSelectLines("stud-fac");
        formStud.addSelectLine("stud-fac", "Choisir une action...", -1);
        for (var i = 0; i < gThis.organizations.length; i++)
        {
            formDrv.addSelectLine("drv-org", gThis.organizations[i].name, gThis.organizations[i].id);
        }
        formDrv.setValue("drv-reg-time", new Date().toISOString().slice(0,10));

        formDrv.removeAllButtons();
        formDrv.addButton("Add", "drv-add-button", "drvAdd();", "disabled");
        formDrv.addButton("Clear", "", "drvAddForm();", "");

        $('#operation_title').text("Add a driver");
        $('#operation_controls').html(formDrv.render());
        if (null !== gThis.timerId)
        {
            clearInterval(gThis.timerId);
        }
        gThis.timerId = setInterval(drvSetEnabled, 200);
    }
}

function orgFillList()
{
    $.ajax
    (
        {
            type: "POST",
            dataType: "json",
            url: '/COManager/DatabaseServlet',
            data: { req: "reqGetOrganization" },
            success:
                function(result)
                {
                    if (null !== result.organizations)
                    {
                        var orgList = document.getElementById("organization_list");
                        var org = gThis.organizations = result.organizations;
                        var orgListHtml = "";
                        for (var i = 0; i < org.length; i++)
                        {
                            orgListHtml += "<div id=\"org-id-" + org[i].id + "\" onclick=\"orgSel(" + org[i].id + ");\"><span>" + org[i].name + "</span></div>";
                        }
                        orgList.innerHTML = orgListHtml;
                    }
                },
            error:
                function(jqXHR, textStatus, errorThrown)
                {
                }
        }
    );
}

function orgAdd()
{
    $('#myModal').on( 'hide', function()
    {
        $('#yes_button').unbind('click');
        $('#myModal').off('hide');
    });
    $('#yes_button').click(function ()
    {
        $('#myModal').modal('hide');
        var name = $('#org-name').val();
        var okud = $('#org-okud').val();
        var okpo = $('#org-okpo').val();
        $.ajax(
            {
                type: "POST",
                dataType: "json",
                url: '/COManager/DatabaseServlet',
                data: { req: "reqAddOrganization", name: name, okud: okud, okpo: okpo },
                success:
                    function (result)
                    {
                        if (false !== result.success
                            && null !== result.id
                            && -1 !== result.id)
                        {
                            gThis.organizations.push({ id:result.id, name: name, okud: okud, okpo: okpo});
                            orgSel(result.id);
                            orgFillList();
                        }
                        else
                        {
                            $('#operation_controls').html("<label class=\"control-label\">Добавление не удалось</label>");
                        }
                    },
                error:
                    function(jqXHR, textStatus, errorThrown)
                    {
                        alert("Запрос к БД на добавление организации закончился неудачей.");
                    }
            }
        );
    });
    $('#myModal').modal( { keyboard: true, backdrop:true } );
}

function orgSel(orgId)
{
    if (null !== gThis.organizations)
    {
        var org = null;
        for (var i = 0; i < gThis.organizations.length; i++)
        {
            if (gThis.organizations[i].id === orgId)
            {
                org = gThis.organizations[i];
                break;
            }
        }
        if (null !== org)
        {
            var formOrg = gThis.formOrg;
            formOrg.setValue("org-name", org.name);
            formOrg.setValue("org-okud", org.okud);
            formOrg.setValue("org-okpo", org.okpo);
            formOrg.removeAllButtons();
            formOrg.addButton("Save changes", "org-update-button", "orgUpdate(" + org.id + ");", "");
            formOrg.addButton("Restore", "", "orgSel(" + org.id + ")", "");
            formOrg.addButton("Delete", "org-delete-button", "orgDelete(" + org.id + ");", "");
            $('#operation_title').text("Edit organization");
            $('#operation_controls').html(formOrg.render());
            if (null !== gThis.timerId)
            {
                clearInterval(gThis.timerId);
            }
            gThis.timerId = setInterval(orgSetEnabled, 200);
        }
    }
}

function orgSetEnabled()
{
    var name = $('#org-name').val();
    var okud = $('#org-okud').val();
    var okpo = $('#org-okpo').val();
    var enabled = "" !== name
                  && "" !== okud
                  && "" !== okpo;
    var addBtn = $('#org-add-button');
    if (addBtn.length > 0)
    {
        addBtn[0].disabled = (false === enabled);
    }
    var updateBtn = $('#org-update-button');
    if (updateBtn.length > 0)
    {
        updateBtn[0].disabled = (false === enabled);
    }
}

//controllers.organization = {
//    
//    _modalId: null,
//    _orgIdToUpdate: null,
//            
//    initialize: function(modalId) {
//        
//    },
//            
//    update: function() {
//        
//    }
//}

(function()
{
    // Интерфейс
    window.orgUpdate = function(id) {}; // implemented below

    // id-шник обновляемой организации
    var orgIdToUpdate;

    function orgUpdate(id)
    {
        orgIdToUpdate = id;
        $('#myModal').on('hide', function()
        {
            $('#yes_button').unbind('click');
            $('#myModal').off( 'hide' );
        });
        // регистрируем обработчик нажания на кнопку диалога
        $('#yes_button').click(function ()
        {
            $('#myModal').modal('hide');
            var name = $('#org-name').val();
            var okud = $('#org-okud').val();
            var okpo = $('#org-okpo').val();
            $.ajax(
                {
                    type: "POST",
                    dataType: "json",
                    url: '/COManager/DatabaseServlet',
                    data: { req: "reqUpdateOrganization", id: orgIdToUpdate, name: name, okud: okud, okpo: okpo },
                    success:
                        function (result)
                        {
                            if (false !== result.success)
                            {
                                orgFillList();
                            }
                        },
                    error:
                        function(jqXHR, textStatus, errorThrown)
                        {
                            alert("Запрос к БД на добавление организации закончился неудачей.");
                        }
                }
            );
        });
        // показываем диалог
        $('#myModal').modal( { keyboard: true, backdrop:true } );
    }
    window.orgUpdate = orgUpdate;

})();

(function ()
{
    window.orgDelete = function (id) {};    // реализация ниже

    var orgIdToDelete;

    function orgDelete(id)
    {
        orgIdToDelete = id;
        $('#myModal').on('hide', function()
        {
            $('#yes_button').unbind('click');
            $('#myModal').off('hide');
        });
        // регистрируем обработчик нажания на кнопку диалога
        $('#yes_button').click(function ()
        {
            $('#myModal').modal('hide');
            $.ajax({
                type: "POST",
                dataType: "json",
                url: '/COManagerImit/DatabaseServlet',
                data: { req: "reqIsOrganizationDeletePossible", id: orgIdToDelete },
                success:
                    function (result)
                    {
                        if (false !== result.success)
                        {
                            $.ajax(
                                {
                                    type: "POST",
                                    dataType: "json",
                                    url: '/COManagerImit/DatabaseServlet',
                                    data: { req: "reqDeleteOrganization", id: id},
                                    success:
                                        function (result)
                                        {
                                            if (false !== result.success)
                                            {
                                                orgFillList();
                                                $('#operation_controls').html("<label class=\"control-label\">Успешно удалено</label>");
                                            }
                                            else
                                            {
                                                alert('На эту организацию все ещё ссылается по меньшей мере один водитель.');
                                            }
                                        },
                                    error:
                                        function(jqXHR, textStatus, errorThrown)
                                        {
                                            alert("Запрос к БД на добавление организации закончился неудачей.");
                                        }
                                }
                            );
                        }
                    },
                error:
                    function(jqXHR, textStatus, errorThrown)
                    {
                        alert("Запрос к БД на добавление организации закончился неудачей.");
                    }
            });
        });
        $('#myModal').modal( { keyboard: true, backdrop:true } );
    }
    window.orgDelete = orgDelete;
})();

function orgAddForm()
{
    var formOrg = gThis.formOrg;
    formOrg.removeAllValues();
    formOrg.removeAllButtons();
    formOrg.addButton("Add", "org-add-button", "orgAdd();", "disabled");
    formOrg.addButton("Clear", "", "orgAddForm();", "");
    $('#operation_title').text("Add an organization");
    $('#operation_controls').html(formOrg.render());
    if (null !== gThis.timerId)
    {
        clearInterval(gThis.timerId);
    }
    gThis.timerId = setInterval(orgSetEnabled, 200);
}

$('#logout-button').click( function () { user_logoff(); } );

//$('#org-id-new').click(
//    function()
//    {
//        orgAddForm();
//    }
//);
//
//$('#drv-id-new').click(
//    function()
//    {
//        drvAddForm();
//    }
//);

$(document).ready(
    function()
    {
        $.ajax
        (
            {
                type: "POST",
                dataType: "json",
                url: '/COManager/DatabaseServlet',
                data: { req: "reqUsername" },
                success:
                    function(result)
                    {
                        if (null !== result.username)
                        {
                            $('#username-label').text(result.username);
                        }
                        else
                        {
                            $('#username-label').text("Ошибка!");
                        }
                    },
                error:
                    function(jqXHR, textStatus, errorThrown)
                    {
                    }
            }
        );

        facFillList();
        
        var formOrg = gThis.formOrg = new Form();
        formOrg.addInputControl("Appelation",           "text",   "org-name",           ""          );
        formOrg.addInputControl("OKYD",               "text",   "org-okud",           ""          );
        formOrg.addInputControl("OKPO",               "text",   "org-okpo",           ""          );
        var formDrv = gThis.formDrv = new Form();
        formDrv.addInputControl("surname",                "text",   "drv-first-name",      ""         );
        formDrv.addInputControl("name",            "text",   "drv-last-name",       ""         );
        formDrv.addInputControl("Отчество",           "text",   "drv-middle-name",     ""         );
        formDrv.addSelectControl("Организация", "drv-org");
        formDrv.addInputControl("Вод. уд.",           "text",   "drv-licence",         ""         );
        formDrv.addInputControl("Категория вод. уд.", "text",   "drv-licence-category",""         );
        formDrv.addInputControl("Рег. номер",         "text",   "drv-reg-number",      ""         );
        formDrv.addInputControl("Рег. серия",         "text",   "drv-reg-series",      ""         );
        formDrv.addInputControl("Дата регистрации",   "date",   "drv-reg-time",        "disabled" );
        formDrv.addInputControl("Номер вод. уд.",     "text",   "drv-licence-num",     ""         );
        formDrv.addInputControl("Модель т.с.",        "text",   "drv-model",           ""         );
        formDrv.addInputControl("Вид топлива",        "text",   "drv-fuel-detail",     ""         );
        formDrv.addInputControl("Пробег",             "number", "drv-mileage",         "min=\"0\"");
        formDrv.addInputControl("Гос. номер т.с.",    "number", "drv-real-veh-number", "min=\"0\"");
        formDrv.addInputControl("Комментарии",        "text",   "drv-comments",        ""         );
        formDrv.addInputControl("Номер телефона",     "text",   "drv-num-tel",         ""         );
        formDrv.addInputControl("Номер SIM-карты",    "text",   "drv-num-sim",         ""         );
    }
);
