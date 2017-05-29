

function fileName()
{//displays the filename of anything uploaded through button "rsf" in label "demo". happens onchange of "rsf"
	if(document.getElementById("rsf").files[0] != null)
	{
		var x = document.getElementById("rsf");
	}
	else
	{
		var x = document.getElementById("trs");
	}
	//var x = document.getElementById("rsf");document.getElementById("rsf").files[0].name
	var txt = "";
	if ('files' in x) 
	{
		/*if (x.files.length == 0) 
		{
			txt = "Select one or more files.";
		} 
		else 
		{*/
			for (var i = 0; i < x.files.length; i++) //made for any amount of uploaded files 
			{  
				//txt += "<br><strong>" + (i+1) + ". file</strong><br>";
				var file = x.files[i];
				if ('name' in file) 
				{
					txt += /*"name: " +*/ "Open: " + file.name + "<br>";
			
				}
				/*if ('size' in file) {
					*txt += "size: " + file.size + " bytes <br>";
				}*/
			}
		//}
	}			 
	else 
	{
		if (x.value == "") 
		{
			txt += "Select one or more files.";
		} 
		else 
		{
			txt += "The files property is not supported by your browser!";
			txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
		}
	}
document.getElementById("demo").innerHTML = txt;
}

var textFromFileLoaded = "";
var textByLines = "";

function loadFileAsText()
{//loads the file uploaded through "rsf" into the textareas "content1" and "ta2" and updates the "count" label. happens onchange of rsf
	if(document.getElementById("rsf").files[0] != null)
	{
		var fileToLoad = document.getElementById("rsf").files[0];
	}
	else
	{
		var fileToLoad = document.getElementById("trs").files[0];
	}
	//var fileToLoad = document.getElementById("rsf").files[0];
	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent)
	{
		textFromFileLoaded = fileLoadedEvent.target.result;
		textByLines = textFromFileLoaded.split('\n');//converts textfile into array of lines cutting whenever "\n" is in the file
		document.getElementById("content1").innerHTML = textByLines[0];
		document.getElementById("ta2").value = textByLines[0];
		document.getElementById("count").innerHTML = 1 + "/" + textByLines.length ;
		colorize();
		
		//document.getElementById("tatest").value = textFromFileLoaded;		
		
	};
				
fileReader.readAsText(fileToLoad, "UTF-8");
}
	
var currentLine = 0;

function prevLine()
{//Saves the current ta2 content into textFromFileLoaded. Cycles backwards through the lines of an uploaded file updating label "count" and "content1"+"ta2".happens onclick of "prev"
	textByLines[currentLine] = document.getElementById("ta2").value;
	textFromFileLoaded = textByLines.toString();
	
	
	if(currentLine > 0)
	{	
		currentLine = currentLine -1;
	}
	else
	{
		currentLine = textByLines.length-1;
	}
	document.getElementById("content1").innerHTML = textByLines[currentLine];
	document.getElementById("ta2").value = textByLines[currentLine];
	var line = currentLine+1
	document.getElementById("count").innerHTML = line + "/" + textByLines.length;
	colorize();
	
	//document.getElementById("tatest").value = textFromFileLoaded;
}

function nextLine()
{//Saves the current ta2 content into textFromFileLoaded. Cycles forwards through the lines of an uploaded file updating label "count" and "content1"+"ta2". happens onclick of "next"
	textByLines[currentLine] = document.getElementById("ta2").value;
	textFromFileLoaded = textByLines.toString();
	
	if(textByLines.length-1 > currentLine)
	{
		currentLine = currentLine +1;	
	}
	else
	{
		currentLine = 0;
	}
	document.getElementById("content1").innerHTML = textByLines[currentLine];
	document.getElementById("ta2").value = textByLines[currentLine];
	var line = currentLine+1;
	document.getElementById("count").innerHTML = line + "/" + textByLines.length;
	colorize();
	
	//document.getElementById("tatest").value = textFromFileLoaded;
}

function updateText()
{
	textByLines[currentLine] = document.getElementById("ta2").value;
	textFromFileLoaded = textByLines.join("");
	document.getElementById("content1").innerHTML = textByLines[currentLine];
	document.getElementById("ta2").value = textByLines[currentLine];
}

function translateColor()
{// replaces the manually added tags with colortags for content1.maybe small loops are faster than this big one
	//updateText();
	textByLines[currentLine] = document.getElementById("content1").innerHTML;
	
	var textCopy = textByLines;
	while(textCopy[currentLine].indexOf('<span style="background-color: rgb(255, 150, 129);">') !==-1)
	{
		textCopy[currentLine] = textCopy[currentLine].substr(0, textCopy[currentLine].indexOf('<span style="background-color: rgb(255, 150, 129);">')) + textCopy[currentLine].substr(textCopy[currentLine].indexOf('<span style="background-color: rgb(255, 150, 129);">'), textCopy[currentLine].length).replace("</span>", "</author>");
		textCopy[currentLine] = textCopy[currentLine].replace('<span style="background-color: rgb(255, 150, 129);">', '<author>');
	}
	while (textCopy[currentLine].indexOf('<span style="background-color: rgb(191, 177, 213);">') !==-1)
	{
		textCopy[currentLine] = textCopy[currentLine].substr(0, textCopy[currentLine].indexOf('<span style="background-color: rgb(191, 177, 213);">')) + textCopy[currentLine].substr(textCopy[currentLine].indexOf('<span style="background-color: rgb(191, 177, 213);">'), textCopy[currentLine].length).replace("</span>", "</year>");
		textCopy[currentLine] = textCopy[currentLine].replace('<span style="background-color: rgb(191, 177, 213);">', '<year>');
	}
	while (textCopy[currentLine].indexOf('<span style="background-color: rgb(173, 221, 207);">') !==-1)
	{
		textCopy[currentLine] = textCopy[currentLine].substr(0, textCopy[currentLine].indexOf('<span style="background-color: rgb(173, 221, 207);">')) + textCopy[currentLine].substr(textCopy[currentLine].indexOf('<span style="background-color: rgb(173, 221, 207);">'), textCopy[currentLine].length).replace("</span>", "</title>");
		textCopy[currentLine] = textCopy[currentLine].replace('<span style="background-color: rgb(173, 221, 207);">', '<title>');
	}
	while (textCopy[currentLine].indexOf('<span style="background-color: rgb(171, 225, 253);">') !==-1)
	{
		textCopy[currentLine] = textCopy[currentLine].substr(0, textCopy[currentLine].indexOf('<span style="background-color: rgb(171, 225, 253);">')) + textCopy[currentLine].substr(textCopy[currentLine].indexOf('<span style="background-color: rgb(171, 225, 253);">'), textCopy[currentLine].length).replace("</span>", "</container>");
		textCopy[currentLine] = textCopy[currentLine].replace('<span style="background-color: rgb(171, 225, 253);">', '<container>');
	}
	while (textCopy[currentLine].indexOf('<span style="background-color: rgb(254, 216, 143);">') !==-1)
	{
		textCopy[currentLine] = textCopy[currentLine].substr(0, textCopy[currentLine].indexOf('<span style="background-color: rgb(254, 216, 143);">')) + textCopy[currentLine].substr(textCopy[currentLine].indexOf('<span style="background-color: rgb(254, 216, 143);">'), textCopy[currentLine].length).replace("</span>", "</editor>");
		textCopy[currentLine] = textCopy[currentLine].replace('<span style="background-color: rgb(254, 216, 143);">', '<editor>');
	}
	while (textCopy[currentLine].indexOf('<span style="background-color: rgb(244, 133, 142);">') !==-1)
	{
		textCopy[currentLine] = textCopy[currentLine].substr(0, textCopy[currentLine].indexOf('<span style="background-color: rgb(244, 133, 142);">')) + textCopy[currentLine].substr(textCopy[currentLine].indexOf('<span style="background-color: rgb(244, 133, 142);">'), textCopy[currentLine].length).replace("</span>", "</other>");
		textCopy[currentLine] = textCopy[currentLine].replace('<span style="background-color: rgb(244, 133, 142);">', '<other>');
	}
	textByLines[currentLine] = textCopy[currentLine];
	document.getElementById("ta2").value = textByLines[currentLine];
	textFromFileLoaded = textByLines.join("");
}

function colorize()
{// replaces the manually added tags with colortags for content1.maybe small loops are faster than this big one
	updateText();
	var textCopy = textByLines;
	while(textCopy[currentLine].indexOf("<author>") !==-1 || textCopy[currentLine].indexOf("<year>") !==-1 || textCopy[currentLine].indexOf("<title>") !==-1 || textCopy[currentLine].indexOf("<container>") !==-1 || textCopy[currentLine].indexOf("<editor>") !==-1 || textCopy[currentLine].indexOf("<other>") !==-1)
	{
	if (textCopy[currentLine].indexOf("<author>") !==-1)
	{
		textCopy[currentLine] = textCopy[currentLine].replace("</author>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<author>', '<span style="background-color: rgb(255, 150, 129);">');
	}
	if (textCopy[currentLine].indexOf("<year>") !==-1)
	{
		textCopy[currentLine] = textCopy[currentLine].replace("</year>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<year>', '<span style="background-color: rgb(191, 177, 213);">');
	}
	if (textCopy[currentLine].indexOf("<title>") !==-1)
	{
		textCopy[currentLine] = textCopy[currentLine].replace("</title>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<title>', '<span style="background-color: rgb(173, 221, 207);">');
	}
	if (textCopy[currentLine].indexOf("<container>") !==-1)
	{
		textCopy[currentLine] = textCopy[currentLine].replace("</container>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<container>', '<span style="background-color: rgb(171, 225, 253);">');
	}
	if (textCopy[currentLine].indexOf("<editor>") !==-1)
	{
		textCopy[currentLine] = textCopy[currentLine].replace("</editor>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<editor>', '<span style="background-color: rgb(254, 216, 143);">');
	}
	if (textCopy[currentLine].indexOf("<other>") !==-1)
	{
		textCopy[currentLine] = textCopy[currentLine].replace("</other>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<other>', '<span style="background-color: rgb(244, 133, 142);">');
	}
	document.getElementById("content1").innerHTML = textCopy[currentLine];
	}
}

function addTag()
{//happens when "add a new tag" button is clicked. Resolves the radiobutton.
	if(document.getElementById("au").checked){
		//insertAtCursor2(document.getElementById("content1"), "<author>", "</author>");
		insertAtCursor(document.getElementById("ta2"), "<author>", "</author>");
	}
	else if(document.getElementById("ye").checked){
		//insertAtCursor(document.getElementById("content1"), "<year>", "</year>");
		insertAtCursor(document.getElementById("ta2"), "<year>", "</year>");		
	}
	else if(document.getElementById("ti").checked){
		//insertAtCursor(document.getElementById("content1"), "<title>", "</title>");
		insertAtCursor(document.getElementById("ta2"), "<title>", "</title>");
	}
	else if(document.getElementById("co").checked){
		//insertAtCursor(document.getElementById("content1"), "<container>", "</container>");
		insertAtCursor(document.getElementById("ta2"), "<container>", "</container>");
	}
	else if(document.getElementById("ed").checked){
		//insertAtCursor(document.getElementById("content1"), "<editor>", "</editor>");
		insertAtCursor(document.getElementById("ta2"), "<editor>", "</editor>");
	}
	else if(document.getElementById("ot").checked){
		//insertAtCursor(document.getElementById("content1"), "<other>", "</other>");
		insertAtCursor(document.getElementById("ta2"), "<other>", "</other>");
	}
	else{
		document.getElementById("error").innerHTML = "Error!";
	}
	colorize();
}

function saveTextAsFile()
{
	updateText();
	
    var textToWrite = textFromFileLoaded;
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    
	/*if(document.getElementById("rsf").files[0].name)
	{
		var fileNameToSaveAs = "tagged" + document.getElementById("rsf").files[0].name.slice(0,-4) + ".xml";
	}
	else if(document.getElementById("trs").files[0].name)
	{
		var fileNameToSaveAs = "tagged" + document.getElementById("trs").files[0].name.slice(0,-4) + ".xml";
		//substr(0, file.lastIndexOf(".")) + ".htm"
	}
	else
	{*/
		var fileNameToSaveAs = "references.xml";
	//}
    var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
         // Chrome allows the link to be clicked
         // without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
         // Firefox requires the link to be added to the DOM
         // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }
      
    downloadLink.click();
}

function insertAtCursor(myField, myValueBefore, myValueAfter) 
{//submit object, text, text. Adds the texts in front and after the selected text

    if (document.selection) 
	{
		myField.focus();
        document.selection.createRange().text = myValueBefore + document.selection.createRange().text + myValueAfter;
	}
	else if (myField.selectionStart || myField.selectionStart == '0')
	{
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos) + myValueBefore + myField.value.substring(startPos, endPos) + myValueAfter + myField.value.substring(endPos, myField.value.length);
	}
     
}

function insertAtCursor2(myField, myValueBefore, myValueAfter) 
{//submit object, text, text. Adds the texts in front and after the selected text

    if (document.selection) 
	{
		myField.focus();
        document.selection.createRange().text = myValueBefore + document.selection.createRange().text + myValueAfter;
	}
	else if (myField.selectionStart || myField.selectionStart == '0')
	{
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.innerHTML = myField.innerHTML.substring(0, startPos) + myValueBefore + myField.innerHTML.substring(startPos, endPos) + myValueAfter + myField.innerHTML.substring(endPos, myField.innerHTML.length);
	}
     
}

function changeColor() {
        // Get Selection
    sel = window.getSelection();
    if (sel.rangeCount && sel.getRangeAt) {
        range = sel.getRangeAt(0);
    }
    // Set design mode to on
    document.designMode = "on";
    if (range) {
        sel.removeAllRanges();
        sel.addRange(range);
    }
    // Colorize text
	
	if(document.getElementById("au").checked){
		document.execCommand("HiliteColor", false, "#ff9681");
	}
	else if(document.getElementById("ye").checked){
		document.execCommand("HiliteColor", false, "#bfb1d5");		
	}
	else if(document.getElementById("ti").checked){
		document.execCommand("HiliteColor", false, "#adddcf");
	}
	else if(document.getElementById("co").checked){
		document.execCommand("HiliteColor", false, "#abe1fd");
	}
	else if(document.getElementById("ed").checked){
		document.execCommand("HiliteColor", false, "#fed88f");
	}
	else if(document.getElementById("ot").checked){
		document.execCommand("HiliteColor", false, "#f4858e");
	}
	else{
		document.getElementById("error").innerHTML = " RadioButton broken!";
		
	}	
    // Set design mode to off
    document.designMode = "off";
	translateColor();
}

//experiments below
/*function colorize(){
	sel = window.getSelection();
    if (sel.rangeCount && sel.getRangeAt) {
        range = sel.getRangeAt(0);
    }
    // Set design mode to on
    document.designMode = "on";
    if (range) {
        sel.removeAllRanges();
        sel.addRange(range);
    }
    // Colorize text
    document.execCommand("ForeColor", false, "red");
    // Set design mode to off
    document.designMode = "off";
}

function getSelectedText(textComponent)
{
    var selectedText = '';
    if (document.selection != undefined) { // IE
        textComponent.focus();
        var sel = document.selection.createRange();
        selectedText = sel.text;
    } else if (textComponent.selectionStart != undefined) { // other browsers
        var startPos = textComponent.selectionStart;
        var endPos = textComponent.selectionEnd;
        selectedText = textComponent.value.substring(startPos, endPos)
    }
    return selectedText;
}
*/
	


/*function colour(colour) {
  var selection= window.getSelection();
  if (selection.toString()!=="") {
    var range = selection.getRangeAt(0);
    var span = document.createElement("span");
    span.className = colour;
    span.innerHTML = range.toString();
    range.deleteContents();
    range.insertNode(span);
  }
}*/

