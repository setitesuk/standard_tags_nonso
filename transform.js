
var annotation_tags = { "annotation_tags": [
'Type:\n[X] Clone Information\n[ ] Feature\nFeatures:\n[X] Start/End\n[ ] Single Clone Region\n[ ] SIL/TIL\n[ ] Repeat\nText:\nThis is the start of sequence clone {clone name}.',
'Type:\n[ ] Clone Information\n[X] Feature\nFeatures:\n[ ] Start/End\n[X] Single Clone Region\n[ ] SIL/TIL\n[ ] Repeat\nText:',
'Type:\n[ ] Clone Information\n[X] Feature\nFeatures:\n[ ] Start/End\n[ ] Single Clone Region\n[ ] SIL/TIL\n[X] Repeat\nText:\nThis repeat is of Type {repeat type}. It has a length of {x}bp.',
'Type:\n[X] Clone Information\n[ ] Feature\nFeatures:\n[X] Start/End\n[ ] Single Clone Region\n[ ] SIL/TIL\n[ ] Repeat\nText:\nThis is the end of sequence clone {clone name}.',
'Type:\n[ ] Clone Information\n[X] Feature\nFeatures:\n[ ] Start/End\n[X] Single Clone Region\n[X] SIL/TIL\n[ ] Repeat\nText:\nM13 Short Insert Library of pUC {puc name}.',
'Type:\n[ ] Clone Information\n[X] Feature\nFeatures:\n[ ] Start/End\n[X] Single Clone Region\n[X] SIL/TIL\n[ ] Repeat\nText:\npUC Short Insert Library of pUC {puc name}',
'Type:\n[ ] Clone Information\n[X] Feature\nFeatures:\n[ ] Start/End\n[X] Single Clone Region\n[X] SIL/TIL\n[ ] Repeat\nText:\nTransposon Insertion Library of pUC {puc name}',
'Type:\n[ ] Clone Information\n[X] Feature\nFeatures:\n[ ] Start/End\n[ ] Single Clone Region\n[ ] SIL/TIL\n[X] Repeat\nText:\nMissing data. {x}bp of repeat Type {repeat type}.',
'Type:\n[ ] Clone Information\n[X] Feature\nFeatures:\n[ ] Start/End\n[ ] Single Clone Region\n[ ] SIL/TIL\n[X] Repeat\nText:\nALU repeat of length {x}bp',
'Type:\n[X] Clone Information\n[ ] Feature\nFeatures:\n[ ] Start/End\n[ ] Single Clone Region\n[ ] SIL/TIL\n[ ] Repeat\nText:\nSequence clone length {x}bp'
]};

/*
 We can seperate the annotation into component attributes by directly using
the index of the strings that represent the objects. 
However, if we need to add more attributes in future the index will be wrong 
and our function blows up. 
Therefore we will need to find a solution that is more extensible as long as we
follow certain conventions in the annotation tags. 

In this case the attributes are single word names
that end with colons ':' followed by all possible values represented with square
brackets preceeding the values themselves, while the chosen values for the 
attributes are marked with uppercase 'X' inside the square brackets. 

Furthermore, we should aim to return an object in the end that will have the 
same architecture as we would prefer the annotation tags to be delivered from
the server. This has the advantage that in future we can cleanly retire this transform service.
*/ 

var log = console.log;

var bool_value = function(str){

    // We translate [X] to mean true and [ ] to mean false
    // else throw an exception  
    if (/^\[X\]/.test(str)) {
        return true;
    } else if (/^\[ \]/.test(str)) {
        return false; 
    } else {
        var exception = 'Error!: ' + '"' + str + '"' + 
        ' starts with neither [X] nor [ ] this is only acceptable' +
        ' with attributes like "Text" \n';
        throw exception
    }
};


var str_to_object = function(raw){
    /*
    We make a function that accepts units of annotation tags
    and transforms them into objects
    */

    var collect = {}

    // Make a list using newline as delimiter
    var splitted = raw.split('\n');

    // Loop through the list so produced
    for (i = 0; i < splitted.length; i++){

        // Extract strings from array by index
        var current_str = splitted[i]

        // If the current string is a word that ends with a ':'
        // then this is a property. Remove the ':' and 
        // assign it as key to an object
        if (/^\w+:/.test(current_str)){
            var current_key = current_str.replace(':', '');
            collect[current_key] = []; 
        
        } else {

        // If there's no ':' then this is a value to the current_key
        // as produced above

            // But the current_key 'Text' needs further processing of its
            if (current_key == 'Text') {

                // We assign directly to current_key
                collect[current_key] = current_str;

             } else {
                
                // Otherwise remove the preceeding [X] or [ ]
                var for_name = current_str.slice(4, current_str.length);
                
                // If we find [X] in current string assign to current key
                // If current key is 'Type' assign directly if not push to array
                if (bool_value(current_str)) {
                    if (current_key == 'Type') {
                        collect[current_key] = for_name;
                    } else { 
                        collect[current_key].push(for_name); 
                    }
                // Otherwise do nothing
                } else {
                   // log('Feature ' + for_name + ' is not included in ' +
                   // current_key + '. Pass') 
                } 
            }
        };
    }
    return collect;
};

// We can now map our str_to_object function to the annotation_tags list
var tag_objs = annotation_tags['annotation_tags'].map(str_to_object);


// Register tags as a service to angular
angular.module('AnnotationTagApp').service('transformService', function(){
    this.get_tag_objs = function(){
        return tag_objs;         
    }
});

