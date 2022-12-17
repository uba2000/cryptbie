export const ROLES = {
  1521: 'Normal Member',
  2439: 'Student',
  2600: 'Class Rep',
  2999: 'Lecturer',
  3684: 'Course Advisor',
  4756: 'Head of Department',
  7849: 'Dean of Student',
  9889: 'IT Personel',
};

export const ROLESNUMBERS = {
  'Normal Member': 1521, // normal user without access to member functions
  'Student': 2439, // normal student
  'Class Rep': 2600, // rep of a class
  'Lecturer': 2999, // normal lecturer
  'Course Advisor': 3684, // ClassHead Lecturer limited to level functions
  'Head of Department': 4756, // admin limited to state functions
  'Dean of Student': 7849, // admin
  'IT Personel': 9889, // super admin
};

// NonMember: 1521, // normal user without access to member functions
// Student: 2439, // normal student
// ClassRep: 2600, // rep of a class
// Lecturer: 2999, // normal lecturer
// ClassAdvisorHead: 3684, // ClassHead Lecturer limited to level functions
// DepartmentHOD: 4756, // admin limited to state functions
// FacultyDean: 7849, // admin
// ITPersonel: 9889, // super admin
