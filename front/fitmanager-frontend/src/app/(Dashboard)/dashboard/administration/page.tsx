import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Administration from "./Administration";

export default function RenderAdministration() {
  return (
      <ProtectedRoute>
        <Administration />
      </ProtectedRoute>
  );
}
