"use client";
import Image from "next/image";

export default function Home() {
  async function getData() {
    const url = "http://localhost:8080/api/users";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <div>
      <h1>妳好</h1>
      <button onClick={getData}>get</button>
    </div>
  );
}
