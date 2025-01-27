"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Mail, Award } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface StudentSubmissionCardProps {
  id: string;
  student_id: string;
  student_name: string;
  student_email: string;
  exam_id: string;
  created_at: string;
  score?: number;
  totalScore?: number;
}

export default function StudentSubmissionCard({
  student_name,
  student_email,
  created_at,
  score = 0,
  totalScore = 100,
}: StudentSubmissionCardProps) {
  const scorePercentage = (score / totalScore) * 100;
  const submissionDate = new Date(created_at);
  const submissionTimeAgo = formatDistanceToNow(submissionDate, { addSuffix: true });

  return (
    <Card className="p-4 bg-white border-[#CCCCCC] hover:border-[#F4703A] transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-[#F4703A]" />
            <span className="font-medium text-[#111111]">{student_name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-[#555555]" />
            <span className="text-sm text-[#555555]">{student_email}</span>
          </div>
        </div>
        <Badge 
          variant="outline" 
          className={`${
            scorePercentage >= 70 
              ? 'bg-green-50 text-green-600 border-green-600' 
              : scorePercentage >= 50 
                ? 'bg-yellow-50 text-yellow-600 border-yellow-600'
                : 'bg-red-50 text-red-600 border-red-600'
          }`}
        >
          <Award className="h-4 w-4 mr-1" />
          {score}/{totalScore} points
        </Badge>
      </div>
      <div className="mt-3 flex items-center gap-2 text-sm text-[#888888]">
        <Clock className="h-4 w-4" />
        <span>Submitted {submissionTimeAgo}</span>
      </div>
    </Card>
  );
}