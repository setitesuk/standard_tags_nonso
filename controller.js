
var AnnotationTagApp = angular.module('AnnotationTagApp', ['ngMaterial']);

AnnotationTagApp.controller("TagController", function($scope, transformService){
    var tags = transformService.get_tag_objs();
    $scope.x = 234;
    $scope.variables = {
        repeat_type: 'Ribonucleic Acid',
        clone_name: 'Dolly',
        puc_name: 'IC25U',
        x: 234
    };
    var updateTags = function () {
        var copy_tags = angular.copy(tags);
        for (i=0; i < copy_tags.length; i++) {
            var current_str = copy_tags[i].Text;
            if (typeof(current_str) == 'string'){
                // Variables are embedded in braces. So we search for these,
                // replace spaces with '_' , remove the braces
                // and insert scope variables into the string
                var in_braces = current_str.match(/{\w+(\s+\w+)*}/g);
                console.log(in_braces);
                for (j = 0; j < in_braces.length; j++){
                    var brace_param = in_braces[j].replace(' ', '_').replace('{', '');
                    brace_param = brace_param.replace('}', '');
                    scope_value = $scope.variables[brace_param];
                    current_str = current_str.replace(in_braces[j], scope_value);
                }
            } else {
                copy_tags[i].Text = '';
            }
            copy_tags[i].Text = current_str;
        }
        $scope.scope_tags = copy_tags;
    };
    updateTags();
    $scope.updateTags = updateTags;
});

