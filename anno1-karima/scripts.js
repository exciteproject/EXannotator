var textFromFileLoaded = "";
var textByLines = "";
var currentLine = 0;

// var reader = new FileReader();
// function readText(that){
			// if(that.files && that.files[0]){
				// var reader = new FileReader();
				// reader.onload = function (e) {  
					// var output=e.target.result;
					// var temp= "";
					
					// textByLines = output.split('\n');															
					// for (var i = 0; i < textByLines.length; i++) 
						// {
							// temp = temp + textByLines[i] + '</br>';
			
						// }											
					// document.getElementById('main').innerHTML= temp;
				// };//end onload()
				// reader.readAsText(that.files[0]);
			// }
// } 

// function saveTextAsFile()
// {
	// var textToWrite = document.getElementById("content1").value;
	// var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	// var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;

	// var downloadLink = document.createElement("a");
	// downloadLink.download = fileNameToSaveAs;
	// downloadLink.innerHTML = "Download File";
	// if (window.webkitURL != null)
	// {
		// // Chrome allows the link to be clicked
		// // without actually adding it to the DOM.
		// downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	// }
	// else
	// {
		// // Firefox requires the link to be added to the DOM
		// // before it can be clicked.
		// downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		// downloadLink.onclick = destroyClickedElement;
		// downloadLink.style.display = "none";
		// document.body.appendChild(downloadLink);
	// }

	// downloadLink.click();
// }


function loadFileAsText()
{
	//loads the file uploaded through "uploadbtn" into the textareas "content1" and "txaxml" and updates the "count" label. happens onchange of uploadbtn
	var fileToLoad = document.getElementById("uploadbtn").files[0];
	
	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent)
	{
		textFromFileLoaded = fileLoadedEvent.target.result;
		
		document.getElementById("content1").innerHTML = textFromFileLoaded;
		//document.getElementById("txaxml").value = textFromFileLoaded;
		
	};			
	fileReader.readAsText(fileToLoad, "UTF-8");
}

// function loadFileAsText()
// {
	// //loads the file uploaded through "uploadbtn" into the textareas "content1" and "txaxml" and updates the "count" label. happens onchange of uploadbtn
	// var fileToLoad = document.getElementById("uploadbtn").files[0];
	
	// var fileReader = new FileReader();
	// fileReader.onload = function(fileLoadedEvent)
	// {
		// textFromFileLoaded = fileLoadedEvent.target.result;
		// textByLines = textFromFileLoaded.split('\n');//converts textfile into array of lines cutting whenever "\n" is in the file
		// //alert(textByLines.length);
		// var temp= "";
		// for (var i = 0; i < textByLines.length; i++) //made for any amount of uploaded files 
		// {
			// temp = temp + textByLines[i] + '</br>';
			
		// }
		// document.getElementById("content1").innerHTML = temp;
		// //document.getElementById("content1").innerHTML = textByLines;
		// document.getElementById("txaxml").value = textFromFileLoaded;
		// //document.getElementById("count").innerHTML = 1 + "/" + textByLines.length ;
		// //colorize();
		
	// };			
	// fileReader.readAsText(fileToLoad, "UTF-8");
// }

function addTagSel(tag, idelm) {
  // http://CoursesWeb.net/javascript/
  var tag_type = new Array('<', '>');       
  var txta = document.getElementById(idelm);
  var start = tag_type[0] + tag + tag_type[1];
  var end = tag_type[0] +'/'+ tag +  tag_type[1];
  var IE = /*@cc_on!@*/false;    

  if (IE) {
    var r = document.selection.createRange();
    var tr = txta.createTextRange();
    var tr2 = tr.duplicate();
    tr2.moveToBookmark(r.getBookmark());
    tr.setEndPoint('EndToStart',tr2);
    var tag_seltxt = start + r.text + end;
    var the_start = txta.value.replace(/[\r\n]/g,'.').indexOf(r.text.replace(/[\r\n]/g,'.'),tr.text.length);
    txta.value = txta.value.substring(0, the_start) + tag_seltxt + txta.value.substring(the_start + tag_seltxt.length, txta.value.length);

    var pos = txta.value.length - end.length;    
    tr.collapse(true);
    tr.moveEnd('character', pos);        
    tr.moveStart('character', pos);        
    tr.select();                 
  }
  else if (txta.selectionStart || txta.selectionEnd == "0") {
    var startPos = txta.selectionStart;
    var endPos = txta.selectionEnd;
    var tag_seltxt = start + txta.value.substring(startPos, endPos) + end;
    txta.value = txta.value.substring(0, startPos) + tag_seltxt + txta.value.substring(endPos, txta.value.length);

   
    txta.setSelectionRange((endPos+start.length),(endPos+start.length));
    txta.focus();
  }
  return tag_seltxt;
}

// function download(text, name, type) {
  // var a = document.getElementById(text);
  // var file = new Blob([text], {type: type});
  // a.href = URL.createObjectURL(file);
  // a.download = name;
// }

function clientSideInclude(id, url) {
  var req = false;
  // For Safari, Firefox, and other non-MS browsers
  if (window.XMLHttpRequest) {
    try {
      req = new XMLHttpRequest();
    	} 
	  catch (e) {
      req = false;
    	}
  } 
	else if (window.ActiveXObject) {
    // For Internet Explorer on Windows
    try {
      req = new ActiveXObject("Msxml2.XMLHTTP");
    	} 
		catch (e) {
      try {
        req = new ActiveXObject("Microsoft.XMLHTTP");
      	} 
			catch (e) {
        	req = false;
      		}
    	}
  }
 var element = document.getElementById(id);
 var str = "";
 if (!element) {
  alert("Bad id " + id + 
   "passed to clientSideInclude." +
   "You need a div or span element " +
   "with this id in your page.");
  return;
 }
  if (req) {
    // Synchronous request, wait till we have it all
    req.open('GET', url, false);
    req.send(null);
    str = req.responseText;
	str=str.replace(/\\&#39;/g,"'");
	str=str.replace(/\\'/g,"'");
	str=str.replace(/\\"/g,'"');
	str=str.replace(/\\\\/g,'\\');
	str=str.replace(/\\0/g,'\0');
  element.innerHTML = str;
  } else {
    element.innerHTML =
   " -- ";
  }
}

//Working with file//////////////////////////////////////////
function checkfileType(sender) {
    var validExts = new Array(".txt", ".xml");
    var fileExt = sender.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
	
    if (validExts.indexOf(fileExt) < 0) {
      alert("Invalid file selected, valid files are of " + validExts.toString() + " types.");
      return false;
    }
    else
	{	
		showfileName(); emptyParameters(); loadFileAsText();
		return true;
	}
}

function showfileName()
{
	//displays the filename of anything uploaded through button "uploadbtn" in label "demo". happens onchange of "uploadbtn"
	var x = document.getElementById("uploadbtn");
	var txt = "";
	if ('files' in x) 
	{
		for (var i = 0; i < x.files.length; i++) //made for any amount of uploaded files 
		{  
			var file = x.files[i];
			if ('name' in file) txt += "File Name : " + file.name;
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
	document.getElementById("demo").innerHTML = txt;
}

function saveTextAsFile()
{
	if (document.getElementById("txaxml").value != "")
	{
		textByLines[currentLine] = document.getElementById("txaxml").value;
	
		textFromFileLoaded = textByLines.join("\n");
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
function emptyParameters()
{
	textFromFileLoaded = "";
	textByLines = "";
	currentLine = 0;
}



function gotoprevLine()
{
	//Saves the current txaxml content into textFromFileLoaded. Cycles backwards through the lines of an uploaded file updating label "count" and "content1"+"txaxml".happens onclick of "prev"
	textByLines[currentLine] = document.getElementById("txaxml").value;
	textFromFileLoaded = textByLines.toString();
	
	
	if(currentLine > 0)	currentLine = currentLine -1;
	else currentLine = textByLines.length-1;
	
	document.getElementById("content1").innerHTML = textByLines[currentLine];
	document.getElementById("txaxml").value = textByLines[currentLine];
	var line = currentLine+1
	document.getElementById("count").innerHTML = line + "/" + textByLines.length;
	colorize();
	//document.getElementById("tatest").value = textFromFileLoaded;
}

function gotonextLine()
{
	//Saves the current txaxml content into textFromFileLoaded. Cycles forwards through the lines of an uploaded file updating label "count" and "content1"+"txaxml". happens onclick of "next"
	textByLines[currentLine] = document.getElementById("txaxml").value;
	textFromFileLoaded = textByLines.toString();
	
	if(textByLines.length-1 > currentLine) 
		currentLine = currentLine +1;	
	else
		currentLine = 0;
	document.getElementById("content1").innerHTML = textByLines[currentLine];
	document.getElementById("txaxml").value = textByLines[currentLine];
	var line = currentLine+1;
	document.getElementById("count").innerHTML = line + "/" + textByLines.length;
	colorize();
	
	//document.getElementById("tatest").value = textFromFileLoaded;
}

//change color in plain text and translate to tags in textarea////////
function changeColor2(sender) 
{
	// Get Selection
	var text1 = document.getElementById("content1").innerHTML;
	if (document.getElementById("content1").innerHTML == "")
	{ 
		alert('Please Select a file');
		return;
	}
	var tagname = sender.value;
	//alert(tagname);
    
	sel = window.getSelection();
	var selectedtext = sel.toString();	
	var text11 = text1.substr(0, text1.indexOf(sel)) ;	
	
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
	if( tagname =="au"){
		document.execCommand("HiliteColor", false, "#ff9681");
	}
	else if(tagname =="btnsurname"){
		text11 = text11 + '<span style="background-color: rgb(255, 135, 48);">';
		var secondplace = text1.indexOf(sel)+ selectedtext.length;
		var text12 = text1.substr(secondplace, text1.length);
		text12 = '</span>' + text12;
		document.getElementById("content1").innerHTML = text11 + selectedtext + text12;
		//document.execCommand("HiliteColor", false, "#ff8730");
	}
	else if(tagname == "btnfirstname"){
		text11 = text11 + '<span style="background-color: rgb(170, 187, 48);">';
		var secondplace = text1.indexOf(sel)+ selectedtext.length;
		var text12 = text1.substr(secondplace, text1.length);
		text12 = '</span>' + text12;
		document.getElementById("content1").innerHTML = text11 + selectedtext + text12;
		//document.execCommand("HiliteColor", false, "#aabb30");
	}
	else if(tagname =="ye"){
		document.execCommand("HiliteColor", false, "#bfb1d5");		
	}
	else if(tagname =="ti"){
		document.execCommand("HiliteColor", false, "#adddcf");
	}
	else if(tagname =="co"){
		document.execCommand("HiliteColor", false, "#abe1fd");
	}
	else if(tagname =="ed"){
		document.execCommand("HiliteColor", false, "#fed88f");
	}
	else if(tagname =="ot"){
		document.execCommand("HiliteColor", false, "#f4858e");
	}
	else{
		document.getElementById("error").innerHTML = " RadioButton broken!";		
	}
    // Set design mode to off
    document.designMode = "off";
	translateColor(sender);
    
}

function translateColor(sender)
{
	// replaces the manually added tags with colortags for content1. 
	//updateText();
	var textCopy =[];
	textCopy[currentLine] = document.getElementById("content1").innerHTML;
	var tagname = sender.value;
	
	var flagsurname = false;
	var flagfirstname = false;
	var openSpanValue = "";
	
	openSpanValue = '<span style="background-color: rgb(255, 135, 48);">';	
	while(textCopy[currentLine].indexOf(openSpanValue) !==-1)
	{
		flagsurname = true;
		var text1 = textCopy[currentLine].substr(0, textCopy[currentLine].indexOf(openSpanValue));
		var text2 = textCopy[currentLine].substr(textCopy[currentLine].indexOf(openSpanValue), textCopy[currentLine].length).replace("</span>", "</surname>");
		textCopy[currentLine] = text1 + text2;
		textCopy[currentLine] = textCopy[currentLine].replace(openSpanValue, '<surname>');
	}
	
	openSpanValue = '<span style="background-color: rgb(170, 187, 48);">';	
	while(textCopy[currentLine].indexOf(openSpanValue) !==-1)
	{
		flagfirstname = true;
		var text1 = textCopy[currentLine].substr(0, textCopy[currentLine].indexOf(openSpanValue));
		var text2 = textCopy[currentLine].substr(textCopy[currentLine].indexOf(openSpanValue), textCopy[currentLine].length).replace("</span>", "</firstname>");
		textCopy[currentLine] = text1 + text2;
		textCopy[currentLine] = textCopy[currentLine].replace(openSpanValue, '<firstname>');
	}

	openSpanValue = '<span style="background-color: rgb(255, 150, 129);">';	
	while(textCopy[currentLine].indexOf(openSpanValue) !==-1)
	{				
		var text1 = textCopy[currentLine].substr(0, textCopy[currentLine].indexOf(openSpanValue));
		var text2 = textCopy[currentLine].substr(textCopy[currentLine].indexOf(openSpanValue), textCopy[currentLine].length).replace("</span>", "</author>");
		textCopy[currentLine] = text1 + text2;
		textCopy[currentLine] = textCopy[currentLine].replace(openSpanValue, '<author>');	
	}	
	
	openSpanValue = '<span style="background-color: rgb(191, 177, 213);">';
	while (textCopy[currentLine].indexOf(openSpanValue) !==-1)
	{
		var t1 = textCopy[currentLine].substr(0, textCopy[currentLine].indexOf(openSpanValue));
		var t2 = textCopy[currentLine].substr(textCopy[currentLine].indexOf(openSpanValue), textCopy[currentLine].length).replace("</span>", "</year>")
		textCopy[currentLine] = t1 + t2;
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
	document.getElementById("txaxml").value = textByLines[currentLine];
	textFromFileLoaded = textByLines.join("");
}

function colorize()
{// replaces the manually added tags with colortags for content1.
	textByLines[currentLine] = document.getElementById("txaxml").value;
	textFromFileLoaded = textByLines.join("");
	var textCopy = textByLines;
	
	while (textCopy[currentLine].indexOf("<author>") !==-1)
	{
		textCopy[currentLine] = textCopy[currentLine].replace("</author>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<author>', '<span style="background-color: rgb(255, 150, 129);">');
	}
	while (textCopy[currentLine].indexOf("<surname>") !==-1)
	{
		textCopy[currentLine] = textCopy[currentLine].replace("</surname>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<surname>', '<span style="background-color: rgb(170, 187, 48);">');
	}
	while (textCopy[currentLine].indexOf("<firstname>") !==-1)
	{
		textCopy[currentLine] = textCopy[currentLine].replace("</firstname>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<firstname>', '<span style="background-color: rgb(170, 187, 48);">');
	}
	while (textCopy[currentLine].indexOf("<year>") !==-1)
	{
		textCopy[currentLine] = textCopy[currentLine].replace("</year>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<year>', '<span style="background-color: rgb(191, 177, 213);">');
	}
	while (textCopy[currentLine].indexOf("<title>") !==-1)
	{
		textCopy[currentLine] = textCopy[currentLine].replace("</title>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<title>', '<span style="background-color: rgb(173, 221, 207);">');
	}
	while (textCopy[currentLine].indexOf("<container>") !==-1)
	{
		textCopy[currentLine] = textCopy[currentLine].replace("</container>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<container>', '<span style="background-color: rgb(171, 225, 253);">');
	}
	while (textCopy[currentLine].indexOf("<editor>") !==-1)
	{
		textCopy[currentLine] = textCopy[currentLine].replace("</editor>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<editor>', '<span style="background-color: rgb(254, 216, 143);">');
	}
	while (textCopy[currentLine].indexOf("<other>") !==-1)
	{
		textCopy[currentLine] = textCopy[currentLine].replace("</other>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<other>', '<span style="background-color: rgb(244, 133, 142);">');
	}
	document.getElementById("content1").innerHTML = textCopy[currentLine];
	
}

//Deleting Tags/////////////////////////////////////////////////////////////////////////////////////////
var textarea1 = "";
function preventDeleteChar(event)
{
	
	var textarea1 = document.getElementById("txaxml").value;
}

function deletechar(event)
{
	alert(textarea1);
	var x = event.which || event.keyCode;
	
	var flag = false;
	if (x==8 || x==46 ) 
	{
		var openTag = "<author>";
		var closeTag = "</author>";
		var closeTag2 = "/author>";
		var openTagRegExp = new RegExp('<author(?!>)|(author>)|<autho>|<authr>|<autor>|<auhor>|<athor>|<uthor>'); //
		var closeTagRegExp = new RegExp('<\/author(?!>)|<\/autho>|<\/authr>|<\/autor>|<\/auhor>|<\/athor>|<\/uthor>');//|(?!<)/author>
		deleteTagsfun(openTag, closeTag, closeTag2, openTagRegExp, closeTagRegExp);
		if (deleteTagsfun(openTag, closeTag, closeTag2, openTagRegExp, closeTagRegExp))
			flag= true;
		
		openTag = "<year>";
		closeTag = "</year>";
		closeTag2 = "/year>";
		openTagRegExp = new RegExp('<year(?!>)|(year>)|<yea>|<yer>|<yar>|<ear>'); //|(?!<)year>
		closeTagRegExp = new RegExp('<\/year(?!>)|<\/yea>|<\/yer>|<\/yar>|<\/ear>');//|(?!<)/year>
		deleteTagsfun(openTag, closeTag, closeTag2, openTagRegExp, closeTagRegExp);
		if (deleteTagsfun(openTag, closeTag, closeTag2, openTagRegExp, closeTagRegExp))
			flag= true;
		
		openTag = "<title>";
		closeTag = "</title>";
		closeTag2 = "/title>";
		openTagRegExp = new RegExp('<title(?!>)|(title>)|<titl>|<tite>|<tile>|<ttle>|<itle>'); //|(?!<)title>
		closeTagRegExp = new RegExp('<\/title(?!>)|<\/titl>|<\/tite>|<\/tile>|<\/ttle>|<\/itle>');//|(?!<)/title>
		deleteTagsfun(openTag, closeTag, closeTag2, openTagRegExp, closeTagRegExp);
		if (deleteTagsfun(openTag, closeTag, closeTag2, openTagRegExp, closeTagRegExp))
			flag= true;
		
		openTag = "<container>";
		closeTag = "</container>";
		closeTag2 = "/container>";
		openTagRegExp = new RegExp('<container(?!>)|(container>)|<containe>|<containr>|<contaier>|<contaner>|<continer>|<conainer>|<cotainer>|<cntainer>|<ontainer>'); //|(?!<)container>;
		closeTagRegExp = new RegExp('<\/container(?!>)|<\/containe>|<\/containr>|<\/contaier>|<\/contaner>|<\/continer>|<\/conainer>|<\/cotainer>|<\/cntainer>|<\/ontainer>');//|(?!<)/container>
		deleteTagsfun(openTag, closeTag, closeTag2, openTagRegExp, closeTagRegExp);
		if (deleteTagsfun(openTag, closeTag, closeTag2, openTagRegExp, closeTagRegExp))
			flag= true;
		
		openTag = "<editor>";
		closeTag = "</editor>";
		closeTag2 = "/editor>";
		openTagRegExp = new RegExp('<editor(?!>)|(editor>)|<edito>|<editr>|<edior>|<edtor>|<eitor>|<ditor>'); //|(?!<)editor>
		closeTagRegExp = new RegExp('<\/editor(?!>)|<\/edito>|<\/editr>|<\/edior>|<\/edtor>|<\/eitor>|<\/ditor>');//|(?!<)/editor>
		deleteTagsfun(openTag, closeTag, closeTag2, openTagRegExp, closeTagRegExp);
		if (deleteTagsfun(openTag, closeTag, closeTag2, openTagRegExp, closeTagRegExp))
			flag= true;
		
		openTag = "<other>";
		closeTag = "</other>";
		closeTag2 = "/other>";
		openTagRegExp = new RegExp('<other(?!>)|(other>)|<othe>|<othr>|<oter>|<oher>|<ther>');//|(?!<)other>
		closeTagRegExp = new RegExp('<\/other(?!>)|<\/othe>|<\/othr>|<\/oter>|<\/oher>|<\/ther>');//|(?!<)/other>
		deleteTagsfun(openTag, closeTag, closeTag2, openTagRegExp, closeTagRegExp);
		if (deleteTagsfun(openTag, closeTag, closeTag2, openTagRegExp, closeTagRegExp))
			flag= true;
	
		openTag = "<surname>";
		closeTag = "</surname>";
		closeTag2 = "/surname>";
		openTagRegExp = new RegExp('<surname(?!>)|(surname>)|<surnam>|<surnae>|<surnme>|<surame>|<suname>|<srname>|<urname>');
		closeTagRegExp = new RegExp('<\/surname(?!>)|<\/surnam>|<\/surnae>|<\/surnme>|<\/surame>|<\/suname>|<\/srname>|<\/urname>');
		deleteTagsfun(openTag, closeTag, closeTag2, openTagRegExp, closeTagRegExp);
		if (deleteTagsfun(openTag, closeTag, closeTag2, openTagRegExp, closeTagRegExp))
			flag= true;
	
		openTag = "<firstname>";
		closeTag = "</firstname>";
		closeTag2 = "/firstname>";
		openTagRegExp = new RegExp('<firstname(?!>)|(firstname>)|<firstnam>|<firstnae>|<firstnme>|<firstame>|<firsname>|<firtname>|<fistname>|<frstname>|<irstname>');
		closeTagRegExp = new RegExp('<\/firstname(?!>)|<\/firstnam>|<\/firstnae>|<\/firstnme>|<\/firstame>|<\/firsname>|<\/firtname>|<\/fistname>|<\/frstname>|<\/irstname>');
		deleteTagsfun(openTag, closeTag, closeTag2, openTagRegExp, closeTagRegExp);
		if (deleteTagsfun(openTag, closeTag, closeTag2, openTagRegExp, closeTagRegExp))
			flag= true;
		
		colorize();
	}else	
	{
		flag= false;
		//else if ( x!= 37 && x!= 38 && x!= 39 && x != 40) 
		//alert(x);
		//alert('Oppsss');
		//event.preventDefault();		
	}
	
	return flag;
}

function deleteTagsfun(openTag, closeTag,closeTag2, openTagRegExp, closeTagRegExp)
{ 
	var textCopy = [];
	textCopy[currentLine] = document.getElementById("txaxml").value;						
	var textCopylength = textCopy[currentLine].length;	
	
	var foundOpenTag = 0;
	for (var i = 0; i < textCopylength; i++) {
		var temp = textCopy[currentLine].substring(i, i+openTag.length);
		if (textCopy[currentLine].substring(i, i+openTag.length) == openTag) {
			foundOpenTag = foundOpenTag + 1;
		}
	}
	
	var foundCloseTag = 0;
	for (var i = 0; i < textCopylength; i++) {
		var temp = textCopy[currentLine].substring(i, i+closeTag);
		if (textCopy[currentLine].substring(i, i+closeTag.length) == closeTag) {
			foundCloseTag = foundCloseTag + 1;
		}
	}
	
	var foundCloseTag2 = 0;
	for (var i = 0; i < textCopylength; i++) {
		var temp = textCopy[currentLine].substring(i, i+closeTag2);
		if (textCopy[currentLine].substring(i, i+closeTag2.length) == closeTag2) {
			foundCloseTag2 = foundCloseTag2 + 1;
		}
	}
	//alert(foundOpenTag);
	
	if (foundOpenTag == foundCloseTag)
		return;
	if (textCopy[currentLine].search(openTagRegExp) !==-1 && foundOpenTag == 0 )
	{
		var authorOpenTagPosition = textCopy[currentLine].search(openTagRegExp);					
		var text1 = textCopy[currentLine].substr(0, authorOpenTagPosition);
		var text2 = textCopy[currentLine].substr(authorOpenTagPosition, textCopylength);
		textCopy[currentLine] = text1 + text2;
		textCopy[currentLine] = textCopy[currentLine].replace(closeTag, "")
		textCopy[currentLine] = textCopy[currentLine].replace(openTagRegExp, "");
		document.getElementById("txaxml").value = textCopy[currentLine];
		return true;
	}
		
	if(textCopy[currentLine].search(closeTagRegExp) !==-1 || foundOpenTag == 2 || foundCloseTag2 == 1)
	{	
		if (foundOpenTag == 2)
		{
			textCopy[currentLine] = textCopy[currentLine].replace(openTag, "");	
			textCopy[currentLine] = textCopy[currentLine].replace(openTag, "");
			textCopy[currentLine] = textCopy[currentLine].replace(closeTagRegExp, "");
			document.getElementById("txaxml").value = textCopy[currentLine];
			return true;			
		} else if( foundOpenTag ==1 && foundCloseTag ==0 && foundCloseTag2 == 1)
		{
			//ye Estesn baraye /author>  benevis http://www.regextester.com/
			var authorCloseTagPosition = textCopy[currentLine].search(closeTag2);
			var text1 = textCopy[currentLine].substr(0, authorCloseTagPosition);
			var text2 = textCopy[currentLine].substr(authorCloseTagPosition, textCopylength);
			textCopy[currentLine] = text1 + text2;
			
			textCopy[currentLine] = textCopy[currentLine].replace(openTag, "");
			textCopy[currentLine] = textCopy[currentLine].replace(closeTag2, "");
			document.getElementById("txaxml").value = textCopy[currentLine];
			return true;
		}else if(textCopy[currentLine].search(closeTagRegExp) !==-1 )
		{
			var authorCloseTagPosition = textCopy[currentLine].search(closeTagRegExp);
			var text1 = textCopy[currentLine].substr(0, authorCloseTagPosition);
			var text2 = textCopy[currentLine].substr(authorCloseTagPosition, textCopylength);
			textCopy[currentLine] = text1 + text2;
			
			textCopy[currentLine] = textCopy[currentLine].replace(openTag, "");
			textCopy[currentLine] = textCopy[currentLine].replace(closeTagRegExp, "");
			document.getElementById("txaxml").value = textCopy[currentLine];
			return true;
		}
		
	}
	return false;
}

//for undrestanding the deleteTags function 
function deleteTags2()
{ 
	var textCopy = [];
	textCopy[currentLine] = document.getElementById("txaxml").value;						
	var textCopylength = textCopy[currentLine].length;	
	var foundOpenTag = 0;
	for (var i = 0; i < textCopylength; i++) {
		var temp = textCopy[currentLine].substring(i, i+8);
		if (textCopy[currentLine].substring(i, i+8) === "<author>") {
			foundOpenTag = foundOpenTag + 1;
		}
	}
	//alert(foundOpenTag);
	
	var authorOpenTag = new RegExp('<author(?!>)|(author>)|<autho>|<authr>|<autor>|<auhor>|<athor>|<uthor>'); //
	if (textCopy[currentLine].search(authorOpenTag) !==-1 && foundOpenTag == 0 )
	{
		var authorOpenTagPosition = textCopy[currentLine].search(authorOpenTag);					
		var text1 = textCopy[currentLine].substr(0, authorOpenTagPosition);
		var text2 = textCopy[currentLine].substr(authorOpenTagPosition, textCopylength);
		textCopy[currentLine] = text1 + text2;
		textCopy[currentLine] = textCopy[currentLine].replace("</author>", "")
		textCopy[currentLine] = textCopy[currentLine].replace(authorOpenTag, "");
		document.getElementById("txaxml").value = textCopy[currentLine];
		return;
	}
	var authorCloseTag = new RegExp('<\/author(?!>)|(\/author>)|<\/autho>|<\/authr>|<\/autor>|<\/auhor>|<\/athor>|<\/uthor>');//|(?!<)/author>
	if(textCopy[currentLine].search(authorCloseTag) !==-1 || foundOpenTag == 2)
	{	
		if (foundOpenTag == 2)
		{
			textCopy[currentLine] = textCopy[currentLine].replace("<author>", "");						
		}else
		{
			var authorCloseTagPosition = textCopy[currentLine].search(authorCloseTag);
			var text1 = textCopy[currentLine].substr(0, authorCloseTagPosition);
			var text2 = textCopy[currentLine].substr(authorCloseTagPosition, textCopylength);
			textCopy[currentLine] = text1 + text2;
		}
		textCopy[currentLine] = textCopy[currentLine].replace("<author>", "");
		textCopy[currentLine] = textCopy[currentLine].replace(authorCloseTag, "");
		document.getElementById("txaxml").value = textCopy[currentLine];
		return;
	}
	
}

function getSelectedText() {
  t = (document.all) ? document.selection.createRange().text : document.getSelection();

  return t;
}

$('body').mouseup(function(){
    var selection = getSelectedText();
    var selection_text = selection.toString();
    
    // How do I add a span around the selected text?
    
    var span = document.createElement('SPAN');
    span.textContent = selection_text;
    
    var range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(span);
});



