import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Trash2, Ticket, MapPin, CalendarDays } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Loading from "../../componets/Shared/Loading";

const Bookings = () => {
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();

  // =======================
  // FETCH CONFIRMED BOOKINGS
  // =======================
  const {
    data: bookings = [],
    refetch,
    isLoading,
  } = useQuery({
    enabled: !!user?.email,
    queryKey: ["my-bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${user.email}`);
      return res.data.filter((b) => b.status === "confirmed");
    },
  });

  // =======================
  // CANCEL BOOKING
  // =======================
  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel Booking?",
      text: "Refund will be calculated based on event date.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/bookings/${id}`);

          if (res.data.success) {
            refetch();

            Swal.fire({
              title: "Booking Cancelled",
              icon: "success",
              html: `
              <div style="text-align:left;font-size:14px">
                <p><b>Total Paid:</b> $${res.data.totalPaid}</p>
                <p><b>Refund Amount:</b> $${res.data.refundAmount}</p>
                ${
                  res.data.deductionAmount > 0
                    ? `<p style="color:red"><b>Deduction:</b> $${res.data.deductionAmount} (40%)</p>`
                    : ""
                }
                <hr/>
                <p>${res.data.message}</p>
              </div>
            `,
              confirmButtonColor: "#10b981",
            });
          }
        } catch (error) {
          console.error("Delete error:", error);
          Swal.fire({
            title: "Error!",
            text:
              error.response?.data?.message ||
              "Something went wrong during cancellation.",
            icon: "error",
          });
        }
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden">
      {/* HEADER */}
      <div className="p-8 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            My Confirmed Tickets
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Cancel tickets with refund policy
          </p>
        </div>
        <div className="p-4 bg-lime-100 text-lime-600 rounded-2xl">
          <Ticket size={28} />
        </div>
      </div>

      {/* EMPTY */}
      {bookings.length === 0 ? (
        <div className="py-16 text-center text-gray-500">
          No confirmed bookings found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-8 py-4 text-xs font-bold uppercase text-gray-500 tracking-wider">
                  #
                </th>
                <th className="px-8 py-4 text-xs font-bold uppercase text-gray-500 tracking-wider">
                  Event
                </th>
                <th className="px-8 py-4 text-xs font-bold uppercase text-gray-500 tracking-wider">
                  Date
                </th>
                <th className="px-8 py-4 text-xs font-bold uppercase text-gray-500 tracking-wider">
                  Price
                </th>
                <th className="px-8 py-4 text-xs font-bold uppercase text-gray-500 tracking-wider text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {bookings.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-8 py-5 text-sm font-semibold text-gray-500">
                    {(index + 1).toString().padStart(2, "0")}
                  </td>

                  <td className="px-8 py-5">
                    <div className="flex gap-3 items-center">
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">
                          {item.eventName}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <MapPin size={12} />
                          {item.location || "Online"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-5 text-sm">
                    <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg w-fit text-gray-700">
                      <CalendarDays size={14} />
                      {new Date(item.eventDate).toLocaleDateString()}
                    </div>
                  </td>

                  <td className="px-8 py-5 font-bold text-gray-900 text-base">
                    ৳{item.price}
                  </td>

                  <td className="px-8 py-5 text-right">
                    <button
                      onClick={() => handleCancel(item._id)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={14} />
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Bookings;
