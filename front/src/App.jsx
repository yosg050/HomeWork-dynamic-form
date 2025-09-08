import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes";
import "./App.css";

export default function App() {
  return <RouterProvider router={router} />;
}
