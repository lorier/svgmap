<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="bower_components/Snap.svg/dist/snap.svg.js"></script>
        <script src="svg.js"></script>
        <title>Untitled</title>
        <link rel="stylesheet" href="style.css">
        <link rel="author" href="humans.txt">
    </head>
    <body>
		<?php 
			if ( file_exists('map.svg') )
			{
				readfile('map.svg');
				exit();
			}
		 ?>

																				
    </body>
</html>