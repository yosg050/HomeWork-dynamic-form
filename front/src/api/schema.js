import { apiFetch } from "./http/apiClient.js";

export async function getSchema() {
  const data = await apiFetch("/schema");
  return data.schema; 
}
