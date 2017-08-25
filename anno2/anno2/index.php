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
                    <div class="panel panel-default" >
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6" >                                    
                                    <input type="file" accept=".txt, .xml"  id="uploadbtn" style="display: none;" name="ReferenceStringsFile" value="ReferenceStringsFile" onchange="checkfileType(this); "/>
                                    <input type="button" id="uploasfile" class="btn btn-primary" value="Select File ( txt/xml )" onclick="document.getElementById('uploadbtn').click();"  />                                    
                                </div>
                                
                                <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6" >
                                    <button id="btnLoadSession" class="btn btn-primary">Load Last Session</button>
                                </div>
                                
                                <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6" >
                                    <button class ="btn btn-primary" type="button" onclick="saveTextAsFile();">Export File as XML</button>
                                </div>
                                <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6" >
                                    <button id="btnReload" class="btn btn-success" >Reload page</button>									
                                </div>
                            </div>					
                        </div>
                    </div>
						
						<!--<label id="ta1" class="textLabel">Please upload a File</label><!--note that ta1 isn't a textarea (anymore)-->
						<!--<textarea id="ta1" cols="80" rows="5">Please upload a file</textarea>-->						
						
						<div class="panel panel-info"> 
							<div class="panel-heading"> 
								<h3 class="panel-title textalignl bold">Tag the Reference String:&nbsp;&nbsp;<label class="fileName" id="demo"></label></h3> 
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
												<button style='background-color: #ff9681' id="btnauthor" value="btnauthor" class="btn btn-default noborderbtn" type="button" onclick="changeColor2(this);">author</button>
											</div>
                                            <div class="row textalignl pad-b-5">
												<button style='background-color: #aabb30' id="btnfirstname" value="btnfirstname" class="btn btn-default noborderbtn" type="button" onclick="changeColor2(this);">first name</button>
											</div>
											<div class="row textalignl pad-b-5">
												<button style='background-color: #ffce30' id="btnsurname" value="btnsurname" class="btn btn-default noborderbtn" type="button" onclick="changeColor2(this);">surname</button>												
											</div>
										</div>
										<div class="col-md-3">	
											<div class="row textalignl pad-b-5">
												<button style='background-color: #bfb1d5' id="btnyear" value="btnyear" class="btn btn-default noborderbtn" type="button" onclick="changeColor2(this);">year</button>
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
											<div class="col-md-12">
                                                <div class="col-md-2">
                                                    &nbsp;&nbsp; 
                                                </div>
                                                <div class="col-md-8">
                                                    <div style="display: inline-block !important;">
                                                        <button type="button" id="btnfirst" class="btn btn-primary" onclick="gotofirstLine();">First</button>&nbsp; 
                                                    </div>
                                                    <div style="display: inline-block !important;">
                                                        <button type="button" id="prev" class="btn btn-primary" onclick="gotoprevLine();">Prev</button>&nbsp; 
                                                    </div>
                                                    <div style="display: inline-block !important;">
                                                        <label class="btn btn-default btn-sm" id="count" style="font-weight: bold;"> 0/0 </label>&nbsp; 
                                                    </div>
                                                    <div style="display: inline-block !important;">
                                                        <button type="button" id="next" class="btn btn-primary" onclick="gotonextLine();">Next</button>&nbsp; 
                                                    </div>
                                                    <div style="display: inline-block !important;">
                                                        <button type="button" id="btnlast" class="btn btn-primary" onclick="gotolastLine();">Last</button>
                                                    </div>
                                                </div>
                                                <div class="col-md-2">
                                                    &nbsp;&nbsp; 
                                                </div>
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