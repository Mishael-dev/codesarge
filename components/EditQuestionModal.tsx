"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Question {
  id: string;
  exam_id: string;
  question_text: string;
  description: string | null;
  language_id: string;
  points: number;
  created_at: string;
}

interface EditQuestionModalProps {
  question: Partial<Question>;
  examId: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (question: Question) => void;
  languages?: Array<{ id: string; language_name: string }>;
}

const defaultQuestion: Question = {
  id: "",
  exam_id: "",
  question_text: "",
  description: null,
  language_id: "",
  points: 0,
  created_at: new Date().toISOString(),
};

export default function EditQuestionModal({
  question,
  examId,
  isOpen,
  onClose,
  onSave,
  languages = [],
}: EditQuestionModalProps) {
  const [editedQuestion, setEditedQuestion] = useState<Question>({
    ...defaultQuestion,
    ...question,
    exam_id: examId,
  });
  const isNewQuestion = !question.id;

  const handleSave = () => {
    if (!editedQuestion.question_text || !editedQuestion.language_id) {
      // You might want to show an error message here
      return;
    }
    onSave(editedQuestion);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-[#111111]">
            {isNewQuestion ? "Add New Question" : "Edit Question"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="questionText" className="required">Question Text</Label>
            <Textarea
              id="questionText"
              value={editedQuestion.question_text}
              onChange={(e) =>
                setEditedQuestion({ ...editedQuestion, question_text: e.target.value })
              }
              className="min-h-[100px]"
              placeholder="Enter the question text..."
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={editedQuestion.description || ""}
              onChange={(e) =>
                setEditedQuestion({ ...editedQuestion, description: e.target.value })
              }
              className="min-h-[100px]"
              placeholder="Add additional context or instructions..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="language" className="required">Programming Language</Label>
            <Select
              value={editedQuestion.language_id}
              onValueChange={(value) => setEditedQuestion({ ...editedQuestion, language_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.id} value={lang.id}>
                    {lang.language_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="points" className="required">Points</Label>
            <Input
              id="points"
              type="number"
              value={editedQuestion.points}
              onChange={(e) =>
                setEditedQuestion({
                  ...editedQuestion,
                  points: parseInt(e.target.value) || 0,
                })
              }
              min="1"
              placeholder="Enter points value..."
              required
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            className="bg-[#F4703A] hover:bg-[#D65E2F]" 
            onClick={handleSave}
            disabled={!editedQuestion.question_text || !editedQuestion.language_id}
          >
            {isNewQuestion ? "Add Question" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}