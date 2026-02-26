<?php
// api/update_events_schema.php
require_once 'config.php';
header("Content-Type: application/json");

try {
    $conn = connectDB();
    if (!$conn) throw new Exception("Database connection failed");

    // Check if end_date already exists
    $result = $conn->query("SHOW COLUMNS FROM events LIKE 'end_date'");
    if ($result->num_rows == 0) {
        $sql = "ALTER TABLE events ADD COLUMN end_date DATE AFTER event_date";
        if ($conn->query($sql) === TRUE) {
            // Initialize end_date with event_date for existing records
            $conn->query("UPDATE events SET end_date = event_date");
            echo json_encode(["status" => "success", "message" => "Column end_date added and initialized"]);
        } else {
            throw new Exception("Error adding column: " . $conn->error);
        }
    } else {
        echo json_encode(["status" => "success", "message" => "Column end_date already exists"]);
    }

    $conn->close();
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
