import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import UserEditPanel from "./UserEditPanel";
import IsAdmin from "@/components/IsAdmin/IsAdmin";

export default async function EditUser({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  return (
    <IsAdmin>
      <ProtectedRoute>
        <UserEditPanel params={resolvedParams} />
      </ProtectedRoute>
    </IsAdmin>
  );
}
