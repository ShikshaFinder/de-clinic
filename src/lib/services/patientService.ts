import { supabase } from "../supabase";
import {
  Patient,
  Visit,
  Disease,
  Symptom,
  MedicalHistory,
  PatternDetected,
} from "./types";

export const patientService = {
  async getAllPatients(): Promise<Patient[]> {
    const { data, error } = await supabase.from("patients").select("*");

    if (error) {
      console.error("Error fetching patients:", error);
      throw error;
    }

    return data || [];
  },

  async getPatientById(id: number): Promise<Patient | null> {
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching patient:", error);
      throw error;
    }

    return data;
  },

  async getPatientVisits(patientId: number): Promise<Visit[]> {
    const { data, error } = await supabase
      .from("visits")
      .select("*")
      .eq("patient_id", patientId);

    if (error) {
      console.error("Error fetching patient visits:", error);
      throw error;
    }

    return data || [];
  },

  async getPatientMedicalHistory(patientId: number): Promise<{
    visits: Visit[];
    diseases: Disease[];
    symptoms: Symptom[];
  }> {
    const { data: visits, error: visitsError } = await supabase
      .from("visits")
      .select("*")
      .eq("patient_id", patientId);

    if (visitsError) {
      console.error("Error fetching visits:", visitsError);
      throw visitsError;
    }

    const visitIds = visits?.map((v) => v.id) || [];

    const { data: medicalHistory, error: historyError } = await supabase
      .from("medical_history")
      .select("*")
      .in("visit_id", visitIds);

    if (historyError) {
      console.error("Error fetching medical history:", historyError);
      throw historyError;
    }

    const diseaseIds = medicalHistory?.map((mh) => mh.disease_id) || [];
    const symptomIds = medicalHistory?.map((mh) => mh.symptom_id) || [];

    const { data: diseases, error: diseasesError } = await supabase
      .from("diseases")
      .select("*")
      .in("id", diseaseIds);

    if (diseasesError) {
      console.error("Error fetching diseases:", diseasesError);
      throw diseasesError;
    }

    const { data: symptoms, error: symptomsError } = await supabase
      .from("symptoms")
      .select("*")
      .in("id", symptomIds);

    if (symptomsError) {
      console.error("Error fetching symptoms:", symptomsError);
      throw symptomsError;
    }

    return {
      visits: visits || [],
      diseases: diseases || [],
      symptoms: symptoms || [],
    };
  },

  async getPatientPatterns(patientId: number): Promise<PatternDetected[]> {
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

  async createPatient(patient: Omit<Patient, "id">): Promise<Patient> {
    const { data, error } = await supabase
      .from("patients")
      .insert([patient])
      .select()
      .single();

    if (error) {
      console.error("Error creating patient:", error);
      throw error;
    }

    return data;
  },

  async updatePatient(id: number, patient: Partial<Patient>): Promise<Patient> {
    const { data, error } = await supabase
      .from("patients")
      .update(patient)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating patient:", error);
      throw error;
    }

    return data;
  },

  async deletePatient(id: number): Promise<void> {
    const { error } = await supabase.from("patients").delete().eq("id", id);

    if (error) {
      console.error("Error deleting patient:", error);
      throw error;
    }
  },
};
