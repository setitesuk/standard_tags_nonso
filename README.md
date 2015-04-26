Standard Annotation Tags
========================

Below are a set of standard annotation tags as may be used on some DNA sequence 
as it is assembled.

What we would like you to do is to write a single web page app which displays 
the list, using JavaScript to order it grouped by either Clone Information or 
Feature. The list has been provided in a JSON object that you should assume is 
the return of an AJAX call, and use it as such.

The annotation tags are already in the `index.html` page which you should work in.
The formatting in the markdown of this README file may display this in a way 
not intended, so the file for you to work in has been set up and the JSON 
object imported.

The app should also ask the user to search for a tag, allow them to change the
information in `{}` i.e. `{clone name}` and return it to them in a way that 
they can cleanly cut and paste into a text box within another application 
(do not assume that application to be web based).

Once you have achieved this, we would like a script file which tests the page according to the User Acceptance Tests below. *(in the real environment, this would be coded first, but doesn't have to be here)*

What you use to test is up to you, but we should either be able to run it from a command line, or within a browser extension (i.e. Selenium plugin for Firefox), and it should return some form of pass OK for each test, and inform any tests which fail. *(It isn't a requirement that all tests written pass, but that we see how the tests work)*

You may use any libraries you wish *(i.e. jQuery or Bootstrap for the page, or choice of language for the tests)*. 
For the webpage - either import them into the repository, or put in a link to the source such that on page load it will bring them in. (The page will be run in an HTML5 compliant browser). If you use a different source than Selenium IDE for your tests, please add a file of requirements to import before running, and instructions on how to do so.

When you have completed this task, save to this external repository, and let us know.

Annotation Tags
---------------

```javascript
{ "annotation_tags": [
'Type:
[X] Clone Information
[ ] Feature
Features:
[X] Start/End
[ ] Single Clone Region
[ ] SIL/TIL
[ ] Repeat
Text:
This is the start of sequence clone {clone name}.',

'Type:
[ ] Clone Information
[X] Feature
Features:
[ ] Start/End
[X] Single Clone Region
[ ] SIL/TIL
[ ] Repeat
Text:',

'Type:
[ ] Clone Information
[X] Feature
Features:
[ ] Start/End
[ ] Single Clone Region
[ ] SIL/TIL
[X] Repeat
Text:
This repeat is of Type {repeat type}. It has a length of {x}bp.',

'Type:
[X] Clone Information
[ ] Feature
Features:
[X] Start/End
[ ] Single Clone Region
[ ] SIL/TIL
[ ] Repeat
Text:
This is the end of sequence clone {clone name}.',

'Type:
[ ] Clone Information
[X] Feature
Features:
[ ] Start/End
[X] Single Clone Region
[X] SIL/TIL
[ ] Repeat
Text:
M13 Short Insert Library of pUC {puc name}.',

'Type:
[ ] Clone Information
[X] Feature
Features:
[ ] Start/End
[X] Single Clone Region
[X] SIL/TIL
[ ] Repeat
Text:
pUC Short Insert Library of pUC {puc name}',

'Type:
[ ] Clone Information
[X] Feature
Features:
[ ] Start/End
[X] Single Clone Region
[X] SIL/TIL
[ ] Repeat
Text:
Transposon Insertion Library of pUC {puc name}',

'Type:
[ ] Clone Information
[X] Feature
Features:
[ ] Start/End
[ ] Single Clone Region
[ ] SIL/TIL
[X] Repeat
Text:
Missing data. {x}bp of repeat Type {repeat type}.',

'Type:
[ ] Clone Information
[X] Feature
Features:
[ ] Start/End
[ ] Single Clone Region
[ ] SIL/TIL
[X] Repeat
Text:
ALU repeat of length {x}bp',

'Type:
[X] Clone Information
[ ] Feature
Features:
[ ] Start/End
[ ] Single Clone Region
[ ] SIL/TIL
[ ] Repeat
Text:
Sequence clone length {x}bp'
]}
```
User acceptance tests
---------------------

 1) Once the page has finished loading *(with any required JavaScript processing)*, I want to see the 3 Clone Information tags before the 7 Feature tags

 2) I want to be able to select the `end` tag, and insert the name `BA123456`, and be able to cut and paste the result into a text editor.