# angular-dom-to-disk
An angular directive to allow arbitrary DOM elements to be downloaded as PNG files

We had a need to download images of various DOM elements.  After some searching we came across the excellent html2canvas library, as well as canvg and ReImg.  When chained together, these allows the drawing of html and svg elements to the canvas, and then exporting that canvas as an image file.  This directive specifically does png's, although ReImg provides a variety of options.  We eventually packed all these steps together into a simple, moderately robust directive for ease of use.


#To Install:
With bower, bower install cultureiq/angular-dom-to-disk

Without bower, clone the git repo

#Some notes:
We make use of the latest stable release of html2canvas - not the currently available alpha version with some bug fixes.  In this release, there is one important problem: tspan elements in svg are not drawn properly (they are doubled up).  This is a known issue and has a simple fix (see R.  Oosterholt's answer at http://stackoverflow.com/questions/29597242/svg-text-attribute-is-doubling-html2canvas ).  Thus the modifed html2canvas.js file included in the main directory.  All other dependencies are included in the bower_components as normal.

#To Use:
Add the attribute ciq-downloadable="filename.extension" to any DOM element.  Will add a small icon on hover to the corner of that element, which will download a png of that element upon clicking.  This is not a completely finalized product - directive does not always work properly when applied to other angular directives.

You may want to change the actual icon - we use ion-ios-download-outline.  Included in the repo is a basic png of a similar icon.  To change, simply swap out the img tag in the definition of jqueryButton (line 44) for whatever you'd like.
