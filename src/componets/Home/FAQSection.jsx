import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Heading from "../Shared/heading/Heading";
import Paragraph from "../Shared/heading/Paragraph";

const faqs = [
  {
    id: 1,
    question: "How do I create an event on EventHive?",
    answer:
      "Creating an event is simple. Just sign up for an organizer account, go to your dashboard, and click 'Create Event'. You can customize all details, ticket prices, and upload images.",
  },
  {
    id: 2,
    question: "Is there a fee for free events?",
    answer:
      "No, EventHive is completely free for free events. We only charge a small processing fee for paid ticket sales to cover transaction costs.",
  },
  {
    id: 3,
    question: "Can I manage attendees from my phone?",
    answer:
      "Yes! Our platform is fully responsive. You can check in attendees, monitor sales, and update event details directly from your mobile device.",
  },
  {
    id: 4,
    question: "How do payouts work?",
    answer:
      "Payouts are automated. Once your event is completed, funds are transferred to your linked bank account or PayPal within 3-5 business days.",
  },
  {
    id: 5,
    question: "Can I customize the design of my event page?",
    answer:
      "Absolutely. You can add your brand colors, cover images, and detailed descriptions to make your event page stand out and match your brand identity.",
  },
];

const FAQItem = ({ faq, isOpen, toggle }) => {
  return (
    <div
      className="card bg-gray-100 border border-base-200 shadow-sm rounded-[1.5rem] overflow-hidden hover:border-base-300 transition-colors cursor-pointer"
      onClick={toggle}
    >
      <div className="px-8 py-5 flex items-center justify-between">
        <h3 className="text-lg md:text-xl font-bold text-secondary">
          {faq.question}
        </h3>
        <div
          className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center transition-colors duration-300 ${
            isOpen
              ? "bg-primary text-primary-content"
              : "bg-base-200 text-base-content-secondary"
          }`}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          )}
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-6 pt-0 text-base-content-secondary leading-relaxed text-base">
              <div className="pt-2 border-t border-base-200/50">
                {faq.answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-600 mb-6 shadow-sm">
            FAQ
          </div>
          <Heading className="text-5xl font-extrabold tracking-tighter text-secondary mb-6">
            Have any questions?
          </Heading>
          <Paragraph className="text-xl text-base-content-secondary max-w-2xl mx-auto">
            Everything you need to know about using EventHive. Can't find the
            answer you're looking for? Chat with our team.
          </Paragraph>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              toggle={() => toggleFAQ(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
