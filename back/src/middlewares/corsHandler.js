// src/middlewares/corsHandler.js
export function corsHandler(req, res, next) {
  const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://front-psi-peach.vercel.app",
    "https://front-a55dnp2jy-yosef-gellers-projects.vercel.app",
    "https://front-kujdgv8st-yosef-gellers-projects.vercel.app",
  ];

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );

  // טיפול ב-preflight OPTIONS requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  next();
}
