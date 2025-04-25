import { supabase } from "../supabase";
import { PatternDetected } from "./types";

export const patternService = {
  async getAllPatterns(): Promise<PatternDetected[]> {
    const { data, error } = await supabase
      .from("patterns_detected")
      .select("*");

    if (error) {
      console.error("Error fetching patterns:", error);
      throw error;
    }

    return data || [];
  },

  async getPatternsByPatientId(patientId: number): Promise<PatternDetected[]> {
    const { data, error } = await supabase
      .from("patterns_detected")
      .select("*")
      .eq("patient_id", patientId);

    if (error) {
      console.error("Error fetching patient patterns:", error);
      throw error;
    }

    return data || [];
  },

  async createPattern(
    pattern: Omit<PatternDetected, "id">
  ): Promise<PatternDetected> {
    const { data, error } = await supabase
      .from("patterns_detected")
      .insert([pattern])
      .select()
      .single();

    if (error) {
      console.error("Error creating pattern:", error);
      throw error;
    }

    return data;
  },

  async updatePattern(
    id: number,
    pattern: Partial<PatternDetected>
  ): Promise<PatternDetected> {
    const { data, error } = await supabase
      .from("patterns_detected")
      .update(pattern)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating pattern:", error);
      throw error;
    }

    return data;
  },

  async deletePattern(id: number): Promise<void> {
    const { error } = await supabase
      .from("patterns_detected")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting pattern:", error);
      throw error;
    }
  },
};
