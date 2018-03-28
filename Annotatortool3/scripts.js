var textFromFileLoaded = "";
currentLine = 1;
var textByLines = "";

function emptyParameters() {
	//this parameter should be empty At each start 
	textFromFileLoaded = "";
	textByLines = "";
	currentLine = 1;
	filename = "";
	document.getElementById("lblreftext").innerHTML = "";
	document.getElementById("demo").innerHTML = "";
    document.getElementById("lblerror").innerHTML = "";
    document.getElementById("count").innerHTML = "";
    $('#lblreftext').text("");
    $('#lblMatch_id').text("");
    $('#lblAuthors').text("");
    $('#lblyear').text("");
    $('#lbltitle').text("");
    $("#divdublicate").empty();
}

$(document).ready(function () {
    $("#btnuploadfile").change(function () {
        emptyParameters();
        checkfileType($(this).val());
        var fileinfo = document.getElementById("btnuploadfile");
        var filename = getFileName(fileinfo);
        // var fileToLoad = document.getElementById("btnUploadfile").files[0];
        loadFileAsText(fileinfo.files[0]);

        this.value = null;
        return false;
    });
});

function checkfileType(sendervalue) {
    //check text file type.
    var validExts = new Array(".xlsx", ".csv", ".txt");
    var fileExt = sendervalue.substring(sendervalue.lastIndexOf('.'));

    if (validExts.indexOf(fileExt) < 0) {
        alert("No File Selected OR Invalid file selected!!");
        return false;
    }
    return true;
}

function getFileName(fileinfo) {
    //check FileAvailability and ReturnFileName
    var filename = [];
    var txt = "";
    if ('files' in fileinfo) {
        for (var i = 0; i < fileinfo.files.length; i++) {
            var file = fileinfo.files[i];
            if ('name' in file) txt += "File Name : " + file.name;
            filename.push(file.name);
        }
    }
    else {
        if (fileinfo.value == "") txt += "Select one or more files.";
        else {
            // If the browser does not support the files property, it will return the path of the selected file instead.
            txt += "The files property is not supported by your browser!";
            txt += "<br>The path of the selected file: " + fileinfo.value;
        }
        alert(txt);
    }
    $('#demo').append("(File Name: " + filename + ")");
    return filename;
}

function loadFileAsText(fileToLoad) {
    // loads the file uploaded through "btnuploadfile" into the "lblreftext" and "txaxml"    
    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
        textFromFileLoaded = fileLoadedEvent.target.result;
        alert(textFromFileLoaded);
        //converts textfile into array of lines cutting whenever "\n" is in the file
        textByLines = textFromFileLoaded.split(/\r\n|\n/);
        $('#demo').append("-(Line Number: " + textByLines.length + " )");
        showOneLineInformation(currentLine);
        document.getElementById("count").innerHTML = 1 + "/" + textByLines.length;
    };
    fileReader.readAsText(fileToLoad, 'ISO-8859-1');
}

function display_characters(textfromfunc)
{
    textfromfunc = textfromfunc.replace(/SEMIKOLONE/g ,";");
    // textfromfunc = textfromfunc.replace(/Ä/g,"&Auml;").replace(/ä/g,"&auml;");
    return textfromfunc;
}

function showOneLineInformation(currentLine) {
    var reftext = textByLines[currentLine].split(";")[2];
    $('#lblreftext').text(display_characters(reftext) + '\n');

    var lblMatch_id = textByLines[currentLine].split(";")[3];
    $('#lblMatch_id').text(display_characters(lblMatch_id) + '\n');

    var lblAuthors = textByLines[currentLine].split(";")[4];
    $('#lblAuthors').text(display_characters(lblAuthors) + '\n');

    var lblyear = textByLines[currentLine].split(";")[5];
    $('#lblyear').text(display_characters(lblyear) + '\n');

    var lbltitle = textByLines[currentLine].split(";")[6];
    $('#lbltitle').text(display_characters(lbltitle) + '\n');

    $("#divdublicate").empty();
    var list_of_dublication = textByLines[currentLine].split(";")[7];
    if (list_of_dublication != "null") {
        var dublicateList = list_of_dublication.substring(1, list_of_dublication.length - 1).split(",");
        var dublicateCount = dublicateList.length;
       
        // -------------------------
        for (var j = 0; j < dublicateCount; j++) {
            var iDiv = document.createElement('div');
            iDiv.id = "iDiv";
            divdublicate.appendChild(iDiv);

            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "chb" + j;
            checkbox.value = dublicateList[j];
            checkbox.id = "chb" + j;
            checkbox.classList.add("inlineitem");
            var label = document.createElement('label')
            label.htmlFor = "chb" + j;
            label.appendChild(document.createTextNode(dublicateList[j].replace("u'", "").replace("'", "")));

            iDiv.appendChild(checkbox);
            iDiv.appendChild(label);
        }
    }else
    {
        $("#divdublicate").text(list_of_dublication);
    }
}

//Navigate between Lines/////////////////////////////////////
function gotoline() {
    //Saves the current txaxml content into textFromFileLoaded. 
    //Cycles backwards through the lines of an uploaded file updating label "count" and "lblreftext"+"txaxml".happens onclick of "prev"
    textFromFileLoaded = textByLines.toString();
    if (currentLine > 1) currentLine = currentLine - 1;
    else currentLine = textByLines.length - 1;
    document.getElementById("lblreftext").innerHTML = textByLines[currentLine];
    var line = currentLine + 1;
    document.getElementById("count").innerHTML = line + "/" + textByLines.length;
    showOneLineInformation(currentLine);
}

function gotofirstLine() {
    currentLine = 2;
    gotoline(currentLine);
}

function gotoprevLine() {
    gotoline(currentLine);
}

function gotolastLine() {
    currentLine = textByLines.length - 1;
    textFromFileLoaded = textByLines.toString();
    document.getElementById("lblreftext").innerHTML = textByLines[currentLine];
    var line = currentLine + 1;
    document.getElementById("count").innerHTML = line + "/" + textByLines.length;
    showOneLineInformation(currentLine);
}

function gotonextLine() {
    //Saves the current txaxml content into textFromFileLoaded. Cycles forwards through the lines of an uploaded file updating label "count" and "lblreftext"+"txaxml". happens onclick of "next"
    textFromFileLoaded = textByLines.toString();
    if (textByLines.length - 1 > currentLine)
        currentLine = currentLine + 1;
    else currentLine = 1;
    document.getElementById("lblreftext").innerHTML = textByLines[currentLine];
    var line = currentLine + 1;
    document.getElementById("count").innerHTML = line + "/" + textByLines.length;
    showOneLineInformation(currentLine);
}
