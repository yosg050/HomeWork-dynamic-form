import { apiFetch } from "./apiClient";

let lastEtag = null; // הוסף את השורה הזו בחזרה

export async function getSchema() {
  const headers = {};
  if (lastEtag) headers["If-None-Match"] = lastEtag;

  const data = await apiFetch("/schema", { headers });
  return { notModified: false, schema: data.schema };
}
