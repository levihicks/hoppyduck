<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Hoppy Duck!</title>
    <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet"> 
    <link rel="Shortcut Icon" href="images/hoppyduck.png" type="image/x-icon">
    <link rel="stylesheet" href="styles/style.css">
  </head>

  <body>
    <form action="index.php" method="post">
	Name: <input type="text" name="name">
	<br>
	Score: <input type="number" name="score">
	<br>
	<input type="submit" value="submit">
    </form>
    <?php
	
	
	/*echo "Connected succesfully yoooo niiiice";
	if($_SERVER["REQUEST_METHOD"] == "POST"){
		$name = $_POST["name"];
		$score = $_POST["score"];
		$stmt = $conn->prepare("insert into highScores (name, score, id) values (?, ?, ?)");
		echo '1';

		$stmt->bind_param("sii", $name, $score, $scoreID);
		echo '2';
		$scoreID=1;
		$stmt->execute();
		echo '3';
		$stmt->close();
		$conn->close();
	}
	*/
		
	
    ?>
    <h1>Hoppy Duck!</h1>
    <p>'Space' or click to hop, 'r' to replay</p>
    <div class="score">Score: </div>
    <div class="canvasContainer">
	<canvas height="600" width="900"></canvas>
    </div>
	
    <?php include './phpFiles/scores.php'; ?>
    <script src="scripts/main.js"></script>
  </body>
</html>
