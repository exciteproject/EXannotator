function fileNameB1()
{
var x = document.getElementById("rsf");
var txt = "";
	if ('files' in x) 
	{
		if (x.files.length == 0) 
		{
			txt = "Select one or more files.";
		} 
		else 
		{
			for (var i = 0; i < x.files.length; i++) 
			{ // made for any amount of uploaded files
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
		}
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
		
function fileNameB2()
{
	var x = document.getElementById("trs");
	var txt = "";
	if ('files' in x) {
		if (x.files.length == 0) 
		{
			txt = "Select one or more files.";
		}
		else 
		{
			for (var i = 0; i < x.files.length; i++)// made for any amount of uploaded files 
			{ 
				//txt += "<br><strong>" + (i+1) + ". file</strong><br>";
				var file = x.files[i];
				if ('name' in file) 
				{
					txt += /*"name: " +*/"Open: " + file.name + "<br>";
				}
				/*if ('size' in file) {
					*txt += "size: " + file.size + " bytes <br>";
				}*/
			}
		}
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
		
function loadFileAsTextB1()
{
	var fileToLoad = document.getElementById("rsf").files[0];
	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent)
	{
		var textFromFileLoaded = fileLoadedEvent.target.result;
		var textByLines = textFromFileLoaded.split('\n');
		document.getElementById("ta1").value = textByLines[0];
		document.getElementById("ta2").value = textByLines[0];
		document.getElementById("count").innerHTML = 1 + "/" + textByLines.length ;
		//var sepText = textFromFileLoaded.split('\n');              TESTS
		//document.getElementById("count").innerHTML = sepText[0];
		//document.getElementById("ta2").value = firstLine;
	};
				
fileReader.readAsText(fileToLoad, "UTF-8");
}
function loadFileAsTextB2()
{
	var fileToLoad = document.getElementById("trs").files[0];
	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent)
	{
		var textFromFileLoaded = fileLoadedEvent.target.result;
		var textByLines = textFromFileLoaded.split('\n');
		document.getElementById("ta1").value = textByLines[0];
		document.getElementById("ta2").value = textByLines[0];
		document.getElementById("count").innerHTML = 1 + "/" + textByLines.length ;
		//document.getElementById("ta2").value = firstLine;
	};	
fileReader.readAsText(fileToLoad, "UTF-8");
}
	
var currentLine = 0;
function prevLine()
{
	var fileToLoad = document.getElementById("rsf").files[0];
	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent)
	{
		var textFromFileLoaded = fileLoadedEvent.target.result;
		var textByLines = textFromFileLoaded.split('\n'); // turns text into array of lines
		//document.getElementById("ta2").value = textByLines[0];
		if(currentLine > 0)
		{	
			currentLine = currentLine -1;
			document.getElementById("ta2").value = textByLines[currentLine];
			var line = currentLine+1
			document.getElementById("count").innerHTML = line + "/" + textByLines.length;
		}
		else
		{
			currentLine = textByLines.length-1;
			document.getElementById("ta2").value = textByLines[currentLine];
			var line = currentLine+1
			document.getElementById("count").innerHTML = line + "/" + textByLines.length;
		}
	
	};
			
	
fileReader.readAsText(fileToLoad, "UTF-8");
}

function nextLine()
{
	var fileToLoad = document.getElementById("rsf").files[0];	
	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent)
	{
		var textFromFileLoaded = fileLoadedEvent.target.result;
		var textByLines = textFromFileLoaded.split('\n'); // turns text into array of lines
		//document.getElementById("ta2").value = textByLines[0];
		if(textByLines.length-1 > currentLine)
		{
			currentLine = currentLine +1;
			document.getElementById("ta2").value = textByLines[currentLine];
			var line = currentLine+1
			document.getElementById("count").innerHTML = line + "/" + textByLines.length;
		}
		else
		{
			currentLine = 0;
			document.getElementById("ta2").value = textByLines[currentLine];
			var line = currentLine+1
			document.getElementById("count").innerHTML = line + "/" + textByLines.length;
		}

};
	

fileReader.readAsText(fileToLoad, "UTF-8");
}