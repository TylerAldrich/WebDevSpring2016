var q = require('q');

module.exports = function(mongoose) {
    "use strict";

    var FormSchema = require("./form.server.schema.js")(mongoose);
    var FormModel = mongoose.model("FormModel", FormSchema);

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
        var deferred = q.defer();
        FormModel.create(form,
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function findAllForms() {
        var deferred = q.defer();
        FormModel.find(function(err, forms) {
            deferred.resolve(forms);
        });
        return deferred.promise;
    }

    function findFormById(formId) {
        var deferred = q.defer();
        FormModel.findById(formId, function(err, form) {
            deferred.resolve(form);
        });
        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();
        FormModel.find({title: title}, function(err, form) {
            deferred.resolve(form);
        });
        return deferred.promise;
    }

    function findFormByUserId(userId) {
        var deferred = q.defer();
        FormModel.find({userId: userId}, function(err, form) {
            deferred.resolve(form);
        });
        return deferred.promise;
    }

    function updateForm(formId, form) {
        var deferred = q.defer();
        FormModel.findById(formId, function(err, doc) {
            var fields = Object.keys(form);
            for (var i in fields) {
                doc[fields[i]] = form[fields[i]];
            }

            doc.save(function(err, doc) {
                deferred.resolve(doc);
            })
        });
        return deferred.promise;
    }

    function deleteForm(formId) {
        var deferred = q.defer();
        FormModel.remove({_id: formId}, function(err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }
};