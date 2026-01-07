<?php
// api/test_api.php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h3>1. Checking Configuration...</h3>";

if (file_exists('config.php')) {
    echo "Config file found.<br>";
    require_once 'config.php';
} else {
    die("ERROR: config.php is missing.");
}

echo "<h3>2. Testing Database Connection...</h3>";
$conn = connectDB();

if ($conn) {
    echo "<span style='color:green'>Database Connected Successfully!</span><br>";
} else {
    die("<span style='color:red'>Database Connection FAILED. Check db_env.php</span>");
}

echo "<h3>3. Checking Tables...</h3>";
$tables = ['general_volunteers', 'cricket_players', 'music_judges', 'education_students'];

foreach ($tables as $table) {
    $check = $conn->query("SHOW TABLES LIKE '$table'");
    if ($check && $check->num_rows > 0) {
        echo "Table <b>$table</b>: <span style='color:green'>EXISTS</span>";
        
        // Count rows
        $count = $conn->query("SELECT COUNT(*) as c FROM $table")->fetch_assoc()['c'];
        echo " ($count records found)<br>";
        
    } else {
        echo "Table <b>$table</b>: <span style='color:red'>MISSING (Run SQL)</span><br>";
    }
}
?>