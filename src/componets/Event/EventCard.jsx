import { motion } from "framer-motion";
import { Link } from "react-router";

const EventCard = ({ event, variants }) => {
  const { title, image, location, date, price, category } = event;

  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -5 }}
      className="card bg-white border border-base-300 rounded-[2rem] overflow-hidden hover:shadow-lg transition-all duration-300 group"
    >
      {/* Image */}
      <figure className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Date */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm text-secondary">
          {new Date(date).toLocaleDateString()}
        </div>

        {/* Category */}
        <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {category}
        </div>
      </figure>

      {/* Content */}
      <div className="card-body p-8">
        <div className="flex justify-between items-start mb-2">
          <h2 className="card-title text-2xl font-bold tracking-tight leading-tight transition-colors">
            {title}
          </h2>

          <div className="badge badge-lg border-none bg-base-100 font-bold text-secondary">
            ৳{price}
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm font-medium text-base-content-secondary mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {location}
        </div>

        {/* Button */}
        <div className="card-actions mt-auto">
          <Link
            to={`/event/${event._id}`}
            className=" btn btn-outline btn-block rounded-full border-base-300 hover:bg-[#a3e635] hover:text-black hover:border-black transition-all"
          >
            Book Ticket
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
