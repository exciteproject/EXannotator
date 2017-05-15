<html>
	<head>
		<link rel="stylesheet" href="style.css">
		<script type="text/javascript" src="scripts.js"></script>
	</head>

	<body>
	
	 


		<br>
		<form action=""> <!--<label for="rsf"> Select Reference Strings File (.txt): </label> -->
			<input type="file" accept=".txt"  id="rsf" style="display: none;" name="ReferenceStringsFile" value="ReferenceStringsFile" onchange="fileNameB1(); loadFileAsTextB1();"/>
			<input type="button" class="roundButtons" value="Reference Strings File" onclick="document.getElementById('rsf').click();" />
		</form>
		
		
		<form action=""> <!--<label for="trs"> Select Tagged Reference Strings (.xml): <!</label> -->
			<input type="file" accept=".xml" id="trs" style="display: none;" name="TaggedReferenceStrings" value="TaggedReferenceStrings" id="trs" onchange="fileNameB2(); loadFileAsTextB2();"/>
			<input type="button" class="roundButtons" value="Tagged Reference String" onclick="document.getElementById('trs').click();" />
		</form>
		<!--<script> document.write(document.getElementById('rsf').files) </script>-->
		<label class="fileName" id="demo"></label>
		<br>
		
		<div class="headerDivider"></div>
		
		
		<div id="rb1" class="radioButtonsContainer1">
			<input type="radio" id="au" name="radio" class="radioButtons" value="author" checked>
				<label for="au"> author</label>
			<br>
			<input type="radio" id="ye" name="radio" class="radioButtons" value="year">
				<label for="ye"> year</label>
			<br>
			<input type="radio" id="ti" name="radio" class="radioButtons" value="title">
				<label for="ti"> title</label>
		</div>
		<div id="rb2" class="radioButtonsContainer2">
			<input type="radio" id="co" name="radio" class="radioButtons" value="container">
				<label for="co"> Container (e.g journal, book)</label>
			<br>
			<input type="radio" id="ed" name="radio" class="radioButtons" value="editorial board">
				<label for="ed"> editorial board</label>
			<br>
			<input type="radio" id="ot" name="radio" class="radioButtons" value="others">
				<label for="ot"> others</label>
		</div>
		
		<label class="tag">Tag the Reference String:</label>
		<br>
		<button class="tagButton" type="button">Add a New Tag</button> <br>

		<textarea id="ta1" cols="80" rows="5">Please upload a file</textarea>
		<p> Preview Reference String with XML tags:</p>
		<textarea id="ta2" cols="80" rows="7"></textarea> 
		<br>
		<button type="button" id="prev" class="cycleButtons" onclick="prevLine();">Previous</button>
		<label id="count" style="padding-left:5px; padding-right:5px;"> 0/0 </label>
		<button type="button" id="next" class="cycleButtons" onclick="nextLine();">Next</button>
		
		<button type="button" class="exportButton">Export XML File</button>
		<br>
		<br>
		<label><font color="red">ERROR!</font> </label>
	
	</body>
</html>