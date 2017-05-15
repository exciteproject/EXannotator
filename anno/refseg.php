<html>
	<head>
		<script type="text/javascript" src="scripts.js"></script>
	</head>

	<body>
	
	 


		<br>
		<form action=""> <!--<label for="rsf"> Select Reference Strings File (.txt): </label> -->
			<input type="file" accept=".txt"  id="rsf" style="display: none;" name="ReferenceStringsFile" value="ReferenceStringsFile" onchange="fileNameB1(); loadFileAsTextB1();"/>
			<input type="button" value="Reference Strings File" onclick="document.getElementById('rsf').click();" />
		</form>
		
		
		<form action=""> <!--<label for="trs"> Select Tagged Reference Strings (.xml): <!</label> -->
			<input type="file" accept=".xml" id="trs" style="display: none;" name="TaggedReferenceStrings" value="TaggedReferenceStrings" id="trs" onchange="fileNameB2(); loadFileAsTextB2();"/>
			<input type="button" value="Tagged Reference String" onclick="document.getElementById('trs').click();" />
		</form>
		<p id="demo"></p>

		
		<p> Tag the Reference String:</p>
		<input type="radio" id="au" name="radio" value="author" checked>
			<label for="au"> author</label>
		
		<input type="radio" id="ye" name="radio" value="year">
			<label for="ye"> year</label>
		
		<input type="radio" id="ti" name="radio" value="title">
			<label for="ti"> title</label>
		
		<input type="radio" id="co" name="radio" value="container">
			<label for="co"> Container (e.g journal, book)</label>
		<br>
		<input type="radio" id="ed" name="radio" value="editorial board">
			<label for="ed"> editorial board</label>
		
		<input type="radio" id="ot" name="radio" value="others">
			<label for="ot"> others</label>
		<br>
		<br>
		<button type="button">Add a New Tag</button> <br>
		<br>
		<textarea id="ta1" cols="80" rows="5"></textarea>
		<p> Preview Reference String with XML tags:</p>
		<textarea id="ta2" cols="80" rows="7"></textarea> 
		<br>
		<button type="button" id="prev" onclick="prevLine();">Previous</button>
		<label id="count" style="padding-left:5px; padding-right:5px;"> 0/0 </label>
		<button type="button" id="next" onclick="nextLine();">Next</button>
		<span style="padding-left:312px">
		<button type="button">Export XML File</button>
		<br>
		<br>
		<label> <font color="red">ERROR!</font> </label>
	
	</body>
</html>