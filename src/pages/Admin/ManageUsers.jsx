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
    <div className="w-full bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="p-8 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users size={28} className="text-lime-600" />
            Manage Users
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Total{" "}
            <span className="font-bold text-gray-900">{users.length}</span>{" "}
            registered users
          </p>
        </div>

        {/* Pending Request Badge */}
        {users.filter((u) => u.status === "requested").length > 0 && (
          <div className="flex items-center gap-2 bg-amber-100 px-5 py-3 rounded-xl text-amber-700 border border-amber-200">
            <AlertCircle size={20} />
            <span className="text-sm font-bold">
              {users.filter((u) => u.status === "requested").length} Pending
            </span>
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Head */}
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                User Profile
              </th>
              <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100">
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="group hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-8 py-5 text-sm text-gray-500 font-semibold">
                  {(index + 1).toString().padStart(2, "0")}
                </td>

                {/* Name & Email */}
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lime-100 to-emerald-100 flex items-center justify-center text-lime-700 font-bold text-base shadow-sm">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt=""
                          className="w-full h-full rounded-xl object-cover"
                        />
                      ) : (
                        user.name?.charAt(0)
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-base">
                        {user.name}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                        <Mail size={12} /> {user.email}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Role Badge */}
                <td className="px-8 py-5">
                  {user.role === "admin" ? (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-purple-100 text-purple-700">
                      <ShieldCheck size={14} /> Admin
                    </span>
                  ) : user.role === "manager" ? (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-blue-100 text-blue-700">
                      <UserCheck size={14} /> Manager
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gray-100 text-gray-700">
                      <Users size={14} /> User
                    </span>
                  )}
                </td>

                {/* Status Badge */}
                <td className="px-8 py-5">
                  {user.status === "requested" ? (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-100 text-amber-700">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                      Requested
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-lime-100 text-lime-700">
                      Verified
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-3">
                    {/* Make Manager Button */}
                    {user.status === "requested" && (
                      <button
                        onClick={() => handleMakeManager(user)}
                        className="p-2.5 text-lime-700 bg-lime-100 rounded-xl hover:bg-lime-200 transition-colors"
                        title="Promote to Manager"
                      >
                        <UserCheck size={18} />
                      </button>
                    )}
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="p-2.5 text-red-700 bg-red-100 rounded-xl hover:bg-red-200 transition-colors"
                      title="Delete User"
                    >
                      <Trash2 size={18} />
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
