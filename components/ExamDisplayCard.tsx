"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, Award, PlayCircle, PauseCircle } from "lucide-react";

interface ExamDisplayCardProps {
  title: string;
  description: string;
  isActive: boolean;
  totalSubmissions: number;
  duration: number;
  totalScore: number;
  programmingLanguage: string;
}

export default function ExamDisplayCard({
  title,
  description,
  isActive,
  totalSubmissions,
  duration,
  totalScore,
  programmingLanguage,
}: ExamDisplayCardProps) {
  return (
    <Card className="p-6 bg-white border-[#CCCCCC] hover:border-[#F4703A] transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#111111] mb-2">{title}</h3>
          <p className="text-[#555555] text-sm line-clamp-2 mb-3">{description}</p>
        </div>
        {isActive ? (
          <PlayCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
        ) : (
          <PauseCircle className="h-6 w-6 text-[#888888] flex-shrink-0" />
        )}
      </div>
      
      <div className="flex items-center gap-4 mb-4">
        <Badge variant="outline" className="bg-[#FFF4F0] text-[#F4703A] border-[#F4703A]">
          {programmingLanguage}
        </Badge>
        <Badge variant="outline" className={`${
          isActive ? 'bg-green-50 text-green-600 border-green-600' : 'bg-gray-50 text-gray-600 border-gray-600'
        }`}>
          {isActive ? 'Active' : 'Inactive'}
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-[#F4703A]" />
          <span className="text-sm text-[#555555]">{totalSubmissions} submissions</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-[#F4703A]" />
          <span className="text-sm text-[#555555]">{duration} mins</span>
        </div>
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-[#F4703A]" />
          <span className="text-sm text-[#555555]">{totalScore} points</span>
        </div>
      </div>
    </Card>
  );
}