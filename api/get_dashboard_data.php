<?php
// api/get_dashboard_data.php

require_once 'config.php'; // Includes database connection setup

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed."]);
    exit();
}

$conn = connectDB();
if (!$conn) {
    http_response_code(500);
    echo json_encode(["message" => "Server error: Could not connect to database."]);
    exit();
}

$dashboardData = [];

// --- FUNCTION TO FETCH AND FORMAT DATA ---
function fetchTableData($conn, $tableName, $selectFields, $map, &$dashboardData) {
    // Dynamically select required fields and map them to React keys
    $sql = "SELECT " . implode(', ', array_keys($selectFields)) . " FROM " . $tableName . " ORDER BY submission_date DESC";
    $result = $conn->query($sql);
    
    $records = [];
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $record = [];
            foreach ($selectFields as $dbField => $reactField) {
                $record[$reactField] = $row[$dbField];
            }
            $records[] = $record; 
        }
    }
    $reactKey = str_replace('_', '-', $tableName);
    $dashboardData[$reactKey] = $records;
}


// --- 1. Music Judge Data Mapping (Functional) ---
$musicJudgeMap = [
    'id' => 'id',
    'full_name' => 'fullName',
    'phone_no' => 'phone',
    'email_id' => 'email',
    'qualification' => 'qualification',
    'status' => 'status',
    'submission_date' => 'date',
];
fetchTableData($conn, 'music_judges', $musicJudgeMap, $dashboardData);


// --- 2. Placeholders for other tables (Crucial for React Dashboard to load without errors) ---
$dashboardData['cricket-player'] = [];
$dashboardData['education-student'] = [];
$dashboardData['volunteer-form'] = []; 
$dashboardData['supporter-form'] = [];
$dashboardData['blog-manager'] = [];
// NOTE: These empty arrays match the keys expected by the React dashboard's Sidebar/DataTable.


http_response_code(200);
echo json_encode($dashboardData);

$conn->close();
?>