-- 1. Create Users Table
CREATE TABLE Users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Programming_Languages Table
CREATE TABLE Programming_Languages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    language_name VARCHAR(100) NOT NULL,
    version VARCHAR(50) NOT NULL,
    syntax_support BOOLEAN NOT NULL,
    file_extensions VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Exams Table
CREATE TABLE Exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tutor_id UUID NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    language_id UUID NOT NULL REFERENCES Programming_Languages(id) ON DELETE CASCADE,
    total_score INT NOT NULL,
    duration INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create Questions Table
CREATE TABLE Questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id UUID NOT NULL REFERENCES Exams(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    description TEXT,
    points INT NOT NULL,
    language_id UUID NOT NULL REFERENCES Programming_Languages(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Create Submissions Table
CREATE TABLE Submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id TEXT NOT NULL,  -- Arbitrary student identifier (e.g., registration number)
    student_name TEXT NOT NULL,  -- Full name of the student
    student_email VARCHAR(255) NOT NULL,  -- Email address of the student
    exam_id UUID NOT NULL REFERENCES Exams(id) ON DELETE CASCADE,  -- The exam being taken
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Timestamp of when the submission was made
);

-- 6. Create Answers Table
CREATE TABLE Answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID NOT NULL REFERENCES Submissions(id) ON DELETE CASCADE,  -- Links to the submission
    question_id UUID NOT NULL REFERENCES Questions(id) ON DELETE CASCADE,  -- Links to the specific question
    answer_text TEXT,  -- The student's answer (e.g., code or explanation)
    points_awarded INT,  -- Points awarded for this answer
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
