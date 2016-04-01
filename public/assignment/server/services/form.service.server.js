module.exports = function(app, FormModel) {
    "use strict";

    app.get('/api/assignment/form', findAllForms);
    app.get('/api/assignment/user/:userId/form', findFormByUserId);
    app.get('/api/assignment/form/:formId', findFormById);
    app.delete('/api/assignment/form/:formId', deleteForm);
    app.post('/api/assignment/user/:userId/form', createForm);
    app.put('/api/assignment/form/:formId', updateForm);

    function findAllForms(req, res) {
        FormModel.findAllForms().then(
            function(forms) {
                res.json(forms);
            }
        );
    }

    function findFormByUserId(req, res) {
        FormModel.findFormByUserId(req.params.userId).then(
            function(form) {
                res.json(form);
            }
        );
    }

    function findFormById(req, res) {
        FormModel.findFormById(req.params.formId).then(
            function(form) {
                if (form.length > 0) {
                    res.json(form[0]);
                } else {
                    res.json(null);
                }
            }
        );
    }

    function deleteForm(req, res) {
        FormModel.deleteForm(req.params.formId).then(
            function() {
                res.send(200);
            }
        );
    }

    function createForm(req, res) {
        var newForm = req.body;
        newForm.userId = req.params.userId;
        FormModel.createForm(newForm).then(
            function(form) {
                res.json(form);
            }
        );
    }

    function updateForm(req, res) {
        FormModel.updateForm(req.params.formId, req.body).then(
            function(newForm) {
                res.json(newForm);
            }
        )
    }
};