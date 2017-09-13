<html>
	<head>
		<title>GESIS Reference String Extraction Tool</title>
		<link rel="stylesheet" href="style.css">
		<link href="css/bootstrap.min.css" rel="stylesheet">
		<script type="text/javascript" src="scripts.js"></script>
		<script src="js/bootstrap.min.js"></script>
	</head>
	<body>
		<div class="container-fluid">
			<div class="row">
			  &nbsp;&nbsp; 
			</div>
			<div class="row">
				<div class="col-md-2" >
				&nbsp;&nbsp; 
				</div>
				<div class="col-md-2 textalignc" >
					<form action=""> 
						<input type="file" accept=".txt, .xml"  id="uploadbtn" style="display: none;" name="ReferenceStringsFile" value="ReferenceStringsFile" onchange="checkfileType(this); "/>
						<input type="button" class="btn btn-default" value="Upload a File" onclick="document.getElementById('uploadbtn').click();"  />
					</form>
				</div>
				<div class="col-md-2 textalignc" >
					<label class="fileName" id="demo"></label>
				</div>
				<div class="col-md-2" >
				&nbsp;&nbsp; 
				</div>
				<div class="col-md-2 textalignc" >
					<button class="btn btn-default" onclick="location.reload();">Reload page</button>									
				</div>
			</div>
			<div class="row">
				<div class="col-md-1" >
					<div class="row textalignl pad-b-5 textalignc">						
						<input type="button" style='background-color: #ff9681' id="addtag" value="Open ref" onclick="addTagSel('ref','content1')" />													
					</div>  
				</div>
				
				<div class="col-md-10" >
					<div class="col-md-6" >										
						<textarea id="content1" class="txaxml" ></textarea>							
					</div>
					<div class="col-md-6" >				
						<iframe src="PDF/PDF1.pdf" width="100%" style="height:100%" align="centert"></iframe>
					</div>
				</div>
				<div class="col-md-1">
					&nbsp;&nbsp;  
				</div>
			</div>		
		</div>	
	</body>
</html>