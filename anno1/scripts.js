var textFromFileLoaded = "";
var textByLines = "";
var currentLine = 0;
var pdfFileName = "";
var textFileName = "";

function emptyParameters()
{
	textFromFileLoaded = "";
	textByLines = "";
	currentLine = 0;
    document.getElementById("errorMsg").innerHTML = "";
    //document.getElementById("content1").innerHTML = "";
	//document.getElementById("txaxml").value = "";
    //pdfFileName = "";
    //textFileName = ""
}

function CheckFileAvailabilityReturnName(x)
{
	//displays the filename of anything uploaded through button "uploadbtn" in label "demo". happens onchange of "uploadbtn"
	//var x = document.getElementById("uploadbtn");
	var filename = "";
	var txt = "";
	if ('files' in x) 
	{
		for (var i = 0; i < x.files.length; i++) //made for any amount of uploaded files 
		{  
			var file = x.files[i];
			if ('name' in file) txt += "File Name : " + file.name;
			filename =  file.name;
		}
	}	
	else 
	{
		if (x.value == "")  txt += "Select one or more files.";
		else {
			txt += "The files property is not supported by your browser!";
			txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
		}
        alert(txt);
	}	
	return filename.split('.')[0];
}

function checkSimilarity()
{
    if (textFileName == "")
    {
        alert("Please Select a Text File.");
        document.getElementById("errorMsg").innerHTML = "Please Select a Text File.";
        return;
    }
    if (pdfFileName == "")
    {
        alert("Please Select a PDF File.");
        document.getElementById("errorMsg").innerHTML = "Please Select a PDF File.";
        return;
    }
    else if (textFileName != pdfFileName)
    {
        alert("Text File AND PDF File are Different.");
        document.getElementById("errorMsg").innerHTML = "Text File AND PDF File are Different.";
    }    
}

function assignPdf(sender) {
    emptyParameters();
    
    //Check Availibality
    var x = document.getElementById("file-input");
    pdfFileName = CheckFileAvailabilityReturnName(x);
    //alert(pdfFileName);
    if (pdfFileName == "")
    {
        alert("No File Selected!!!");
        //document.getElementById('pdfiframe').src ="";
        //document.getElementById("content1").innerHTML = "";
        //document.getElementById("txaxml").value = "";
        return false;
    }
    
    //Check Type
    var validExts = new Array(".pdf");
    var fileExt = sender.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    //alert(fileExt);
    if (validExts.indexOf(fileExt) < 0) {
      alert("Invalid file selected, valid files are of " + validExts.toString() + " types.!!! ");
      return false;
    }    
    
    //Show File 
    var file = x.files[0];
    var tmppath = URL.createObjectURL(file);
    //alert(tmppath);
    //web/viewer.html?file=12826.pdf
    document.getElementById('pdfiframe').src = "web/viewer.html?file="+tmppath;
    checkSimilarity();
}


function checkfileType(sender) {
    emptyParameters(); 
    //Check Availibality
    var x = document.getElementById("uploadbtn");
    textFileName = CheckFileAvailabilityReturnName(x);
    //alert(textFileName);
    if (textFileName == "")
    {
        alert("No File Selected!!!");
        return false;
    }
    
    //Check Type
    var validExts = new Array(".txt", ".xml");
    var fileExt = sender.value;    
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    //alert(fileExt);
    if (validExts.indexOf(fileExt) < 0) {
      alert("Invalid file selected, valid files are of " + validExts.toString() + " types.");
      return false;
    }
    //var filename = showfileName(); 
    //showpdffile(filename);		
    loadFileAsText();
	checkSimilarity();
}

function loadFileAsText()
{
	//loads the file uploaded through "uploadbtn" into the textareas "content1" and "txaxml" and updates the "count" label. happens onchange of uploadbtn
	var fileToLoad = document.getElementById("uploadbtn").files[0];
	
	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent)
	{
		textFromFileLoaded = fileLoadedEvent.target.result;
		
		textByLines = textFromFileLoaded.split('\n');//converts textfile into array of lines cutting whenever "\n" is in the file
		//alert(textByLines.length);
		var temp= "";
		for (var i = 0; i < textByLines.length; i++) //made for any amount of uploaded files 
		{
			temp = temp + textByLines[i] + '<br>';
			
		}
		document.getElementById("content1").innerHTML = temp;
		document.getElementById("txaxml").value = textFromFileLoaded;
		//document.getElementById("count").innerHTML = 1 + "/" + textByLines.length ;
		colorize();
		
	};			
	fileReader.readAsText(fileToLoad, "UTF-8");
}

function showpdffile(txt)
{
	var loc = location.pathname;
	var dir = loc.substring(0, loc.lastIndexOf('/'));
	var filename = txt.split('.')[0];
	var srcpdf = dir + "/PDF/" + filename + ".pdf";
	//alert(srcpdf);
	document.getElementById('pdfiframe').src = srcpdf;
	
}



function showfileName()
{
	//displays the filename of anything uploaded through button "uploadbtn" in label "demo". happens onchange of "uploadbtn"
	var x = document.getElementById("uploadbtn");
	var filename = "";
	var txt = "";
	if ('files' in x) 
	{
		for (var i = 0; i < x.files.length; i++) //made for any amount of uploaded files 
		{  
			var file = x.files[i];
			if ('name' in file) txt += "File Name : " + file.name;
			filename =  file.name;
		}
	}	
	else 
	{
		if (x.value == "")  txt += "Select one or more files.";
		else {
			txt += "The files property is not supported by your browser!";
			txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
		}
	}
	//
	return filename;
}

function saveTextAsFile()
{
	if (document.getElementById("txaxml").value != "")
	{
		textByLines[currentLine] = document.getElementById("txaxml").value;
	
		textFromFileLoaded = textByLines[currentLine];//textByLines.join("\n");
		document.getElementById("txaxml").value = textByLines[currentLine];	
	
		var textToWrite = textFromFileLoaded;
		var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
		//get file name
		var fullPath = document.getElementById('uploadbtn').value;
		if (fullPath) {
			var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
			var filename = fullPath.substring(startIndex);
			if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
				filename = filename.substring(1).split('.')[0];
			}
		}
		var fileNameToSaveAs = filename + ".xml";
		
		download(textToWrite, fileNameToSaveAs);
	}else
	alert('No File Selected');
}

function download(data, filename) {
    var file = new Blob([data], {type:'text/xml'});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

//Navigate between Lines/////////////////////////////////////


//change color in plain text and translate to tags in textarea////////
function changeColor2(sender) 
{
	// Get Selection
	if (document.getElementById("content1").innerHTML == "")
	{ 
		alert('Please Select a file');
		return;
	}
    
	sel = window.getSelection();
	var selectedtext = sel.toString();	
    alert(selectedtext.toString());
    if (sel.rangeCount && sel.getRangeAt) {
        range = sel.getRangeAt(0);
    }
    // Set design mode to on
    document.designMode = "on";
    if (range) {
        sel.removeAllRanges();
        sel.addRange(range);
    }
    //Colorize text	
	document.execCommand("HiliteColor", false, "#ff9681");
    // Set design mode to off
    document.designMode = "off";
	translateColor(sender);
    
}

function translateColor(sender)
{
	// replaces the manually added tags with colortags for content1. 
	//updateText();
	var textCopy = document.getElementById("content1").innerHTML;
	var tagname = sender.value;
	
	var flagsurname = false;
	var flagfirstname = false;
	var openSpanValue = "";

	openSpanValue = '<span style="background-color: rgb(255, 150, 129);">';	
	while(textCopy.indexOf(openSpanValue) !==-1)
	{				
		var text1 = textCopy.substr(0, textCopy.indexOf(openSpanValue));
		var text2 = textCopy.substr(textCopy.indexOf(openSpanValue), textCopy.length).replace("</span>", "</ref>");
		textCopy = text1 + text2;
		textCopy = textCopy.replace(openSpanValue, '<ref>');	
	}

	openSpanValue = '<br>';
	var i = 0
	while(textCopy.indexOf(openSpanValue) !==-1)
	{
		i++;
		textCopy = textCopy.replace(openSpanValue, '\n');	
	}	
	//alert(i);
	document.getElementById("txaxml").value = textCopy;
}

function colorize()
{// replaces the manually added tags with colortags for content1.
	var textCopy = document.getElementById("txaxml").value;;
	
	while (textCopy.indexOf("<ref>") !==-1)
	{
		textCopy = textCopy.replace("</ref>", "</span>");
		textCopy = textCopy.replace('<ref>', '<span style="background-color: rgb(255, 150, 129);">');
	}
	textCopy = textCopy.split('\n');
	//alert(textCopy.length);
	var temp= "";
	for (var i = 0; i < textCopy.length; i++) //made for any amount of uploaded files 
	{
		temp = temp + textCopy[i] + '<br>';		
	}
	document.getElementById("content1").innerHTML = temp;
	//document.getElementById("content1").innerHTML = textCopy;
	
}
function RemoveTag(sender)
{
    sel = window.getSelection();
	if (sel == "")
	{
		alert('No Selection');
		return;
	}
	//alert(sel.anchorNode.parentElement.toString());
	if (sel.anchorNode.parentElement.toString()== "[object HTMLSpanElement]")
	{
		//alert('yes');
		$(sel.anchorNode.parentElement).contents().unwrap();
		translateColor(sender);
	}
	//alert(sel);
}

function RemoveTagOld(sender)
{

	sel = window.getSelection();
	var selectedtext = sel.toString();	
	
    if (sel.rangeCount && sel.getRangeAt) {
        range = sel.getRangeAt(0);
    }
    // Set design mode to on
    document.designMode = "on";
    if (range) {
        sel.removeAllRanges();
        sel.addRange(range);
    }
	document.execCommand("removeFormat", false, "foreColor");
	document.designMode = "off";
	translateColor(sender);	
}

///////////////////////////////

