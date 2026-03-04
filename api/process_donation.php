<?php
// api/process_donation.php
// UPDATED: Handles PAN Number + Email Receipt + PDF Layout Fix + SMTP Debug

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Disable error display to client, enable logging
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);

// Define logDebug globally
function logDebug($msg) {
    try {
        @file_put_contents('debug_log.txt', date('Y-m-d H:i:s') . " - " . $msg . "\n", FILE_APPEND);
    } catch (Exception $e) {}
}

try {
    logDebug("Script Started");

    if (!file_exists('config.php')) {
        throw new Exception("Configuration file missing (config.php)");
    }
    require_once 'config.php';
    logDebug("Config Loaded");

    // Check for Libraries
    if (!file_exists('libs/fpdf/fpdf.php') || !file_exists('libs/PHPMailer/PHPMailer.php')) {
        logDebug("Libs Missing");
        throw new Exception("Required libraries (FPDF or PHPMailer) are missing in api/libs/");
    } else {
        require('libs/fpdf/fpdf.php');
        require('libs/PHPMailer/Exception.php'); 
        require('libs/PHPMailer/PHPMailer.php'); 
        require('libs/PHPMailer/SMTP.php');       
        logDebug("Libs Loaded");
    }

    // 1. Get Data
    $raw_input = file_get_contents("php://input");
    logDebug("Input Received: " . $raw_input);
    $data = json_decode($raw_input, true);

    if (!$data) {
        throw new Exception("No input data received (JSON decode failed)");
    }

    $name = $data['name'];
    $email = $data['email'];
    $phone = $data['phone'];
    $pan = $data['pan'] ?? 'N/A';
    $amount = $data['amount'];
    $payment_id = $data['payment_id'];
    $club = $data['club'] ?? 'general';

    // Determine Table
    $tableMap = [
        'cricket' => 'cricket_donors',
        'music' => 'music_donors',
        'business' => 'business_donors',
        'education' => 'education_donors',
        'awards' => 'awards_donors',
        'general' => 'donations'
    ];
    $tableName = $tableMap[$club] ?? 'donations';

    // 2. Save to Database
    $conn = connectDB();
    if (!$conn) {
        throw new Exception("Database Connection Failed");
    }

    if ($tableName === 'donations') {
        $col_email = 'email'; $col_phone = 'phone'; $col_pan = 'pan_number';
    } else {
        $col_email = 'email_id'; $col_phone = 'phone_no'; $col_pan = 'pan_card_no';
    }

    $stmt = $conn->prepare("INSERT INTO $tableName (donor_name, $col_email, $col_phone, $col_pan, amount, payment_id) VALUES (?, ?, ?, ?, ?, ?)");
    if (!$stmt) throw new Exception("SQL Prepare Failed: " . $conn->error);

    $stmt->bind_param("ssssds", $name, $email, $phone, $pan, $amount, $payment_id);

    if ($stmt->execute()) {
        $receiptNo = $stmt->insert_id;
        logDebug("Insert Success. ID: " . $receiptNo);

        try {
            // --- 3. GENERATE PDF ---
            logDebug("Generating PDF...");
            $pdf = new FPDF();
            $pdf->AddPage();
            
            $pdf->SetFont('Arial', 'B', 18);
            $pdf->Cell(0, 12, 'GATLA FOUNDATION', 0, 1, 'C');
            $pdf->SetTextColor(71, 85, 105);
            $pdf->SetFont('Arial', 'B', 10);
            $pdf->Cell(0, 6, 'Contact: donation@gatlafoundation.org', 0, 1, 'C');
            $pdf->SetFont('Arial', '', 9);
            $pdf->Cell(0, 5, '#22-10-192, Near NGM Swimming Pool,', 0, 1, 'C');
            $pdf->Cell(0, 5, 'Koramenugunta, Tirupati (Urban), Andhra Pradesh, India-517501', 0, 1, 'C');
            $pdf->Ln(5);
            $pdf->Line(10, 48, 200, 48);
            
            $pdf->Ln(20);
            $pdf->SetFont('Arial', 'B', 14);
            $pdf->Cell(0, 10, 'DONATION RECEIPT', 0, 1, 'C');
            
            $pdf->SetFont('Arial', '', 12); $pdf->Ln(10);
            $receiptString = 'GF-' . date('Y') . '-' . str_pad($receiptNo, 4, '0', STR_PAD_LEFT);
            
            $pdf->Cell(50, 10, 'Receipt No:', 0, 0); $pdf->Cell(0, 10, $receiptString, 0, 1);
            $pdf->Cell(50, 10, 'Date:', 0, 0); $pdf->Cell(0, 10, date('d-m-Y'), 0, 1);
            $pdf->Cell(50, 10, 'Donor Name:', 0, 0); $pdf->Cell(0, 10, $name, 0, 1);
            $pdf->Cell(50, 10, 'PAN Number:', 0, 0); $pdf->Cell(0, 10, $pan, 0, 1); 
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
            $mail = new PHPMailer\PHPMailer\PHPMailer(true);
            
            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com'; 
            $mail->SMTPAuth   = true;
            $mail->Username   = 'gatlafoundation@gmail.com';
            $mail->Password   = 'qzzxfxfgnsdvfbgu';
            $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = 587;
            
            // SMTP VERBOSE DEBUG
            $mail->SMTPDebug = 2;
            $mail->Debugoutput = function($str, $level) {
                logDebug("SMTP ($level): $str");
            };
        
            // Recipients
            $mail->setFrom('gatlafoundation@gmail.com', 'Gatla Foundation');
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
        }

    } else {
        throw new Exception("Database Execute Failed: " . $stmt->error);
    }
    $conn->close();

} catch (Throwable $e) {
    logDebug("Fatal Error: " . $e->getMessage());
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
