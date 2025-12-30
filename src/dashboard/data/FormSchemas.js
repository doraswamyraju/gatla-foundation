// src/dashboard/data/FormSchemas.js

export const FORM_SCHEMAS = {
  // Cricket
  'cricket-club-member': [
    { key: 'fullName', label: 'Full Name', type: 'text' },
    { key: 'fatherName', label: 'Father Name', type: 'text' },
    { key: 'address', label: 'Full Address', type: 'textarea' },
    { key: 'phone', label: 'Phone No', type: 'tel' },
    { key: 'email', label: 'Email ID', type: 'email' },
    { key: 'aadhar', label: 'Aadhar Card No', type: 'text' },
    { key: 'role', label: 'Role/Position', type: 'text' }
  ],
  'cricket-player': [
    { key: 'fullName', label: 'Player Full Name', type: 'text' },
    { key: 'fatherName', label: 'Father Name', type: 'text' },
    { key: 'address', label: 'Full Address', type: 'textarea' },
    { key: 'phone', label: 'Phone No', type: 'tel' },
    { key: 'email', label: 'Email ID', type: 'email' },
    { key: 'aadhar', label: 'Aadhar Card No', type: 'text' },
    { key: 'disabilityCert', label: 'Disability Cert No', type: 'text' },
    { key: 'category', label: 'Category', type: 'select', options: ['B1', 'B2', 'B3'] },
    { key: 'experience', label: 'Years Played', type: 'number' }
  ],
  'cricket-umpire': [
    { key: 'fullName', label: 'Empire Full Name', type: 'text' },
    { key: 'fatherName', label: 'Father Name', type: 'text' },
    { key: 'address', label: 'Full Address', type: 'textarea' },
    { key: 'phone', label: 'Phone No', type: 'tel' },
    { key: 'email', label: 'Email ID', type: 'email' },
    { key: 'aadhar', label: 'Aadhar No', type: 'text' },
    { key: 'matchesCount', label: 'Matches Officiated', type: 'number' },
    { key: 'experience', label: 'Years Experience', type: 'text' }
  ],
  
  // Education
  'education-student': [
    { key: 'fullName', label: 'Full Name', type: 'text' },
    { key: 'fatherName', label: 'Father Name', type: 'text' },
    { key: 'address', label: 'Full Address', type: 'textarea' },
    { key: 'phone', label: 'Mobile No', type: 'tel' },
    { key: 'email', label: 'Email ID', type: 'email' },
    { key: 'aadhar', label: 'Aadhar No', type: 'text' },
    { key: 'age', label: 'Age', type: 'number' },
    { key: 'college', label: 'College Name', type: 'text' },
    { key: 'collegeAddress', label: 'College Address', type: 'text' },
    { key: 'yearStudy', label: 'Year of Study', type: 'text' },
    { key: 'scribeSubject', label: 'Scribe Subject Required', type: 'text' },
    { key: 'examDate', label: 'Date of Exam', type: 'date' }
  ],
  'education-scriber': [
    { key: 'fullName', label: 'Full Name', type: 'text' },
    { key: 'fatherName', label: 'Father Name', type: 'text' },
    { key: 'address', label: 'Full Address', type: 'textarea' },
    { key: 'phone', label: 'Phone Number', type: 'tel' },
    { key: 'email', label: 'Email ID', type: 'email' },
    { key: 'aadhar', label: 'Aadhar Card No', type: 'text' },
    { key: 'qualification', label: 'Qualification', type: 'text' },
    { key: 'subjects', label: 'Interested Subjects', type: 'text' },
    { key: 'location', label: 'Living Location', type: 'text' }
  ],

  // Common Forms
  'volunteer-form': [
    { key: 'fullName', label: 'Full Name', type: 'text' },
    { key: 'fatherName', label: 'Father Name', type: 'text' },
    { key: 'address', label: 'Full Address', type: 'textarea' },
    { key: 'phone', label: 'Phone No', type: 'tel' },
    { key: 'email', label: 'Email ID', type: 'email' },
    { key: 'aadhar', label: 'Aadhar Card No', type: 'text' },
    { key: 'qualification', label: 'Qualification', type: 'text' },
    { key: 'occupation', label: 'Occupation', type: 'text' },
    { key: 'interest', label: 'Area of Interest', type: 'select', options: ['Education', 'Sports', 'Music', 'Business', 'Awards'] },
    { key: 'availability', label: 'Available Date/Time', type: 'text' }
  ],
  'supporter-form': [
    { key: 'fullName', label: 'Full Name', type: 'text' },
    { key: 'fatherName', label: 'Father Name', type: 'text' },
    { key: 'address', label: 'Full Address', type: 'textarea' },
    { key: 'phone', label: 'Phone No', type: 'tel' },
    { key: 'aadhar', label: 'Aadhar No', type: 'text' },
    { key: 'pan', label: 'PAN Card No', type: 'text' },
    { key: 'email', label: 'Mail ID', type: 'email' },
    { key: 'occupation', label: 'Occupation', type: 'text' },
    { key: 'interest', label: 'Areas of Interest', type: 'text' },
    { key: 'supportType', label: 'Support Through', type: 'select', options: ['Physical Participation', 'Donation'] }
  ],

  // Music
  'music-singer': [
    { key: 'fullName', label: 'Full Name', type: 'text' },
    { key: 'fatherName', label: 'Father Name', type: 'text' },
    { key: 'address', label: 'Full Address', type: 'textarea' },
    { key: 'phone', label: 'Phone No', type: 'tel' },
    { key: 'aadhar', label: 'Aadhar No', type: 'text' },
    { key: 'disabilityCert', label: 'Disability Cert No', type: 'text' },
    { key: 'category', label: 'Music Category', type: 'select', options: ['Singers Choice', 'Classical', 'Folk', 'Light Music', 'Melody'] },
    { key: 'goal', label: 'Goal', type: 'text' }
  ],
  'music-member': [
    { key: 'fullName', label: 'Full Name', type: 'text' },
    { key: 'phone', label: 'Phone No', type: 'tel' },
    { key: 'role', label: 'Role', type: 'text' }
  ],
  'music-judge': [
    { key: 'fullName', label: 'Full Name', type: 'text' },
    { key: 'expertise', label: 'Musical Expertise', type: 'text' },
    { key: 'phone', label: 'Phone No', type: 'tel' }
  ],

  // Business
  'business-member': [
    { key: 'fullName', label: 'Full Name', type: 'text' },
    { key: 'businessName', label: 'Business Name', type: 'text' },
    { key: 'phone', label: 'Phone No', type: 'tel' }
  ],
  'business-entrepreneur': [
    { key: 'fullName', label: 'Full Name', type: 'text' },
    { key: 'businessIdea', label: 'Business Idea', type: 'textarea' },
    { key: 'phone', label: 'Phone No', type: 'tel' }
  ],

  // Awards
  'awards-nomination': [
    { key: 'nomineeName', label: 'Nominee Name', type: 'text' },
    { key: 'category', label: 'Award Category', type: 'select', options: ['International', 'National', 'State', 'Platinum'] },
    { key: 'achievement', label: 'Brief Achievement', type: 'textarea' },
    { key: 'phone', label: 'Contact No', type: 'tel' }
  ],
  'awards-sponsor': [
    { key: 'sponsorName', label: 'Sponsor/Company Name', type: 'text' },
    { key: 'amount', label: 'Sponsorship Amount', type: 'number' },
    { key: 'phone', label: 'Contact No', type: 'tel' }
  ],
  
  // Donors
  'cricket-donor': [{ key: 'name', label: 'Donor Name', type: 'text' }, { key: 'amount', label: 'Amount', type: 'number' }, { key: 'phone', label: 'Phone', type: 'tel' }],
  'education-donor': [{ key: 'name', label: 'Donor Name', type: 'text' }, { key: 'amount', label: 'Amount', type: 'number' }, { key: 'phone', label: 'Phone', type: 'tel' }],
  'music-donor': [{ key: 'name', label: 'Donor Name', type: 'text' }, { key: 'amount', label: 'Amount', type: 'number' }, { key: 'phone', label: 'Phone', type: 'tel' }],
  'business-donor': [{ key: 'name', label: 'Donor Name', type: 'text' }, { key: 'amount', label: 'Amount', type: 'number' }, { key: 'phone', label: 'Phone', type: 'tel' }],

  // Blog
  'blog-manager': [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'author', label: 'Author', type: 'text' },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'content', label: 'Content', type: 'textarea' },
    { key: 'status', label: 'Status', type: 'select', options: ['Published', 'Draft'] }
  ]
};

export const generateMockData = () => {
  return {
    'cricket-player': [
      { id: 1, fullName: "S. Mani", fatherName: "S. Rao", category: "B1", experience: 5, phone: "9000011111", address: "Tirupati", status: "Active" },
      { id: 2, fullName: "P. Kumar", fatherName: "P. Murthy", category: "B2", experience: 12, phone: "9000022222", address: "Nellore", status: "Pending" },
    ],
    'cricket-umpire': [
      { id: 1, fullName: "K. Venkat", matchesCount: 15, experience: "3 Years", phone: "8888899999", status: "Approved" }
    ],
    'education-student': [
      { id: 1, fullName: "Ravi Kumar", fatherName: "Suresh", college: "S.V. Arts", yearStudy: "2nd Year", scribeReq: "English", status: "Pending" },
      { id: 2, fullName: "Latha M", fatherName: "Mohan", college: "SPW College", yearStudy: "Final Year", scribeReq: "History", status: "Approved" }
    ],
    'education-scriber': [
      { id: 1, fullName: "Anjali S", qualification: "B.Tech", subjects: "Maths, Science", location: "Tirupati", status: "Available" }
    ],
    'music-singer': [
      { id: 1, fullName: "David Raj", category: "Classical", phone: "9988776655", goal: "Playback Singer", status: "Active" }
    ],
    'volunteer-form': [
      { id: 1, fullName: "Somanth", interest: "Sports", availability: "Weekends", phone: "9876543210", status: "New" }
    ],
    'supporter-form': [
      { id: 1, fullName: "Green Corp", supportType: "Donation", email: "csr@green.com", status: "Verified" }
    ],
    'cricket-club-member': [
        { id: 1, fullName: "Rajesh K", role: "Treasurer", phone: "9876512345", status: "Active" }
    ],
    'cricket-donor': [
        { id: 1, name: "Local Sports Shop", amount: 5000, phone: "9988776655", status: "Received" }
    ],
    'education-donor': [
        { id: 1, name: "Book House", amount: 2000, phone: "8899776655", status: "Pledged" }
    ],
    'music-member': [
        { id: 1, fullName: "Sangeetha", role: "Member", phone: "9123456780", status: "Active" }
    ],
    'music-judge': [
        { id: 1, fullName: "Pt. Rao", expertise: "Classical Vocal", phone: "9000090000", status: "Confirmed" }
    ],
    'business-member': [
        { id: 1, fullName: "Venkatesh", businessName: "Venky Stores", phone: "9988001122", status: "Active" }
    ],
    'business-entrepreneur': [
        { id: 1, fullName: "Lakshmi", businessIdea: "Handmade Candles", phone: "7788990011", status: "Reviewing" }
    ],
    'awards-nomination': [
        { id: 1, nomineeName: "Siva Kumar", category: "State", achievement: "Social Service", phone: "9900112233", status: "Nominated" }
    ],
    'awards-sponsor': [
        { id: 1, sponsorName: "Big Brand Co", amount: 100000, phone: "040123456", status: "Confirmed" }
    ],
    'blog-manager': [
      { id: 1, title: "New Cricket Tournament Announced", author: "Admin", date: "2023-10-20", status: "Published" },
      { id: 2, title: "Donation Drive Success", author: "Editor", date: "2023-10-15", status: "Draft" }
    ]
  };
};