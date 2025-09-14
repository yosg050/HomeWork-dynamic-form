const getApiBaseUrl = () => {
  return "https://back-yosg050-yosef-gellers-projects.vercel.app";
};
const API_BASE = (getApiBaseUrl() || "").replace(/\/$/, "");
console.log("API_BASE:", API_BASE);

export async function apiFetch(
  path,
  { method = "GET", headers = {}, body } = {}
) {
  const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;

  const res = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const txt = await res.text().catch(() => "");
  let data = null;
  try {
    data = txt ? JSON.parse(txt) : null;
  } catch (_) {}

  if (!res.ok && res.status !== 304) {
    const msg = (data && (data.message || data.error)) || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return data;
}
