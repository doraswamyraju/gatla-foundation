<?php
// api/process_donation.php
// UPDATED: Handles PAN Number + Email Receipt

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Disable error display to client, enable logging
ini_set('display_errors', 0); 
error_reporting(E_ALL);

require_once 'config.php';

// Check for Libraries
$libs_missing = false;
if (!file_exists('libs/fpdf/fpdf.php') || !file_exists('libs/phpmailer/PHPMailer.php')) {
    $libs_missing = true;
} else {
    require('libs/fpdf/fpdf.php');
    require('libs/phpmailer/Exception.php');
    require('libs/phpmailer/PHPMailer.php');
    require('libs/phpmailer/SMTP.php');
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// 1. Get Data
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "No data received"]);
    exit;
}

$name = $data['name'];
$email = $data['email'];
$phone = $data['phone'];
$pan = $data['pan'] ?? 'N/A'; // Capture PAN
$amount = $data['amount'];
$payment_id = $data['payment_id'];

// 2. Save to Database
$conn = connectDB();
if (!$conn) {
    echo json_encode(["status" => "error", "message" => "DB Connection Failed"]);
    exit;
}

// Insert with PAN
// sssssds = 5 strings (name, email, phone, pan, payment_id) + 1 double (amount) ?? No order matters:
// SQL: name, email, phone, pan_number, amount, payment_id
$stmt = $conn->prepare("INSERT INTO donations (donor_name, email, phone, pan_number, amount, payment_id) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssds", $name, $email, $phone, $pan, $amount, $payment_id);

if ($stmt->execute()) {
    $receiptNo = $stmt->insert_id;
    
    if ($libs_missing) {
        echo json_encode(["status" => "success", "message" => "Donation saved (Email skipped: Libs missing)"]);
        exit;
    }

    // --- 3. GENERATE PDF ---
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
    $pdf->Cell(50, 10, 'Payment Ref:', 0, 0); $pdf->Cell(0, 10, $payment_id, 0, 1);
    
    $pdf->Ln(20);
    $pdf->SetFont('Arial', 'I', 10);
    $pdf->MultiCell(0, 5, "Thank you for your generous support. Your contribution helps us empower the visually impaired through education, sports, and music.");
    
    $pdf->Ln(30);
    $pdf->Cell(0, 10, 'Authorized Signatory', 0, 1, 'R');
    
    $pdfContent = $pdf->Output('S');
    
    // --- 4. SEND EMAIL ---
    $mail = new PHPMailer(true);
    
    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; 
        $mail->SMTPAuth   = true;
        $mail->Username   = 'drgatlasrinivasareddy@gmail.com'; 
        $mail->Password   = 'YOUR_GMAIL_APP_PASSWORD'; // <--- REPLACE THIS
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;
    
        $mail->setFrom('drgatlasrinivasareddy@gmail.com', 'Gatla Foundation');
        $mail->addAddress($email, $name);
    
        $mail->addStringAttachment($pdfContent, "Receipt_$receiptString.pdf");
    
        $mail->isHTML(true);
        $mail->Subject = 'Donation Receipt - Gatla Foundation';
        $mail->Body    = "Dear $name,<br><br>Thank you for your generous donation of <b>Rs. $amount</b>.<br>Your PAN ($pan) has been recorded.<br>Please find your official receipt attached.<br><br>Regards,<br>Gatla Foundation";
    
        $mail->send();
        
        echo json_encode(["status" => "success", "message" => "Donation saved and Receipt sent!"]);
        
    } catch (Exception $e) {
        echo json_encode(["status" => "success", "message" => "Saved, but Email Error: " . $mail->ErrorInfo]);
    }

} else {
    echo json_encode(["status" => "error", "message" => "Database Error: " . $stmt->error]);
}

$conn->close();
?>