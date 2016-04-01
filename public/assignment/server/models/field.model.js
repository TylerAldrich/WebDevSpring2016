var q = require('q');

module.exports = function(mongoose, FormModel) {
    "use strict";
    var FieldSchema = require("./field.server.schema.js")(mongoose);
    var FieldModel = mongoose.model("FieldModel", FieldSchema);

    var api = {
        findAllFieldsByFormId: findAllFieldsByFormId,
        findFieldByFormId: findFieldByFormId,
        deleteFieldById: deleteFieldById,
        updateFieldById: updateFieldById,
        createFieldById: createFieldById,
        updateAllFields: updateAllFields
    };
    return api;

    function findAllFieldsByFormId(formId) {
        var deferred = q.defer();
        FormModel.findFormById(formId).then(
            function (form) {
                FieldModel.find({
                    "_id": { $in: form.fields }
                }, function(err, fields) {
                    deferred.resolve(fields);
                });
            },
            function() {
                deferred.resolve(null);
            }
        );
        return deferred.promise;
    }

    function findFieldByFormId(formId, fieldId) {
        var deferred = q.defer();
        FormModel.findFormById(formId).then(
            function (form) {
                FieldModel.findById(fieldId, function(err, fields) {
                    deferred.resolve(fields);
                });
            },
            function() {
                deferred.resolve(null);
            }
        );
        return deferred.promise;
    }

    function deleteFieldById(formId, fieldId) {
        var deferred = q.defer();
        FieldModel.remove({_id: fieldId}, function(err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function updateFieldById(formId, fieldId, newField) {
        var deferred = q.defer();
        FormModel.findFormById(formId).then(
            function(form) {
                FieldModel.findById(fieldId, function(err, field) {
                    var updateFields = Object.keys(newField);
                    for (var i in updateFields) {
                        field[updateFields[i]] = newField[updateFields[i]];
                    }
                    field.save(function(err, doc) {
                        deferred.resolve(doc);
                    });
                });
            },
            function() {
                deferred.resolve(null);
            }
        );
        return deferred.promise;
    }

    function updateAllFields(formId, newFields) {
        var deferred = q.defer();
        FormModel.findFormById(formId).then(
            function(form) {
                FieldModel.find({
                    "_id": { $in: form.fields }
                }, function(err, allFields) {
                    for (var k in newFields) {
                        allFields[k] = newFields[k];
                    }

                    var count = 0;
                    var results = [];
                    allFields.forEach(function(field) {
                        updateFieldById(formId, field._id, field).then(
                            function(field) {
                                count++;
                                results.push(field);
                                if (count == allFields.length) {
                                    deferred.resolve(results);
                                }
                            }
                        );
                    });
                });
            },
            function() {
                deferred.resolve(null);
            }
        );
        return deferred.promise;
    }

    function createFieldById(formId, newField) {
        var deferred = q.defer();
        FormModel.findFormById(formId).then(
            function(form) {
               FieldModel.create(newField, function(err, doc) {
                   if (err) {
                       deferred.reject(err);
                   }  else {
                       form.fields.push(doc);

                       form.save(function(err, doc) {
                           deferred.resolve(doc.fields);
                       });
                   }
               })

            },
            function() {
                deferred.resolve(null);
            }
        );
        return deferred.promise;
    }
};