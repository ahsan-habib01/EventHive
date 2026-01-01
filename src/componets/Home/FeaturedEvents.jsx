import React from "react";
import { motion } from "framer-motion";
import EventCard from "../Event/EventCard";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Loading from "../Shared/Loading"; // if not already imported
import Paragraph from "../Shared/heading/Paragraph";
import Heading from "../Shared/heading/Heading";

const FeaturedEvents = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: eventsdata = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/events");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="pb-12 pt-12 bg-[#fafafa]">
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-600 mb-6 shadow-sm">
          Feature
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Heading className="text-5xl font-extrabold mb-4">
            Featured Events
          </Heading>
          <Paragraph className="text-[16px]  text-gray-600 max-w-2xl mx-auto">
            Don't miss out on these trending events happening around you.
          </Paragraph>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {eventsdata.slice(0, 6).map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </motion.div>

        <div className="text-center mt-16">
          <button className="btn btn-outline btn-lg rounded-full px-10 bg-[#a3e635] text-black hover:bg-black hover:text-[#a3e635]">
            View All Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvents;
