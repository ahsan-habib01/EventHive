import { useQuery } from "@tanstack/react-query";
import { Users, Calendar, DollarSign, TrendingUp } from "lucide-react";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

const AdminStats = () => {
  const axiosSecure = UseAxiosSecure();

  // 1. Fetch all users
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // 2. Fetch all events
  const { data: events = [], isLoading: eventsLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/events");
      return res.data;
    },
  });

  // 3. Calculate Revenue (Optional: Assuming events have 'price')
  const totalRevenue = events.reduce(
    (total, event) => total + Number(event.price || 0),
    0
  );

  // Loading State
  if (usersLoading || eventsLoading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading dashboard stats...
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Total Events",
      value: events.length,
      icon: Calendar,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Dashboard Overview
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back, Admin! Here's what's happening today.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 shadow-sm">
          <TrendingUp size={16} />
          <span>Growth +12%</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  {stat.title}
                </p>
                <h3 className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </h3>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminStats;
