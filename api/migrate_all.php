<?php
// api/migrate_all.php
require_once 'config.php';
$conn = connectDB();

if (!$conn) {
    die("Database connection failed.\n");
}

echo "Starting database migrations for Gatla Foundation...\n\n";

$queries = [];

// 1. Admin Table
$queries['admin'] = "CREATE TABLE IF NOT EXISTS `admin` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `email` varchar(255) NOT NULL UNIQUE,
    `password` varchar(255) NOT NULL,
    `reset_token` varchar(255) DEFAULT NULL,
    `reset_expires` datetime DEFAULT NULL,
    `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

// 2. Cricket Members
$queries['cricket_members'] = "CREATE TABLE IF NOT EXISTS `cricket_members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) DEFAULT NULL,
  `father_name` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `phone_no` varchar(50) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `aadhaar_no` varchar(50) DEFAULT NULL,
  `disability_cert_no` varchar(50) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `aadhaar_path` varchar(255) DEFAULT NULL,
  `disability_cert_path` varchar(255) DEFAULT NULL,
  `photo_path` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Pending',
  `submission_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

// 3. Cricket Players
$queries['cricket_players'] = "CREATE TABLE IF NOT EXISTS `cricket_players` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) DEFAULT NULL,
  `father_name` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `phone_no` varchar(50) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `aadhaar_no` varchar(50) DEFAULT NULL,
  `disability_cert_no` varchar(50) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `aadhaar_path` varchar(255) DEFAULT NULL,
  `disability_cert_path` varchar(255) DEFAULT NULL,
  `photo_path` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Pending',
  `submission_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

// 4. Donations Table
$queries['donations'] = "CREATE TABLE IF NOT EXISTS `donations` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `donor_name` varchar(255) NOT NULL,
    `email` varchar(255) DEFAULT NULL,
    `phone` varchar(50) DEFAULT NULL,
    `pan_number` varchar(50) DEFAULT NULL,
    `amount` decimal(10,2) NOT NULL,
    `payment_id` varchar(255) DEFAULT NULL,
    `payment_status` varchar(50) DEFAULT 'Success',
    `donation_date` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

// 5. Donor Tables
$donors = ['cricket_donors', 'music_donors', 'business_donors', 'education_donors', 'awards_donors'];
foreach ($donors as $d) {
    $queries[$d] = "CREATE TABLE IF NOT EXISTS `$d` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `donor_name` varchar(255) NOT NULL,
        `amount` decimal(10,2) NOT NULL,
        `phone_no` varchar(20) NOT NULL,
        `email_id` varchar(255) DEFAULT NULL,
        `address` text DEFAULT NULL,
        `pan_card_no` varchar(20) DEFAULT NULL,
        `payment_id` varchar(255) DEFAULT NULL,
        `support_purpose` varchar(255) DEFAULT NULL,
        `status` varchar(50) DEFAULT 'Pending',
        `submission_date` timestamp NOT NULL DEFAULT current_timestamp(),
        PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
}

// 6. Blog Posts
$queries['blog_posts'] = "CREATE TABLE IF NOT EXISTS `blog_posts` (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'General',
    status VARCHAR(20) DEFAULT 'Draft',
    image_path VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

// 7. Award Winners
$queries['award_winners'] = "CREATE TABLE IF NOT EXISTS `award_winners` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    award_type VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    winner_name VARCHAR(255) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

// 8. Awards Applications
$queries['awards_applications'] = "CREATE TABLE IF NOT EXISTS `awards_applications` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255),
    full_address TEXT,
    phone_no VARCHAR(20),
    email_id VARCHAR(100),
    aadhaar_no VARCHAR(20),
    disability_category VARCHAR(100),
    occupation VARCHAR(100),
    experience VARCHAR(255),
    achievement TEXT,
    aadhaar_path VARCHAR(255),
    disability_certificate_path VARCHAR(255),
    press_clips_path VARCHAR(255),
    biodata_path VARCHAR(255),
    photo_path VARCHAR(255),
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

// 9. Business Entrepreneurs
$queries['business_entrepreneurs'] = "CREATE TABLE IF NOT EXISTS `business_entrepreneurs` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255),
    address TEXT,
    phone_no VARCHAR(20),
    email_id VARCHAR(100),
    aadhaar_no VARCHAR(20),
    pan_no VARCHAR(20),
    company_name VARCHAR(255),
    company_address TEXT,
    experience_years VARCHAR(50),
    occupation VARCHAR(255),
    aadhaar_path VARCHAR(255),
    photo_path VARCHAR(255),
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

// 10. Business Members
$queries['business_members'] = "CREATE TABLE IF NOT EXISTS `business_members` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255),
    address TEXT,
    phone_no VARCHAR(20),
    email_id VARCHAR(100),
    aadhaar_no VARCHAR(20),
    pan_no VARCHAR(20),
    company_name VARCHAR(255),
    company_address TEXT,
    experience_years VARCHAR(50),
    occupation VARCHAR(255),
    aadhaar_path VARCHAR(255),
    photo_path VARCHAR(255),
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

// 11. Education Members
$queries['education_members'] = "CREATE TABLE IF NOT EXISTS `education_members` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255),
    address TEXT,
    phone_no VARCHAR(20),
    email_id VARCHAR(100),
    aadhaar_no VARCHAR(20),
    disability_cert_no VARCHAR(50),
    category VARCHAR(10),
    aadhaar_path VARCHAR(255),
    disability_cert_path VARCHAR(255),
    photo_path VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Pending',
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

// 12. Events
$queries['events'] = "CREATE TABLE IF NOT EXISTS `events` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    end_date DATE DEFAULT NULL,
    event_time VARCHAR(50),
    location VARCHAR(255),
    image_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

// 13. Gallery Images
$queries['gallery_images'] = "CREATE TABLE IF NOT EXISTS `gallery_images` (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NULL,
    category VARCHAR(100) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

// 14. Music Singers
$queries['music_singers'] = "CREATE TABLE IF NOT EXISTS `music_singers` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255),
    address TEXT,
    phone_no VARCHAR(20),
    email_id VARCHAR(100),
    aadhaar_no VARCHAR(20),
    disability_certificate_no VARCHAR(50),
    music_category VARCHAR(100),
    goal TEXT,
    aadhaar_path VARCHAR(255),
    disability_certificate_path VARCHAR(255),
    photo_path VARCHAR(255),
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

// 15. Cricket Umpires
$queries['cricket_umpires'] = "CREATE TABLE IF NOT EXISTS `cricket_umpires` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255),
    address TEXT,
    phone_no VARCHAR(20),
    email_id VARCHAR(100),
    aadhaar_no VARCHAR(20),
    matches_count INT DEFAULT NULL,
    experience_years VARCHAR(50),
    aadhaar_path VARCHAR(255),
    photo_path VARCHAR(255),
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

// 16. Music Members
$queries['music_members'] = "CREATE TABLE IF NOT EXISTS `music_members` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255),
    address TEXT,
    phone_no VARCHAR(20),
    email_id VARCHAR(100),
    aadhaar_no VARCHAR(20),
    disability_certificate_no VARCHAR(50),
    music_category VARCHAR(100),
    goal TEXT,
    aadhaar_path VARCHAR(255),
    disability_certificate_path VARCHAR(255),
    photo_path VARCHAR(255),
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

// 17. Music Judges
$queries['music_judges'] = "CREATE TABLE IF NOT EXISTS `music_judges` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255),
    full_address TEXT,
    phone_no VARCHAR(20),
    email_id VARCHAR(100),
    aadhaar_no VARCHAR(20),
    qualification VARCHAR(255),
    occupation VARCHAR(255),
    experience_years VARCHAR(50),
    aadhaar_path VARCHAR(255),
    photo_path VARCHAR(255),
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

// 18. Education Students
$queries['education_students'] = "CREATE TABLE IF NOT EXISTS `education_students` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255),
    phone_no VARCHAR(20),
    email_id VARCHAR(100),
    aadhaar_no VARCHAR(20),
    age VARCHAR(10),
    address TEXT,
    school_college_name VARCHAR(255),
    current_class_year VARCHAR(100),
    college_address TEXT,
    scriber_subject VARCHAR(255),
    place_of_exam VARCHAR(255),
    date_of_exam VARCHAR(50),
    disability_cert_no VARCHAR(50),
    disability_certificate_path VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Pending',
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

// 19. Education Scribers
$queries['education_scribers'] = "CREATE TABLE IF NOT EXISTS `education_scribers` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255),
    phone_no VARCHAR(20),
    email_id VARCHAR(100),
    aadhaar_no VARCHAR(20),
    address TEXT,
    qualification VARCHAR(255),
    occupation VARCHAR(255),
    subjects_of_interest VARCHAR(255),
    present_location VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Pending',
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

// 20. Supporters Table
$queries['supporters'] = "CREATE TABLE IF NOT EXISTS `supporters` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255),
    address TEXT,
    phone_no VARCHAR(20),
    email_id VARCHAR(100),
    aadhaar_no VARCHAR(20),
    pan_card_no VARCHAR(20),
    qualification VARCHAR(255),
    occupation VARCHAR(255),
    areas_of_interest TEXT,
    support_mode TEXT,
    status VARCHAR(50) DEFAULT 'Pending',
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

// 21. Volunteer Tables
$volunteers = ['general_volunteers', 'education_volunteers', 'cricket_volunteers', 'music_volunteers', 'business_volunteers', 'awards_volunteers'];
foreach ($volunteers as $v) {
    $queries[$v] = "CREATE TABLE IF NOT EXISTS `$v` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        father_name VARCHAR(255),
        address TEXT,
        phone_no VARCHAR(20),
        email_id VARCHAR(100),
        aadhaar_no VARCHAR(20),
        pan_card_no VARCHAR(20),
        qualification VARCHAR(255),
        occupation VARCHAR(255),
        interest_area VARCHAR(255),
        club_preference VARCHAR(100),
        availability VARCHAR(255),
        start_date DATE,
        end_date DATE,
        aadhaar_path VARCHAR(255),
        photo_path VARCHAR(255),
        status VARCHAR(50) DEFAULT 'Pending',
        submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
}

foreach ($queries as $name => $sql) {
    if ($conn->query($sql) === TRUE) {
        echo "[OK] Table '$name' created or already exists.\n";
    } else {
        echo "[ERROR] Error creating table '$name': " . $conn->error . "\n";
    }
}

// Seed default admin user
$defaultEmail = 'doraswamyraju.ca@gmail.com';
$defaultPassword = 'password';
$hashedPassword = password_hash($defaultPassword, PASSWORD_DEFAULT);

$stmt = $conn->prepare("SELECT id FROM admin WHERE email = ?");
$stmt->bind_param("s", $defaultEmail);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    $insertStmt = $conn->prepare("INSERT INTO admin (email, password) VALUES (?, ?)");
    $insertStmt->bind_param("ss", $defaultEmail, $hashedPassword);
    if ($insertStmt->execute()) {
        echo "\n[OK] Default admin user ($defaultEmail) created successfully with password: password\n";
    } else {
        echo "\n[ERROR] Error creating default admin: " . $insertStmt->error . "\n";
    }
    $insertStmt->close();
} else {
    echo "\n[INFO] Default admin user ($defaultEmail) already exists.\n";
}

$stmt->close();
$conn->close();
echo "\nAll migrations completed successfully!\n";
?>
