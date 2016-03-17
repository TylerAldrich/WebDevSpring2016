module.exports = function(app, FormModel) {
    "use strict";

    app.get('/api/assignment/form/:formId/field', findFields);
    app.get('/api/assignment/form/:formId/field/:fieldId', findFieldById);
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteFieldById);
    app.post('/api/assignment/form/:formId/field', createField);
    app.put('/api/assignment/form/:formId/field/:fieldId', updateField);

    function findFields(req, res) {
        var fields = FormModel.findAllFieldsByFormId(req.params.formId);
        res.json(fields);
    }

    function findFieldById(req, res) {
        var field = FormModel.findFieldByFormId(req.params.formId, req.params.fieldId);
        res.json(field);
    }

    function deleteFieldById(req, res) {
        FormModel.deleteFieldById(req.params.formId, req.params.fieldId);
        res.send(200);
    }

    function createField(req, res) {
        var newField = FormModel.createFieldById(req.params.formId, req.body);
        res.json(newField);
    }

    function updateField(req, res) {
        var newField = FormModel.updateFieldById(req.params.formId, req.params.fieldId, req.body);
        res.json(newField);
    }
};