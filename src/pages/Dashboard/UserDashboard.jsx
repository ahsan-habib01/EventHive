import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import {
  FaCalendarCheck,
  FaHourglassHalf,
  FaDollarSign,
  FaUserShield,
  FaTicketAlt,
  FaArrowRight,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();

  const { data: bookings = [] } = useQuery({
    queryKey: ["dashboard-bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${user?.email}`);
      return res.data;
    },
  });

  const confirmedBookings = bookings.filter((b) => b.status === "confirmed");
  const waitlistBookings = bookings.filter((b) => b.status === "waitlist");

  const totalSpent = confirmedBookings.reduce(
    (sum, item) => sum + parseInt(item.price),
    0
  );

  return (
    <div className="min-h-screen  py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              My Dashboard
            </h1>
            <p className="text-gray-600 mt-2 text-base">
              Welcome back, {user?.displayName?.split(" ")[0]}!
            </p>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-xl text-sm font-medium text-gray-600 border border-gray-200">
            <span>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Bookings */}
          <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-gray-100 text-gray-700 rounded-xl group-hover:bg-lime-100 group-hover:text-lime-600 transition-colors duration-300">
                <FaCalendarCheck className="text-xl" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Bookings
              </span>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              {confirmedBookings.length}
            </h3>
            <p className="text-sm text-gray-500">Confirmed Events</p>
          </div>

          {/* Waitlist Count */}
          <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-gray-100 text-gray-700 rounded-xl group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors duration-300">
                <FaHourglassHalf className="text-xl" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Waitlist
              </span>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              {waitlistBookings.length}
            </h3>
            <p className="text-sm text-gray-500">Pending Approval</p>
          </div>

          {/* Total Spent */}
          <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-gray-100 text-gray-700 rounded-xl group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors duration-300">
                <FaDollarSign className="text-xl" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Spent
              </span>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              ৳{totalSpent}
            </h3>
            <p className="text-sm text-gray-500">Total Expenses</p>
          </div>

          {/* Account Status */}
          <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div
                className={`p-3 rounded-xl transition-colors duration-300 ${
                  user?.emailVerified
                    ? "bg-gray-100 text-gray-700 group-hover:bg-lime-100 group-hover:text-lime-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                <FaUserShield className="text-xl" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Status
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-4xl font-bold text-gray-900">Active</h3>
              {user?.emailVerified && (
                <span className="w-2 h-2 bg-lime-500 rounded-full"></span>
              )}
            </div>
            <p className="text-sm text-gray-500">Account Verified</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/events"
            className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-5 hover:border-lime-200"
          >
            <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 text-lg group-hover:bg-lime-100 group-hover:text-lime-600 transition-colors duration-300">
              <FaTicketAlt />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base mb-1">
                Browse Events
              </h4>
              <p className="text-sm text-gray-500">Book new tickets</p>
            </div>
          </Link>

          <Link
            to="/dashboard/bookings"
            className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-5 hover:border-lime-200"
          >
            <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 text-lg group-hover:bg-lime-100 group-hover:text-lime-600 transition-colors duration-300">
              <FaCalendarCheck />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base mb-1">
                My Bookings
              </h4>
              <p className="text-sm text-gray-500">View confirmed list</p>
            </div>
          </Link>

          <Link
            to="/dashboard/profile"
            className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-5 hover:border-lime-200"
          >
            <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 text-lg group-hover:bg-lime-100 group-hover:text-lime-600 transition-colors duration-300">
              <FaUserShield />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base mb-1">
                My Profile
              </h4>
              <p className="text-sm text-gray-500">Update info</p>
            </div>
          </Link>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <Link
              to="/dashboard/bookings"
              className="text-sm font-semibold text-gray-600 hover:text-lime-600 flex items-center gap-2 transition-colors"
            >
              See All Details <FaArrowRight className="text-xs" />
            </Link>
          </div>

          {bookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-gray-50">
                    <th className="px-8 py-4 font-medium">Event Name</th>
                    <th className="px-8 py-4 font-medium">Date & Time</th>
                    <th className="px-8 py-4 font-medium">Payment Status</th>
                    <th className="px-8 py-4 font-medium">Price</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {bookings.slice(0, 5).map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                    >
                      {/* Event Name & Image */}
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-gray-900">
                            {item.eventName}
                          </span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-8 py-4 text-gray-500">
                        {new Date(item.eventDate).toDateString()}
                      </td>

                      {/* Status Badge */}
                      <td className="px-8 py-4">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                            item.status === "confirmed"
                              ? "bg-lime-100 text-lime-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.status === "confirmed"
                                ? "bg-lime-500"
                                : "bg-orange-500"
                            }`}
                          ></span>
                          {item.status}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-8 py-4 font-semibold text-gray-900">
                        ৳{item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-gray-400 font-medium text-base mb-4">
                No recent activity found
              </h3>
              <Link
                to="/events"
                className="inline-block px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-lime-600 transition-colors duration-300"
              >
                Book Your First Event
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
