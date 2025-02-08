"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

interface ClassFormProps {
  organizationId: string;
}

export function ClassForm({ organizationId }: ClassFormProps) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("coEdu_jwt");
    const response = await fetch(`${backend_url}/api/classes/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        startDate,
        endDate,
        organizationId,
      }),
    });
    setLoading(false);
    if (response.ok) {
      toast.success("Class created successfully");
      router.push(`/classes?organizationId=${organizationId}`);
    } else {
      const errorData = await response.json();
      console.log(errorData);
      toast.error(errorData.error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Card className="bg-red mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl text-[#667085] text-center font-medium">
            New Class
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <Input
                id="name"
                type="text"
                placeholder="Enter class name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="startDate">Start Date</label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <label htmlFor="endDate">End Date</label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : "Create Class"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
