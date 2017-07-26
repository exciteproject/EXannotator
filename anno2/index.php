<html>
	<head>
		<link rel="stylesheet" href="style.css">
		<link href="css/bootstrap.min.css" rel="stylesheet">
		<title>GESIS Meta-data Extraction Tool</title>
		<script src="js/jquery-3.2.1.min.js"></script>
		<script type="text/javascript">
		</script>
	</head>

	<body>
	<div id="dvLoading" style="display:none"></div>
		<img src="img\loading.gif" id="img" style="display:none"/ >


		<div class="container-fluid">
			<div class="row">
			  &nbsp;&nbsp; 
			</div>
			<div class="row">
				<div class="col-md-2" >
					&nbsp;&nbsp;  
				</div>
				<div class="col-md-8">					
						<div class="row">
							<div class="col-md-2" >
								<form action=""> 
									<!--<label for="uploadbtn"> Select Reference Strings File (.txt): </label> -->
									<input type="file" accept=".txt, .xml"  id="uploadbtn" style="display: none;" name="ReferenceStringsFile" value="ReferenceStringsFile" onchange="checkfileType(this); "/>
									<input type="button" id="uploasfile" class="btn btn-default" value="Upload a File" onclick="document.getElementById('uploadbtn').click();"  />
								</form>
							</div>
							<div class="col-md-5 textalignc" >
								<label class="fileName" id="demo"></label>
							</div>
							<div class="col-md-2" >
							</div>
							<div class="col-md-2" >
								<button class="btn btn-default" onclick="location.reload();">Reload page</button>									
							</div>
						</div>					
	
						
						<!--<label id="ta1" class="textLabel">Please upload a File</label><!--note that ta1 isn't a textarea (anymore)-->
						<!--<textarea id="ta1" cols="80" rows="5">Please upload a file</textarea>-->						
						
						<div class="panel panel-info"> 
							<div class="panel-heading"> 
								<h3 class="panel-title textalignl bold">Tag the Reference String:</h3> 
							</div> 
							<div class="panel-body"> 
								<div class="row margin-bottom-10" >
									<div class="row mrg-0 textalignc">
										<div class="col-md-12 textalignl bold">
											<label id="content1" class="textLabel"></label> 
										</div>										
									</div>
									<div class="row mrg-0 textalignc pad-10 pad-lr-20">
										<div class="col-md-3">		
											<div class="row textalignl pad-b-5">
												<button style='background-color: #ff9681; display: none;' id="test" value="test" class="btn btn-default noborderbtn" type="button" onclick="test(this);">test</button>											
												<button style='background-color: #ff9681' id="au" value="au" class="btn btn-default noborderbtn" type="button" onclick="changeColor2(this);">author</button>
											</div>
											<div class="row textalignl pad-b-5">
												<button style='background-color: #ffce30' id="btnsurname" value="btnsurname" class="btn btn-default noborderbtn" type="button" onclick="changeColor2(this);">surname</button>												
											</div>
											<div class="row textalignl pad-b-5">
												<button style='background-color: #aabb30' id="btnfirstname" value="btnfirstname" class="btn btn-default noborderbtn" type="button" onclick="changeColor2(this);">first name</button>
											</div>																																						
										</div>
										<div class="col-md-3">	
											<div class="row textalignl pad-b-5">
												<button style='background-color: #bfb1d5' id="ye" value="ye" class="btn btn-default noborderbtn" type="button" onclick="changeColor2(this);">year</button>
											</div>
											<div class="row textalignl pad-b-5">
												<button style='background-color: #adddcf' id="ti" value="ti" class="btn btn-default noborderbtn" type="button" onclick="changeColor2(this);">title</button>
											</div>
										</div>
										<div class="col-md-3">	
										<div class="row textalignl pad-b-5">
												<button style='background-color: #fed88f' id="ed" value="ed" class="btn btn-default noborderbtn" type="button" onclick="changeColor2(this);">editorial board</button>																								
											</div>
											<div class="row textalignl pad-b-5">
												<button style='background-color: #f4858e' id="ot" value="ot" class="btn btn-default noborderbtn" type="button" onclick="changeColor2(this);">others</button>
											</div>
										</div>
										<div class="col-md-3">													
											<div class="row textalignl pad-b-5">
												<button style='background-color: #abe1fd' id="co" value="co" class="btn btn-default noborderbtn text-wrap" type="button" onclick="changeColor2(this);">Container (e.g journal, book)</button>												
											</div>
											<div class="row textalignl pad-b-5">
												<button style='background-color: #ffe1fd' id="delbtn" value="delbtn" class="btn btn-default noborderbtn text-wrap" type="button" onclick="RemoveTag(this);">Remove Tag</button>
											</div>
											
										</div>
										
									</div>								
									<div class="row mrg-0 textalignc" style="display: none;">
										<div class="col-md-5">		
											<div class="row textalignl">
												<button class="btn btn-default" type="button" onclick="changeColor();">Add Tag</button>
											</div>				
											<div class="row textalignl">
												&nbsp;&nbsp;													
											</div>		
											<div class="row textalignl">
												<input type="radio" id="au" name="radio" class="radioButtons" value="author" checked>
												<label for="au" style='background-color: #ff9681'>author</label>
											</div>
											<div class="row textalignl">
												&nbsp;&nbsp;<input type="radio" id="btnsurname" name="radio" class="radioButtons" value="surname">
												<label for="btnsurname" style='background-color: #ffce30'>surname</label>
											</div>
											<div class="row textalignl">
												&nbsp;&nbsp;<input type="radio" id="btnfirstname" name="radio" class="radioButtons" value="firstname">
												<label for="btnfirstname" style='background-color: #aabb30'>firstname</label>
											</div>																																						
										</div>
										<div class="col-md-7">													
											<div class="row textalignl">
												<input type="radio" id="co" name="radio" class="radioButtons" value="container">
												<label for="co" style='background-color: #abe1fd'>Container (e.g journal, book)</label>
											</div>
											<div class="row textalignl">
												<input type="radio" id="ed" name="radio" class="radioButtons" value="editor">
												<label for="ed" style='background-color: #fed88f'>editorial board</label>
											</div>
											<div class="row textalignl">
												<input type="radio" id="ot" name="radio" class="radioButtons" value="others">
												<label for="ot" style='background-color: #f4858e'>others</label>
											</div>
											<div class="row textalignl">
												<input type="radio" id="ye" name="radio" class="radioButtons" value="year">
												<label for="ye" style='background-color: #bfb1d5'>year</label>
											</div>
											<div class="row textalignl">
												<input type="radio" id="ti" name="radio" class="radioButtons" value="title">
												<label for="ti" style='background-color: #adddcf'>title</label>
											</div>
											</div>
									</div>
									
									
								</div> 
							</div> 
						</div>
							
						
						
						
						<div class="panel panel-info"> 
							<div class="panel-heading"> 
								<h3 class="panel-title textalignl bold">Preview Reference String with XML tags:</h3> 
							</div> 
							<div class="panel-body"> 
								<div class="row textalignc" >										
										<div class="row mrg-0 textalignc">
											<textarea disabled id="txaxml" class="txaxml" onkeyup="deletechar(event);" onkeydown="preventDeleteChar(event);"></textarea>
										</div>
										<div class="row mrg-0">
											<br/>									
											<div class="col-md-6">
												<div class="col-md-4">
													<button type="button" id="prev" class="btn btn-primary" onclick="gotoprevLine();">Previous</button>
												</div>
												<div class="col-md-4">
													<label class="btn btn-default btn-sm" id="count"> 0/0 </label>
												</div>
												<div class="col-md-4">
													<button type="button" id="next" class="btn btn-primary" onclick="gotonextLine();">Next</button>
												</div>
											</div>											
											<div class="col-md-6 textalignc">
												<button class ="btn btn-default" type="button" onclick="saveTextAsFile();">Export XML File</button>
											</div>
										</div>

										<div class="row">
											<label id="error"><font color="red"></font> </label>
											<!--<textarea id="tatest" cols="80" rows="30">Please upload a file</textarea>-->
										</div>
								 </div> 
							</div>																			
						</div>
						<!--<textarea id="tatest" cols="80" rows="30">Please upload a file</textarea>-->
				</div>
				<div class="col-md-2">
					&nbsp;&nbsp; 
				</div>
			</div>
		
		
		</div>
		<script src="js/bootstrap.min.js"></script>
		<script type="text/javascript" src="scripts.js"></script>
		

	</body>
</html>