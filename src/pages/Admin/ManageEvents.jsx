import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Check, X, ShieldCheck, AlertCircle, Trash2 } from "lucide-react";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

const ManageEvents = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: events = [], refetch } = useQuery({
    queryKey: ["manage-events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/events");
      return res.data;
    },
  });

  // Handle Delete
  const handleDelete = (event) => {
    Swal.fire({
      title: "Delete Event?",
      text: "This will permanently remove the event.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-xl",
        cancelButton: "rounded-xl",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(
            `/events/admin-manager/${event._id}`
          );
          if (res.data._id || res.data) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Event has been removed.",
              icon: "success",
              confirmButtonColor: "#000",
              customClass: {
                popup: "rounded-2xl",
                confirmButton: "rounded-xl",
              },
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: error.response?.data?.message || "Failed to delete event.",
            icon: "error",
            customClass: {
              popup: "rounded-2xl",
              confirmButton: "rounded-xl",
            },
          });
        }
      }
    });
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-8 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            Manage Events
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Review and manage all event submissions
          </p>
        </div>
        <div className="p-4 bg-lime-100 text-lime-600 rounded-2xl">
          <ShieldCheck size={28} />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Event Details
              </th>
              <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Organizer
              </th>
              <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {events.map((event) => (
              <tr
                key={event._id}
                className="group hover:bg-gray-50 transition-colors"
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={event.image}
                      alt=""
                      className="w-16 h-16 rounded-xl object-cover shadow-md"
                    />
                    <span className="font-bold text-gray-900 text-base">
                      {event.name}
                    </span>
                  </div>
                </td>

                <td className="px-8 py-5 text-sm text-gray-600 font-medium">
                  {event.title}
                </td>

                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lime-100 to-emerald-100 flex items-center justify-center text-lime-700 font-bold text-sm">
                      {event.organizerName?.charAt(0)}
                    </div>
                    <span className="text-sm text-gray-700 font-medium">
                      {event.organizerName}
                    </span>
                  </div>
                </td>

                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => handleDelete(event)}
                      className="p-2.5 text-red-700 bg-red-100 rounded-xl hover:bg-red-200 transition-colors"
                      title="Delete Event"
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

export default ManageEvents;
