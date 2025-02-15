import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import User from "./User";

export default async function UserPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  return (
      <ProtectedRoute>
        <User params={resolvedParams} />
      </ProtectedRoute>
  );
}
