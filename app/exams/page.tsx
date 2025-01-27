"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ExamDisplayCard from "@/components/ExamDisplayCard";
import { PlusCircle, Search } from "lucide-react";

// Mock data for demonstration
const mockExams = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics including variables, functions, and control flow.",
    isActive: true,
    totalSubmissions: 45,
    duration: 60,
    totalScore: 100,
    programmingLanguage: "JavaScript",
  },
  {
    id: 2,
    title: "Python Data Structures",
    description: "Comprehensive exam covering Python's built-in data structures and their operations.",
    isActive: false,
    totalSubmissions: 32,
    duration: 90,
    totalScore: 150,
    programmingLanguage: "Python",
  },
  // Add more mock exams as needed
];

type FilterType = "all" | "active" | "inactive";

export default function ExamsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredExams = mockExams.filter((exam) => {
    const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exam.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || 
                         (filter === "active" && exam.isActive) ||
                         (filter === "inactive" && !exam.isActive);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#111111]">Exams</h2>
        <Button className="bg-[#F4703A] hover:bg-[#D65E2F] text-white">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Exam
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#888888] h-4 w-4" />
            <Input
              type="text"
              placeholder="Search exams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#CCCCCC] focus:border-[#F4703A] focus:ring-[#F4703A]"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-[#F4703A] hover:bg-[#D65E2F]" : ""}
            >
              All
            </Button>
            <Button
              variant={filter === "active" ? "default" : "outline"}
              onClick={() => setFilter("active")}
              className={filter === "active" ? "bg-[#F4703A] hover:bg-[#D65E2F]" : ""}
            >
              Active
            </Button>
            <Button
              variant={filter === "inactive" ? "default" : "outline"}
              onClick={() => setFilter("inactive")}
              className={filter === "inactive" ? "bg-[#F4703A] hover:bg-[#D65E2F]" : ""}
            >
              Inactive
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <ExamDisplayCard
              key={exam.id}
              title={exam.title}
              description={exam.description}
              isActive={exam.isActive}
              totalSubmissions={exam.totalSubmissions}
              duration={exam.duration}
              totalScore={exam.totalScore}
              programmingLanguage={exam.programmingLanguage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}