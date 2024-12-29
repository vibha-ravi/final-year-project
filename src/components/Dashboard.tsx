import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Trash2, RecycleIcon, BarChart3 } from "lucide-react";

// Dummy data
const bins = [
    { id: 1, location: "Block A", fillLevel: 85, type: "General Waste", lastEmptied: "2024-12-28" },
    { id: 2, location: "Block B", fillLevel: 45, type: "Recyclables", lastEmptied: "2024-12-29" },
    { id: 3, location: "Block C", fillLevel: 92, type: "General Waste", lastEmptied: "2024-12-27" },
    { id: 4, location: "Block D", fillLevel: 30, type: "Recyclables", lastEmptied: "2024-12-29" },
];

const notifications = [
    { id: 1, message: "Bin at Block C requires immediate attention - 92% full", urgent: true, time: "5 minutes ago" },
    { id: 2, message: "Bin at Block A approaching capacity - 85% full", urgent: true, time: "15 minutes ago" },
    { id: 3, message: "Weekly collection scheduled for tomorrow", urgent: false, time: "1 hour ago" },
];

const Dashboard = () => {
    const urgentNotifications = notifications.filter(n => n.urgent);

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Smart Garbage Management Dashboard</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger className="relative">
                        <div className="relative">
                            <Bell className="h-6 w-6 text-gray-600 hover:text-gray-900 transition-colors" />
                            {urgentNotifications.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                    {urgentNotifications.length}
                                </span>
                            )}
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        {urgentNotifications.length > 0 ? (
                            urgentNotifications.map((notification) => (
                                <DropdownMenuItem key={notification.id} className="flex flex-col items-start py-3">
                                    <div className="flex items-start gap-2 w-full">
                                        <Bell className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-red-500">Urgent Notification</p>
                                            <p className="text-sm text-gray-700">{notification.message}</p>
                                            <p className="text-xs text-gray-500">{notification.time}</p>
                                        </div>
                                    </div>
                                </DropdownMenuItem>
                            ))
                        ) : (
                            <DropdownMenuItem className="text-center text-sm text-gray-500">
                                No urgent notifications
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Bins</CardTitle>
                        <Trash2 className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{bins.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Bins Requiring Attention</CardTitle>
                        <Bell className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{bins.filter(bin => bin.fillLevel > 80).length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Average Fill Level</CardTitle>
                        <BarChart3 className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {Math.round(bins.reduce((acc, bin) => acc + bin.fillLevel, 0) / bins.length)}%
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Notifications */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {notifications.map(notification => (
                        <Alert key={notification.id} variant={notification.urgent ? "destructive" : "default"}>
                            <AlertDescription>
                                <div className="flex justify-between items-start">
                                    <span>{notification.message}</span>
                                    <span className="text-xs text-gray-500 ml-4">{notification.time}</span>
                                </div>
                            </AlertDescription>
                        </Alert>
                    ))}
                </CardContent>
            </Card>

            {/* Bins Status */}
            <Card>
                <CardHeader>
                    <CardTitle>Bins Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {bins.map(bin => (
                            <div key={bin.id} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-medium">{bin.location}</h3>
                                        <p className="text-sm text-gray-500">
                                            {bin.type} • Last emptied: {bin.lastEmptied}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {bin.type === "Recyclables" && <RecycleIcon className="h-4 w-4 text-green-500" />}
                                        <span className={`font-medium ${bin.fillLevel > 80 ? 'text-red-500' : 'text-gray-600'}`}>
                                            {bin.fillLevel}%
                                        </span>
                                    </div>
                                </div>
                                <Progress
                                    value={bin.fillLevel}
                                    className={`h-2 ${bin.fillLevel > 80 ? 'bg-red-100' : 'bg-gray-100'}`}
                                />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;