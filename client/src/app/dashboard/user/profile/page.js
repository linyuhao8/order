import { redirect } from "next/navigation";
import { api } from "@/api";
export default async function ProfilePage() {
  const res = await api.auth.checkAuth();
  if (!res.ok) {
    redirect("/login");
  }
  const user = await res.json();
  redirect(`/dashboard/user/profile/${user.id}`); // redirect to profile page
}
import useAuth from "@/hooks/auth/useAuth";
