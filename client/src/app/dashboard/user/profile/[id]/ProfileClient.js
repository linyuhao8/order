"use client";
import { useState, useEffect } from "react";
import { api } from "@/api";
import Navbar from "@/components/Navbar";
export default function ProfileClient({ initialData, id }) {
  const [profile, setProfile] = useState(initialData);
  const [loading, setLoading] = useState(!initialData);

  //If don't have initial data, CSR fetch data.
  useEffect(() => {
    if (!initialData) {
      async function fetchUser() {
        setLoading(true);
        try {
          const res = await api.user.getUser(id);

          if (!res.ok) {
            console.warn(`⚠️ API respone error: ${res.status}`);
          }

          const data = await res.json();
          setProfile(data);
        } catch (error) {
          console.error("Error fetching user:", error);
        } finally {
          setLoading(false);
        }
      }

      fetchUser();
    }
  }, [id, initialData]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <h1>使用者資訊</h1>
      {profile ? (
        <>
          <p>名稱: {profile.name}</p>
          <p>Email: {profile.email}</p>
        </>
      ) : (
        <p>找不到使用者</p>
      )}
    </div>
  );
}
