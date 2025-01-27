"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface QuestionCardProps {
  index: number;
  question: {
    id: string;
    exam_id: string;
    question_text: string;
    description: string | null;
    points: number;
    language_id: string;
    created_at: string;
  };
  onEdit: () => void;
}

export default function QuestionCard({ index, question, onEdit }: QuestionCardProps) {
  return (
    <Card className="p-6 bg-white border-[#CCCCCC] hover:border-[#F4703A] transition-all duration-300">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-medium text-[#111111]">
            Question {index + 1}
          </h4>
          <div className="flex items-center gap-4">
            <Badge
              variant="outline"
              className="bg-[#FFF4F0] text-[#F4703A] border-[#F4703A] whitespace-nowrap"
            >
              {question.points} points
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              className="text-[#555555] hover:text-[#F4703A] hover:bg-[#FFF4F0]"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div>
          <p className="text-[#111111] mb-2">{question.question_text}</p>
          {question.description && (
            <p className="text-[#555555] text-sm">{question.description}</p>
          )}
        </div>
      </div>
    </Card>
  );
}