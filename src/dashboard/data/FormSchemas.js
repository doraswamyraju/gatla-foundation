// src/dashboard/data/FormSchemas.js

export const FORM_SCHEMAS = {
  // --- 1. DONATIONS SCHEMA (CRITICAL FIX) ---
  'donations-list': [
    { name: 'name', label: 'Donor Name', type: 'text' },
    { name: 'amount', label: 'Amount (₹)', type: 'number' }, // Shows Amount
    { name: 'payment_id', label: 'Payment Ref', type: 'text' },
    { name: 'email', label: 'Email ID', type: 'email' },
    { name: 'phone', label: 'Phone', type: 'tel' },
    { name: 'pan_number', label: 'PAN', type: 'text' },
    { name: 'donation_date', label: 'Date', type: 'date' },
  ],

  // --- 1. GENERAL FORMS (Navbar & Hero) ---
  'supporter-form': [
    { name: 'full_name', label: 'Full Name', type: 'text' },
    { name: 'father_name', label: 'Father Name', type: 'text' },
    { name: 'address', label: 'Address', type: 'textarea' },
    { name: 'phone_no', label: 'Phone', type: 'tel' },
    { name: 'email_id', label: 'Email', type: 'email' },
    { name: 'aadhaar_no', label: 'Aadhaar', type: 'text' },
    { name: 'pan_card_no', label: 'PAN', type: 'text' },
    { name: 'qualification', label: 'Qualification', type: 'text' },
    { name: 'occupation', label: 'Occupation', type: 'text' },
    { name: 'areas_of_interest', label: 'Interests', type: 'text' },
    { name: 'support_mode', label: 'Support Mode', type: 'text' },
    { name: 'status', label: 'Status', type: 'text' }
  ],
  // Alias other supporter tabs to the same structure (Dynamic Mapping would optionally be better, but explicit is safer here)
  // BETTER APPROACH: In DataTable, we default to supporter-form schema if specific one is empty/missing but logic implies similarity.
  // BUT the provided DataTable uses `FORM_SCHEMAS[type] || FORM_SCHEMAS['volunteer-form']`.
  // So we MUST define them or change DataTable logic.
  // Let's copy the array for now to ensure it works 100%.

  'education-supporter': [
    { name: 'full_name', label: 'Full Name', type: 'text' }, { name: 'phone_no', label: 'Phone', type: 'tel' }, { name: 'areas_of_interest', label: 'Interests', type: 'text' }, { name: 'support_mode', label: 'Support', type: 'text' }
  ],
  'cricket-supporter': [
    { name: 'full_name', label: 'Full Name', type: 'text' }, { name: 'phone_no', label: 'Phone', type: 'tel' }, { name: 'areas_of_interest', label: 'Interests', type: 'text' }, { name: 'support_mode', label: 'Support', type: 'text' }
  ],
  'music-supporter': [
    { name: 'full_name', label: 'Full Name', type: 'text' }, { name: 'phone_no', label: 'Phone', type: 'tel' }, { name: 'areas_of_interest', label: 'Interests', type: 'text' }, { name: 'support_mode', label: 'Support', type: 'text' }
  ],
  'business-supporter': [
    { name: 'full_name', label: 'Full Name', type: 'text' }, { name: 'phone_no', label: 'Phone', type: 'tel' }, { name: 'areas_of_interest', label: 'Interests', type: 'text' }, { name: 'support_mode', label: 'Support', type: 'text' }
  ],
  'awards-supporter': [
    { name: 'full_name', label: 'Full Name', type: 'text' }, { name: 'phone_no', label: 'Phone', type: 'tel' }, { name: 'areas_of_interest', label: 'Interests', type: 'text' }, { name: 'support_mode', label: 'Support', type: 'text' }
  ],

  'volunteer-form': [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true },
    { name: 'fatherName', label: 'Father Name', type: 'text', required: true },
    { name: 'address', label: 'Full Address', type: 'textarea', required: true },
    { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
    { name: 'email', label: 'Email ID', type: 'email' },
    { name: 'aadhar', label: 'Aadhar Card No', type: 'text' },
    { name: 'qualification', label: 'Qualification', type: 'text' },
    { name: 'occupation', label: 'Occupation', type: 'text' },
    { name: 'interest', label: 'Area of Interest', type: 'select', options: ['Education', 'Sports', 'Music', 'Business', 'General Help'] },
    // NEW: Requested Availability Options
    { name: 'availability', label: 'Availability', type: 'text' },
    // NEW: Dynamic Date/Time
    { name: 'preferred_time', label: 'Preferred Time', type: 'text' },
    // NEW: File Upload
    { name: 'aadhaar_path', label: 'Aadhaar Card', type: 'file' },
    { name: 'photo_path', label: 'Photo', type: 'file' }
  ],

  // --- 2. CRICKET CLUB ---
  'cricket-club-member': [
    { name: 'full_name', label: 'Member Name', type: 'text' },
    { name: 'father_name', label: 'Father Name', type: 'text' },
    { name: 'phone_no', label: 'Phone', type: 'text' },
    { name: 'category', label: 'Category', type: 'text' },
    { name: 'aadhaar_path', label: 'Aadhaar', type: 'file' },
    { name: 'disability_cert_path', label: 'Certificate', type: 'file' },
    { name: 'photo_path', label: 'Photo', type: 'file' }
  ],
  'cricket-player': [
    { name: 'full_name', label: 'Player Name', type: 'text' },
    { name: 'father_name', label: 'Father Name', type: 'text' },
    { name: 'phone_no', label: 'Phone', type: 'text' },
    { name: 'category', label: 'Category', type: 'text' },
    { name: 'aadhaar_path', label: 'Aadhaar', type: 'file' },
    { name: 'disability_cert_path', label: 'Certificate', type: 'file' },
    { name: 'photo_path', label: 'Photo', type: 'file' }
  ],
  'cricket-umpire': [
    { name: 'fullName', label: 'Umpire Name', type: 'text', required: true },
    { name: 'phone', label: 'Mobile Number', type: 'tel', required: true },
    { name: 'matchesCount', label: 'Matches Officiated (Approx)', type: 'number' },
    { name: 'experience', label: 'Years of Experience', type: 'text' },
    { name: 'certification', label: 'Certification Level', type: 'text' }
  ],

  // --- 3. EDUCATION CLUB ---
  'education-student': [
    { name: 'full_name', label: 'Student Name', type: 'text' },       // Matches DB 'full_name'
    { name: 'father_name', label: 'Father Name', type: 'text' },
    { name: 'phone_no', label: 'Mobile Number', type: 'tel' },
    { name: 'school_college_name', label: 'College Name', type: 'text' },
    { name: 'current_class_year', label: 'Course/Year', type: 'text' },
    { name: 'aadhaar_no', label: 'Aadhaar No', type: 'text' },        // New Field
    { name: 'place_of_exam', label: 'Exam Center', type: 'text' },    // New Field
    { name: 'disability_certificate_path', label: 'Certificate', type: 'file' },
    { name: 'status', label: 'Status', type: 'text' }
  ],

  'education-scriber': [
    { name: 'full_name', label: 'Scribe Name', type: 'text' },
    { name: 'father_name', label: 'Father Name', type: 'text' },
    { name: 'phone_no', label: 'Mobile No', type: 'tel' },
    { name: 'qualification', label: 'Qualification', type: 'text' },
    { name: 'occupation', label: 'Occupation', type: 'text' },
    { name: 'subjects_of_interest', label: 'Subjects', type: 'text' },
    { name: 'present_location', label: 'Location', type: 'text' },
    { name: 'status', label: 'Status', type: 'text' }
  ],

  'education-volunteer': [
    { name: 'full_name', label: 'Name', type: 'text' },
    { name: 'phone_no', label: 'Phone', type: 'text' },
    { name: 'area_of_interest', label: 'Interest', type: 'text' },
    { name: 'availability', label: 'Availability', type: 'text' },
    { name: 'status', label: 'Status', type: 'text' }
  ],
  'education-donor': [
    { name: 'donor_name', label: 'Donor', type: 'text' },
    { name: 'amount', label: 'Amount', type: 'text' },
    { name: 'payment_id', label: 'Txn ID', type: 'text' },
    { name: 'email_id', label: 'Email', type: 'text' },
    { name: 'phone_no', label: 'Phone', type: 'text' },
    { name: 'pan_card_no', label: 'PAN', type: 'text' },
    { name: 'status', label: 'Status', type: 'text' }
  ],
  'cricket-donor': [
    { name: 'donor_name', label: 'Donor', type: 'text' },
    { name: 'amount', label: 'Amount', type: 'text' },
    { name: 'payment_id', label: 'Txn ID', type: 'text' },
    { name: 'email_id', label: 'Email', type: 'text' },
    { name: 'phone_no', label: 'Phone', type: 'text' },
    { name: 'pan_card_no', label: 'PAN', type: 'text' },
    { name: 'status', label: 'Status', type: 'text' }
  ],
  'music-donor': [
    { name: 'donor_name', label: 'Donor', type: 'text' },
    { name: 'amount', label: 'Amount', type: 'text' },
    { name: 'payment_id', label: 'Txn ID', type: 'text' },
    { name: 'email_id', label: 'Email', type: 'text' },
    { name: 'phone_no', label: 'Phone', type: 'text' },
    { name: 'pan_card_no', label: 'PAN', type: 'text' },
    { name: 'status', label: 'Status', type: 'text' }
  ],
  'business-donor': [
    { name: 'donor_name', label: 'Donor', type: 'text' },
    { name: 'amount', label: 'Amount', type: 'text' },
    { name: 'payment_id', label: 'Txn ID', type: 'text' },
    { name: 'email_id', label: 'Email', type: 'text' },
    { name: 'phone_no', label: 'Phone', type: 'text' },
    { name: 'pan_card_no', label: 'PAN', type: 'text' },
    { name: 'status', label: 'Status', type: 'text' }
  ],

  // --- 4. MUSIC CLUB ---
  'music-singer': [
    { name: 'fullName', label: 'Singer Name', type: 'text', required: true },
    { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
    { name: 'category', label: 'Singing Category', type: 'select', options: ['Classical', 'Folk', 'Light Music', 'Cinematic'] },
    { name: 'goal', label: 'Music Goal', type: 'textarea' }
  ],
  'music-judge': [
    { name: 'fullName', label: 'Judge Name', type: 'text', required: true },
    { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
    { name: 'expertise', label: 'Musical Expertise', type: 'textarea' },
    { name: 'experience', label: 'Years of Experience', type: 'text' }
  ],
  'music-member': [
    { name: 'fullName', label: 'Member Name', type: 'text', required: true },
    { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
    { name: 'instrument', label: 'Instrument Played (Optional)', type: 'text' }
  ],

  // --- 5. BUSINESS CLUB ---
  'business-entrepreneur': [
    { name: 'fullName', label: 'Entrepreneur Name', type: 'text', required: true },
    { name: 'businessName', label: 'Business Name', type: 'text' },
    { name: 'phone', label: 'Contact Number', type: 'tel', required: true },
    { name: 'industry', label: 'Industry Type', type: 'text' },
    { name: 'description', label: 'Business Description', type: 'textarea' }
  ],
  'business-member': [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true },
    { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
    { name: 'occupation', label: 'Occupation', type: 'text' }
  ],

  // --- 6. AWARDS ---
  'awards-nomination': [
    { name: 'nomineeName', label: 'Nominee Name', type: 'text', required: true },
    { name: 'phone', label: 'Contact Number', type: 'tel', required: true },
    { name: 'category', label: 'Award Category', type: 'select', options: ['Social Service', 'Sports Excellence', 'Arts & Culture', 'Lifetime Achievement'] },
    { name: 'achievement', label: 'Reason for Nomination', type: 'textarea', required: true }
  ],
  'awards-sponsor': [
    { name: 'sponsorName', label: 'Sponsor/Company Name', type: 'text', required: true },
    { name: 'phone', label: 'Contact Number', type: 'tel', required: true },
    { name: 'amount', label: 'Pledge Amount (Optional)', type: 'number' },
    { name: 'message', label: 'Message', type: 'textarea' }
  ]
};