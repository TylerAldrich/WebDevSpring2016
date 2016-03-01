(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .controller("FormsController", FormsController);

    function FormsController($scope, FormService) {
        FormService.findAllFormsForUser($scope.user._id, function(forms) {
            $scope.forms = forms;
        });
        $scope.currentSelection = null;

        $scope.addForm = function() {
            if ($scope.formTitle === undefined) return;

            var form = {
                title: $scope.formTitle
            };
            FormService.createFormForUser($scope.user._id, form, function(newForm) {
                $scope.forms.push(newForm);
            })
        };

        $scope.updateForm = function() {
            if ($scope.currentSelection === null || $scope.formTitle === undefined) return;
            var formId = $scope.forms[$scope.currentSelection]._id;
            var form = {
                _id: formId,
                title: $scope.formTitle,
                userId: $scope.user._id
            };

            console.log(form);
            FormService.updateFormById(formId, form, function(newForm) {
                $scope.forms[$scope.currentSelection] = newForm;
            });
        };

        $scope.deleteForm = function(idx) {
            FormService.deleteFormById($scope.forms[idx]._id, function(newForms) {
                FormService.findAllFormsForUser($scope.user._id, function(newUserForms) {
                    $scope.forms = newUserForms;
                })
            })
        };

        $scope.selectForm = function(idx) {
            $scope.currentSelection = idx;
            $scope.formTitle = $scope.forms[idx].title;
        };
    }
})();

