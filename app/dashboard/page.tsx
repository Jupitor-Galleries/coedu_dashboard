"use client";

import { useClass } from "@/context/ClassContext";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  MessageSquare, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { useRouter } from "next/navigation";

interface DashboardStats {
  totalStudents: number;
  activeStudents: number;
  pendingStudents: number;
  totalAnnouncements: number;
  totalSubmissions: number;
  recentActivity: {
    type: 'announcement' | 'submission';
    title: string;
    timestamp: string;
    status?: 'pending' | 'completed';
  }[];
}

export default function Dashboard() {
  const { classId } = useClass();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    activeStudents: 0,
    pendingStudents: 0,
    totalAnnouncements: 0,
    totalSubmissions: 0,
    recentActivity: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("coEdu_jwt");
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard/${classId}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    if (classId) {
      fetchDashboardData();
    }
  }, [classId]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-gray-600">
            Insights and analytics for your class
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Students */}
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Students</CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents}</div>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <span className="flex items-center text-green-500">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {stats.activeStudents} active
                </span>
                <span className="mx-2">•</span>
                <span className="flex items-center text-yellow-500">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  {stats.pendingStudents} pending
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Announcements</CardTitle>
              <MessageSquare className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAnnouncements}</div>
              <p className="text-xs text-gray-500 mt-1">Total messages sent</p>
            </CardContent>
          </Card>

          {/* Submissions */}
          <Card className="bg-white relative">
            <div className="absolute top-2 right-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                Coming Soon
              </span>
            </div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Submissions</CardTitle>
              <FileText className="h-4 w-4 text-gray-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-300">0</div>
              <p className="text-xs text-gray-400 mt-1">Total assignments received</p>
            </CardContent>
          </Card>

          {/* Engagement Rate */}
          <Card className="bg-white relative">
            <div className="absolute top-2 right-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                Coming Soon
              </span>
            </div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Engagement Rate</CardTitle>
              <Clock className="h-4 w-4 text-gray-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-300">0%</div>
              <p className="text-xs text-gray-400 mt-1">Active participation</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentActivity.length > 0 ? (
                  stats.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {activity.type === 'announcement' ? (
                          <MessageSquare className="h-5 w-5 text-blue-500" />
                        ) : (
                          <FileText className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {activity.title}
                        </p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-gray-500">
                            {new Date(activity.timestamp).toLocaleDateString()}
                          </span>
                          {activity.status && (
                            <>
                              <span className="mx-2 text-gray-300">•</span>
                              <span className={`text-xs ${
                                activity.status === 'completed' 
                                  ? 'text-green-500' 
                                  : 'text-yellow-500'
                              }`}>
                                {activity.status === 'completed' ? (
                                  <CheckCircle2 className="h-3 w-3 inline mr-1" />
                                ) : (
                                  <AlertCircle className="h-3 w-3 inline mr-1" />
                                )}
                                {activity.status}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No recent activity to show
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => router.push('/dashboard/announcements')}
                  className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MessageSquare className="h-6 w-6 text-blue-500 mb-2" />
                  <span className="text-sm font-medium">New Announcement</span>
                </button>
                <button 
                  disabled
                  className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed relative group"
                >
                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                      Coming Soon
                    </span>
                  </div>
                  <FileText className="h-6 w-6 text-gray-400 mb-2" />
                  <span className="text-sm font-medium text-gray-400">View Submissions</span>
                </button>
                <button 
                  onClick={() => router.push('/dashboard/students')}
                  className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Users className="h-6 w-6 text-purple-500 mb-2" />
                  <span className="text-sm font-medium">Manage Students</span>
                </button>
                <button 
                  disabled
                  className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed relative group"
                >
                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                      Coming Soon
                    </span>
                  </div>
                  <Clock className="h-6 w-6 text-gray-400 mb-2" />
                  <span className="text-sm font-medium text-gray-400">Schedule Content</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
