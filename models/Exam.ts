import { createClient } from "@/lib/supabase/browserClient";
import { Database } from "@/database.types";

export interface ExamData {
  title: string;
  description: string;
  language_id: string;
  total_score: number;
  duration: number;
  is_active?: boolean;
  tutor_id: string;
}

export interface Question {
  question_text: string;
  description?: string | null;
  points: number;
  language_id: string;
}

export class Exam {
  private supabase = createClient();

  /**
   * Create a new exam
   */
  async create(examData: ExamData) {
    try {
      const { data, error } = await this.supabase
        .from("Exams")
        .insert([examData])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  /**
   * Get an exam by ID
   */
  async getById(id: string) {
    try {
      const { data, error } = await this.supabase
        .from("Exams")
        .select(`
          *,
          tutor:Users(*),
          language:Programming_Languages(*),
          questions:Questions(*)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  /**
   * Get all exams
   */
  async getAll(filters?: {
    isActive?: boolean;
    tutorId?: string;
    languageId?: string;
  }) {
    try {
      let query = this.supabase
        .from("Exams")
        .select(`
          *,
          tutor:Users(*),
          language:Programming_Languages(*),
          questions:Questions(*)
        `);

      if (filters?.isActive !== undefined) {
        query = query.eq("is_active", filters.isActive);
      }
      if (filters?.tutorId) {
        query = query.eq("tutor_id", filters.tutorId);
      }
      if (filters?.languageId) {
        query = query.eq("language_id", filters.languageId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  /**
   * Update an exam
   */
  async update(id: string, updates: Partial<ExamData>) {
    try {
      const { data, error } = await this.supabase
        .from("Exams")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  /**
   * Delete an exam
   */
  async delete(id: string) {
    try {
      const { error } = await this.supabase
        .from("Exams")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  }

  /**
   * Add a question to an exam
   */
  async addQuestion(examId: string, question: Question) {
    try {
      const { data, error } = await this.supabase
        .from("Questions")
        .insert([{ ...question, exam_id: examId }])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  /**
   * Remove a question from an exam
   */
  async removeQuestion(questionId: string) {
    try {
      const { error } = await this.supabase
        .from("Questions")
        .delete()
        .eq("id", questionId);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  }

  /**
   * Update a question
   */
  async updateQuestion(questionId: string, updates: Partial<Question>) {
    try {
      const { data, error } = await this.supabase
        .from("Questions")
        .update(updates)
        .eq("id", questionId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  /**
   * Get exam submissions
   */
  async getSubmissions(examId: string) {
    try {
      const { data, error } = await this.supabase
        .from("Submissions")
        .select(`
          *,
          answers:Answers(*)
        `)
        .eq("exam_id", examId);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  /**
   * Toggle exam active status
   */
  async toggleActive(id: string) {
    try {
      const { data: exam } = await this.getById(id);
      if (!exam) throw new Error("Exam not found");

      const { data, error } = await this.supabase
        .from("Exams")
        .update({ is_active: !exam.is_active })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  /**
   * Calculate total points for an exam
   */
  async calculateTotalPoints(examId: string) {
    try {
      const { data: questions, error } = await this.supabase
        .from("Questions")
        .select("points")
        .eq("exam_id", examId);

      if (error) throw error;

      const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);
      return { data: totalPoints, error: null };
    } catch (error) {
      return { data: 0, error };
    }
  }
}