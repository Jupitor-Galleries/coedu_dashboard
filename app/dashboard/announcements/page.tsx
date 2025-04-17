'use client'

import React, { Suspense, useState } from 'react';
import CreateAnnouncement from './CreateAnnouncement';
import { useClass } from "@/context/ClassContext";
import { useModal } from '../layout'; // Import the context hook

interface StudentData {
  _id: string;
  name: string;
  whatsappNumber: string;
  gender: string;
  classes: string[];
  accepted: boolean;
  approved: boolean;
  preferredLanguage: string;
  onboardingStep: string;
  createdAt: string;
}

interface StatusHistory {
  status: string;
  timestamp: string;
  _id: string;
}

interface StudentStatus {
  studentId: StudentData | null;
  whatsapp_message_id: string | null;
  status: string;
  statusHistory: StatusHistory[];
  submissions: Array<{
    submissionId: string;
    timestamp: string;
    status: string;
  }>;
  _id: string;
}

interface Announcement {
  _id: string;
  title: string;
  description: string;
  attachments: Array<{
    id: string;
    name: string;
    url: string;
  }>;
  classId: string;
  students: StudentStatus[];
  createdAt: string;
  formattedMessage?: string;
  formattingStyle?: 'standard' | 'fun' | 'minimal';
}

function AnnouncementDetails({ announcement, onClose }: { announcement: Announcement | null; onClose: () => void }) {
  if (!announcement) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'text-green-600';
      case 'delivered':
        return 'text-blue-600';
      case 'read':
        return 'text-purple-600';
      case 'not_sent':
      default:
        return 'text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  // Count students by status
  const statusCounts = announcement.students.reduce((acc, student) => {
    acc[student.status] = (acc[student.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Count available vs unavailable student data
  const availableStudents = announcement.students.filter(s => s.studentId).length;
  const totalStudents = announcement.students.length;
  const pendingStudents = totalStudents - availableStudents;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{announcement.title}</h2>
              <p className="text-sm text-gray-500">
                Created on {formatDate(announcement.createdAt)}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{announcement.description}</p>
            </div>

            {announcement.formattedMessage && (
              <div>
                <h3 className="text-lg font-semibold mb-2">WhatsApp Message Format</h3>
                <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap">
                  {announcement.formattedMessage}
                </div>
              </div>
            )}

            <div>
              <div className="flex flex-col gap-2 mb-4">
                <h3 className="text-lg font-semibold">Student Delivery Status</h3>
                <div className="flex flex-col gap-1">
                  <div className="text-sm text-gray-600">
                    Total Recipients: {totalStudents} students
                  </div>
                  <div className="text-sm text-gray-600 flex gap-2">
                    <span className="text-green-600">{availableStudents} Active</span>
                    <span>•</span>
                    <span className="text-gray-500">{pendingStudents} Pending Registration</span>
                  </div>
                </div>
              </div>

              {/* Status Summary */}
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium mb-2">Message Status</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                    <span className="text-sm">Sent: {statusCounts['sent'] || 0}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    <span className="text-sm">Delivered: {statusCounts['delivered'] || 0}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                    <span className="text-sm">Read: {statusCounts['read'] || 0}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                    <span className="text-sm">Not Sent: {statusCounts['not_sent'] || 0}</span>
                  </div>
                </div>
              </div>

              {availableStudents === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  <p className="font-medium mb-2">Waiting for Student Registration</p>
                  <p className="mb-4">All {totalStudents} recipients need to complete their registration process.</p>
                  <div className="text-left">
                    This could be because:
                    <ul className="list-disc ml-6 mt-2">
                      <li>Students haven&apos;t joined the class yet</li>
                      <li>Students haven&apos;t completed their WhatsApp registration</li>
                      <li>Students haven&apos;t accepted their invitations</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div>
                  <h4 className="font-medium mb-2">Registered Students ({availableStudents})</h4>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-1 divide-y divide-gray-200">
                      {announcement.students
                        .filter(student => student.studentId)
                        .map((student) => (
                          <div key={student._id} className="p-4 hover:bg-gray-100">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                              <div>
                                <p className="font-medium">{student.studentId?.name}</p>
                                <p className="text-sm text-gray-500">{student.studentId?.whatsappNumber}</p>
                                <p className="text-sm text-gray-500">Language: {student.studentId?.preferredLanguage}</p>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className={`font-medium ${getStatusColor(student.status)}`}>
                                  {student.status.replace('_', ' ').toUpperCase()}
                                </span>
                                {student.statusHistory.length > 0 && (
                                  <span className="text-xs text-gray-500">
                                    Last updated: {formatDate(student.statusHistory[student.statusHistory.length - 1].timestamp)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnnouncementsList({ refreshTrigger }: { refreshTrigger: number }) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(5);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const { classId } = useClass();
  const token = localStorage.getItem("coEdu_jwt");

  const fetchAnnouncementDetails = async (announcementId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/announcement/${announcementId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch announcement details');
      const data = await response.json();
      setSelectedAnnouncement(data);
    } catch (error) {
      console.error('Error fetching announcement details:', error);
    }
  };

  React.useEffect(() => {
    const fetchAnnouncements = async () => {
      if (!classId) return;
      
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/announcement/class/${classId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch announcements');
        const data = await response.json();
        const sortedAnnouncements = data.sort((a: Announcement, b: Announcement) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setAnnouncements(sortedAnnouncements);
        
        // Set the most recent date group as expanded
        if (sortedAnnouncements.length > 0) {
          const mostRecentDate = getMostRecentDateGroup(sortedAnnouncements[0].createdAt);
          setExpandedGroups([mostRecentDate]);
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, [token, classId, refreshTrigger]);

  const getMostRecentDateGroup = (date: string) => {
    const announcementDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (announcementDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (announcementDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else if (announcementDate.getFullYear() === today.getFullYear()) {
      return announcementDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    } else {
      return announcementDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
  };

  const groupAnnouncementsByDate = (announcements: Announcement[]) => {
    const groups: { [key: string]: Announcement[] } = {};
    
    announcements.slice(0, displayCount).forEach((announcement) => {
      const groupKey = getMostRecentDateGroup(announcement.createdAt);
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(announcement);
    });
    
    return groups;
  };

  const toggleGroup = (date: string) => {
    setExpandedGroups(prev => 
      prev.includes(date) 
        ? prev.filter(d => d !== date)
        : [...prev, date]
    );
  };

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  );

  if (!classId) return (
    <div className="text-center py-8 text-gray-500">
      Please select a class to view announcements.
    </div>
  );

  const groupedAnnouncements = groupAnnouncementsByDate(announcements);

  return (
    <div className="space-y-2">
      {announcements.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No announcements yet. Create your first announcement!
        </div>
      ) : (
        <>
          {Object.entries(groupedAnnouncements).map(([date, dateAnnouncements]) => (
            <div key={date} className="rounded-lg overflow-hidden bg-white border border-gray-200">
              <button
                onClick={() => toggleGroup(date)}
                className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transform transition-transform ${expandedGroups.includes(date) ? 'rotate-90' : ''}`}
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <span className="font-medium text-gray-700">{date}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {dateAnnouncements.length} {dateAnnouncements.length === 1 ? 'announcement' : 'announcements'}
                </span>
              </button>

              {expandedGroups.includes(date) && (
                <div className="divide-y divide-gray-100">
                  {dateAnnouncements.map((announcement) => (
                    <div 
                      key={announcement._id}
                      onClick={() => fetchAnnouncementDetails(announcement._id)}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-grow">
                          <h3 className="font-medium text-gray-900 mb-1">{announcement.title}</h3>
                          <p className="text-gray-600 text-sm line-clamp-2">{announcement.description}</p>
                        </div>
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                          {new Date(announcement.createdAt).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
        </div>
      ))}

          {displayCount < announcements.length && (
            <div className="text-center pt-4">
              <button
                onClick={() => setDisplayCount(prev => prev + 5)}
                className="text-blue-500 hover:text-blue-600 font-medium flex items-center gap-2 mx-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v8"/>
                  <path d="M8 12h8"/>
                </svg>
                Show More Announcements
              </button>
            </div>
          )}
        </>
      )}

      {selectedAnnouncement && (
        <AnnouncementDetails 
          announcement={selectedAnnouncement} 
          onClose={() => setSelectedAnnouncement(null)} 
        />
      )}
    </div>
  );
}

function AnnouncementsComponent() { // Remove props
  const { isModalOpen, setIsModalOpen, handleAnnouncementCreated } = useModal(); // Use context
  const [shouldRefresh, setShouldRefresh] = useState(0);

  // Refreshes the list when triggered
  const refreshList = () => {
    setShouldRefresh(prev => prev + 1);
  };

  // Handle announcement creation success
  const onCreationSuccess = () => {
    handleAnnouncementCreated(); // Call context function (closes modal)
    refreshList(); // Trigger list refresh
  };

  return (
    <div className="min-h-screen bg-gray-50">
    <div className="p-6">
        <AnnouncementsList refreshTrigger={shouldRefresh} />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create New Announcement</h2>
              <button
                onClick={() => setIsModalOpen(false)} // Use context function
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <CreateAnnouncement onSuccess={onCreationSuccess} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function Announcements() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* No need to pass props, component uses context */}
      <AnnouncementsComponent />
    </Suspense>
  );
}
