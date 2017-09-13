<html>
 <head>
  <title>Test</title>
 </head>
 <body>
	<?php echo '<p>TEXT & PDF</p>';?>
	
	<form action="http://svko-excite-dev.gesis.intra/anno/TEXT">
		<input type="submit" value="Import Text file" />
	</form>
	
	<?php
	
	  echo "<iframe src=\"TEXT/PDF1.txt\" width=\"30%\" style=\"height:50%\"align=\"left\"></iframe>";
	  echo "<iframe src=\"PDF/PDF1.pdf\" width=\"40%\" style=\"height:50%\" align=\"centert\"></iframe>";
	  
	  
	
	?> 
 </body>
</html>