module.exports = function(app, FieldModel) {
    "use strict";

    app.get('/api/assignment/form/:formId/field', findFields);
    app.get('/api/assignment/form/:formId/field/:fieldId', findFieldById);
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteFieldById);
    app.post('/api/assignment/form/:formId/field', createField);
    app.put('/api/assignment/form/:formId/field/:fieldId', updateField);
    app.put('/api/assignment/form/:formId/field', updateAllFields);

    function findFields(req, res) {
        FieldModel.findAllFieldsByFormId(req.params.formId).then(
            function(fields) {
                res.json(fields);
            }
        );
    }

    function findFieldById(req, res) {
        FieldModel.findFieldByFormId(req.params.formId, req.params.fieldId).then(
            function(field) {
                if (field.length > 0) {
                    res.json(field);
                } else {
                    res.json(null);
                }
            }
        );
    }

    function deleteFieldById(req, res) {
        FieldModel.deleteFieldById(req.params.formId, req.params.fieldId).then(
            function() {
                res.json(200);
            }
        );
    }

    function createField(req, res) {
        FieldModel.createFieldById(req.params.formId, req.body).then(
            function() {
                findFields(req, res);
            }
        );
    }

    function updateField(req, res) {
        FieldModel.updateFieldById(req.params.formId, req.params.fieldId, req.body).then(
            function(newField) {
                res.json(newField);
            }
        );
    }

    function updateAllFields(req, res) {
        FieldModel.updateAllFields(req.params.formId, req.body).then(
            function() {
                findFields(req, res);
            }
        );
    }
};