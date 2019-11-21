<?php

	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "hoppyduck";
	$conn = new mysqli($servername, $username, $password,$dbname);
	if($conn->connect_error){
		die("Connection failed: " . $conn->connect_error);
	}
	$sql = "SELECT name as 'NAME', score as 'SCORE' from highScores order by score desc";
	$result = $conn->query($sql);
	echo "<table id=\"highScores\"><tr><th>NAME</th><th>SCORE</th></tr>";	
	if($result->num_rows > 0){
		while($row = $result->fetch_assoc()){
			echo "<tr><td>" . $row["NAME"] . "</td><td>" . $row["SCORE"] ."</td></tr>";
		}
	}
	for($i=$result->num_rows; $i < 10; $i++){
		echo "<tr><td>-</td><td>-</td></tr>";
	}
	echo "</table>";
	$conn->close();
?>
