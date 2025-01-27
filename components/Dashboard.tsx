"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, TrendingUp, Clock, Users, BookOpen } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [stats] = useState([
    {
      label: "Total Exams",
      value: "24",
      change: "+2 this month",
      icon: BookOpen,
    },
    {
      label: "Active Students",
      value: "156",
      change: "+12 this week",
      icon: Users,
    },
    {
      label: "Avg. Completion Time",
      value: "45m",
      change: "-5m from last month",
      icon: Clock,
    },
    {
      label: "Pass Rate",
      value: "78%",
      change: "+2% this month",
      icon: TrendingUp,
    },
  ]);

  const recentSubmissions = [
    {
      student: "John Doe",
      exam: "JavaScript Fundamentals",
      score: "85%",
      time: "2h ago",
    },
    {
      student: "Jane Smith",
      exam: "Python Basics",
      score: "92%",
      time: "3h ago",
    },
    {
      student: "Mike Johnson",
      exam: "Data Structures",
      score: "78%",
      time: "5h ago",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#111111]">Dashboard</h2>
        <Button className="bg-[#F4703A] hover:bg-[#D65E2F] text-white">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Exam
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6 bg-white border-[#CCCCCC] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#555555]">{stat.label}</p>
                <h3 className="text-2xl font-bold text-[#111111] mt-1">
                  {stat.value}
                </h3>
                <p className="text-xs text-[#888888] mt-1">{stat.change}</p>
              </div>
              <stat.icon className="h-5 w-5 text-[#F4703A]" />
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-white border-[#CCCCCC] shadow-sm">
        <h3 className="text-lg font-semibold text-[#111111] mb-4">
          Recent Submissions
        </h3>
        <div className="space-y-4">
          {recentSubmissions.map((submission, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-[#FAFAFA] rounded-lg border border-[#CCCCCC] hover:border-[#F4703A] transition-colors"
            >
              <div>
                <p className="font-medium text-[#111111]">{submission.student}</p>
                <p className="text-sm text-[#555555]">{submission.exam}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-[#F4703A]">{submission.score}</p>
                <p className="text-sm text-[#888888]">{submission.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}