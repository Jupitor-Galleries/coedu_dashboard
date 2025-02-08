"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export function OrganizationForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("coEdu_jwt");
    const response = await fetch(`${backend_url}/api/organization/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });
    setLoading(false);
    if (response.ok) {
      toast.success("Organization created successfully");
      router.push('/organization');
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
            New Organization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <Input
                id="name"
                type="text"
                placeholder="Enter organization name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Textarea
                id="description"
                placeholder="Enter organization description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : "Create Organization"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
