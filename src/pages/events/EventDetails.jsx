import React from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../componets/Shared/Loading";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = UseAxiosSecure();

  const { data: event = [], isLoading } = useQuery({
    queryKey: ["events", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/events/${id}`);
      return res.data;
    },
  });

  const { data: myBookings = [], refetch: refetchBookings } = useQuery({
    queryKey: ["my-bookings", user?.email],
    enabled: !!user?.email,
    staleTime: 0,
    refetchOnMount: "always",
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${user?.email}`);
      return res.data || [];
    },
  });

  const isBooked = !!myBookings.find(
    (b) => String(b.eventId) === String(event?._id) && b.status === "confirmed"
  );

  if (isLoading) return <Loading />;

  console.log(event);

  const handlebook = async () => {
    if (!user) {
      navigate("/login", { state: location.pathname });
      return;
    }

    if (isBooked) {
      Swal.fire({
        title: "Already Booked!",
        text: "You have already booked this event.",
        icon: "info",
      });
      return;
    }

    // ২. কনফার্মেশন মডাল ওপেন করা
    Swal.fire({
      title: "Are you sure?",
      text: `You have to pay ৳ ${event.price} for booking this event.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Pay Now",
    }).then(async (result) => {
      // ৩. ইউজার যদি "Pay Now" তে ক্লিক করে
      if (result.isConfirmed) {
        try {
          // পেমেন্ট প্রসেস হওয়ার সময় লোডিং দেখানোর জন্য
          Swal.fire({
            title: "Processing...",
            text: "Redirecting to payment gateway...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          // পেমেন্ট ইনফো রেডি করা
          const paymentInfo = {
            eventId: event?._id,
            eventName: event?.title,
            eventDate: event?.date,
            userEmail: user?.email,
            userName: user?.displayName,
            image: event?.image, // event er image pathano better
            price: event?.price,
          };

          // ব্যাকএন্ডে রিকোয়েস্ট পাঠানো
          const { data } = await axiosSecure.post(
            `/bookings/create-checkout-session`,
            paymentInfo
          );

          // ৪. পেমেন্ট লিংকে রিডাইরেক্ট করা
          if (data?.url) {
            window.location.href = data.url;
          }
        } catch (error) {
          console.error("Payment Error:", error);
          Swal.fire({
            title: "Error!",
            text:
              error.response?.data?.error ||
              "Something went wrong initiating payment.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Image */}
      <div className="relative h-[500px] bg-gradient-to-br from-gray-900 to-gray-700">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-4 border border-white/30">
              {event.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{event.availableSeats} seats available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Description */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Event Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About This Event
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {event.description}
              </p>
            </div>

            {/* Event Details Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Event Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Date</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(event.date).toDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="font-semibold text-gray-900">
                      {event.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Available Seats
                    </p>
                    <p className="font-semibold text-gray-900">
                      {event.availableSeats} / {event.totalSeats}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-orange-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Category</p>
                    <p className="font-semibold text-gray-900">
                      {event.category}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Organizer Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Organized By
              </h2>
              <div className="flex items-center gap-4">
                <img
                  src={event.organizerPhoto}
                  alt={event.organizerName}
                  className="w-20 h-20 rounded-full object-cover border-4 border-gray-100 shadow-md"
                />
                <div>
                  <p className="text-xl font-semibold text-gray-900">
                    {event.organizerName}
                  </p>
                  <p className="text-gray-500 mt-1">{event.organizerEmail}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Booking Card (Sticky) */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 space-y-6">
              <div className="text-center pb-6 border-b border-gray-200">
                <p className="text-gray-600 text-sm mb-2">Ticket Price</p>
                <p className="text-4xl font-bold text-gray-900">
                  ৳{event.price}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Total Seats</span>
                  <span className="font-semibold text-gray-900">
                    {event.totalSeats}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Available</span>
                  <span className="font-semibold text-green-600">
                    {event.availableSeats}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600">Status</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      event.availableSeats > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {event.availableSeats > 0 ? "Available" : "Sold Out"}
                  </span>
                </div>
              </div>

              <button
                onClick={handlebook}
                disabled={isBooked || event.availableSeats <= 0}
                className={`w-full py-4 cursor-pointer rounded-xl font-semibold text-lg transition-all duration-300 ${
                  isBooked || event.availableSeats <= 0
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#a3e635] to-[#5d9306] text-black hover:from-gray-800 hover:to-gray-600 hover:text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                }`}
              >
                {isBooked
                  ? "✓ Already Booked"
                  : event.availableSeats <= 0
                  ? "Sold Out"
                  : "Book Now"}
              </button>

              {!isBooked && event.availableSeats > 0 && (
                <p className="text-center text-sm text-gray-500">
                  Secure checkout • Instant confirmation
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
