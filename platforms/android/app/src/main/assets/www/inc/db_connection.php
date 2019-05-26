<?php


	define( "DBHOST", "localhost" );

	define( "DBUSER", "ivanovak_user" );

	define( "DBPASS", "T^a~U%,{D+K=" );

	define( "DBNAME", "ivanovak_ct5006");

	$db = new PDO( "mysql:host=" . DBHOST . ";port=8889;dbname=" . DBNAME, DBUSER, DBPASS );

	$db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

	date_default_timezone_set( "Europe/London" );


	// $dbserver = "localhost";

	// $dbusername = "ivanovak_user";

	// $dbpassword = "T^a~U%,{D+K=";

	// $dbdatabase = "ivanovak_ct5006";

	// $connection = mysqli_connect( $dbserver, $dbusername, $dbpassword, $dbdatabase );

	// if( mysqli_connect_errno() ) {
		
	// 	echo "Failed to connect to the database because: " . mysqli_connect_error();
		
	// } else {
		
	// 	// echo "Succesfully connected to database";
		
	// }


?>