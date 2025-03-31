// app/dashboard/profile/page.js
"use client";
import { useState, useEffect } from "react";
import { api } from "@/api";
import { use } from "react";

export default function ProfilePage({ params }) {
  const { id } = use(params);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchUserProfile() {
      try {
        const res = await api.user.getUser(id);
        if (!res.ok) {
          console.warn(`⚠️ API response error: ${res.status}`);
          return;
        }
        const data = await res.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>User Profile</h1>
      {profile ? (
        <>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
        </>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
}
