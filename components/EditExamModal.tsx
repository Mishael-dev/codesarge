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
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ExamData {
  id: string;
  title: string;
  description: string;
  duration: number;
  total_score: number;
  is_active: boolean;
  language_id: string;
  tutor_id: string;
  created_at: string;
}

interface EditExamModalProps {
  exam: Partial<ExamData>;
  isOpen: boolean;
  onClose: () => void;
  onSave: (exam: ExamData) => void;
  languages?: Array<{ id: string; language_name: string }>;
}

const defaultExam: ExamData = {
  id: "",
  title: "",
  description: "",
  duration: 60,
  total_score: 100,
  is_active: true,
  language_id: "",
  tutor_id: "", // This should be set from the authenticated user
  created_at: new Date().toISOString(),
};

export default function EditExamModal({
  exam,
  isOpen,
  onClose,
  onSave,
  languages = [],
}: EditExamModalProps) {
  const [editedExam, setEditedExam] = useState<ExamData>({ ...defaultExam, ...exam });
  const isNewExam = !exam.id;

  const handleSave = () => {
    if (!editedExam.title || !editedExam.language_id) {
      // You might want to show an error message here
      return;
    }
    onSave(editedExam);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-[#111111]">
            {isNewExam ? "Create New Exam" : "Edit Exam"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="required">Title</Label>
            <Input
              id="title"
              value={editedExam.title}
              onChange={(e) =>
                setEditedExam({ ...editedExam, title: e.target.value })
              }
              placeholder="Enter exam title..."
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={editedExam.description}
              onChange={(e) =>
                setEditedExam({ ...editedExam, description: e.target.value })
              }
              className="min-h-[100px]"
              placeholder="Enter exam description..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="language" className="required">Programming Language</Label>
            <Select
              value={editedExam.language_id}
              onValueChange={(value) => setEditedExam({ ...editedExam, language_id: value })}
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration" className="required">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={editedExam.duration}
                onChange={(e) =>
                  setEditedExam({
                    ...editedExam,
                    duration: parseInt(e.target.value) || 0,
                  })
                }
                min="1"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalScore" className="required">Total Score</Label>
              <Input
                id="totalScore"
                type="number"
                value={editedExam.total_score}
                onChange={(e) =>
                  setEditedExam({
                    ...editedExam,
                    total_score: parseInt(e.target.value) || 0,
                  })
                }
                min="1"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="isActive">Active Status</Label>
            <Switch
              id="isActive"
              checked={editedExam.is_active}
              onCheckedChange={(checked) =>
                setEditedExam({ ...editedExam, is_active: checked })
              }
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
            disabled={!editedExam.title || !editedExam.language_id}
          >
            {isNewExam ? "Create Exam" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}