import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://atededpirnhljogybeqy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0ZWRlZHBpcm5obGpvZ3liZXF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0OTY1MTYsImV4cCI6MjA2MTA3MjUxNn0.UFlYX_y_-5eEYlmt_KjurCJ37adiw5iagJ7DkvlMKK0";

export const supabase = createClient(supabaseUrl, supabaseKey);
