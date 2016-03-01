(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .factory("FormService", FormService);

    function FormService() {

        var factory = {};
        factory.forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
            {"_id": "030", "title": "TestForm", "userId": 234},
        ];

        factory.createFormForUser = function(userId, form, callback) {
            form._id = (new Date).getTime();
            form.userId = userId;
            factory.forms.push(form);
            callback(form);
        };

        factory.findAllFormsForUser = function(userId, callback) {
            var forms = [];
            for (var i in factory.forms) {
                if (factory.forms[i].userId === userId) {
                    forms.push(factory.forms[i]);
                }
            }
            callback(forms);
        };

        factory.deleteFormById = function(formId, callback) {
            var newForms = [];
            for (var i in factory.forms) {
                if (factory.forms[i]._id !== formId) {
                    newForms.push(factory.forms[i]);
                }
            }
            factory.forms = newForms;
            callback(factory.forms);
        };

        factory.updateFormById = function(formId, newForm, callback) {
            for (var i in factory.forms) {
                if (factory.forms[i]._id === formId) {
                    factory.forms[i] = newForm;
                    callback(newForm);
                    return;
                }
            }
            callback(null);
        };

        return factory;
    }
})();
