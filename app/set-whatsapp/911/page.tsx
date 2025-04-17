"use client";

import { useState } from "react";

const SetWhatsAppDetailsPage = () => {
  const [formData, setFormData] = useState({
    organizationId: "",
    phoneId: "",
    accessToken: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/organization/set-whatsapp-details`, {
        method: "POST",
        headers: {
          Authorization: "Bearer YOUR_JWT_TOKEN", // Replace with your actual token
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error(await response.text());
      }

      const data = await response.json();
      setResponseMessage("Success: " + JSON.stringify(data));
    } catch (error: unknown) {
      setResponseMessage("Error: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Set WhatsApp Details</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Organization ID</label>
          <input
            type="text"
            name="organizationId"
            value={formData.organizationId}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone ID</label>
          <input
            type="text"
            name="phoneId"
            value={formData.phoneId}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Access Token</label>
          <input
            type="text"
            name="accessToken"
            value={formData.accessToken}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {responseMessage && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          {responseMessage}
        </div>
      )}
    </div>
  );
};

export default SetWhatsAppDetailsPage;
