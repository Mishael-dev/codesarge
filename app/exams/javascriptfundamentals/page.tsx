"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StudentSubmissionCard from "@/components/StudentSubmissionCard";
import QuestionCard from "@/components/QuestionCard";
import EditExamModal from "@/components/EditExamModal";
import EditQuestionModal from "@/components/EditQuestionModal";
import { PlayCircle, Users, Clock, Award, Pencil, PlusCircle } from "lucide-react";

// Mock data for demonstration
const examData = {
  title: "JavaScript Fundamentals",
  description: "Test your knowledge of JavaScript basics including variables, functions, and control flow.",
  isActive: true,
  totalSubmissions: 45,
  newSubmissions: 3,
  duration: 60,
  totalScore: 100,
  programmingLanguage: "JavaScript",
  questions: [
    {
      id: 1,
      questionText: "What is the difference between 'let' and 'const' in JavaScript?",
      description: "Explain the key differences in variable declaration and provide examples.",
      points: 20,
    },
    {
      id: 2,
      questionText: "Explain closure in JavaScript with an example.",
      description: "Demonstrate your understanding of closures and their practical applications.",
      points: 30,
    },
  ],
  submissions: [
    {
      id: 1,
      studentName: "John Doe",
      studentEmail: "john.doe@example.com",
      submissionTime: new Date(2024, 2, 15, 14, 30),
      score: 85,
    },
    {
      id: 2,
      studentName: "Jane Smith",
      studentEmail: "jane.smith@example.com",
      submissionTime: new Date(2024, 2, 15, 13, 45),
      score: 92,
    },
  ],
};

export default function ExamDetailPage() {
  const [isEditExamModalOpen, setIsEditExamModalOpen] = useState(false);
  const [isEditQuestionModalOpen, setIsEditQuestionModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [examState, setExamState] = useState(examData);

  const handleEditExam = (updatedExam: any) => {
    setExamState({ ...examState, ...updatedExam });
  };

  const handleEditQuestion = (updatedQuestion: any) => {
    if (selectedQuestion?.id) {
      // Update existing question
      setExamState({
        ...examState,
        questions: examState.questions.map((q) =>
          q.id === updatedQuestion.id ? updatedQuestion : q
        ),
      });
    } else {
      // Add new question
      const newQuestion = {
        ...updatedQuestion,
        id: Math.max(...examState.questions.map(q => q.id)) + 1,
      };
      setExamState({
        ...examState,
        questions: [...examState.questions, newQuestion],
      });
    }
  };

  const handleAddQuestion = () => {
    setSelectedQuestion({
      id: null,
      questionText: "",
      description: "",
      points: 0,
    });
    setIsEditQuestionModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-2xl font-bold text-[#111111]">{examState.title}</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditExamModalOpen(true)}
              className="text-[#555555] hover:text-[#F4703A] hover:bg-[#FFF4F0]"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-[#555555] mb-4">{examState.description}</p>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-[#FFF4F0] text-[#F4703A] border-[#F4703A]">
              {examState.programmingLanguage}
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-600">
              Active
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-[#F4703A]" />
            <div>
              <p className="font-semibold text-[#111111]">{examState.totalSubmissions}</p>
              <p className="text-sm text-[#555555]">Submissions</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#F4703A]" />
            <div>
              <p className="font-semibold text-[#111111]">{examState.duration}</p>
              <p className="text-sm text-[#555555]">Minutes</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-[#F4703A]" />
            <div>
              <p className="font-semibold text-[#111111]">{examState.totalScore}</p>
              <p className="text-sm text-[#555555]">Points</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="submissions" className="relative">
            Submissions
            {examState.newSubmissions > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#F4703A] rounded-full">
                {examState.newSubmissions}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[#111111]">Questions</h3>
              <Button
                onClick={handleAddQuestion}
                className="bg-[#F4703A] hover:bg-[#D65E2F] text-white"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </div>
            {examState.questions.map((question, index) => (
              <QuestionCard
                key={question.id}
                index={index}
                question={question}
                onEdit={() => {
                  setSelectedQuestion(question);
                  setIsEditQuestionModalOpen(true);
                }}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="submissions">
          <div className="space-y-4">
            {examState.submissions.map((submission) => (
              <StudentSubmissionCard
                key={submission.id}
                studentName={submission.studentName}
                studentEmail={submission.studentEmail}
                submissionTime={submission.submissionTime}
                score={submission.score}
                totalScore={examState.totalScore}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <EditExamModal
        exam={examState}
        isOpen={isEditExamModalOpen}
        onClose={() => setIsEditExamModalOpen(false)}
        onSave={handleEditExam}
      />

      {selectedQuestion && (
        <EditQuestionModal
          question={selectedQuestion}
          isOpen={isEditQuestionModalOpen}
          onClose={() => {
            setIsEditQuestionModalOpen(false);
            setSelectedQuestion(null);
          }}
          onSave={handleEditQuestion}
        />
      )}
    </div>
  );
}