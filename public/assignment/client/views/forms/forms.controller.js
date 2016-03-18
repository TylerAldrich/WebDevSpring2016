(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .controller("FormsController", FormsController);

    function FormsController($scope, FormService) {
        FormService.findAllFormsForUser($scope.user._id).then(
            function(res) {
                $scope.forms = res.data;
            },
            function(error) {
                console.log(error);
            }
        );

        $scope.currentSelection = null;

        $scope.addForm = function() {
            if ($scope.formTitle === undefined) return;

            var form = {
                title: $scope.formTitle
            };
            FormService.createFormForUser($scope.user._id, form).then(
                function(res) {
                    $scope.forms.push(res.data);
                },
                function(error) {
                    console.log(error);
                }
            )
        };

        $scope.updateForm = function() {
            if ($scope.currentSelection === null || $scope.formTitle === undefined) return;
            var formId = $scope.forms[$scope.currentSelection]._id;
            var form = {
                _id: formId,
                title: $scope.formTitle,
                userId: $scope.user._id
            };

            FormService.updateFormById(formId, form).then(
                function(res) {
                    $scope.forms[$scope.currentSelection] = res.data;
                },
                function(error) {
                    console.log(error);
                }
            );
        };

        $scope.deleteForm = function(idx) {
            FormService.deleteFormById($scope.forms[idx]._id).then(
                function() {
                    FormService.findAllFormsForUser($scope.user._id).then(
                        function(res) {
                            $scope.forms = res.data;
                        },
                        function(error) {
                            console.log(error);
                        }
                    );
                },
                function(error) {
                    console.log(error);
                }
            );
        };

        $scope.selectForm = function(idx) {
            $scope.currentSelection = idx;
            $scope.formTitle = $scope.forms[idx].title;
        };
    }
})();

