<html>
	<head>
		<title>GESIS Reference String Extraction Tool</title>
        <meta charset="utf-8">
		<link rel="stylesheet" href="style.css">
		<link href="css/bootstrap.min.css" rel="stylesheet">
        <script src="js/jquery-3.2.1.min.js"></script>
        <script type="text/javascript">
           
        </script>
</head>
<body>
    <div class="row textalignc" id="spinner" style="vertical-align: middle;">
       <!--<img src="images/page-loader.gif" > -->
    </div>
        
    </div>
	<div class="container-fluid">
        <div class="popup">
            <span class="popuptext" id="myPopup">
                <div class="row textalignc">
                    <div class="row textalignc">
                        Remove Tag?!
                    </div>
                    <div class="row textalignc">                    
                        <div class="col-md-12" >
                            <button style='background-color: #C0D4EE' id="delbtn" value="delbtn" class="btn btn-default noborderbtn text-wrap" type="button" onclick="RemoveTag(this);">Yes</button>                                       
                            <button style='background-color: #C0D4EE' id="delbtnno" value="delbtnno" class="btn btn-default noborderbtn text-wrap" type="button" onclick="">No</button>                   
                        </div>                    
                    </div>
                </div>
            </span>
        </div>
        
        <div class="row">
                    &nbsp;&nbsp;  
        </div>
        <div class="panel panel-default" >
            <div class="panel-body">
               
                <div class="row">
                    <div class="col-md-1  pad-b-5" >
                        <label for="btnUploadText" >Select Text File: </label>
                    </div>
                    <div class="col-md-2 textalignl pad-b-5" >                        
                        <input type="file" id="btnUploadText" class="btn btn-default" Text="Choose Text File" accept=".txt, .xml"  onchange="show_TextFile();"/>                            
                    </div>
                    <div class="col-md-2 textalignl pad-b-5" >
                        <label id="txtSize" style="color: green;"></label>
                    </div>
                    <div class="col-md-3 textalignl pad-b-5" >
                        <label id="errorMsg" style="color: red;"></label>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-1 textalignl pad-b-5" >
                        <label for="btnUploadText" >Select PDF File: </label>
                    </div>
                                        
                    <div class="col-md-2 textalignl pad-b-5" >
                        <input type="file" id="btnUploadPdf" class="btn btn-default" onchange="show_PdfFile();" accept=".pdf"/>
                    </div>
                    <div class="col-md-1 textalignl pad-b-5" >
                         <label id="pdfSize" style="color: green;"></label>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-body">
                <div class="row">            
                    <div class="col-md-2 textalignl pad-b-5" >                        
                        <button style='background-color: #ff9681' id="btnInsertTag" value="au" class="btn btn-default noborderbtn" type="button" onclick="change_TxtColor(this);">insert Tag</button>                        
                    </div>          
                    <div class="col-md-6 textalignl pad-b-5">
                        <button style='background-color: #8DB6CD' id="btnUpdateTag" value="trs" class="btn btn-default noborderbtn" type="button" >Update Tags</button>                        
                    </div>
                    <div class="col-md-2 textalignl pad-b-5">
                        <button class ="btn btn-info" type="button" onclick="saveText_AsXmlFile();">Export XML File</button>
                    </div>
                    
                    <div class="col-md-2 textalignl pad-b-5" >
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
                <textarea disabled id="txaxml" class="txaxml" ></textarea>
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