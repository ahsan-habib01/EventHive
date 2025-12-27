import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  Trash2,
  ShieldCheck,
  UserCheck,
  AlertCircle,
  Users,
  Mail,
} from "lucide-react"; // Icons changed
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = UseAxiosSecure();

  // ১. সব ইউজার ডাটা নিয়ে আসা
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // ২. ম্যানেজার বানানোর ফাংশন
  const handleMakeManager = (user) => {
    Swal.fire({
      title: "Send Promotion Request?",
      text: `${user.name}'s request will be marked as pending.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Send Request",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-xl",
        cancelButton: "rounded-xl",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user?._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Request Sent!",
              text: `${user.name}'s promotion request is now pending.`,
              icon: "success",
              confirmButtonColor: "#10b981",
              customClass: {
                popup: "rounded-2xl",
                confirmButton: "rounded-xl",
              },
            });
          }
        });
      }
    });
  };
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-xl",
        cancelButton: "rounded-xl",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/users/delete/${user._id}`)
          .then((res) => {
            // Check for success instead of deletedCount
            if (res.data.success) {
              refetch(); // Refetch the users list
              Swal.fire({
                title: "Deleted!",
                text: "User account has been removed.",
                icon: "success",
                confirmButtonColor: "#000",
                customClass: {
                  popup: "rounded-2xl",
                  confirmButton: "rounded-xl",
                },
              });
            }
          })
          .catch((error) => {
            console.error("Delete error:", error);
            Swal.fire({
              title: "Error!",
              text: error.response?.data?.message || "Failed to delete user.",
              icon: "error",
              confirmButtonColor: "#ef4444",
            });
          });
      }
    });
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            Manage Users
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Total{" "}
            <span className="font-semibold text-gray-900">{users.length}</span>{" "}
            registered users
          </p>
        </div>

        {/* Pending Request Badge */}
        {users.filter((u) => u.status === "requested").length > 0 && (
          <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-xl text-amber-600 border border-amber-100 animate-pulse">
            <AlertCircle size={18} />
            <span className="text-sm font-semibold">
              {users.filter((u) => u.status === "requested").length} Pending
              Requests
            </span>
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Head */}
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                User Profile
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100">
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="group hover:bg-gray-50/50 transition-colors duration-200"
              >
                <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                  {(index + 1).toString().padStart(2, "0")}
                </td>

                {/* Name & Email */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-sm">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt=""
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        user.name?.charAt(0)
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        {user.name}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                        <Mail size={10} /> {user.email}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Role Badge */}
                <td className="px-6 py-4">
                  {user.role === "admin" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-600 border border-purple-100">
                      <ShieldCheck size={12} /> Admin
                    </span>
                  ) : user.role === "manager" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
                      <UserCheck size={12} /> Manager
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-50 text-gray-500 border border-gray-100">
                      <Users size={12} /> User
                    </span>
                  )}
                </td>

                {/* Status Badge */}
                <td className="px-6 py-4">
                  {user.status === "requested" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                      Requested
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                      Verified
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {/* Make Manager Button */}
                    {user.status === "requested" && (
                      <button
                        onClick={() => handleMakeManager(user)}
                        className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100"
                        title="Promote to Manager"
                      >
                        <UserCheck size={16} />
                      </button>
                    )}
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors border border-red-100"
                      title="Delete User"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
