<?php
// api/process_donation.php
// UPDATED: Handles PAN Number + Email Receipt

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Disable error display to client, enable logging
// Enable Error Display for Debugging
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);

function logDebug($msg) {
    file_put_contents('debug_log.txt', date('Y-m-d H:i:s') . " - " . $msg . "\n", FILE_APPEND);
}

logDebug("Script Started");

require_once 'config.php';
logDebug("Config Loaded");

// Check for Libraries
$libs_missing = false;
// Updated to match Case Sensitivity (PHPMailer folder is capitalized on server usually if unzipped from official source, or matching local listing)
if (!file_exists('libs/fpdf/fpdf.php') || !file_exists('libs/PHPMailer/PHPMailer.php')) {
    logDebug("Libs Missing Checks Failed");
    $libs_missing = true;
} else {
    require('libs/fpdf/fpdf.php');
    require('libs/PHPMailer/Exception.php'); // Corrected
    require('libs/PHPMailer/PHPMailer.php'); // Corrected
    require('libs/PHPMailer/SMTP.php');       // Corrected
    logDebug("Libs Loaded");
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// 1. Get Data
$raw_input = file_get_contents("php://input");
logDebug("Input Received: " . $raw_input);
$data = json_decode($raw_input, true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "No data received"]);
    exit;
}

$name = $data['name'];
$email = $data['email'];
$phone = $data['phone'];
$pan = $data['pan'] ?? 'N/A';
$amount = $data['amount'];
$payment_id = $data['payment_id'];
$club = $data['club'] ?? 'general'; // Default to general

// Determine Table
$tableMap = [
    'cricket' => 'cricket_donors',
    'music' => 'music_donors',
    'business' => 'business_donors',
    'education' => 'education_donors',
    'awards' => 'awards_donors', // Added Awards Logic
    'general' => 'donations'
];
$tableName = $tableMap[$club] ?? 'donations';
logDebug("Table Selected: $tableName");

// 2. Save to Database
$conn = connectDB();
if (!$conn) {
    logDebug("DB Connect Failed");
    echo json_encode(["status" => "error", "message" => "DB Connection Failed"]);
    exit;
}

// Prepare Column Names based on table
// Prepare Column Names based on table
// 'donations' table has 'email', 'phone', 'pan_number'
// Club tables have 'email_id', 'phone_no', 'pan_card_no'
if ($tableName === 'donations') {
    $col_email = 'email';
    $col_phone = 'phone';
    $col_pan   = 'pan_number';
} else {
    $col_email = 'email_id';
    $col_phone = 'phone_no';
    $col_pan   = 'pan_card_no';
}

// Insert with PAN and Payment ID
$stmt = $conn->prepare("INSERT INTO $tableName (donor_name, $col_email, $col_phone, $col_pan, amount, payment_id) VALUES (?, ?, ?, ?, ?, ?)");

if (!$stmt) {
     logDebug("Prepare Failed: " . $conn->error);
     echo json_encode(["status" => "error", "message" => "SQL Error: " . $conn->error]);
     exit;
}

$stmt->bind_param("ssssds", $name, $email, $phone, $pan, $amount, $payment_id);

if ($stmt->execute()) {
    $receiptNo = $stmt->insert_id;
    logDebug("Insert Success. ID: " . $receiptNo);
    
    if ($libs_missing) {
        echo json_encode(["status" => "success", "message" => "Donation saved (Email skipped: Libs missing)"]);
        exit;
    }

    try {
        // --- 3. GENERATE PDF ---
        logDebug("Generating PDF...");
        $pdf = new FPDF();
        $pdf->AddPage();
        
        // Header
        $pdf->SetFont('Arial', 'B', 16);
        $pdf->Cell(0, 10, 'GATLA FOUNDATION', 0, 1, 'C');
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(0, 5, 'Excellence in Service - Tirupati', 0, 1, 'C');
        $pdf->Cell(0, 5, 'Email: drgatlasrinivasareddy@gmail.com', 0, 1, 'C');
        $pdf->Line(10, 30, 200, 30);
        
        // Receipt Details
        $pdf->Ln(20);
        $pdf->SetFont('Arial', 'B', 14);
        $pdf->Cell(0, 10, 'DONATION RECEIPT', 0, 1, 'C');
        
        $pdf->SetFont('Arial', '', 12);
        $pdf->Ln(10);
        
        $receiptString = 'GF-' . date('Y') . '-' . str_pad($receiptNo, 4, '0', STR_PAD_LEFT);
        
        // Receipt Data
        $pdf->Cell(50, 10, 'Receipt No:', 0, 0); $pdf->Cell(0, 10, $receiptString, 0, 1);
        $pdf->Cell(50, 10, 'Date:', 0, 0); $pdf->Cell(0, 10, date('d-m-Y'), 0, 1);
        $pdf->Cell(50, 10, 'Donor Name:', 0, 0); $pdf->Cell(0, 10, $name, 0, 1);
        $pdf->Cell(50, 10, 'PAN Number:', 0, 0); $pdf->Cell(0, 10, $pan, 0, 1); // Added PAN
        $pdf->Cell(50, 10, 'Amount:', 0, 0); 
        $pdf->SetFont('Arial', 'B', 12); $pdf->Cell(0, 10, 'Rs. ' . number_format($amount, 2) . '/-', 0, 1);
        $pdf->SetFont('Arial', '', 12);
        $pdf->Cell(50, 10, 'Payment Ref:', 0, 0); $pdf->Cell(0, 10, (string)$payment_id, 0, 1);
        
        $pdf->Ln(20);
        $pdf->SetFont('Arial', 'I', 10);
        $pdf->MultiCell(0, 5, "Thank you for your generous support. Your contribution helps us empower the visually impaired through education, sports, and music.");
        
        $pdf->Ln(30);
        $pdf->Cell(0, 10, 'Authorized Signatory', 0, 1, 'R');
        
        $pdfContent = $pdf->Output('S');
        logDebug("PDF Generated.");
        
        // --- 4. SEND EMAIL ---
        logDebug("Sending Email...");
        $mail = new PHPMailer(true);
        
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; 
        $mail->SMTPAuth   = true;
        $mail->Username   = 'rajugariventures@gmail.com'; 
        $mail->Password   = 'znejpufbvcwqcast'; // App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;
    
        $mail->setFrom('rajugariventures@gmail.com', 'Gatla Foundation');
        $mail->addAddress($email, $name);
    
        $mail->addStringAttachment($pdfContent, "Receipt_$receiptString.pdf");
    
        $mail->isHTML(true);
        $mail->Subject = 'Donation Receipt - Gatla Foundation';
        $mail->Body    = "Dear $name,<br><br>Thank you for your generous donation of <b>Rs. $amount</b>.<br>Your PAN ($pan) has been recorded.<br>Please find your official receipt attached.<br><br>Regards,<br>Gatla Foundation";
    
        $mail->send();
        logDebug("Email Sent Successfully.");
        
        echo json_encode(["status" => "success", "message" => "Donation saved and Receipt sent!"]);
        
    } catch (Exception $e) {
        logDebug("Email/PDF Error: " . $e->getMessage());
        echo json_encode(["status" => "success", "message" => "Saved, but Email Error: " . $e->getMessage()]);
    } catch (Throwable $e) {
        logDebug("Fatal Error: " . $e->getMessage());
        echo json_encode(["status" => "error", "message" => "Fatal Error: " . $e->getMessage()]);
    }

} else {
    logDebug("Execute Failed: " . $stmt->error);
    echo json_encode(["status" => "error", "message" => "Database Error: " . $stmt->error]);
}

$conn->close();
?>