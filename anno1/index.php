<html>
	<head>
		<title>GESIS Reference String Extraction Tool</title>
        <meta charset="utf-8">
		<link rel="stylesheet" href="style.css">
		<link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/jquery-ui.min.css" rel="stylesheet">
        <script src="js/jquery-3.2.1.min.js"></script>
        <script src="js/jquery-ui.min.js"></script>
</head>
<body>
    <div class="row textalignc" id="spinner" style="vertical-align: middle;">
       <!--<img src="images/page-loader.gif" > -->
    </div>
	<div class="container-fluid">
        <div class="popup" id="popupdiv">
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
        
        <div class="row pad-b-5 textalignc">
            <br/>
            <label id="lblMsg" style="color: red;"></label><br/>&nbsp;<label id="errorMsg" style="color: red;"></label>&nbsp;  
        </div>
        <div class="panel panel-default" >
            <div class="panel-body">
               
                <div class="row">
                    <div class="col-md-2  pad-b-5" >
                        <label for="btnUploadText" >Select File:(txt/xml)</label>
                    </div>
                    <div class="col-md-10 textalignl pad-b-5" >
                        <div style="display: inline-block !important;">
                            <input type="file" id="btnUploadText" class="btn btn-default" Text="Choose Text File" accept=".txt, .xml"  onchange="show_TextFile();"/>  
                        </div>
                        <div style="display: inline-block !important;">
                            <input id="btndeltxt" type="image" src="images/delete.png" alt="Delete Text File" width="24" height="24" style="display : none; ">                             
                        </div>
                        <div style="display: inline-block !important;">
                            <label id="txtSize" style="color: green;"></label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2 textalignl pad-b-5" >
                        <label for="btnUploadPdf" >Select PDF File:</label>
                    </div>
                                        
                    <div class="col-md-10 textalignl pad-b-5" >
                        <div style="display: inline-block !important;">
                            <input type="file" id="btnUploadPdf" class="btn btn-default" onchange="show_PdfFile();" accept=".pdf"/>
                        </div>
                        <div style="display: inline-block !important;">
                            <input id="btndelpdf" type="image" src="images/delete.png" alt="Delete pdf File" width="24" height="24" style="display : none; ">                             
                        </div>
                        <div style="display: inline-block !important;">
                            <label id="pdfSize" style="color: green;"></label>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-body">
                <div class="row">            
                    <div class="col-md-2 textalignl pad-b-5" >                        
                        <button class="btn btn-primary" id="btnInsertTag" value="au" type="button" onclick="change_TxtColor();">insert Tag</button>                        
                    </div>
                    <div class="col-md-2 textalignl pad-b-5">
                        <button class="btn btn-primary" id="btnRefex" value="au" type="button">get layout text by refex</button>   
                    </div>
                    <div class="col-md-4 textalignl pad-b-5">
                    &nbsp;
                    </div>
                    <div class="col-md-2 textalignl pad-b-5">
                        <button class ="btn btn-primary" type="button" onclick="saveText_AsXmlFile();">Export XML File</button>
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
                        <div class="col-md-6 " >
                            <div class="col-md-12 nowrap" >
                                <label id="content1" class="textLabel" Style="overflow:scroll;" ></label>	
                            </div>                            
                        </div>
                        <div class="col-md-6" >				
                            <iframe id="pdfiframe" width="100%" style="height:100%" align="centert" src=""></iframe>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="panel panel-info"> 
            <div class="panel-heading">
                <div class="row" id="showTagedTextdiv" style="cursor: pointer;">			
                    <div class="col-md-6" >
                        <h3 class="panel-title textalignl bold" id="showTagedTextdivHeader">Click here to Show Text with Tags.</h3>
                    </div>
                    <div class="col-md-6" >
                        <!--<button class ="btn btn-primary" type="button" id="btnUpdateTags">Update Tags</button>-->
                    </div>
                </div>                                
            </div> 
            <div class="panel-body"> 
                <div class="row pad-10" id="tagedTextdiv" style="display:none">            
                    <div class="col-md-12" style="display : none; ">                    
                        <textarea disabled id="txaxml" class="txaxml" ></textarea>
                    </div>            
                    <div class="col-md-12" style="overflow:scroll; height:400px;border: 1px solid #b3b3b3;">
                        <xmp id="ptxaxml" > </xmp>                        
                    </div>
                </div>
            </div>
        </div>
        <!--<div>
            <object id="" data="PDF/12826.pdf" type="application/pdf" width="100%" height="500">
                alt : <a href="PDF/12826.pdf">test.pdf</a>
            </object>
        </div>-->
    </div>
	<script type="text/javascript" src="scripts.js"></script>
	<script src="js/bootstrap.min.js"></script>
</body>
</html>