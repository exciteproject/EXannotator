let OriginalLineArray_forDemo;
let arrayOfLines;
let currentLine = 0;
let lastSessionFlag = false;
let filename;
let fileExt;
const serverip = 'http://141.26.208.55';
const webserviceUrl = serverip + ":8080";

function emptyParameters() {
	//this parameter should be empty At each start 
	arrayOfLines = [];
	OriginalLineArray_forDemo = [];
	currentLine = 0;
	filename = "";
	fileExt ="";
	document.getElementById("txaxml").value = "";
	document.getElementById("lblcontentForDemo").innerHTML = "";
	document.getElementById("lblColoredText").innerHTML = "";
	document.getElementById("demo").innerHTML = "";
	document.getElementById("lblerror").innerHTML = "";
}

$(document).ready(function () {

	if (typeof (Storage) !== "undefined") {
		// allrefs storage come from Annotatortool 1
		var allrefs = localStorage.getItem("allrefs");
		// alert(allrefs);
		if (allrefs != 'null') {
			localStorage.setItem("anno2lastxmltext", allrefs);
			lastSessionFlag = false;
			// if allrefs is not empty load it
			loadSession();
			// after loading localStorage set it to empty
			localStorage.setItem("allrefs", 'null');
		}
	}

	//to prevent select text in "Original Refrence String Area" first lable in the page 
	$('#lblcontentForDemo').attr('unselectable', 'on')
		.css({
			'-moz-user-select': '-moz-none',
			'-moz-user-select': 'none',
			'-o-user-select': 'none',
			'-khtml-user-select': 'none', /* you could also put this in a class */
			'-webkit-user-select': 'none',/* and add the CSS class here instead */
			'-ms-user-select': 'none',
			'user-select': 'none'
		}).bind('selectstart', function () { return false; });

	$("#btnback").click(function () {
		window.location.href = serverip + ':8081/annohome';
	});

	$("#btnToRefanno").click(function(){
		if (window.location.href.includes("localhost")) {
			window.location.href = "../EXRef-Identifier";
		} else {
			window.location.href = "../refanno";
		}
	})


	// help show 
	$("#btnhelp").click(function () {
		$("#light").show("slow");
		$("#fade").show("slow");
		// document.getElementById("light").style.display = 'block';
		// document.getElementById("fade").style.display = 'block'
	});

	$("#btnClose").click(function () {
		$("#light").hide("slow");
		$("#fade").hide("slow");
		// document.getElementById('light').style.display='none';
		// document.getElementById('fade').style.display='none';
	});

	//load lasst saved localstorage
	function loadSession() {
		if (typeof (Storage) !== "undefined") {
			const lastxmltext = localStorage.getItem("anno2lastxmltext");
			if (lastxmltext != "") {
				//1 load storage to file
				const fileToLoad = new Blob([lastxmltext], { type: 'text/xml' });
				// we dont need cermine
				document.getElementById("chbCermine").checked = false;
				if (localStorage.getItem("anno2lastoroginalreftext") != "") {
					lastSessionFlag = true;
				}
				//3 load file name
				if (localStorage.getItem("anno2filename") != "") {
					let filenparts = localStorage.getItem("anno2filename").split(".");
					filename = filenparts.slice(0,-1).join(".");
					fileExt = filenparts.pop();
				}
				loadFileAsText(fileToLoad);
			} else
				alert("Sorry! No Data To Load..");
		}
		else {
			alert("Sorry! No Web Storage support..");
		}
	}

	$("#btnLoadSession").click(function () {
		loadSession();
	});

	//reloade the page and save the changes
	$("#btnReload").click(function () {
		savelocalStorage();
		location.reload();
	});
});

function savelocalStorage() {
	//1 save xmltext
	var textforSave = getxaxmlText();
	if (textforSave != "")
		localStorage.setItem("anno2lastxmltext", textforSave);
	//2 save lastoroginalreftext
	var lastoroginalreftext = "";
	if (OriginalLineArray_forDemo != "") {
		lastoroginalreftext = OriginalLineArray_forDemo.join("\n");
		localStorage.setItem("anno2lastoroginalreftext", lastoroginalreftext);
	}
	//3 save filename
	if (filename != "") {
		localStorage.setItem("anno2filename", `${filename}.${fileExt}`);
	}
}

//saved the last changes before closeing
window.onbeforeunload = function () {
	savelocalStorage();
}

//load File functions//////////////////////////////////////////
function checkFileAvailability_ReturnFileName(x) {
	//check FileAvailability and ReturnFileName
	var filename = [];
	var txt = "";
	if ('files' in x) {
		for (var i = 0; i < x.files.length; i++) {
			var file = x.files[i];
			if ('name' in file) txt += "File Name : " + file.name;
			filename.push(file.name);
		}
	}
	else {
		if (x.value == "") txt += "Select one or more files.";
		else {
			// If the browser does not support the files property, it will return the path of the selected file instead.
			txt += "The files property is not supported by your browser!";
			txt += "<br>The path of the selected file: " + x.value;
		}
		alert(txt);
		filename = 'error';
	}
	return filename;
}

function checke_file_type(filenames) {
	var arrayLength = filenames.length;
	var validExts = ["txt", "xml", "csv", "tsv"];
	for (var i = 0; i < arrayLength; i++) {
		fileExt = filenames[i].split('.').pop();
		if (!validExts.includes(fileExt)) {
			alert(fileExt + "is invalid, valid file types are " + validExts.toString() + " .");
			return false;
		}
		if (fileExt === 'xml') {
			document.getElementById("chbCermine").checked = false;
		}
	}
	return true;
}

// return file size
function getFile_Size(sender) {
	var _size = sender.files[0].size;
	var fSExt = ['Bytes', 'KB', 'MB', 'GB'],
		i = 0;
	while (_size > 900) { _size /= 1024; i++; }
	var exactSize = (Math.round(_size * 100) / 100) + ' ' + fSExt[i];
	return exactSize;
}

function checkfile() {
	var xfile = document.getElementById("btnUploadfile");
	//check File Availability
	var filenamesarray = checkFileAvailability_ReturnFileName(xfile);
	if (filenamesarray == 'error')
		return false;
	//check text file type. only ".txt", ".xml" are valid
	if (!checke_file_type(filenamesarray))
		return false;
	emptyParameters();
	var fileToLoad = xfile.files[0];
	// filename is a public var
	filename = filenamesarray[0].split('.').slice(0,-1).join(".");
	fileExt = filenamesarray[0].split('.').pop();
	// set this flag false because we are reading from file not from storage
	lastSessionFlag = false
	loadFileAsText(fileToLoad);
	return true;
}

function loadFileAsText(fileToLoad) {
	// loads the file uploaded through "btnUploadfile" into the "lblColoredText" and "txaxml"  and "lblcontentForDemo" 
	const fileReader = new FileReader();
	fileReader.onload = function (fileLoadedEvent) {
		let text = fileLoadedEvent.target.result;

		// monkey-patch string prototype
		if (String.prototype.replaceAll === undefined ) {
			String.prototype.replaceAll = function (search, replacement) {
				this.replace(new RegExp(search, 'g'), replacement);
			};
		}

		//converts textfile into array of lines cutting whenever "\n" is in the file
		arrayOfLines = text
			// replace author tags (will be re-added later)
			.replaceAll('<author>', '')
			.replaceAll('</author>', '')
			.replaceAll('\r',"")
			.split('\n');

		if (fileExt === "xml" && arrayOfLines[0].includes("<?xml ")) {
			// if xml, remove declaration and top node
			arrayOfLines.splice(0,2);
			arrayOfLines.splice(-1,1);

		} else if (["tsv", "csv"].includes(fileExt)) {
			// if refanno output
			arrayOfLines = arrayOfLines
				// remove layout info
				.map(line => line.split('\t').slice(0,-5).join('\t'))
				// replace line breaks by spaces
				.join(' ')
				// keep only the <ref>...</ref> fragments
				.match(/\<ref>.*?<\/ref>/g);
			if (!arrayOfLines) {
				alert("Data does not contain any reference markup.");
				return false;
			}
		} else if (fileExt == "txt") {
			// if txt, it can be raw reference data only or <ref>-annotated without layout info
			let tmp = arrayOfLines
				// replace line breaks by spaces
				.join(' ')
				// keep only the <ref>...</ref> fragments
				.match(/\<ref>.*?<\/ref>/g)
			if (tmp) {
				arrayOfLines=tmp
			}
		}

		// remove <ref> tags, will be re-added later
		arrayOfLines = arrayOfLines.map(line => line.replaceAll('<ref>','').replaceAll('</ref>',''))

		// chek if it is reading from file or storage
		if (lastSessionFlag && localStorage.getItem("anno2lastoroginalreftext")) {
			// get from localStorage
			lastSessionFlag = false;
			OriginalLineArray_forDemo = localStorage.getItem("anno2lastoroginalreftext").split('\n');
		} else {
			// get from file
			lastSessionFlag = false;
			OriginalLineArray_forDemo = text.split('\n');
		}
		document.getElementById("demo").innerHTML = `${filename}: ${arrayOfLines.length} references`;
		// if chbCermine is checked cermein webservice is called
		if ($('#chbCermine').is(":checked")) {
			$("#spinner").show("slow", function () {
				for (i = 1; i < arrayOfLines.length; i++) {
					// replace all items in arrayOfLines with new content
					arrayOfLines[i] = AnnotateText_ByCallingCERMINE(arrayOfLines[i], i);
				}
				$("#spinner").hide("slow");
			});
			arrayOfLines[0] = AnnotateText_ByCallingCERMINE(arrayOfLines[0], 0);
		}
		// display in page
		document.getElementById("lblcontentForDemo").innerHTML = arrayOfLines[0];
		document.getElementById("lblColoredText").innerHTML = arrayOfLines[0];
		document.getElementById("txaxml").value = arrayOfLines[0];
		// and updates the "count" label.
		document.getElementById("count").innerHTML = 1 + "/" + arrayOfLines.length;

		Translate_tags_to_color_span();
		Translate_color_span_to_tag();
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}

// functions for calling webservice function
var annotatorresult = "";
function AjaxFailed(result) { alert(result.status + '' + result.statusText); }
function callAnnotatorWebService(a) {
	// alert('annotatorresult')
	$.ajax({
		type: "GET",
		async: false,
		url: webserviceUrl + '/webservice/webapi/myresource/annotate2/' + a,// a is ref string
		contentType: "text/plain; charset=utf-8",
		dataType: "text",
		processData: true,
		success: function (result) { annotatorresult = result; },
		eror: function (result) { alert(result.status + '' + result.statusText); }
	});
}

function AnnotateText_ByCallingCERMINE(LineOfArray, i) {
	var LineText = LineOfArray;
	var LengthOfLine = LineOfArray.length;
	var errorMsg = "";
	var QFlag = false;
	var SFlag = false;
	var LFlag = false;
	var BLFlag = false;
	var PFlag = false;
	var SHFlag = false;
	var QtFlag = false;

	if (LengthOfLine > 0) {
		//Replace spaecial characters (? ; / %) then call webservice
		//Refrences with ? and ; have problem to annotate by webservice   
		while (LineOfArray.indexOf('?') !== -1) {
			QFlag = true;
			LineOfArray = LineOfArray.replace('?', 'QUESTIONMARKINTEXT');
		}
		while (LineOfArray.indexOf(';') !== -1) {
			SFlag = true;
			LineOfArray = LineOfArray.replace(';', 'SEMICOLONINTEXT');
		}
		while (LineOfArray.indexOf('/') !== -1) {
			LFlag = true;
			LineOfArray = LineOfArray.replace('/', 'SLASHINTEXT');
		}
		while (LineOfArray.indexOf('\\') !== -1) {
			BLFlag = true;
			LineOfArray = LineOfArray.replace('\\', 'BACKSLASHINTEXT');
		}
		while (LineOfArray.indexOf('%') !== -1) {
			PFlag = true;
			LineOfArray = LineOfArray.replace('%', 'PERCENTINTEXT');
		}
		while (LineOfArray.indexOf('#') !== -1) {
			SHFlag = true;
			LineOfArray = LineOfArray.replace('#', 'SHARPINTEXT');
		}
		while (LineOfArray.indexOf('"') !== -1) {
			QtFlag = true;
			LineOfArray = LineOfArray.replace('"', 'QUTATIONINTEXT');
		}
		//2 now call webservice
		// alert(webserviceUrl + '/webservice/webapi/myresource/annotate2/' + LineOfArray)
		aaa = callAnnotatorWebService(LineOfArray);
		// alert(aaa)
		//3 then replace added items with original character again
		if (QFlag)
			while (annotatorresult.indexOf('QUESTIONMARKINTEXT') !== -1)
				annotatorresult = annotatorresult.replace('QUESTIONMARKINTEXT', '?');

		if (SFlag)
			while (annotatorresult.indexOf('SEMICOLONINTEXT') !== -1)
				annotatorresult = annotatorresult.replace('SEMICOLONINTEXT', ';');

		if (LFlag)
			while (annotatorresult.indexOf('SLASHINTEXT') !== -1)
				annotatorresult = annotatorresult.replace('SLASHINTEXT', '/');

		if (PFlag)
			while (annotatorresult.indexOf('PERCENTINTEXT') !== -1)
				annotatorresult = annotatorresult.replace('PERCENTINTEXT', '%');

		if (SHFlag)
			while (annotatorresult.indexOf('SHARPINTEXT') !== -1)
				annotatorresult = annotatorresult.replace('SHARPINTEXT', '#');
		if (QtFlag)
			while (annotatorresult.indexOf('QUTATIONINTEXT') !== -1)
				annotatorresult = annotatorresult.replace('QUTATIONINTEXT', '"');

		if (BLFlag)
			while (annotatorresult.indexOf('BACKSLASHINTEXT') !== -1)
				annotatorresult = annotatorresult.replace('BACKSLASHINTEXT', '\\');

		AnnotatedText = annotatorresult;
		LengthOfAnnotatedText = annotatorresult.length;
		LineOfArray = annotatorresult;
		if (LengthOfAnnotatedText == 0) {
			var l = i + 1;
			document.getElementById("lblerror").style.color = "red";
			document.getElementById("lblerror").innerHTML += "Error in refnumber " + l + ": Not annotated. </br>";
			LineOfArray = LineText;
		} else if (LengthOfLine > LengthOfAnnotatedText) {
			var l = i + 1
			errorMsg = "Error in refnumber " + l;
			errorMsg += ": Not annotated currectly. -->(";
			errorMsg += LineText.substring(0, 20) + " ...)";
			errorMsg += "LenOfOriginalText: " + LengthOfLine + " And LenOfAnnoText: " + LengthOfAnnotatedText + "</br>";
			document.getElementById("lblerror").style.color = "red";
			document.getElementById("lblerror").innerHTML += errorMsg;
		}
		annotatorresult = "";
	}
	return LineOfArray;
}

//save file /////////
function saveTextAsFile() {
	if (document.getElementById("txaxml").value != "") {
		//1 get name 
		var fileNameToSaveAs = filename + ".xml";
		//2
		var textToWrite = getxaxmlText();
		// alert(textToWrite)
		//3
		download(textToWrite, fileNameToSaveAs);
	}
	else
		alert('No File Selected OR Text is Empty ');
}

function getxaxmlText() {
	//return text To Write
	if (document.getElementById("txaxml").value != "") {
		var textToWrite = '';
		// currentLine line in array is need to replace with current value in txtxml
		// replace \n at the end of line
		arrayOfLines[currentLine] = document.getElementById("txaxml").value.replace(/\n/g, '');
		// if user dont click on navigators button so they dont have <author> tag
		// due to we remove all <author> tags in loading file step
		// update all items in arrayOfLines with author tag if they dont have it
		for (i = 0; i < arrayOfLines.length; i++) {			
			// alert(arrayOfLines[i]);
			if (arrayOfLines[i].indexOf('<author>') == -1)
			{
				//calling add_author_tag to add <author> tag
				arrayOfLines[i] = add_author_tag(arrayOfLines[i]);
			}
		}

		// Rejoin the line, adding a <ref> tag
		var strArrayOfLines = arrayOfLines
			.map(line => `<ref>${line}</ref>`)
			.join("\n");

		// special characters translate to html code --> replace them
		textToWrite = strArrayOfLines
			.replace(/(&amp;)/gm, "&")
			.replace(/(&gt;)/gm, ">")
			.replace(/(&lt;)/gm, "<")
			.replace(/(&quot;)/gm, '"')
			.replace(/(&pos;)/gm, "'");

		// create valid xml
		return `<?xml version="1.0" encoding="utf-8"?>
<seganno>
${textToWrite}		
</seganno>`;
	} else
		return "";
}

function download(data, filename1) {
	var file = new Blob([data], { type: 'text/xml' });
	if (window.navigator.msSaveOrOpenBlob) // IE10+
		window.navigator.msSaveOrOpenBlob(file, filename1);
	else { // Others
		var a = document.createElement("a"),
			url = URL.createObjectURL(file);
		a.href = url;
		a.download = filename1;
		document.body.appendChild(a);
		a.click();
		setTimeout(function () {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		}, 0);
	}
}

//Navigate between Lines/////////////////////////////////////
function goto_firstLine() {
	// Save the current txaxml content into arrayOfLines[currentLine] to keep changes.
	// replace \n at the end of line
	arrayOfLines[currentLine] = document.getElementById("txaxml").value.replace(/\n/g, '');
	currentLine = 0;
	repeatedline_in_navigation_function();
}

function goto_prevLine() {
	arrayOfLines[currentLine] = document.getElementById("txaxml").value.replace(/\n/g, '');
	if (currentLine > 0)
		currentLine = currentLine - 1;
	else
		currentLine = arrayOfLines.length - 1;
	repeatedline_in_navigation_function();
}

function goto_lastLine() {
	arrayOfLines[currentLine] = document.getElementById("txaxml").value.replace(/\n/g, '');
	currentLine = arrayOfLines.length - 1;
	repeatedline_in_navigation_function();
}

function goto_nextLine() {
	arrayOfLines[currentLine] = document.getElementById("txaxml").value.replace(/\n/g, '');
	if (arrayOfLines.length - 1 > currentLine)
		currentLine = currentLine + 1;
	else currentLine = 0;
	repeatedline_in_navigation_function();
}

function repeatedline_in_navigation_function() {
	document.getElementById("lblcontentForDemo").innerHTML = OriginalLineArray_forDemo[currentLine];
	document.getElementById("lblColoredText").innerHTML = arrayOfLines[currentLine];
	document.getElementById("txaxml").value = arrayOfLines[currentLine];
	document.getElementById("count").innerHTML = (currentLine + 1) + "/" + arrayOfLines.length;
	Translate_tags_to_color_span();
	Translate_color_span_to_tag();
}


// keynoard shortcuts ///////////////////////////////////////////////////////
document.addEventListener('keydown', function (event) {
	// alert(event.keyCode);
	sel = window.getSelection();
	var selectedtext = sel.toString();
	if (selectedtext == '')
		return;
	if (event.keyCode == 65) {
		// alert('aa was pressed');
		ChangeColor_TranslateColor('btnauthor');
	} else if (event.keyCode == 69) {
		// alert('ee was pressed');
		ChangeColor_TranslateColor('btneditor');
	} else if (event.keyCode == 71) {
		// alert('gg was pressed');
		ChangeColor_TranslateColor('btngiven-names');
	} else if (event.keyCode == 83) {
		// alert('ss was pressed');
		ChangeColor_TranslateColor('btnsurname');
	} else if (event.keyCode == 86) {
		// alert('vv was pressed');
		ChangeColor_TranslateColor('btnvolume');
	} else if (event.keyCode == 89) {
		// alert('yy was pressed');
		ChangeColor_TranslateColor('btnyear');
	} else if (event.keyCode == 84) {
		// alert('tt was pressed');
		ChangeColor_TranslateColor('btntitle');
	} else if (event.keyCode == 79) {
		// alert('oo was pressed');
		ChangeColor_TranslateColor('btnsource');
	} else if (event.keyCode == 70) {
		// alert('ff was btnfpage');
		ChangeColor_TranslateColor('btnfpage');
	} else if (event.keyCode == 76) {
		// alert('ll was btnlpage');
		ChangeColor_TranslateColor('btnlpage');
	} else if (event.keyCode == 80) {
		// alert('pp was btnPublisher');
		ChangeColor_TranslateColor('btnPublisher');
	} else if (event.keyCode == 72) {
		// alert('hh was pressed');
		ChangeColor_TranslateColor('btnother');
	} else if (event.keyCode == 68) {
		// alert('dd was pressed');
		ChangeColor_TranslateColor('btnidentifier');
	} else if (event.keyCode == 73) {
		// alert('ii was pressed');
		ChangeColor_TranslateColor('btnissue');
	} else if (event.keyCode == 85) {
		// alert('uu was pressed');
		ChangeColor_TranslateColor('btnurl');
	} else if (event.keyCode == 82) {
		// alert('rr was pressed');
		RemoveTag();
	}
	var popup = document.getElementById("myPopup");
	if (popUpFlag == true) {
		popup.classList.toggle("show");
		popUpFlag = false;

	}
});

//change color in plain text then call other function to translate tags in textarea ////////
function ChangeColor_TranslateColor(sender) {
	//check text 
	var coloredText = document.getElementById("lblColoredText").innerHTML;
	if (coloredText == "") {
		alert('Please Select a file');
		return;
	}
	//Get Tag Name
	var tagname = '';
	if (sender.value)
		tagname = sender.value;
	else
		tagname = sender;
	//Get Selection Text 
	sel = window.getSelection();
	var selectedtext = sel.toString().trim();
	// if (sel.anchorNode.parentElement.toString() != "[object HTMLSpanElement]") {
	// }
	// var a = coloredText.indexOf(selectedtext);
	// var b = coloredText.lastIndexOf(selectedtext);
	var text11 = coloredText.substr(0, coloredText.lastIndexOf(sel));
	// alert(text11);
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
	if (tagname == "btnauthor") {
		document.execCommand("HiliteColor", false, "#ff9681");
	}
	else if (tagname == "btnsurname") {
		document.execCommand("HiliteColor", false, "#ffce30");
	}
	else if (tagname == "btngiven-names") {
		document.execCommand("HiliteColor", false, "#aabb30");
	}
	else if (tagname == "btnyear") {
		document.execCommand("HiliteColor", false, "#bfb1d5");
	}
	else if (tagname == "btntitle") {
		document.execCommand("HiliteColor", false, "#adddcf");
	}
	else if (tagname == "btnsource") {
		document.execCommand("HiliteColor", false, "#abe1fd");
	}
	else if (tagname == "btneditor") {
		document.execCommand("HiliteColor", false, "#fed88f");
	}
	else if (tagname == "btnvolume") {
		document.execCommand("HiliteColor", false, "#ffff66");
	}
	else if (tagname == "btnother") {
		document.execCommand("HiliteColor", false, "#f4858e");
	}
	else if (tagname == "btnfpage") {
		document.execCommand("HiliteColor", false, "#ccff66");
	}
	else if (tagname == "btnlpage") {
		document.execCommand("HiliteColor", false, "#ffb3ff");
	}
	else if (tagname == "btnPublisher") {
		document.execCommand("HiliteColor", false, "#79d279");
	}
	else if (tagname == "btnissue") {
		document.execCommand("HiliteColor", false, "#659bf2");
	}
	else if (tagname == "btnurl") {
		document.execCommand("HiliteColor", false, "#5befdb");
	}
	else if (tagname == "btnidentifier") {
		document.execCommand("HiliteColor", false, "#d19bf7");
	}
	else {
		document.getElementById("error").innerHTML = " Button broken!";
	}
	// Set design mode to off
	document.designMode = "off";
	// ?? why??
	var currentText = document.getElementById("lblColoredText").innerHTML;
	document.getElementById("lblColoredText").innerHTML = currentText;
	Translate_color_span_to_tag();
	// Translate_tags_to_color_span();
}

function Translate_color_span_to_tag() {
	//replaces the manually added tags with colortags in lblColoredText. 
	//lblColoredText Contains <span tags>
	var arrayCopyOflblText = [];
	document.getElementById("lblColoredText").innerHTML = document.getElementById("lblColoredText").innerHTML.replace(/ <\/span>/gm, "</span> ");
	arrayCopyOflblText[currentLine] = document.getElementById("lblColoredText").innerHTML;
	var openSpanValue = "";
	var tagname = "";

	//replace all 

	//for surname
	openSpanValue = '<span style="background-color: rgb(255, 206, 48);">';
	while (arrayCopyOflblText[currentLine].indexOf(openSpanValue) !== -1) {
		var text1 = arrayCopyOflblText[currentLine].substr(0, arrayCopyOflblText[currentLine].indexOf(openSpanValue));
		var text2 = arrayCopyOflblText[currentLine].substr(arrayCopyOflblText[currentLine].indexOf(openSpanValue), arrayCopyOflblText[currentLine].length);
		text2 = text2.replace("</span>", "</surname>");
		arrayCopyOflblText[currentLine] = text1 + text2;
		arrayCopyOflblText[currentLine] = arrayCopyOflblText[currentLine].replace(openSpanValue, '<surname>');
	}

	//for given-names
	openSpanValue = '<span style="background-color: rgb(170, 187, 48);">';
	while (arrayCopyOflblText[currentLine].indexOf(openSpanValue) !== -1) {
		var text1 = arrayCopyOflblText[currentLine].substr(0, arrayCopyOflblText[currentLine].indexOf(openSpanValue));
		var text2 = arrayCopyOflblText[currentLine].substr(arrayCopyOflblText[currentLine].indexOf(openSpanValue), arrayCopyOflblText[currentLine].length);
		text2 = text2.replace("</span>", "</given-names>");
		arrayCopyOflblText[currentLine] = text1 + text2;
		arrayCopyOflblText[currentLine] = arrayCopyOflblText[currentLine].replace(openSpanValue, '<given-names>');
	}

	//for year
	openSpanValue = '<span style="background-color: rgb(191, 177, 213);">';
	while (arrayCopyOflblText[currentLine].indexOf(openSpanValue) !== -1) {
		var t1 = arrayCopyOflblText[currentLine].substr(0, arrayCopyOflblText[currentLine].indexOf(openSpanValue));
		var t2 = arrayCopyOflblText[currentLine].substr(arrayCopyOflblText[currentLine].indexOf(openSpanValue), arrayCopyOflblText[currentLine].length).replace("</span>", "</year>")
		arrayCopyOflblText[currentLine] = t1 + t2;
		arrayCopyOflblText[currentLine] = arrayCopyOflblText[currentLine].replace('<span style="background-color: rgb(191, 177, 213);">', '<year>');
	}
	//for title
	openSpanValue = '<span style="background-color: rgb(173, 221, 207);">'
	while (arrayCopyOflblText[currentLine].indexOf(openSpanValue) !== -1) {
		arrayCopyOflblText[currentLine] = arrayCopyOflblText[currentLine].substr(0, arrayCopyOflblText[currentLine].indexOf(openSpanValue)) + arrayCopyOflblText[currentLine].substr(arrayCopyOflblText[currentLine].indexOf(openSpanValue), arrayCopyOflblText[currentLine].length).replace("</span>", "</title>");
		arrayCopyOflblText[currentLine] = arrayCopyOflblText[currentLine].replace(openSpanValue, '<title>');
	}
	//for source
	while (arrayCopyOflblText[currentLine].indexOf('<span style="background-color: rgb(171, 225, 253);">') !== -1) {
		arrayCopyOflblText[currentLine] = arrayCopyOflblText[currentLine].substr(0, arrayCopyOflblText[currentLine].indexOf('<span style="background-color: rgb(171, 225, 253);">')) + arrayCopyOflblText[currentLine].substr(arrayCopyOflblText[currentLine].indexOf('<span style="background-color: rgb(171, 225, 253);">'), arrayCopyOflblText[currentLine].length).replace("</span>", "</source>");
		arrayCopyOflblText[currentLine] = arrayCopyOflblText[currentLine].replace('<span style="background-color: rgb(171, 225, 253);">', '<source>');
	}
	//for editor
	while (arrayCopyOflblText[currentLine].indexOf('<span style="background-color: rgb(254, 216, 143);">') !== -1) {
		arrayCopyOflblText[currentLine] = arrayCopyOflblText[currentLine].substr(0, arrayCopyOflblText[currentLine].indexOf('<span style="background-color: rgb(254, 216, 143);">')) + arrayCopyOflblText[currentLine].substr(arrayCopyOflblText[currentLine].indexOf('<span style="background-color: rgb(254, 216, 143);">'), arrayCopyOflblText[currentLine].length).replace("</span>", "</editor>");
		arrayCopyOflblText[currentLine] = arrayCopyOflblText[currentLine].replace('<span style="background-color: rgb(254, 216, 143);">', '<editor>');
	}
	//for volume
	while (arrayCopyOflblText[currentLine].indexOf('<span style="background-color: rgb(255, 255, 102);">') !== -1) {
		arrayCopyOflblText[currentLine] = arrayCopyOflblText[currentLine].substr(0, arrayCopyOflblText[currentLine].indexOf('<span style="background-color: rgb(255, 255, 102);">')) + arrayCopyOflblText[currentLine].substr(arrayCopyOflblText[currentLine].indexOf('<span style="background-color: rgb(255, 255, 102);">'), arrayCopyOflblText[currentLine].length).replace("</span>", "</volume>");
		arrayCopyOflblText[currentLine] = arrayCopyOflblText[currentLine].replace('<span style="background-color: rgb(255, 255, 102);">', '<volume>');
	}
	//fpage ================================================================
	while (arrayCopyOflblText[currentLine].indexOf('<span style="background-color: rgb(204, 255, 102);">') !== -1) {
		arrayCopyOflblText[currentLine] = arrayCopyOflblText[currentLine].substr(0, arrayCopyOflblText[currentLine].indexOf('<span style="background-color: rgb(204, 255, 102);">')) + arrayCopyOflblText[currentLine].substr(arrayCopyOflblText[currentLine].indexOf('<span style="background-color: rgb(204, 255, 102);">'), arrayCopyOflblText[currentLine].length).replace("</span>", "</fpage>");
		arrayCopyOflblText[currentLine] = arrayCopyOflblText[currentLine].replace('<span style="background-color: rgb(204, 255, 102);">', '<fpage>');//
	}
	//lpage ================================================================
	while (arrayCopyOflblText[currentLine].indexOf('<span style="background-color: rgb(255, 179, 255);">') !== -1) {
		arrayCopyOflblText[currentLine] = arrayCopyOflblText[currentLine].substr(0, arrayCopyOflblText[currentLine].indexOf('<span style="background-color: rgb(255, 179, 255);">')) + arrayCopyOflblText[currentLine].substr(arrayCopyOflblText[currentLine].indexOf('<span style="background-color: rgb(255, 179, 255);">'), arrayCopyOflblText[currentLine].length).replace("</span>", "</lpage>");
		arrayCopyOflblText[currentLine] = arrayCopyOflblText[currentLine].replace('<span style="background-color: rgb(255, 179, 255);">', '<lpage>');//
	}
	//btnPublisher ================================================================
	while (arrayCopyOflblText[currentLine].indexOf('<span style="background-color: rgb(121, 210, 121);">') !== -1) {
		arrayCopyOflblText[currentLine] = arrayCopyOflblText[currentLine].substr(0, arrayCopyOflblText[currentLine].indexOf('<span style="background-color: rgb(121, 210, 121);">')) + arrayCopyOflblText[currentLine].substr(arrayCopyOflblText[currentLine].indexOf('<span style="background-color: rgb(121, 210, 121);">'), arrayCopyOflblText[currentLine].length).replace("</span>", "</publisher>");
		arrayCopyOflblText[currentLine] = arrayCopyOflblText[currentLine].replace('<span style="background-color: rgb(121, 210, 121);">', '<publisher>');//
	}
	//other ================================================================
	openSpanValue = '<span style="background-color: rgb(244, 133, 142);">';
	tagname = 'other';
	arrayCopyOflblText = subfunction_Translate_color_span_to_tag(arrayCopyOflblText, openSpanValue, tagname);
	arrayOfLines[currentLine] = arrayCopyOflblText[currentLine];
	//issue ================================================================
	openSpanValue = '<span style="background-color: rgb(101, 155, 242);">'
	tagname = 'issue';
	arrayCopyOflblText = subfunction_Translate_color_span_to_tag(arrayCopyOflblText, openSpanValue, tagname);
	arrayOfLines[currentLine] = arrayCopyOflblText[currentLine];
	//url ================================================================
	openSpanValue = '<span style="background-color: rgb(91, 239, 219);">'
	tagname = 'url';
	arrayCopyOflblText = subfunction_Translate_color_span_to_tag(arrayCopyOflblText, openSpanValue, tagname);
	arrayOfLines[currentLine] = arrayCopyOflblText[currentLine];
	//identifier ================================================================
	openSpanValue = '<span style="background-color: rgb(209, 155, 247);">'
	tagname = 'identifier';
	arrayCopyOflblText = subfunction_Translate_color_span_to_tag(arrayCopyOflblText, openSpanValue, tagname);
	arrayOfLines[currentLine] = arrayCopyOflblText[currentLine];
	// ================================================================
	var currentText = arrayOfLines[currentLine];
	arrayCopyOflblText[currentLine] = currentText;
	// ================================================================
	currentText = add_author_tag(currentText);
	document.getElementById("txaxml").value = currentText;
}

function add_author_tag(currentText) {
	arr = []
	arr_open_surname = getIndicesOf('<surname>', currentText)
	arr_close_surname = getIndicesOf('</surname>', currentText)
	arr_open_givennames = getIndicesOf('<given-names>', currentText)
	arr_close_givennames = getIndicesOf('</given-names>', currentText)
	len_of_arr_open_surname = arr_open_surname.length
	len_of_arr_open_givennames = arr_open_givennames.length

	max_number = (len_of_arr_open_surname >= len_of_arr_open_givennames) ? len_of_arr_open_surname : len_of_arr_open_givennames

	String.prototype.splice = function (idx, rem, str) {
		return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
	};

	for (var i = 0; i < max_number; i++) {
		arr_open_surname = getIndicesOf('<surname>', currentText)
		arr_close_surname = getIndicesOf('</surname>', currentText)
		arr_open_givennames = getIndicesOf('<given-names>', currentText)
		arr_close_givennames = getIndicesOf('</given-names>', currentText)

		if (arr_open_surname[i] != undefined && arr_open_givennames[i] == undefined) {
			arr_open_surname = getIndicesOf('<surname>', currentText)
			currentText = currentText.splice(arr_open_surname[i], 0, "<author>");
			arr_close_surname = getIndicesOf('</surname>', currentText)
			currentText = currentText.splice(arr_close_surname[i] + 10, 0, "</author>");
		}
		else if (arr_open_givennames[i] != undefined && arr_open_surname[i] == undefined) {
			arr_open_givennames = getIndicesOf('<given-names>', currentText)
			currentText = currentText.splice(arr_open_givennames[i], 0, "<author>");
			arr_close_givennames = getIndicesOf('</given-names>', currentText)
			currentText = currentText.splice(arr_close_givennames[i] + 14, 0, "</author>");
		}
		else {
			if (arr_open_surname[i] < arr_open_givennames[i]) {
				// surname is first tag AND givennames is second tag
				arr_open_surname = getIndicesOf('<surname>', currentText)
				currentText = currentText.splice(arr_open_surname[i], 0, "<author>");
				arr_close_givennames = getIndicesOf('</given-names>', currentText)
				currentText = currentText.splice(arr_close_givennames[i] + 14, 0, "</author>");
			} else if (arr_open_surname[i] > arr_open_givennames[i]) {
				// givennames is first tag AND surname is second tag
				arr_open_givennames = getIndicesOf('<given-names>', currentText)
				currentText = currentText.splice(arr_open_givennames[i], 0, "<author>");
				arr_close_surname = getIndicesOf('</surname>', currentText)
				currentText = currentText.splice(arr_close_surname[i] + 10, 0, "</author>");
			}
		}
	}
	return currentText;
}

function getIndicesOf(searchStr, str) {
	var searchStrLen = searchStr.length;
	if (searchStrLen == 0) {
		return [];
	}
	var startIndex = 0, index, indices = [];
	while ((index = str.indexOf(searchStr, startIndex)) > -1) {
		indices.push(index);
		startIndex = index + searchStrLen;
	}
	return indices;
}

function subfunction_Translate_color_span_to_tag(arrayCopyOflblText, openSpanValue, tagname) {
	while (arrayCopyOflblText[currentLine].indexOf(openSpanValue) !== -1) {
		var t1 = arrayCopyOflblText[currentLine].substr(0, arrayCopyOflblText[currentLine].indexOf(openSpanValue));
		var t2 = arrayCopyOflblText[currentLine].substr(arrayCopyOflblText[currentLine].indexOf(openSpanValue), arrayCopyOflblText[currentLine].length).replace("</span>", "</" + tagname + ">");
		arrayCopyOflblText[currentLine] = t1 + t2;
		arrayCopyOflblText[currentLine] = arrayCopyOflblText[currentLine].replace(openSpanValue, '<' + tagname + '>');
	}
	return arrayCopyOflblText;
}

function Translate_tags_to_color_span() {// replaces the manually added tags with colortags for lblColoredText.
	arrayOfLines[currentLine] = document.getElementById("txaxml").value;

	var textCopy = arrayOfLines;
	// //author
	// while (textCopy[currentLine].indexOf("<author>") !== -1) {
	// 	textCopy[currentLine] = textCopy[currentLine].replace("</author>", "</span>");
	// 	textCopy[currentLine] = textCopy[currentLine].replace('<author>', '<span style="background-color: rgb(255, 150, 129);">');
	// }
	//surname
	while (textCopy[currentLine].indexOf("<surname>") !== -1) {
		textCopy[currentLine] = textCopy[currentLine].replace("</surname>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<surname>', '<span style="background-color: rgb(255, 206, 48);">');
	}
	//2
	while (textCopy[currentLine].indexOf('</span><span style="background-color: rgb(255, 206, 48);>') !== -1) {
		textCopy[currentLine] = textCopy[currentLine].replace('</span><span style="background-color: rgb(255, 206, 48);>', '<span style="background-color: rgb(255, 206, 48);">');
	}
	//given-names
	while (textCopy[currentLine].indexOf("<given-names>") !== -1) {
		textCopy[currentLine] = textCopy[currentLine].replace("</given-names>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<given-names>', '<span style="background-color: rgb(170, 187, 48);">');
	}
	//2
	while (textCopy[currentLine].indexOf('</span><span style="background-color: rgb(170, 187, 48);">') !== -1) {
		textCopy[currentLine] = textCopy[currentLine].replace('</span><span style="background-color: rgb(170, 187, 48);">', '<span style="background-color: rgb(170, 187, 48);">');
	}
	//year
	while (textCopy[currentLine].indexOf("<year>") !== -1) {
		textCopy[currentLine] = textCopy[currentLine].replace("</year>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<year>', '<span style="background-color: rgb(191, 177, 213);">');
	}
	while (textCopy[currentLine].indexOf("<title>") !== -1) {
		textCopy[currentLine] = textCopy[currentLine].replace("</title>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<title>', '<span style="background-color: rgb(173, 221, 207);">');
	}
	while (textCopy[currentLine].indexOf("<source>") !== -1) {
		textCopy[currentLine] = textCopy[currentLine].replace("</source>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<source>', '<span style="background-color: rgb(171, 225, 253);">');
	}
	while (textCopy[currentLine].indexOf("<editor>") !== -1) {
		textCopy[currentLine] = textCopy[currentLine].replace("</editor>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<editor>', '<span style="background-color: rgb(254, 216, 143);">');
	}
	//volume
	while (textCopy[currentLine].indexOf("<volume>") !== -1) {
		textCopy[currentLine] = textCopy[currentLine].replace("</volume>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<volume>', '<span style="background-color: rgb(255, 255, 102);">');
	}
	//fpage
	while (textCopy[currentLine].indexOf("<fpage>") !== -1) {
		textCopy[currentLine] = textCopy[currentLine].replace("</fpage>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<fpage>', '<span style="background-color: rgb(204, 255, 102);">');//
	}
	//lpage
	while (textCopy[currentLine].indexOf("<lpage>") !== -1) {
		textCopy[currentLine] = textCopy[currentLine].replace("</lpage>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<lpage>', '<span style="background-color: rgb(255, 179, 255);">');//
	}
	//lpage
	while (textCopy[currentLine].indexOf("<publisher>") !== -1) {
		textCopy[currentLine] = textCopy[currentLine].replace("</publisher>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<publisher>', '<span style="background-color: rgb(121, 210, 121);">');//
	}
	// other
	while (textCopy[currentLine].indexOf("<other>") !== -1) {
		textCopy[currentLine] = textCopy[currentLine].replace("</other>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<other>', '<span style="background-color: rgb(244, 133, 142);">');
	}
	// issue
	while (textCopy[currentLine].indexOf("<issue>") !== -1) {
		textCopy[currentLine] = textCopy[currentLine].replace("</issue>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<issue>', '<span style="background-color: rgb(101, 155, 242);">');
	}
	// url
	while (textCopy[currentLine].indexOf("<url>") !== -1) {
		textCopy[currentLine] = textCopy[currentLine].replace("</url>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<url>', '<span style="background-color: rgb(91, 239, 219);">');
	}
	// identifier
	while (textCopy[currentLine].indexOf("<identifier>") !== -1) {
		textCopy[currentLine] = textCopy[currentLine].replace("</identifier>", "</span>");
		textCopy[currentLine] = textCopy[currentLine].replace('<identifier>', '<span style="background-color: rgb(209, 155, 247);">');
	}
	document.getElementById("lblColoredText").innerHTML = textCopy[currentLine];
}

// delete function /////////////////////////////////////////////////////////////////
function RemoveTag() {
	sel = window.getSelection();
	if (sel == "") {
		alert('No Selection');
		return;
	}
	if (sel.anchorNode.parentElement.toString() == "[object HTMLSpanElement]") {
		$(sel.anchorNode.parentElement).contents().unwrap();
		Translate_color_span_to_tag();
	}
}

// delete popup code /////////////////////////////////////////////////////////////////
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
	} else if ((sel = document.selection) && sel.type != "Control") {
		parentEl = sel.createRange().parentElement();
	}
	return parentEl;
}

$(document).click(function (event) {
	var popup = document.getElementById("myPopup");
	if (popUpFlag == true) {
		popup.classList.toggle("show");
		popUpFlag = false;
	}
});

$("#lblColoredText").click(function (event) {
	var popup = document.getElementById("myPopup");
	if (popUpFlag == true) {
		popup.classList.toggle("show");
		popUpFlag = false;

	}
});

$("#delbtnno").click(function (event) {
	var popup = document.getElementById("myPopup");
	popup.classList.toggle("show");
	popUpFlag = false;
});

$("#lblColoredText").dblclick(function (event) {
	var par = getSelectionParentElement().nodeName;
	var popup = document.getElementById("myPopup");
	if (par == "SPAN") {
		$('#myPopup').css('left', event.pageX - 120);
		$('#myPopup').css('top', event.pageY - 90);
		$('#myPopup').css('display', 'inline');
		$("#myPopup").css("position", "absolute");
		popup.classList.toggle("show");
		if (popUpFlag == false) {
			popUpFlag = true;
		}
	}
	else if (popUpFlag == true) {
		popup.classList.toggle("show");
		popUpFlag = false;
	}
});
