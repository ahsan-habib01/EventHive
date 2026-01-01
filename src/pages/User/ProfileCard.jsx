import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import {
  Edit,
  Sparkles,
  CheckCircle2,
  XCircle,
  Calendar,
  Ticket,
  ShieldCheck,
  UserCheck,
  Users,
  Loader2,
} from "lucide-react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Loading from "../../componets/Shared/Loading";

const ProfileCard = () => {
  const { user: authUser, loading: authLoading } = useAuth();
  const axiosSecure = UseAxiosSecure();

  // 1. Fetch User Role and Status from backend
  const {
    data: userData,
    isLoading: dataLoading,
    refetch,
  } = useQuery({
    queryKey: ["user-profile", authUser?.email],
    enabled: !!authUser?.email && !authLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${authUser?.email}`);
      console.log("DB User Data:", res.data);
      return res.data;
    },
  });

  // 2. Fetch user's bookings count
  const { data: bookings = [] } = useQuery({
    queryKey: ["my-bookings-count", authUser?.email],
    enabled: !!authUser?.email && !authLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${authUser?.email}`);
      return res.data || [];
    },
  });

  // 3. Fetch user's events count (for managers)
  const { data: myEvents = [] } = useQuery({
    queryKey: ["my-events-count", authUser?.email],
    enabled:
      !!authUser?.email &&
      !authLoading &&
      (userData?.role === "manager" || userData?.role === "admin"),
    queryFn: async () => {
      const res = await axiosSecure.get(`/events/manager/${authUser?.email}`);
      return res.data || [];
    },
  });

  // 4. Loading Spinner
  if (authLoading || dataLoading) {
    return <Loading />;
  }

  // 5. User Object Creation (Safe Merge)
  const user = {
    displayName: authUser?.displayName || "User",
    email: authUser?.email,
    photoURL: authUser?.photoURL,
    uid: authUser?.uid,
    role: userData?.role || "user",
    status: userData?.status || "verified",
    totalBookings: bookings.filter((b) => b.status === "confirmed").length || 0,
    totalEvents: myEvents.length || 0,
  };

  // 6. Role Theme Configuration
  const roleTheme = {
    admin: {
      text: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
      ring: "ring-purple-50",
      label: "Admin",
      icon: ShieldCheck,
    },
    manager: {
      text: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      ring: "ring-blue-50",
      label: "Organizer",
      icon: UserCheck,
    },
    user: {
      text: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      ring: "ring-emerald-50",
      label: "User",
      icon: Users,
    },
  };

  // Fallback to 'user' theme if role doesn't match
  const currentTheme = roleTheme[user.role] || roleTheme.user;
  const RoleIcon = currentTheme.icon;

  const handleRequest = async () => {
    try {
      const res = await axiosSecure.patch(
        `/users/request-manager/${user.email}`
      );
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: "Success",
          text: "Request sent successfully!",
          icon: "success",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "Failed to send request",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden relative">
        {/* Banner */}
        <div className="h-44 bg-gradient-to-br from-lime-500 via-emerald-500 to-teal-500 relative overflow-hidden">
          {/* Pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
            }}
          ></div>
          <div className="absolute top-5 right-5 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/40 rounded-xl text-xs font-bold text-white uppercase tracking-widest shadow-lg">
            #{user.uid?.slice(-6) || "N/A"}
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-10 -mt-20 relative">
          <div className="flex flex-col items-center text-center">
            {/* Avatar with gradient ring */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-lime-400 to-emerald-400 rounded-full blur-xl opacity-30"></div>
              <div className="relative p-2 rounded-full bg-white shadow-2xl">
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-36 h-36 rounded-full object-cover border-4 border-white"
                />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                  {user.displayName}
                  {/* Role Icon next to Name */}
                  {user.role === "admin" && (
                    <ShieldCheck size={22} className="text-purple-500" />
                  )}
                  {user.role === "manager" && (
                    <CheckCircle2 size={22} className="text-blue-500" />
                  )}
                </h2>
                <p className="text-sm text-gray-500 mt-2">{user.email}</p>
              </div>

              {/* DYNAMIC ROLE BADGE */}
              <div
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${currentTheme.bg} ${currentTheme.text}`}
              >
                <RoleIcon size={15} />
                {currentTheme.label}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t-2 border-gray-100">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-lime-100 to-emerald-100 group-hover:from-lime-200 group-hover:to-emerald-200 transition-colors duration-300 mb-3">
                <Ticket size={20} className="text-lime-600" />
              </div>
              <span className="block text-3xl font-bold text-gray-900 mb-1">
                {user.totalBookings}
              </span>
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                Bookings
              </span>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-100 to-cyan-100 group-hover:from-teal-200 group-hover:to-cyan-200 transition-colors duration-300 mb-3">
                <CheckCircle2 size={20} className="text-teal-600" />
              </div>
              <span className="block text-3xl font-bold text-gray-900 capitalize mb-1">
                {user.status === "verified" ? "✓" : user.status}
              </span>
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                Status
              </span>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-100 to-orange-100 group-hover:from-yellow-200 group-hover:to-orange-200 transition-colors duration-300 mb-3">
                <Calendar size={20} className="text-yellow-600" />
              </div>
              <span className="block text-3xl font-bold text-gray-900 mb-1">
                {user.totalEvents}
              </span>
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                Events
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 space-y-3">
            <button className="w-full py-4 px-4 bg-gradient-to-r from-gray-900 to-gray-700 hover:from-lime-600 hover:to-emerald-600 text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
              <Edit size={18} /> Edit Profile
            </button>

            {/* HIDE BUTTON IF NOT USER */}
            {user.role === "user" && (
              <button
                onClick={handleRequest}
                disabled={user.status === "requested"}
                className={`w-full py-4 cursor-pointer px-4 text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  user.status === "requested"
                    ? "bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed"
                    : "bg-white hover:bg-lime-50 text-gray-800 border-2 border-gray-200 hover:border-lime-400 shadow-sm hover:shadow-md"
                }`}
              >
                <Sparkles size={18} />
                {user.status === "requested"
                  ? "Request Pending..."
                  : "Request Manager Access"}
              </button>
            )}

            {/* Show message for Manager/Admin */}
            {user.role !== "user" && (
              <div
                className={`w-full py-4 px-4 text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm ${currentTheme.bg} ${currentTheme.text}`}
              >
                <currentTheme.icon size={18} />
                You are currently an {currentTheme.label}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
