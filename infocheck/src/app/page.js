"use client";
import Image from "next/image";
import NameForm from "./NameForm";
import Header from "./Header";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <NameForm />
      </div>
    </div>
  );
}
