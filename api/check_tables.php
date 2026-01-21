<?php
require 'db_env.php';

$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SHOW TABLES";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo $row["Tables_in_" . DB_NAME] . "\n";
    }
} else {
    echo "0 results";
}
$conn->close();
?>
