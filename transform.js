#!/usr/bin/env node


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

/* We can seperate the annotation into component attributes by directly using
the index of the strings that represent the objects however if we need to add 
more attributes in future the index will be wrong and our function blows up. 
Therefore we will need to find a solution that is more extensible as long as we
follow certain conventions. In this case the attributes are single word names
that end with colons ':' followed by all possible values represented with square
brackets preceeding the values themselves, while the chosen values for the attributes are marked with uppercase 'X' inside the square brackets. */ 

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
    and transforms it into a usable object
    */

    var collect = {}

    // Make a list using newline as delimiter
    var splitted = raw.split('\n');

    // Loop through the list so produced
    for (i = 0; i < splitted.length; i++){

        // Extract strings from array by index
        var current_str = splitted[i]

        // If the current string is a word that ends with a ':'
        // then this is a property. Remove the ':' and 'initialize'
        // it as key to an object
        if (/^\w+:/.test(current_str)){
            var current_key = current_str.replace(':', '');
            collect[current_key] = {}; 
        
        // If there's no ':' then this is a value to the current_key
        // We should save it as such
        } else {

            if (current_key == 'Text') {

                // If the current key is 'Text' we can expect that variables
                // are embedded in braces. So we search for these in the value
                // and replace the spaces with '_' to make them usable as 
                // variables
                var in_braces = current_str.match(/{\w+(\s+\w+)*}/g);
                for (j = 0; j < in_braces.length; j++){
                    var brace_param = in_braces[j].replace(' ', '_');
                    deep_key = current_str.replace(in_braces[j], brace_param);
                } 
                // We then assign the result directly to current_key
                collect[current_key] = deep_key;

            } else {
                
                // Otherwise we make the deep_key a key in its own right and 
                // a value that is either true or false i.e. [X] or [ ].
                // But first remove the preceeding [X] or [ ]
                var deep_key = current_str.slice(4, current_str.length);
                collect[current_key][deep_key] = bool_value(current_str);
            }
        };
    }
    return collect;
};

// We can now map our str_to_object function to the annotation_tags list
var tag_objs = annotation_tags['annotation_tags'].map(str_to_object);


log(tag_objs);
