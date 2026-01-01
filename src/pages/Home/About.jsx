import React from "react";
import { Link } from "react-router";
import {
  FaRocket,
  FaHandshake,
  FaLightbulb,
  FaCheckCircle,
} from "react-icons/fa";
import Heading from "../../componets/Shared/heading/Heading";
import Paragraph from "../../componets/Shared/heading/Paragraph";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-32 pb-40">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <span className="inline-block py-2 px-5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-semibold mb-6 tracking-wider uppercase border border-white/20">
            About EventHive
          </span>
          <Heading className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight text-white">
            Creating Unforgettable <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-400 to-yellow-400">
              Event Experiences
            </span>
          </Heading>
          <Paragraph className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            We connect passionate event organizers with enthusiastic attendees,
            making every event memorable and management effortless.
          </Paragraph>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/events"
              className="px-10 py-4 rounded-full bg-white text-gray-900 font-bold shadow-2xl hover:shadow-white/20 hover:-translate-y-1 transition-all duration-300 text-lg"
            >
              Explore Events
            </Link>
            <Link
              to="/contact"
              className="px-10 py-4 rounded-full bg-transparent text-white font-bold border-2 border-white/30 hover:bg-white/10 hover:border-white transition-all duration-300 text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl p-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center border border-gray-100">
          <div className="space-y-2">
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-lime-500 bg-clip-text text-transparent">
              5k+
            </h3>
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Active Users
            </p>
          </div>
          <div className="space-y-2 border-l border-gray-100 pl-8">
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              120+
            </h3>
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Events Hosted
            </p>
          </div>
          <div className="space-y-2 border-l border-gray-100 pl-8">
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-lime-600 bg-clip-text text-transparent">
              98%
            </h3>
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Satisfaction
            </p>
          </div>
          <div className="space-y-2 border-l border-gray-100 pl-8">
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-lime-600 to-yellow-600 bg-clip-text text-transparent">
              24/7
            </h3>
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Support
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image Side */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 via-lime-400 to-yellow-400 rounded-3xl opacity-20 group-hover:opacity-30 blur-2xl transition-opacity duration-500"></div>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Team collaboration"
              className="relative w-full h-auto rounded-3xl shadow-2xl object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>

          {/* Text Side */}
          <div>
            <span className="inline-block py-2 px-4 rounded-full bg-gradient-to-r from-emerald-100 to-lime-100 text-emerald-700 text-sm font-semibold mb-6 tracking-wider uppercase">
              Our Story
            </span>
            <Heading className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Simplifying how the world{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-lime-500">
                comes together
              </span>
            </Heading>
            <Paragraph className="text-lg text-gray-600 mb-6 leading-relaxed">
              EventHive started with a simple idea:{" "}
              <strong>Event management shouldn't be complicated.</strong> We
              noticed organizers spending more time managing spreadsheets than
              creating amazing experiences.
            </Paragraph>
            <Paragraph className="text-lg text-gray-600 mb-10 leading-relaxed">
              So we built a platform that handles the technical stuff—tickets,
              registrations, payments, and analytics—so you can focus on what
              matters: creating unforgettable moments.
            </Paragraph>

            <div className="space-y-4">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500 transition-colors duration-300">
                  <FaCheckCircle className="text-emerald-600 text-xl group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-gray-800 font-semibold text-lg">
                  Community Focused Platform
                </span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500 transition-colors duration-300">
                  <FaCheckCircle className="text-teal-600 text-xl group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-gray-800 font-semibold text-lg">
                  Secure Payment Gateway
                </span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-lime-100 flex items-center justify-center flex-shrink-0 group-hover:bg-lime-500 transition-colors duration-300">
                  <FaCheckCircle className="text-lime-600 text-xl group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-gray-800 font-semibold text-lg">
                  Real-time Analytics & Insights
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="inline-block py-2 px-4 rounded-full bg-gradient-to-r from-emerald-100 to-lime-100 text-emerald-700 text-sm font-semibold mb-6 tracking-wider uppercase">
              Why Choose Us
            </span>
            <Heading className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything you need in one platform
            </Heading>
            <Paragraph className="text-gray-600 text-lg max-w-2xl mx-auto">
              Powerful features designed to make event management effortless and
              enjoyable
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-white p-10 rounded-3xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-lime-500/30">
                <FaRocket className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Fast & Easy Setup
              </h3>
              <Paragraph className="text-gray-600 leading-relaxed text-base">
                Create and launch your event in minutes with our intuitive
                dashboard. No technical skills required.
              </Paragraph>
            </div>

            {/* Card 2 */}
            <div className="group bg-white p-10 rounded-3xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center text-3xl mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-emerald-500/30">
                <FaHandshake className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Trusted Community
              </h3>
              <Paragraph className="text-gray-600 leading-relaxed text-base">
                Join thousands of verified organizers and attendees in our
                secure, trusted platform.
              </Paragraph>
            </div>

            {/* Card 3 */}
            <div className="group bg-white p-10 rounded-3xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-lime-500 rounded-2xl flex items-center justify-center text-3xl mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-yellow-500/30">
                <FaLightbulb className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Innovative Tools
              </h3>
              <Paragraph className="text-gray-600 leading-relaxed text-base">
                Advanced analytics, automated waitlists, and smart notifications
                to grow your events.
              </Paragraph>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
