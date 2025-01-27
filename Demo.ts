export const exams = [
  {
    id: "exam_1",
    title: "Introduction to Programming",
    description: "Basic programming concepts and syntax.",
    duration: 120,
    total_score: 100,
    is_active: true,
    language_id: "lang_1",
    tutor_id: "tutor_1",
    created_at: "2025-01-24T08:00:00Z",
  },
  {
    id: "exam_2",
    title: "Data Structures",
    description: "Understanding core data structures and their applications.",
    duration: 90,
    total_score: 100,
    is_active: true,
    language_id: "lang_2",
    tutor_id: "tutor_2",
    created_at: "2025-01-24T09:00:00Z",
  },
  {
    id: "exam_3",
    title: "Algorithms",
    description: "Fundamentals of algorithm design and analysis.",
    duration: 120,
    total_score: 100,
    is_active: true,
    language_id: "lang_3",
    tutor_id: "tutor_3",
    created_at: "2025-01-24T10:00:00Z",
  },
  {
    id: "exam_4",
    title: "Database Management Systems",
    description: "Core principles of relational databases and SQL.",
    duration: 150,
    total_score: 100,
    is_active: true,
    language_id: "lang_4",
    tutor_id: "tutor_4",
    created_at: "2025-01-24T11:00:00Z",
  },
];

export const questions = [
  {
    id: "question_1",
    exam_id: "exam_1",
    question_text: "What is a variable in programming?",
    description: "Explain the concept of variables with examples.",
    language_id: "lang_1",
    points: 10,
    created_at: "2025-01-24T08:15:00Z",
  },
  {
    id: "question_2",
    exam_id: "exam_1",
    question_text:
      "Describe the difference between let, var, and const in JavaScript.",
    description: null,
    language_id: "lang_1",
    points: 15,
    created_at: "2025-01-24T08:20:00Z",
  },
  {
    id: "question_3",
    exam_id: "exam_2",
    question_text:
      "What is a linked list, and how does it differ from an array?",
    description: "Provide a detailed comparison.",
    language_id: "lang_2",
    points: 20,
    created_at: "2025-01-24T09:15:00Z",
  },
  {
    id: "question_4",
    exam_id: "exam_2",
    question_text: "Explain the concept of a binary tree with an example.",
    description: null,
    language_id: "lang_2",
    points: 20,
    created_at: "2025-01-24T09:25:00Z",
  },
  {
    id: "question_5",
    exam_id: "exam_3",
    question_text: "What is the time complexity of binary search? Explain why.",
    description: null,
    language_id: "lang_3",
    points: 15,
    created_at: "2025-01-24T10:15:00Z",
  },
  {
    id: "question_6",
    exam_id: "exam_3",
    question_text:
      "Describe the difference between greedy and dynamic programming approaches.",
    description: "Provide examples to support your explanation.",
    language_id: "lang_3",
    points: 25,
    created_at: "2025-01-24T10:25:00Z",
  },
  {
    id: "question_7",
    exam_id: "exam_4",
    question_text: "What are the ACID properties of a database transaction?",
    description: "Provide examples for each property.",
    language_id: "lang_4",
    points: 30,
    created_at: "2025-01-24T11:15:00Z",
  },
  {
    id: "question_8",
    exam_id: "exam_4",
    question_text: "Explain the differences between SQL and NoSQL databases.",
    description: null,
    language_id: "lang_4",
    points: 20,
    created_at: "2025-01-24T11:25:00Z",
  },
];

export const submissions = [
  {
    id: "submission_1",
    student_id: "student_1",
    student_name: "Alice Johnson",
    student_email: "alice.johnson@example.com",
    exam_id: "exam_1",
    created_at: "2025-01-24T12:30:00Z",
  },
  {
    id: "submission_2",
    student_id: "student_2",
    student_name: "Bob Smith",
    student_email: "bob.smith@example.com",
    exam_id: "exam_1",
    created_at: "2025-01-24T12:35:00Z",
  },
  {
    id: "submission_3",
    student_id: "student_3",
    student_name: "Charlie Brown",
    student_email: "charlie.brown@example.com",
    exam_id: "exam_2",
    created_at: "2025-01-24T12:40:00Z",
  },
];

export const answers = [
  {
    id: "answer_1",
    submission_id: "submission_1",
    question_id: "question_1",
    answer_text: `function reverseString(str) {
  return str.split("").reverse().join("");
}`,
    score: 20,
    feedback: "Excellent implementation!",
    created_at: "2025-01-24T12:45:00Z",
  },
  {
    id: "answer_2",
    submission_id: "submission_1",
    question_id: "question_2",
    answer_text: `function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}`,
    score: 28,
    feedback: "Great logic! Consider adding comments for clarity.",
    created_at: "2025-01-24T12:50:00Z",
  },
  {
    id: "answer_3",
    submission_id: "submission_2",
    question_id: "question_1",
    answer_text: `function reverseString(str) {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}`,
    score: 18,
    feedback: "Works well, but could be more concise using built-in methods.",
    created_at: "2025-01-24T12:55:00Z",
  },
  {
    id: "answer_4",
    submission_id: "submission_3",
    question_id: "question_4",
    answer_text: `def is_palindrome(s):
  s = s.lower().replace(" ", "")
  return s == s[::-1]`,
    score: 20,
    feedback: "Perfect solution! Great use of slicing.",
    created_at: "2025-01-24T13:00:00Z",
  },
];
