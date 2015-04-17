Standard Annotation Tags
========================

Below are a set of standard annotation tags as may be used on some DNA sequence as it is assembled.



What we would like you to do is to write a single web page app which displays the list, using JavaScript to order it grouped by either Clone Information or Feature. The list has been provided in a JSON object that you should assume is the return of an AJAX call, and use it as such.

The annotation tags are already in the index.html page which you should work in.

The app should also ask the user to search for a tag, allow them to change the information in {} i.e. {clone name} and return it to them in a way that they can cleanly cut and paste into a text box within another application (do not assume that application to be web based).

You may use any js and css libraries you wish (i.e. jQuery or Bootstrap). Either import them into the repository, or put in a link to the source such that on page load it will bring them in. The page will be run in an HTML5 compliant browser.

Annotation Tags
===============

{ "annotation_tags": [<br/>
'Type:<br/>
[X] Clone Information<br/>
[ ] Feature<br/>
Features:<br/>
[X] Start/End<br/>
[ ] Single Clone Region<br/>
[ ] SIL/TIL<br/>
[ ] Repeat<br/>
Text:<br/>
This is the start of sequence clone {clone name}.',

'Type:<br/>
[ ] Clone Information<br/>
[X] Feature<br/>
Features:<br/>
[ ] Start/End<br/>
[X] Single Clone Region<br/>
[ ] SIL/TIL<br/>
[ ] Repeat<br/>
Text:',

'Type:<br/>
[ ] Clone Information<br/>
[X] Feature<br/>
Features:<br/>
[ ] Start/End<br/>
[ ] Single Clone Region<br/>
[ ] SIL/TIL<br/>
[X] Repeat<br/>
Text:<br/>
This repeat is of Type {repeat type}. It has a length of {x}bp.',

'Type:<br/>
[X] Clone Information<br/>
[ ] Feature<br/>
Features:<br/>
[X] Start/End<br/>
[ ] Single Clone Region<br/>
[ ] SIL/TIL<br/>
[ ] Repeat<br/>
Text:<br/>
This is the end of sequence clone {clone name}.',

'Type:<br/>
[ ] Clone Information<br/>
[X] Feature<br/>
Features:<br/>
[ ] Start/End<br/>
[X] Single Clone Region<br/>
[X] SIL/TIL<br/>
[ ] Repeat<br/>
Text:<br/>
M13 Short Insert Library of pUC {puc name}.',

'Type:<br/>
[ ] Clone Information<br/>
[X] Feature<br/>
Features:<br/>
[ ] Start/End<br/>
[X] Single Clone Region<br/>
[X] SIL/TIL<br/>
[ ] Repeat<br/>
Text:<br/>
pUC Short Insert Library of pUC {puc name}',

'Type:<br/>
[ ] Clone Information<br/>
[X] Feature<br/>
Features:<br/>
[ ] Start/End<br/>
[X] Single Clone Region<br/>
[X] SIL/TIL<br/>
[ ] Repeat<br/>
Text:<br/>
Transposon Insertion Library of pUC {puc name}',

'Type:<br/>
[ ] Clone Information<br/>
[X] Feature<br/>
Features:<br/>
[ ] Start/End<br/>
[ ] Single Clone Region<br/>
[ ] SIL/TIL<br/>
[X] Repeat<br/>
Text:<br/>
Missing data. {x}bp of repeat Type {repeat type}.',

'Type:<br/>
[ ] Clone Information<br/>
[X] Feature<br/>
Features:<br/>
[ ] Start/End<br/>
[ ] Single Clone Region<br/>
[ ] SIL/TIL<br/>
[X] Repeat<br/>
Text:<br/>
ALU repeat of length {x}bp',

'Type:<br/>
[X] Clone Information<br/>
[ ] Feature<br/>
Features:<br/>
[ ] Start/End<br/>
[ ] Single Clone Region<br/>
[ ] SIL/TIL<br/>
[ ] Repeat<br/>
Text:<br/>
Sequence clone length {x}bp'
]}

User acceptance tests
---------------------

1) Once the page has finished loading (with any required JavaScript processing), I want to see the 3 Clone Information tags before the 7 Feature tags

2) I want to be able to select the 'end' tag, and insert the name BA123456, and be able to cut and paste the result into a text editor.
