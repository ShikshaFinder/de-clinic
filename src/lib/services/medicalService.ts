import { supabase } from "../supabase";
import { Disease, Symptom, Visit, MedicalHistory } from "./types";

export const medicalService = {
  async getAllDiseases(): Promise<Disease[]> {
    const { data, error } = await supabase.from("diseases").select("*");

    if (error) {
      console.error("Error fetching diseases:", error);
      throw error;
    }

    return data || [];
  },

  async getAllSymptoms(): Promise<Symptom[]> {
    const { data, error } = await supabase.from("symptoms").select("*");

    if (error) {
      console.error("Error fetching symptoms:", error);
      throw error;
    }

    return data || [];
  },

  async createVisit(visit: Omit<Visit, "id">): Promise<Visit> {
    const { data, error } = await supabase
      .from("visits")
      .insert([visit])
      .select()
      .single();

    if (error) {
      console.error("Error creating visit:", error);
      throw error;
    }

    return data;
  },

  async createMedicalHistory(
    history: Omit<MedicalHistory, "id">
  ): Promise<MedicalHistory> {
    const { data, error } = await supabase
      .from("medical_history")
      .insert([history])
      .select()
      .single();

    if (error) {
      console.error("Error creating medical history:", error);
      throw error;
    }

    return data;
  },

  async getDiseaseById(id: number): Promise<Disease | null> {
    const { data, error } = await supabase
      .from("diseases")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching disease:", error);
      throw error;
    }

    return data;
  },

  async getSymptomById(id: number): Promise<Symptom | null> {
    const { data, error } = await supabase
      .from("symptoms")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching symptom:", error);
      throw error;
    }

    return data;
  },
};
