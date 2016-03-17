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
        deleteForm: deleteForm
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
        for (var i in forms) {
            if (forms[i].userId === userId) {
                return forms[i];
            }
        }
        return null;
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
};