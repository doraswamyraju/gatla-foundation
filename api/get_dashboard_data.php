<?php
// api/get_dashboard_data.php
// BULLETPROOF VERSION: Handles Fatal Errors & Enforces UTF-8

// 1. SILENCE HTML ERRORS (Prevent breaking JSON)
ini_set('display_errors', 0);
error_reporting(E_ALL);

// 2. SHUTDOWN HANDLER (Catches Crashes)
register_shutdown_function(function() {
    $error = error_get_last();
    if ($error && ($error['type'] === E_ERROR || $error['type'] === E_PARSE)) {
        if (ob_get_length()) ob_clean();
        header("Content-Type: application/json");
        echo json_encode(["status" => "error", "message" => "Fatal Error: " . $error['message']]);
        exit;
    }
});

// 3. START BUFFER & HEADERS
ob_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { 
    ob_clean(); http_response_code(200); exit(); 
}

// 4. CONNECT
if (!file_exists('config.php')) {
    ob_clean(); echo json_encode(["status" => "error", "message" => "config.php missing"]); exit();
}
require_once 'config.php';
$conn = connectDB();

if (!$conn) {
    ob_clean(); echo json_encode(["status" => "error", "message" => "Database Connection Failed"]); exit();
}

// 5. DATA FETCHING LOGIC
$dashboardData = [];

function fetchTableData($conn, $tableName, $selectFields, $reactKey, &$dashboardData, $dateColumn = 'submission_date') {
    // A. Check if table exists
    $check = $conn->query("SHOW TABLES LIKE '$tableName'");
    if (!$check || $check->num_rows == 0) {
        $dashboardData[$reactKey] = [];
        return;
    }

    // B. Build Query using the dynamic $dateColumn
    $cols = implode(', ', array_keys($selectFields));
    $sql = "SELECT $cols FROM $tableName ORDER BY $dateColumn DESC"; 
    $result = $conn->query($sql);

    $records = [];
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $item = [];
            foreach ($selectFields as $dbCol => $reactCol) {
                $val = $row[$dbCol] ?? '';
                $item[$reactCol] = mb_convert_encoding($val, 'UTF-8', 'UTF-8');
            }
            $records[] = $item;
        }
    }
    $dashboardData[$reactKey] = $records;
}

// --- FETCH MAPPINGS ---

// 1. GENERAL VOLUNTEER
fetchTableData($conn, 'general_volunteers', [
    'id' => 'id', 'full_name' => 'fullName', 'father_name' => 'fatherName',
    'phone_no' => 'phone', 'email_id' => 'email', 'address' => 'address',
    'interest_area' => 'interest', 'availability' => 'availability',
    'preferred_time' => 'preferredTime', 'document_path' => 'document',
    'status' => 'status', 'submission_date' => 'date'
], 'volunteer-form', $dashboardData);

// 2. DONATIONS
fetchTableData($conn, 'donations', [
    'id' => 'id', 
    'donor_name' => 'name', 
    'amount' => 'amount',
    'payment_status' => 'status', 
    'donation_date' => 'donation_date'
], 'donations-list', $dashboardData, 'donation_date');

// 3. CRICKET PLAYERS
fetchTableData($conn, 'cricket_players', [
    'id' => 'id', 'full_name' => 'fullName', 'phone_no' => 'phone',
    'category' => 'category', 'role' => 'role', 'status' => 'status',
    'submission_date' => 'date'
], 'cricket-player', $dashboardData);

// 4. EDUCATION STUDENTS
fetchTableData($conn, 'education_students', [
    'id' => 'id',
    'full_name' => 'fullName',           // Corrected from 'student_name'
    'father_name' => 'fatherName',       // Added to match Dashboard columns
    'phone_no' => 'phone',
    'school_college_name' => 'college',  // Corrected from 'institute_name'
    'current_class_year' => 'course',    // Added to match schema
    'status' => 'status',
    'submission_date' => 'date'
], 'education-student', $dashboardData);

// 5. MUSIC JUDGES
fetchTableData($conn, 'music_judges', [
    'id' => 'id', 'full_name' => 'fullName', 'phone_no' => 'phone',
    'exposure' => 'expertise', 'status' => 'status', 'submission_date' => 'date'
], 'music-judge', $dashboardData);

// 6. DEFAULTS (Prevent React Crashes on missing keys)
$defaults = [
    'cricket-umpire', 'cricket-club-member', 'education-scriber',
    'music-singer', 'music-member', 'business-member', 'business-entrepreneur',
    'awards-nomination', 'awards-sponsor'
];
foreach ($defaults as $k) {
    if (!isset($dashboardData[$k])) $dashboardData[$k] = [];
}

// 6. OUTPUT
ob_clean();
echo json_encode($dashboardData);
$conn->close();
?>