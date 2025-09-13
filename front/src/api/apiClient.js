const getApiBaseUrl = () => {
  return "https://back-mblxwgk3p-yosef-gellers-projects.vercel.app";
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

  // נקרא טקסט כדי שנוכל להציג שגיאה טובה גם אם זה לא JSON תקין
  const txt = await res.text().catch(() => "");
  let data = null;
  try {
    data = txt ? JSON.parse(txt) : null;
  } catch (_) {
    // משאירים data=null אם זה לא JSON
  }

  if (!res.ok && res.status !== 304) {
    const msg = (data && (data.message || data.error)) || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return data; // << לא החזר Response, החזר את ה-JSON
}
