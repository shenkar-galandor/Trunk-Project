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
mysqli_set_charset($connection,"utf8");

$trunkType = $_POST['trunkT'];
$trunkLoc = $_POST['trunkLoc'];
$trunkDest = $_POST['trunkDest'];
$trunkDate = $_POST['trunkDate'];
$trunkStat = $_POST['trunkStatus'];


$query1 = "INSERT INTO tbl_210_myTrunks(trunkType,trunkLocation,trunkDest,trunkDate,trunkStatus) 
		VALUES (' ".$trunkType." ',' ".$trunkLoc." ',' ".$trunkDest." ',' ".$trunkDate." ',' ".$trunkStat." ')";
if (mysqli_query($connection,$query1)){
	echo "query success";
	$i++;
}else{
	echo $query1;
	echo "query failed";
}

mysqli_close($connection);
?>