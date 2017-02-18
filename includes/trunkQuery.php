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

$query = "SELECT * FROM tbl_210_myTrunks";

if (!($result = mysqli_query($connection,$query))) {
	echo "error!";
	die("DB connection failed: " . mysqli_connect_errno() . "(" . mysqli_connect_errno() . ")");
}
echo "<table class='table table-bordered myTrunkTable'>
	    <thead>
	      <tr>
	        <th class='hideMe'>מספר הובלה</th>
	        <th>סוג הובלה</th>
	        <th>מיקום</th>
	        <th>יעד</th>
	        <th>תאריך</th>
	        <th>הצעות</th>
	        <th>סטטוס הובלה</th>
	      </tr>
	    </thead>
	    <tbody>
	 	 <tr>
	        <td class='hideMe'>165487</td>
	        <td>מעבר דירה</td>
	        <td>התפוז 15 אשקלון</td>
	        <td>דרך יבנה 17 רחובות</td>
	        <td>25/08/16</td>
	        <td class='text-center'><button type='button' id='#myModal' data-toggle='modal' data-target='#myModal'><p>חר הצעה</p><span>1</span></button></td>
	        <td class='awating'>ממתין לאישור</td>
	      </tr>";

$status = null;
while ($row = mysqli_fetch_assoc($result)){
	echo '<tr>';					
	echo '<td class="hideMe">'.$row["trunkNumber"].'</th>';
	echo '<td>'.$row["trunkType"].'</td>';
	echo '<td>'.$row["trunkLocation"].'</td>';
	echo '<td>'.$row["trunkDest"].'</td>';
	echo '<td>'.$row["trunkDate"].'</td>';
	echo '<td class="text-center"><button type="button" id="#myModal" data-toggle="modal" data-target="#myModal"><p>בחר הצעה</p></button></td>';
	if($row["trunkStatus"] == "מאושר") {
		$status = "approved";
	}
	else {
		$status = "awating";
	}
	echo '<td class="'.$status.'">'.$row["trunkStatus"].'</td>';
	echo '</tr>';
}

        echo '</tbody>';
        echo '</table>';

        mysqli_close($connection);
?>