/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Form()
{
    this.controlsList = [];
    this.buttonsList = [];
}

Form.prototype =
{
    controlsList: [],
    buttonsList: [],

    addInputControl: function (controlName, controlType, controlId, inputAttrs)
    {
        this.controlsList.push( { ctrl: "input", name: controlName, type: controlType, id: controlId, attrs: inputAttrs, value: null } );
    },
    addSelectControl: function (controlName, controlId)
    {
        this.controlsList.push( {ctrl: "select", name: controlName, id: controlId, options: [] } );
    },
    addSelectLine: function (selectId, optionLabel, optionValue)
    {
        for (var i = 0; i < this.controlsList.length; i++)
        {
            if ("select" === this.controlsList[i].ctrl
                && selectId === this.controlsList[i].id)
            {
                this.controlsList[i].options.push( { label: optionLabel, value: optionValue } );
                break;
            }
        }
    },
    removeAllSelectLines: function(selectId)
    {
        for (var i = 0; i < this.controlsList.length; i++)
        {
            if ("select" === this.controlsList[i].ctrl
                && selectId === this.controlsList[i].id)
            {
                this.controlsList[i].options = [];
                break;
            }
        }
    },
    removeControls: function()
    {
        this.controlsList = [];
    },
    setValue: function (controlId, value)
    {
        for (var i = 0; i < this.controlsList.length; i++)
        {
            if (this.controlsList[i].id === controlId)
            {
                this.controlsList[i].value = value;
                break;
            }
        }
    },
    removeAllValues: function ()
    {
        for (var i = 0; i < this.controlsList.length; i++)
        {
            if (this.controlsList[i].value !== null)
            {
                this.controlsList[i].value = null;
            }
        }
    },
    addButton: function (buttonLabel, buttonId, onClick, buttonAttr)   // buttonType, 
    {
        this.buttonsList.push( { label: buttonLabel, id: buttonId, onclick: onClick, attr: buttonAttr } );    // type: buttonType, 
    },
    removeAllButtons: function()
    {
        this.buttonsList = [];
    },
    render: function ()
    {
        var result = "";
        for (var i = 0; i < this.controlsList.length; i++)
        {
            result += "<label class=\"control-label\" for=\"" + this.controlsList[i].id + "\">" + this.controlsList[i].name + "</label>";
            result += "<div class=\"controls\">";
            if ("input" === this.controlsList[i].ctrl)
            {
                result += "<input type=\"" + this.controlsList[i].type + "\" id=\"" + this.controlsList[i].id
                          + "\" placeholder=\"" + this.controlsList[i].name + "\"";
                if (null !== this.controlsList[i].attrs
                    && "" !== this.controlsList[i].attrs)
                {
                    result += this.controlsList[i].attrs;
                }
                if (null !== this.controlsList[i].value)
                {
                    result += " value=\"" + this.controlsList[i].value + "\"";
                }
                result += ">";
            }
            else if ("select" === this.controlsList[i].ctrl)
            {
                result += "<select id=\"" + this.controlsList[i].id + "\">";
                for (var j = 0; j < this.controlsList[i].options.length; j++)
                {
                    result += "<option value=\"" + this.controlsList[i].options[j].value + "\"";
                    result += (this.controlsList[i].options[j].value === this.controlsList[i].value) ? " selected" : "" ;
                    result += ">" + this.controlsList[i].options[j].label + "</option>";
                }
                result += "</select>";
            }
            result += "</div>";
        }
        result += "<div class=\"control-group\"><br><div class=\"controls\">";
        for (var i = 0; i < this.buttonsList.length; i++)
        {
            result += "<button type=\"button\" class=\"btn\" " + this.buttonsList[i].attr;
            if (null !== this.buttonsList[i].id
                && "" !== this.buttonsList[i].id)
            {
                result += " id=\"" + this.buttonsList[i].id + "\"";
            }
            if (null !== this.buttonsList[i].onclick
                && "" !== this.buttonsList[i].onclick)
            {
                result += " onclick=\"" + this.buttonsList[i].onclick + "\"";
            }
            result += ">" + this.buttonsList[i].label + "</button>";
        }
        result += "</div></div>";

        return result;
    }
};
