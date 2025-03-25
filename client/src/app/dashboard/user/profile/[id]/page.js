import ProfileClient from "./ProfileClient";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { api } from "@/api";

//commit name client / Add profile page(SSR fetch data),Add profileClient page(CSR fetch and display layout)
async function getUserData(id) {
  // get cookie token
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // API
  const res = await api.user.getUser(id, token);

  // 如果沒有授權（401 或 403），直接跳轉
  if (res.status === 401 || res.status === 403) {
    console.warn(`⚠️ API error: ${res.status}`);
    redirect("/login");
  }

  return await res.json();
}

//SSR
export default async function Page({ params }) {
  const { id } = await params;
  const initialData = await getUserData(id);

  return <ProfileClient initialData={initialData} id={id} />;
}
