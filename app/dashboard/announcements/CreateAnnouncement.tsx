'use client'

import React, { useState, useEffect } from 'react';
import { useClass } from "@/context/ClassContext";

interface AnnouncementData {
  title: string;
  description: string;
  links?: string[];
  formattingStyle: 'standard' | 'fun' | 'minimal';
  customSignOff: string;
}

// interface AttachmentFile extends File {
//   preview?: string;
// }

interface CreateAnnouncementProps {
  onSuccess?: () => void;
}

interface UserDetails {
  name: string;
}

export default function CreateAnnouncement({ onSuccess }: CreateAnnouncementProps) {
  const { classId } = useClass();
  const [instructorName, setInstructorName] = useState<string>('Your Instructor'); // Default placeholder
  const [className, setClassName] = useState<string>('This Class'); // Default placeholder
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newLink, setNewLink] = useState('');
  const [formData, setFormData] = useState<AnnouncementData>({
    title: '',
    description: '',
    links: [],
    formattingStyle: 'standard',
    customSignOff: 'Stay awesome and keep learning!',
  });
  const [previewMessage, setPreviewMessage] = useState<string>('');

  // Fetch user details (instructor name)
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("coEdu_jwt");
        if (!token) throw new Error("No auth token found");

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/user-details`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch user details');
        const data: UserDetails = await response.json();
        setInstructorName(data.name || 'Your Instructor');
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Keep default name if fetch fails
      }
    };
    fetchUserDetails();
  }, []);

  // Fetch class details (class name)
  useEffect(() => {
    const fetchClassDetails = async () => {
      if (!classId) return;
      try {
        const token = localStorage.getItem("coEdu_jwt");
        if (!token) throw new Error("No auth token found");

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/classes/${classId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch class details');
        const data = await response.json();
        setClassName(data.class?.name || 'This Class');
      } catch (error) {
        console.error("Error fetching class details:", error);
        // Keep default name if fetch fails
      }
    };
    fetchClassDetails();
  }, [classId]);

  // Format the announcement message based on selected style
  const formatAnnouncementMessage = (
    title: string, 
    description: string, 
    links: string[] = [],
    style: string, 
    signOff: string,
    currentClassName: string,
    currentInstructorName: string
  ) => {
    let message = '';
    const headerInfo = `📍 *Class:* ${currentClassName}\n👨‍🏫 *Instructor:* ${currentInstructorName}\n\n`;
    
    switch(style) {
      case 'fun':
        message = `✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨\n`;
        message += headerInfo;
        message += `📢 *${title}* 📢\n`;
        message += `✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨\n\n`;
        message += `${description}\n`;
        
        if (links?.length > 0) {
          message += `\n\n📚 *RESOURCES* 📚`;
          links.forEach((link) => {
            message += `\n🔗 ${link}`;
          });
        }
        
        message += `\n\n✅ _${signOff}_`;
        break;
      
      case 'minimal':
        message += headerInfo;
        message += `*${title}*\n\n`;
        message += `${description}\n`;
        
        if (links?.length > 0) {
          message += `\n\nResources:`;
          links.forEach((link) => {
            message += `\n- ${link}`;
          });
        }
        break;
      
      case 'standard':
      default:
        message += headerInfo;
        message += `*${title}*\n\n`;
        message += `${description}\n`;
        
        if (links?.length > 0) {
          message += `\n\nResources:`;
          links.forEach((link) => {
            message += `\n- ${link}`;
          });
        }
        
        message += `\n\n_${signOff}_`;
    }
    
    return message;
  };

  // Generate preview when form data or names change
  useEffect(() => {
    const preview = formatAnnouncementMessage(
      formData.title, 
      formData.description, 
      formData.links || [],
      formData.formattingStyle,
      formData.customSignOff,
      className,
      instructorName
    );
    setPreviewMessage(preview);
  }, [formData, className, instructorName]);

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLink) return;

    try {
      // Basic URL validation
      new URL(newLink);
      setFormData(prev => ({
        ...prev,
        links: [...(prev.links || []), newLink]
      }));
      setNewLink(''); // Clear input after adding
    } catch {
      alert('Please enter a valid URL (including http:// or https://)');
    }
  };

  const handleRemoveLink = (linkToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links?.filter(link => link !== linkToRemove) || []
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!classId) {
      alert('No class selected. Please select a class first.');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("coEdu_jwt");
      
      const formattedMessage = formatAnnouncementMessage(
        formData.title,
        formData.description,
        formData.links || [],
        formData.formattingStyle,
        formData.customSignOff,
        className,
        instructorName
      );
      
      const announcementResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/announcement`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          classId: classId,
          formattedMessage: formattedMessage,
          formattingStyle: formData.formattingStyle,
          links: formData.links
        })
      });

      if (!announcementResponse.ok) {
        throw new Error('Failed to create announcement');
      }

      setFormData({
        title: '',
        description: '',
        links: [],
        formattingStyle: 'standard',
        customSignOff: 'Stay awesome and keep learning!',
      });

      alert('Announcement created successfully!');
      onSuccess?.();
    } catch (error: unknown) {
      console.error('Error creating announcement:', error);
      alert('Failed to create announcement. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title *
        </label>
        <input
          type="text"
          id="title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description *
        </label>
        <textarea
          id="description"
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border rounded-md h-32"
        />
      </div>

      {/* Attachments Section (now for links only) */}
      <div className="space-y-2">
        <label className="block text-sm font-medium mb-1">
          Attachments (Links)
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            placeholder="Enter URL (https://...)"
            className="flex-1 px-3 py-2 border rounded-md"
          />
          <button
            type="button"
            onClick={handleAddLink}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Add Link
          </button>
        </div>
        
        {/* Display added links */}
        {formData.links && formData.links.length > 0 && (
          <div className="mt-2 space-y-2">
            {formData.links.map((link, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded-md">
                <span className="flex-1 text-sm text-gray-600 truncate">{link}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveLink(link)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="formattingStyle" className="block text-sm font-medium mb-1">
          WhatsApp Message Style
        </label>
        <select
          id="formattingStyle"
          value={formData.formattingStyle}
          onChange={(e) => setFormData({ ...formData, formattingStyle: e.target.value as 'standard' | 'fun' | 'minimal' })}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="standard">Standard</option>
          <option value="fun">Fun & Engaging</option>
          <option value="minimal">Minimal</option>
        </select>
      </div>
        
      {formData.formattingStyle !== 'minimal' && (
        <div>
          <label htmlFor="customSignOff" className="block text-sm font-medium mb-1">
            Custom Sign-Off Message
          </label>
          <input
            type="text"
            id="customSignOff"
            value={formData.customSignOff}
            onChange={(e) => setFormData({ ...formData, customSignOff: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`flex items-center justify-center w-full sm:w-auto px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors ${
          isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Creating...
          </>
        ) : (
          'Create Announcement'
        )}
      </button>
    </form>
      
      {/* Message Preview Section */}
      <div className="max-w-2xl">
        <h3 className="text-lg font-medium mb-2">WhatsApp Message Preview</h3>
        <div className="border rounded-md p-4 bg-gray-50 whitespace-pre-wrap max-w-full overflow-auto">
          {previewMessage || 'Your formatted message will appear here...'}
        </div>
      </div>
    </div>
  );
} 