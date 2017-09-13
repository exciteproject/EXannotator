<html>
	<head>
		<link rel="stylesheet" href="style.css">
		<script type="text/javascript" src="scripts.js"></script>
	</head>

	<body>
	
	<div class="page">
		<br>
		<form action=""> <!--<label for="uploadbtn"> Select Reference Strings File (.txt): </label> -->
			<input type="file" accept=".txt, .xml"  id="uploadbtn" style="display: none;" name="ReferenceStringsFile" value="ReferenceStringsFile" onchange="fileName(); loadFileAsText();"/>
			<input type="button" class="roundButton" value="Upload a File" onclick="document.getElementById('uploadbtn').click();" />
		</form>
		
		<label class="fileName" id="demo"></label>
		<br>
		
		<div class="headerDivider"></div>
		
		
		<div id="rb1" class="radioButtonsContainer1">
			<input type="radio" id="au" name="radio" class="radioButtons" value="author" checked>
				<label for="au" style='background-color: #ff9681'>author</label>
			<br>
			<input type="radio" id="ye" name="radio" class="radioButtons" value="year">
				<label for="ye" style='background-color: #bfb1d5'>year</label>
			<br>
			<input type="radio" id="ti" name="radio" class="radioButtons" value="title">
				<label for="ti" style='background-color: #adddcf'>title</label>
		</div>
		<div id="rb2" class="radioButtonsContainer2">
			<input type="radio" id="co" name="radio" class="radioButtons" value="container">
				<label for="co" style='background-color: #abe1fd'>Container (e.g journal, book)</label>
			<br>
			<input type="radio" id="ed" name="radio" class="radioButtons" value="editor">
				<label for="ed" style='background-color: #fed88f'>editorial board</label>
			<br>
			<input type="radio" id="ot" name="radio" class="radioButtons" value="others">
				<label for="ot" style='background-color: #f4858e'>others</label>
		</div>
		
		<label class="tag">Tag the Reference String:</label>
		<br>
		<button class="tagButton" type="button" onclick="changeColor();">Add a New Tag</button> <br>
		<label id="content1" class="textLabel"></label> 
		<!--<label id="ta1" class="textLabel">Please upload a File</label><!--note that ta1 isn't a textarea (anymore)-->
		<!--<textarea id="ta1" cols="80" rows="5">Please upload a file</textarea>-->
		<p class="tag"> Preview Reference String with XML tags:</p>
		<textarea id="ta2" class="ta2" onkeyup="colorize(); deleteTags()"></textarea> 
		<br>
		<button type="button" id="prev" class="cycleButtonPrev" onclick="prevLine();">Previous</button>
		<label class="count" id="count"> 0/0 </label>
		<button type="button" id="next" class="cycleButtonNext" onclick="nextLine();">Next</button>
		
		<button type="button" class="exportButton" onclick="saveTextAsFile();">Export XML File</button>
		<br>
		<br>
		<label id="error"><font color="red"></font> </label>
		
		<!--<textarea id="tatest" cols="80" rows="30">Please upload a file</textarea>-->

	</div>
	</body>
</html>