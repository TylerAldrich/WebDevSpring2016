var forms = require("./form.mock.json");

module.exports = function() {
    "use strict";
    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        findFormByUserId: findFormByUserId,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findAllFieldsByFormId: findAllFieldsByFormId,
        findFieldByFormId: findFieldByFormId,
        deleteFieldById: deleteFieldById,
        updateFieldById: updateFieldById,
        createFieldById: createFieldById,
        updateAllFields: updateAllFields
    };
    return api;

    function createForm(form) {
        form._id = (new Date).getTime().toString();
        forms.push(form);
        return form;
    }

    function findAllForms() {
        return forms;
    }

    function findFormById(formId) {
        for (var i in forms) {
            if (forms[i]._id === formId) {
                return forms[i];
            }
        }
        return null;
    }

    function findFormByTitle(title) {
        for (var i in forms) {
            if (forms[i].title === title) {
                return forms[i];
            }
        }
        return null;
    }

    function findFormByUserId(userId) {
        var userForms = [];
        for (var i in forms) {
            if (forms[i].userId === userId) {
                userForms.push(forms[i])
            }
        }
        return userForms;
    }

    function updateForm(formId, form) {
        for (var i in forms) {
            if (forms[i]._id === formId) {
                forms[i] = form;
                return forms[i];
            }
        }
        return null;
    }

    function deleteForm(formId) {
        var newForms = [];
        for (var i in forms) {
            if (forms[i]._id !== formId) {
                newForms.push(forms[i]);
            }
        }
        forms = newForms;
    }

    function findAllFieldsByFormId(formId) {
        var form = findFormById(formId)
        if (form) {
            return form.fields;
        }
        return null;
    }

    function findFieldByFormId(formId, fieldId) {
        var fields = findAllFieldsByFormId(formId);
        for (var i in fields) {
            if (fields[i]._id === fieldId) {
                return fields[i];
            }
        }
        return null;
    }

    function deleteFieldById(formId, fieldId) {
        var newFields = [];
        var currentFields = findAllFieldsByFormId(formId);
        for (var i in currentFields) {
            if (currentFields[i]._id !== fieldId) {
                newFields.push(currentFields[i]);
            }
        }

        for (var i in forms) {
            if (forms[i]._id === formId) {
                forms[i].fields = newFields;
                return forms[i].fields;
            }
        }
        return null;
    }

    function updateFieldById(formId, fieldId, newField) {
        for (var i in forms) {
            if (forms[i]._id === formId) {
                for (var j in forms[i].fields) {
                    if (forms[i].fields[j]._id === fieldId) {
                        forms[i].fields[j] = newField;
                        return forms[i].fields[j];
                    }
                }
            }
        }
        return null;
    }

    function updateAllFields(formId, newFields) {
        for (var i in forms) {
            if (forms[i]._id === formId) {
                forms[i].fields = newFields;
                return forms[i].fields;
            }
        }
        return null;
    }

    function createFieldById(formId, newField) {
        newField._id = (new Date).getTime().toString();
        for (var i in forms) {
            if (forms[i]._id === formId) {
                forms[i].fields.push(newField);
                return forms[i].fields;
            }
        }
        return null;
    }
};