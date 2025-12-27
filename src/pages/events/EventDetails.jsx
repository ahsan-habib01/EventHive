import React from "react";
import { useParams } from "react-router";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../componets/Shared/Loading";
import Swal from "sweetalert2";
import Magnet from "../../componets/Shared/Magnet";

const EventDetails = () => {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();
  const { data: event = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/events/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  const handlebook = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `You  have to pay ৳ ${event.price} for booking this event.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText:"Pay Now",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Paid!",
          text: "Your booking is confirmed.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-[100px]">
      {/* Event Image */}
      <div className="rounded-2xl overflow-hidden shadow-lg">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-[420px] object-cover"
        />
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-3 gap-8 mt-8">
        {/* Left Side */}
        <div className="md:col-span-2 space-y-4">
          <span className="badge badge-outline badge-lg">{event.category}</span>

          <h1 className="text-3xl font-bold">{event.title}</h1>

          <p className="text-gray-600 leading-relaxed">{event.description}</p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-700">
            <p>📍 {event.location}</p>
            <p>📅 {new Date(event.date).toDateString()}</p>
            <p>🎟 Available Seats: {event.availableSeats}</p>
          </div>
        </div>

        {/* Booking Card */}
        <Magnet> <div className="border rounded-2xl p-6 shadow-md space-y-4">
          <h2 className="text-xl font-semibold">Event Info</h2>

          <div className="flex justify-between text-sm">
            <span>Price</span>
            <span className="font-semibold">৳ {event.price}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Total Seats</span>
            <span>{event.totalSeats}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Available</span>
            <span className="text-green-600 font-medium">
              {event.availableSeats}
            </span>
          </div>

          <button
            onClick={handlebook}
            className="btn btn-block rounded-full bg-black text-white hover:bg-gray-800 transition-all"
          >
            Book Now
          </button>
        </div></Magnet>
       
      </div>

      {/* Organizer */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">Organizer</h2>

        <div className="flex items-center gap-4">
          <img
            src={event.organizerPhoto}
            alt={event.organizerName}
            className="w-16 h-16 rounded-full object-cover"
          />

          <div>
            <p className="font-medium">{event.organizerName}</p>
            <p className="text-sm text-gray-500">{event.organizerEmail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
