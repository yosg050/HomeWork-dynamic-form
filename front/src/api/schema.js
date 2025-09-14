import { apiFetch } from "./apiClient";

export async function getSchema() {
  const data = await apiFetch("/schema");
  return data; // apiFetch כבר מחזיר { schema: ... }
}
