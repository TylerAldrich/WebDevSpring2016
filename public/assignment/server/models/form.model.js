var forms = require("./form.mock.json");

module.exports = function(app) {
    "use strict";
    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        updateForm: updateForm,
        deleteForm: deleteForm
    };
    return api;

    function createForm(form) {
        form._id = (new Date).getTime();
        forms.push(form);
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

    function updateForm(formId, form) {
        for (var i in forms) {
            if (forms[i]._id === formId) {
                forms[i] = form;
                return forms[i];
            }
        }
        return null;
    }

    function deleteForm() {
        var newForms = [];
        for (var i in forms) {
            if (forms[i]._id !== userId) {
                newForms.push(forms[i]);
            }
        }
        forms = newForms;
    }
};