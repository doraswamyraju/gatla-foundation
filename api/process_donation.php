<?php
// api/process_donation.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Load Database Config
require_once 'config.php';

// Load Libraries
require('libs/fpdf/fpdf.php');
require('libs/phpmailer/Exception.php');
require('libs/phpmailer/PHPMailer.php');
require('libs/phpmailer/SMTP.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// 1. Get POST Data
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "No data received"]);
    exit;
}

$name = $data['name'];
$email = $data['email'];
$phone = $data['phone'];
$amount = $data['amount'];
$payment_id = $data['payment_id'];

// 2. Insert into Database
$conn = connectDB();
if (!$conn) {
    echo json_encode(["status" => "error", "message" => "DB Connection Failed"]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO donations (donor_name, email, phone, amount, payment_id) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssis", $name, $email, $phone, $amount, $payment_id);

if ($stmt->execute()) {
    $receiptNo = $stmt->insert_id;
    
    // 3. Generate PDF Receipt
    $pdf = new FPDF();
    $pdf->AddPage();
    $pdf->SetFont('Arial', 'B', 16);
    
    // Header
    $pdf->Cell(0, 10, 'GATLA FOUNDATION', 0, 1, 'C');
    $pdf->SetFont('Arial', '', 10);
    $pdf->Cell(0, 5, 'Excellence in Service - Tirupati', 0, 1, 'C');
    $pdf->Cell(0, 5, 'Email: drgatlasrinivasareddy@gmail.com | Phone: +91 70131 38080', 0, 1, 'C');
    $pdf->Line(10, 30, 200, 30);
    
    // Receipt Body
    $pdf->Ln(20);
    $pdf->SetFont('Arial', 'B', 14);
    $pdf->Cell(0, 10, 'DONATION RECEIPT', 0, 1, 'C');
    
    $pdf->SetFont('Arial', '', 12);
    $pdf->Ln(10);
    
    $pdf->Cell(50, 10, 'Receipt No:', 0, 0);
    $pdf->Cell(0, 10, 'GF-' . date('Y') . '-' . str_pad($receiptNo, 4, '0', STR_PAD_LEFT), 0, 1);
    
    $pdf->Cell(50, 10, 'Date:', 0, 0);
    $pdf->Cell(0, 10, date('d-m-Y'), 0, 1);
    
    $pdf->Cell(50, 10, 'Donor Name:', 0, 0);
    $pdf->Cell(0, 10, $name, 0, 1);
    
    $pdf->Cell(50, 10, 'Amount:', 0, 0);
    $pdf->SetFont('Arial', 'B', 12);
    $pdf->Cell(0, 10, 'Rs. ' . number_format($amount, 2) . '/-', 0, 1);
    
    $pdf->SetFont('Arial', '', 12);
    $pdf->Cell(50, 10, 'Payment ID:', 0, 0);
    $pdf->Cell(0, 10, $payment_id, 0, 1);
    
    $pdf->Ln(20);
    $pdf->SetFont('Arial', 'I', 10);
    $pdf->MultiCell(0, 5, "Thank you for your generous support. Your contribution helps us empower the visually impaired through education, sports, and music.");
    
    $pdf->Ln(30);
    $pdf->Cell(0, 10, 'Authorized Signatory', 0, 1, 'R');
    
    // Output PDF to String (S = Return as string)
    $pdfContent = $pdf->Output('S');
    
    // 4. Send Email
    $mail = new PHPMailer(true);
    
    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; 
        $mail->SMTPAuth   = true;
        $mail->Username   = 'rajugariventures@gmail.com'; 
        $mail->Password   = 'ompzmpaloliokzdi'; // <--- PUT YOUR APP PASSWORD HERE
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;
    
        $mail->setFrom('drgatlasrinivasareddy@gmail.com', 'Gatla Foundation');
        $mail->addAddress($email, $name);
    
        $mail->addStringAttachment($pdfContent, "Receipt_GF_{$receiptNo}.pdf");
    
        $mail->isHTML(true);
        $mail->Subject = 'Thank You for Your Donation - Gatla Foundation';
        $mail->Body    = "Dear $name,<br><br>Thank you for your generous donation of <b>Rs. $amount</b>.<br>Please find your official receipt attached.<br><br>Regards,<br>Gatla Foundation Team";
    
        $mail->send();
        echo json_encode(["status" => "success", "message" => "Donation recorded and Receipt sent!"]);
        
    } catch (Exception $e) {
        // Even if email fails, database record is safe
        echo json_encode(["status" => "success", "message" => "Donation recorded, but email failed."]);
    }

} else {
    echo json_encode(["status" => "error", "message" => "Database Insert Failed"]);
}

$conn->close();
?>