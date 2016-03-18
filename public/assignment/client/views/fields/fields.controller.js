(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .controller("FieldsController", FieldsController);

    function FieldsController($scope, $routeParams, FieldsService) {
        $scope.formId = $routeParams.formId;
        $scope.fieldType = "TEXT";
        refreshFields();
        jQuery("#sortable-table").sortable({
            handle: ".glyphicon-align-justify",
            update: function(event, ui) {
                var idsInOrder = [];
                jQuery("#sortable-table .form-group").each(function() {
                    var id = $(this).attr("id");
                    if (id) {
                        idsInOrder.push(parseInt(id));
                    }
                });

                updateAllFieldsOrder(idsInOrder);
            }
        });

        $scope.addField = function(fieldType) {
            var field = {};
            field.type = fieldType;

            if (fieldType === "TEXT" || fieldType === "TEXTAREA") {
                field.label = "New Text Field";
                field.placeholder = "New Field";
            } else if (fieldType === "DATE") {
                field.label = "New Date Field";
            } else if (fieldType === "OPTIONS") {
                field.label = "New Dropdown";
                field.options = [
                    {label: "Option 1", value: "OPTION_1"},
                    {label: "Option 2", value: "OPTION_2"},
                    {label: "Option 3", value: "OPTION_3"}
                ];
            } else if (fieldType === "CHECKBOXES") {
                field.label = "New Checkboxes";
                field.options = [
                    {label: "Option A", value: "OPTION_A"},
                    {label: "Option B", value: "OPTION_B"},
                    {label: "Option C", value: "OPTION_C"}
                ];
            } else if (fieldType === "RADIOS") {
                field.label = "New Radio Buttons";
                field.options = [
                    {label: "Option X", value: "OPTION_X"},
                    {label: "Option Y", value: "OPTION_Y"},
                    {label: "Option Z", value: "OPTION_Z"}
                ];
            } else {
                return;
            }

            FieldsService.createFieldForForm($scope.formId, field).then(
                function(res) {
                    $scope.fields = res.data;
                },
                function(error) {
                    console.log(error);
                }
            );
        };

        $scope.removeField = function(idx) {
            var field = $scope.fields[idx];
            FieldsService.deleteFieldFromForm($scope.formId, field._id).then(
                function(res) {
                    refreshFields();
                },
                function(error) {
                    console.log(error);
                }
            );
        };

        $scope.createPopup = function(fieldType, idx) {
            var field = $scope.fields[idx];
            // set popups values to fields currently set values
            $scope[fieldType + "label"] = field.label;
            if (fieldType === "TEXT" || fieldType === "TEXTAREA") {
                $scope[fieldType + "placeholder"] = field.placeholder;
            } else if (fieldType !== "DATE") {
                var optionsString = "";
                for (var i in field.options) {
                    optionsString += (field.options[i].label + ":" + field.options[i].value + "\n");
                }
                $scope[fieldType + "options"] = optionsString;
            }
            jQuery("#dialog-" + fieldType).dialog({
                resizeable: false,
                height: 300,
                modal: true,
                buttons: {
                    "Cancel": function() {
                        jQuery(this).dialog("close");
                    },
                    "Ok": function() {
                        updateField(fieldType, idx);
                        jQuery(this).dialog("close");
                    }
                }
            });
        };

        function updateField(fieldType, idx) {
            var field = $scope.fields[idx];
            field.label = $scope[fieldType + "label"];

            if (fieldType === "TEXT" || fieldType === "TEXTAREA") {
                field.placeholder = $scope[fieldType + "placeholder"];
            } else if (fieldType !== "DATE") {
                var optionsString = $scope[fieldType + "options"];
                var options = optionsString.split("\n");
                field.options = [];
                for (var i in options) {
                    var items = options[i].split(":");
                    field.options.push({
                        label: items[0],
                        value: items[1]
                    });
                }
            }

            FieldsService.updateField($scope.formId, field._id, field);
        }

        function updateAllFieldsOrder(newOrder) {
            var newFields = [];
            for (var i in newOrder) {
                newFields.push($scope.fields[newOrder[i]]);
            }

            FieldsService.updateAllFields($scope.formId, newFields).then(
                function(res) {
                    $scope.fields = res.data;
                },
                function(error) {
                    console.log(error);
                }
            );
        }

        function refreshFields() {
            FieldsService.getFieldsForForm($scope.formId).then(
                function(res) {
                    $scope.fields = res.data;
                },
                function(error) {
                    console.log(error);
                }
            );
        }
    }
})();

