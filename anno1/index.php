<html>
	<head>
		<title>GESIS Reference String Extraction Tool</title>
        <meta charset="utf-8">
		<link rel="stylesheet" href="style.css">
		<link href="css/bootstrap.min.css" rel="stylesheet">
        <script src="js/jquery-3.2.1.min.js"></script>
        <script type="text/javascript">
        var popUpFlag = false;

        $(document).click(function(event){
            if(popUpFlag == true)
            {
                document.getElementById("myPopup").classList.toggle("show");
                popUpFlag = false;
            }
        });

        $(".col-md-6").click(function(event) {
            event.stopPropagation(); // i read that this might be harmful to other functions
        });

        $("#content1").click(function(event) 
        {
            var par = getSelectionParentElement().nodeName;
            var popup = document.getElementById("myPopup");
            if(par == "SPAN")
            {
                $('#myPopup').css('left',event.pageX-50 ); // -14 and -310 account for the top and left border(maybe there is an other way)
                $('#myPopup').css('top',event.pageY-50 );
                $('#myPopup').css('display','inline');     
                $("#myPopup").css("position", "absolute");
                popup.classList.toggle("show");
                if(popUpFlag == false)
                {
                    popUpFlag= true;
                }
                
            }
        });
        </script>
</head>
<body>
	<div class="container-fluid">
    <div class="popup">
        <span class="popuptext" id="myPopup">popup!</span>
        </div>
        <div class="row">
                    &nbsp;&nbsp;  
        </div>
        <div class="panel panel-default" >
            <div class="panel-body">
               
                <div class="row">
                    <div class="col-md-1 textalignl pad-b-5" >
                        <label for="uploadbtn" >Select Text File: </label>
                    </div>
                    <div class="col-md-2 textalignl pad-b-5" >
                        <form action=""> 
                            <input type="file"  class="btn btn-default"Text="Choose Text File" accept=".txt, .xml"  id="uploadbtn" name="ReferenceStringsFile" value="ReferenceStringsFile" onchange="checkfileType(this); "/>
                            <input type="button" class="btn btn-default" style="display: none;" value="Choose Text File" onclick="document.getElementById('uploadbtn').click();"  />
                        </form>
                    </div>
                    <div class="col-md-2 textalignl pad-b-5" >
                        <label id="errorMsg" style="color: red;"></label>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-1 textalignl pad-b-5" >
                        <label for="uploadbtn" >Select PDF File: </label>
                    </div>
                    <div class="col-md-2 textalignl pad-b-5" >
                        <input type="file" id="file-input" class="btn btn-default" onchange="assignPdf(this);" accept=".pdf"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-body">
                <div class="row">            
                    <div class="col-md-1 textalignl pad-b-5" >                        
                        <button style='background-color: #ff9681' id="au" value="au" class="btn btn-default noborderbtn" type="button" onclick="changeColor2(this);">insert Tag</button>                        
                    </div>
                    <div class="col-md-1 textalignl pad-b-5">
                        <button style='background-color: #ffe1fd' id="delbtn" value="delbtn" class="btn btn-default noborderbtn text-wrap" type="button" onclick="RemoveTag(this);">Remove Tag</button>
                    </div>
                    <div class="col-md-2 textalignc pad-b-5" >
                        <label class="fileName" id="demo" style="display: none;"></label>
                    </div>
                    <div class="col-md-5 textalignc pad-b-5" >
                        &nbsp;&nbsp;  
                    </div>
                    
                    <div class="col-md-1 textalignl pad-b-5">
                        <button class ="btn btn-info" type="button" onclick="saveTextAsFile();">Export XML File</button>
                    </div>
                    
                    <div class="col-md-1 textalignl pad-b-5" >
                        <button class="btn btn-success" onclick="location.reload();">Reload page</button>									
                    </div>
                </div>
            </div>
        </div>
        
        <div class="panel panel-default">
            <div class="panel-body">
                <div class="row">			
                    <div class="col-md-12" >
                        <div class="col-md-6" >                    
                            <label id="content1" class="textLabel" Style="overflow:scroll;" ></label>				
                        </div>
                        <div class="col-md-6" >				
                            <iframe id="pdfiframe" width="100%" style="height:100%" align="centert" src=""></iframe>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6" >
                <textarea disabled id="txaxml" class="txaxml" onkeyup="deletechar(event);" onkeydown="" onclick="test()" ></textarea>
            </div>
             <div class="col-md-6" >
                &nbsp;&nbsp;  
             </div>
        </div>
	</div>
	<script type="text/javascript" src="scripts.js"></script>
	<script src="js/bootstrap.min.js"></script>
</body>
</html>