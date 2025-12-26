import { useState } from "react";

const ProfileDemo = () => {
    // --- DEMO DATA (API এর বদলে এখন এটা ব্যবহার করছি) ---
    const [role, setRole] = useState("user"); // ডিফল্ট রোল 'user' রাখলাম টেস্ট করার জন্য

    const user = {
        displayName: "Sakib Al Hasan",
        email: "sakib75@eventhost.com",
        photoURL: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
        uid: "UID_123456789",
        status: "verified"
    };

    // --- ROLE অনুযায়ী কালার সেট করা ---
    const roleTheme = {
        admin: { bg: "bg-red-500", badge: "bg-red-100 text-red-600", border: "border-red-500" },
        "event-manager": { bg: "bg-blue-600", badge: "bg-blue-100 text-blue-600", border: "border-blue-600" },
        user: { bg: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-600", border: "border-emerald-500" }
    };

    const currentTheme = roleTheme[role];

    // --- হ্যান্ডলার (Fake Request) ---
    const handleRequest = () => {
        alert("Request sent to Admin successfully! (This is a demo)");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
            
            {/* --- DEMO CONTROL (রিয়েল প্রজেক্টে এটা থাকবে না) --- */}
            <div className="mb-8 p-4 bg-white shadow-sm rounded-lg border border-dashed border-gray-400">
                <p className="text-sm font-bold text-gray-500 mb-2 text-center">--- Developer Control (Demo) ---</p>
                <div className="flex gap-2">
                    <button onClick={() => setRole("user")} className="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200">View as User</button>
                    <button onClick={() => setRole("event-manager")} className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">View as Manager</button>
                    <button onClick={() => setRole("admin")} className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200">View as Admin</button>
                </div>
            </div>

     
            
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-[1.01]">
                
                {/* 1. Header Gradient Background */}
                <div className={`h-32 ${currentTheme.bg} relative`}>
                    <div className="absolute inset-0 bg-black opacity-10"></div> {/* Overlay for texture */}
                    
                    {/* Decorative Shapes */}
                    <div className="absolute top-4 left-4 w-16 h-16 bg-white opacity-20 rounded-full blur-xl"></div>
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full -mb-10 -mr-10"></div>
                </div>

                {/* 2. Profile Image & Role Wrapper */}
                <div className="flex justify-center -mt-16 relative px-4">
                    <div className={`p-1 rounded-full bg-white shadow-lg ${currentTheme.border} border-2`}>
                        <img 
                            src={user.photoURL} 
                            alt="Profile" 
                            className="w-32 h-32 rounded-full object-cover border-4 border-white"
                        />
                    </div>
                    
                    {/* Role Badge (Floating) */}
                    <span className={`absolute bottom-2 right-1/3 transform translate-x-8 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm border border-white ${currentTheme.badge}`}>
                        {role}
                    </span>
                </div>

                {/* 3. User Information */}
                <div className="text-center px-6 py-4">
                    <h2 className="text-2xl font-bold text-gray-800">{user.displayName}</h2>
                    <p className="text-sm text-gray-500 font-medium mb-1">{user.email}</p>
                    <p className="text-xs text-gray-400 bg-gray-100 inline-block px-2 py-1 rounded">ID: {user.uid}</p>
                </div>

                {/* 4. Action Buttons */}
                <div className="px-6 pb-6 flex flex-col gap-3">
                    <button className="w-full py-2.5 rounded-lg bg-gray-800 text-white font-semibold hover:bg-gray-900 transition-colors shadow-lg shadow-gray-300/50 flex items-center justify-center gap-2">
                        Edit Profile
                    </button>

                    {/* Conditional Rendering: এই বাটন শুধু সাধারণ ইউজার দেখবে */}
                    {role === 'user' && (
                        <button 
                            onClick={handleRequest}
                            className="w-full py-2.5 rounded-lg border-2 border-dashed border-blue-400 text-blue-600 font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 group">
                            <span>✨ Request to be Organizer</span>
                        </button>
                    )}
                </div>

                {/* 5. Footer Stats */}
                <div className="border-t border-gray-100 flex py-4 bg-gray-50">
                    <div className="w-1/2 text-center border-r border-gray-200">
                        <span className="block text-xl font-bold text-gray-700">12</span>
                        <span className="text-xs text-gray-400 uppercase tracking-wide">Bookings</span>
                    </div>
                    <div className="w-1/2 text-center">
                        <span className={`block text-xl font-bold ${user.status === 'verified' ? 'text-green-500' : 'text-red-500'}`}>
                            {user.status === 'verified' ? 'Active' : 'Banned'}
                        </span>
                        <span className="text-xs text-gray-400 uppercase tracking-wide">Account Status</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProfileDemo;