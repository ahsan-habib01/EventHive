import React, { useState } from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPaperPlane,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Heading from "../../componets/Shared/heading/Heading";
import Paragraph from "../../componets/Shared/heading/Paragraph";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success("Subscribed! Check your email");
    // clear form
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white py-32 px-6 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-lime-100 rounded-full blur-3xl opacity-40 -z-10"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-3xl opacity-40 -z-10"></div>

      {/* --- Header --- */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <span className="inline-block py-2 px-5 rounded-full bg-gradient-to-r from-emerald-100 to-lime-100 text-emerald-700 text-sm font-semibold mb-6 tracking-wider uppercase border border-emerald-200">
          Contact Us
        </span>
        <Heading className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">
          Get in{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-lime-500 to-yellow-500">
            Touch
          </span>
        </Heading>
        <Paragraph className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Have questions? Want to host a mega event? Or just want to say hi? We
          are all ears! Drop us a message below.
        </Paragraph>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <div>
            <Heading className=" font-bold text-gray-900 mb-4">
              Let's start a conversation
            </Heading>
            <Paragraph className="text-gray-600 text-lg">
              We're here to help and answer any question you might have. We look
              forward to hearing from you.
            </Paragraph>
          </div>

          {/* Card 1: Address */}
          <div className="group flex items-start gap-5 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-lime-500 text-white flex items-center justify-center rounded-xl text-xl flex-shrink-0 shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
              <FaMapMarkerAlt />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
              <Paragraph className="text-gray-600 leading-relaxed text-base">
                123 Event Street, Creative Block, <br />
                Dhaka, Bangladesh
              </Paragraph>
            </div>
          </div>

          {/* Card 2: Email */}
          <div className="group flex items-start gap-5 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-emerald-500 text-white flex items-center justify-center rounded-xl text-xl flex-shrink-0 shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform duration-300">
              <FaEnvelope />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
              <Paragraph className="text-gray-600 text-base">
                support@eventhive.com
              </Paragraph>
            </div>
          </div>

          {/* Card 3: Phone */}
          <div className="group flex items-start gap-5 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-lime-400 to-yellow-500 text-white flex items-center justify-center rounded-xl text-xl flex-shrink-0 shadow-lg shadow-lime-500/30 group-hover:scale-110 transition-transform duration-300">
              <FaPhoneAlt />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
              <Paragraph className="text-gray-600 text-base">
                +880 123 456 7890
              </Paragraph>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-10 md:p-12 shadow-2xl border border-gray-100 relative">
          <Heading className=" font-bold mb-8 text-gray-900">
            Send a Message
          </Heading>

          <form onSubmit={handleSubscribe} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Your Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="John Doe"
                className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all text-gray-800 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="john@example.com"
                className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all text-gray-800 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Subject
              </label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                type="text"
                placeholder="Hosting Inquiry..."
                className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all text-gray-800 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="5"
                placeholder="Tell us everything..."
                className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all text-gray-800 placeholder-gray-400 resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-5 bg-gradient-to-r from-[#a3e635] to-[#72b605] text-black font-bold text-lg rounded-xl shadow-2xl shadow-lime-500/40 hover:shadow-lime-500/60 hover:scale-[1.02] cursor-pointer transition-all duration-300 flex items-center justify-center gap-3"
            >
              <FaPaperPlane className="text-base" /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
