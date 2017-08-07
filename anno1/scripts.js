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

$(document).ready(function(){
    //$("#btnUploadText").click(show_TextFile());
    
    
    $("#btnUpdateTag").click(function(){
        $("#spinner").show("slow", function(){
            //alert("The paragraph is now hidden");
            translateColor_ToTag();
            $("#spinner").hide("slow");
        });
    });
    
    
    
});

function checkFileAvailability_ReturnFileName(x)
{
	//displays the filename of anything uploaded through button "btnUploadText" in label "demo". happens onchange of "btnUploadText"
	//var x = document.getElementById("btnUploadText");
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

function checkFilesName_Similarity()
{
    if (textFileName == "")
    {
        alert("Please Select a Text File.");
        document.getElementById("errorMsg").innerHTML = "Please Select a Text File.";
        return;
    }
    if (pdfFileName == "")
    {
        //alert("Please Select a PDF File.");
        document.getElementById("errorMsg").innerHTML = "Please Select a PDF File.";
        return;
    }
    else if (textFileName != pdfFileName)
    {
        alert("Text File AND PDF File are Different.");
        document.getElementById("errorMsg").innerHTML = "Text File AND PDF File are Different.";
    }    
}

function show_PdfFile() {
    emptyParameters();
    
    //Check Availibality
    var x = document.getElementById("btnUploadPdf");
    pdfFileName = checkFileAvailability_ReturnFileName(x);
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
    var fileExt = x.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    //alert(fileExt);
    if (validExts.indexOf(fileExt) < 0) {
      alert("Invalid file selected, valid files are of " + validExts.toString() + " types.!!! ");
      return false;
    }    
    document.getElementById("pdfSize").innerHTML = getFile_Size(x);
    
    //Show File 
    var file = x.files[0];
    var tmppath = URL.createObjectURL(file);
    //alert(tmppath);
    //web/viewer.html?file=12826.pdf
    document.getElementById('pdfiframe').src = "web/viewer.html?file="+tmppath;
    checkFilesName_Similarity();
}

function getFile_Size(sender)
{
    //alert(sender.files[0].size);
    var _size = sender.files[0].size;
    var fSExt = new Array('Bytes', 'KB', 'MB', 'GB'),
    i=0;
    while(_size>900){_size/=1024;i++;}
    var exactSize = (Math.round(_size*100)/100)+' '+fSExt[i];
    //alert(exactSize);
    return exactSize;
}

function show_TextFile() {
    emptyParameters(); 
    
    //Check Availibality
    var x = document.getElementById("btnUploadText");
    textFileName = checkFileAvailability_ReturnFileName(x);
    if (textFileName == "")
    {
        alert("No File Selected!!!");
        return false;
    }    
    
    //Check Type
    var validExts = new Array(".txt", ".xml");
    var fileExt = x.value;    
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (validExts.indexOf(fileExt) < 0) {
      alert("Invalid file selected, valid files are of " + validExts.toString() + " types.");
      return false;
    }
    //CheckFileSize
    document.getElementById("txtSize").innerHTML = getFile_Size(x);
    
    //Show Text in page 
     $("#spinner").show("slow", function(){
            //alert("The paragraph is now hidden");
            loadFile_AsText();
            $("#spinner").hide("slow");
        });
	
    //check Similarity of pdf and text files
    checkFilesName_Similarity();

}

function loadFile_AsText()
{
	//loads the file into the textareas "content1" and "txaxml"
	var fileToLoad = document.getElementById("btnUploadText").files[0];
	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent)
	{
		textFromFileLoaded = fileLoadedEvent.target.result;
		//converts textfile into array of lines cutting whenever "\n" is in the file
		textByLines = textFromFileLoaded.split('\n');
		//alert(textByLines.length);
		var temp= "";
        //made for any amount of uploaded files
		for (var i = 0; i < textByLines.length; i++)  
		{
			temp = temp + textByLines[i] + '<br>';			
		}
		document.getElementById("content1").innerHTML = temp;
		document.getElementById("txaxml").value = textFromFileLoaded;
		colorizeText_InLable();	
        //callback();        
	};			
	fileReader.readAsText(fileToLoad, "UTF-8");    
}

function colorizeText_InLable()
{// replaces the manually added tags with colortags for content1.
	var textCopy = document.getElementById("txaxml").value;;
	
	while (textCopy.indexOf("<ref>") !==-1)
	{
		textCopy = textCopy.replace("</ref>", "</span>");
		textCopy = textCopy.replace('<ref>', '<span style="background-color: rgb(255, 150, 129);">');
	}
	textCopy = textCopy.split('\n');
	//alert(textCopy.length);
    //Add '<br>' to the end of all lines
	var temp= "";
	for (var i = 0; i < textCopy.length; i++) 
	{
		temp = temp + textCopy[i] + '<br>';		
	}
	document.getElementById("content1").innerHTML = temp;	
}

function show_FileName()
{
	//displays the filename of anything uploaded through button "btnUploadText" in label "demo". happens onchange of "btnUploadText"
	var x = document.getElementById("btnUploadText");
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

function saveText_AsXmlFile()
{
	if (document.getElementById("txaxml").value == "")
    {
        alert('No File Selected');
        return;
    }
    //$("#spinner").show();
    //translateColor_ToTag( function() {$("#spinner").hide()});
    
    $("#spinner").show("slow", function(){
        //alert("The paragraph is now hidden");
        translateColor_ToTag();            

        translateColor_ToTag();
        textByLines[currentLine] = document.getElementById("txaxml").value;

        textFromFileLoaded = textByLines[currentLine];//textByLines.join("\n");
        document.getElementById("txaxml").value = textByLines[currentLine];	

        var textToWrite = textFromFileLoaded;
        var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
        //get file name
        var fullPath = document.getElementById('btnUploadText').value;
        
        if (fullPath) {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var filename = fullPath.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1).split('.')[0];
            }
        }
        var fileNameToSaveAs = filename + ".xml";
        
        download(textToWrite, fileNameToSaveAs); 
        $("#spinner").hide("slow");
    });
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

//change color in plain text and translate to tags in textarea////////
function change_TxtColor(sender) 
{
	// Get Selection
	if (document.getElementById("content1").innerHTML == "")
	{ 
		alert('Please Select a file');
		return;
	}
    
	sel = window.getSelection();
	var selectedtext = sel.toString();	
    //alert(selectedtext.toString());
    if (selectedtext == "")
    {
		alert('Please Select Text');
		return;        
    }
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
}



function translateColor_ToTag()
{
    // replaces the manually added tags with colortags for content1. 
	var textCopy = document.getElementById("content1").innerHTML;
	var openSpanValue = "";

	openSpanValue = '<span style="background-color: rgb(255, 150, 129);">';	
    var re = new RegExp(/<span style="background-color: rgb\(255, 150, 129\);"/g);
    //alert(textCopy.match(re || []).length);
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
		$(sel.anchorNode.parentElement).contents().unwrap();
        document.getElementById("myPopup").classList.toggle("show");
		popUpFlag = false;
	}
	//alert(sel);
}

function RemoveTag1(sender)
{
    var par = getSelectionParentElement().nodeName;
    alert(par);
    sel = window.getSelection();
	//alert(sel.anchorNode.parentElement.toString());
	if(par == "SPAN")
	{
		//alert('yes');
		$(par).contents().unwrap();
		translateColor_ToTag(sender);
	}
	//alert(sel);
}

function RemoveTagOld0(sender)
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
	translateColor_ToTag(sender);	
    
}

///////////////////////////////

 var popUpFlag = false;
 function getSelectionParentElement() {
    var parentEl = null, sel;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            parentEl = sel.getRangeAt(0).commonAncestorContainer;
            if (parentEl.nodeType != 1) {
                parentEl = parentEl.parentNode;
            }
        }
    } else if ( (sel = document.selection) && sel.type != "Control") {
        parentEl = sel.createRange().parentElement();
    }
    return parentEl;
}

$(document).click(function(event){
    
        if (popUpFlag != true)
        {
            document.getElementById("myPopup").classList.add('popuphidden');
            popUpFlag = false;
        }
    
});



$("#content").click(function(event) {
    
    //event.stopPropagation(); // i read that this might be harmful to other functions
    //document.getElementById("myPopup").classList.add('popuphidden');
    //document.getElementById("myPopup").css("visibility", "hidden");
    var par = getSelectionParentElement().nodeName;
    //alert(par);
    var popup = document.getElementById("myPopup");
    if(par == "SPAN")
    {
        $('#myPopup').css('left',event.pageX-85 ); // -14 and -310 account for the top and left border(maybe there is an other way)
        $('#myPopup').css('top',event.pageY-85 );
        $('#myPopup').css('display','inline');     
        $("#myPopup").css("position", "absolute");
        popup.classList.toggle("show");
        if(popUpFlag == false)
        {
            popUpFlag= true;
        }     
    }
    else if(popUpFlag == true){
        popup.classList.toggle("show");
		popUpFlag = false;

    }
});

$("#delbtnno").click(function(event) {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
    popUpFlag = false;
});

$("#pdfiframe").click(function(event) {
    document.getElementById("myPopup").classList.add('popuphidden'); // i read that this might be harmful to other functions
});

$("#content").mouseup(function(){
    
    var popup = document.getElementById("myPopup");
    sel = window.getSelection();
	if (sel != "")
	{        
        if (sel.anchorNode.parentElement.toString()== "[object HTMLSpanElement]")
        {
            //alert(sel);
            $('#myPopup').css('left',event.pageX-85 ); // -14 and -310 account for the top and left border(maybe there is an other way)
            $('#myPopup').css('top',event.pageY-85 );
            $('#myPopup').css('display','inline');     
            $("#myPopup").css("position", "absolute");
            popup.classList.toggle("show");
            if(popUpFlag == false)
            {
                popUpFlag= true;
            }
            
        }
        else if(popUpFlag == true){
            popup.classList.add('popuphidden');
            popUpFlag = false;
        }    
        //alert("Mouse button released.");
    }
});

$("#content1").dblclick(function(event) 
{
    var par = getSelectionParentElement().nodeName;
    var popup = document.getElementById("myPopup");
    
    if(par == "SPAN")
    {
        $('#myPopup').css('left',event.pageX-85 ); // -14 and -310 account for the top and left border(maybe there is an other way)
        $('#myPopup').css('top',event.pageY-85 );
        $('#myPopup').css('display','inline');     
        $("#myPopup").css("position", "absolute");
        popup.classList.toggle("show");
        if(popUpFlag == false)
        {
            popUpFlag= true;
        }     
    }
    else if(popUpFlag == true){
        popup.classList.toggle("show");
		popUpFlag = false;
    }    
});
//////////////////////////////////
