<?php

$dbhost = "182.50.133.146";
$dbuser = "auxstudDB6c";
$dbpass = "auxstud6cDB1!";
$dbname = "auxstudDB6c";

$connection = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);

if(mysqli_connect_errno()){
	die("DB connection failed: " . mysqli_connect_errno() . "(" . mysqli_connect_errno() . ")");
	echo "connection fail!";
}

$createTable="CREATE TABLE tbl_210_myTrunks(
		trunkNumber INT(11) NOT NULL PRIMARY KEY,
		trunkType VARCHAR(10),
		trunkLocation TEXT,
		trunkDest TEXT,
		trunkDate VARCHAR(15),
		trunkStatus VARCHAR(15))";

if(mysqli_query($connection,$createTable)){
	echo "table was created!";
} else{
	die("error !". mysqli_connect_errno());
}

$i = 53743;

mysqli_close($connection);
?>