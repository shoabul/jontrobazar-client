"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import { MapPin, Mail, Phone, Clock, Send, Building2, Loader2 } from "lucide-react";
import { showToast } from "@/lib/notify";

const CONTACT_INFO = [
  {
    icon: MapPin,
    title: "Dhaka Headquarters",
    details: [
      "Level 7, Tejgaon Industrial Link Road",
      "Dhaka-1208, Bangladesh"
    ],
    color: "text-orange-500"
  },
  {
    icon: Building2,
    title: "Chattogram Hub",
    details: [
      "Yard #4, Agrabad Commercial Area",
      "Chattogram-4100"
    ],
    color: "text-amber-500"
  },
  {
    icon: Mail,
    title: "Email Us",
    details: [
      "General: ops@jontrobazar.com.bd",
      "Support: support@jontrobazar.com.bd",
      "Partnerships: partners@jontrobazar.com.bd"
    ],
    color: "text-emerald-500"
  },
  {
    icon: Phone,
    title: "Call Us",
    details: [
      "24/7 Dispatch: +880 9613-882200",
      "Office: +880 2-5504-xxxx"
    ],
    color: "text-blue-500"
  },
];

const OFFICE_HOURS = [
  { days: "Sat - Wed", hours: "9:00 AM - 6:00 PM" },
  { days: "Thursday", hours: "9:00 AM - 2:00 PM" },
  { days: "Friday", hours: "Closed (Emergency dispatch only)" },
];

const FAQ = [
  {
    q: "How long does it take to get a response?",
    a: "We typically respond within 2-4 business hours during office hours. Emergency dispatch line is 24/7."
  },
  {
    q: "Can I visit your office in person?",
    a: "Yes, both Dhaka and Chattogram hubs welcome visitors during office hours. Please schedule via email for owner onboarding meetings."
  },
  {
    q: "I'm an equipment owner. How do I get listed?",
    a: "Register as an owner, add your equipment listings. Our team reviews within 24 hours. Approved listings go live immediately."
  },
  {
    q: "What if I have a dispute with an owner/renter?",
    a: "Use the dispute button in your booking dashboard. Our admin team mediates within 48 hours. Escrow funds are held until resolution."
  },
  {
    q: "Do you offer API access for enterprise?",
    a: "Yes, for bulk bookings and fleet management integrations. Contact partnerships@jontrobazar.com.bd for API documentation."
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (formData.phone && !/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone)) newErrors.phone = "Invalid phone number";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 20) newErrors.message = "Message must be at least 20 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // In production, this would call your API endpoint
      // await apiFetch("/contact", { method: "POST", body: JSON.stringify(formData) });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showToast("Message sent! We'll get back to you within 4 hours.", "success");
      setFormData({ name: "", email: "", phone: "", subject: "general", message: "" });
    } catch (err) {
      showToast("Failed to send message. Please try again or email us directly.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      
      
      <main className="flex-1">
        {/* Hero */}
        <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-neutral-50 to-white dark:from-[#0a0e17] dark:to-[#0c1017] border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 text-sm font-semibold mb-6 border border-orange-200 dark:border-orange-900"
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>We'd Love to Hear From You</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight"
            >
              Contact <span className="text-orange-500">JontroBazar</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed"
            >
              Questions about rentals, listings, partnerships, or need support? Our team is ready to help.
            </motion.p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0c1017]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CONTACT_INFO.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-orange-300 dark:hover:border-orange-800 transition-colors h-full"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-opacity-10 flex items-center justify-center mb-4 ${item.color} bg-current/10`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-neutral-900 dark:text-white mb-3">{item.title}</h3>
                    <div className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {item.details.map((detail, dIdx) => (
                        <p key={dIdx}>{detail}</p>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Content: Form + Office Hours + FAQ */}
        <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-[#0a0e17] border-y border-neutral-200 dark:border-neutral-800">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form - spans 2 columns on lg */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
                >
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Send Us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                          Full Name <span className="text-orange-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border transition-colors bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 ${
                            errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-neutral-300 dark:border-neutral-700 focus:border-orange-500 focus:ring-orange-500/20"
                          }`}
                          placeholder="Your name"
                          aria-invalid={!!errors.name}
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-500" role="alert">{errors.name}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                          Email Address <span className="text-orange-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border transition-colors bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 ${
                            errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-neutral-300 dark:border-neutral-700 focus:border-orange-500 focus:ring-orange-500/20"
                          }`}
                          placeholder="you@example.com"
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-500" role="alert">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border transition-colors bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 ${
                            errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-neutral-300 dark:border-neutral-700 focus:border-orange-500 focus:ring-orange-500/20"
                          }`}
                          placeholder="+880 1XXX-XXXXXX"
                          aria-invalid={!!errors.phone}
                        />
                        {errors.phone && <p className="mt-1 text-xs text-red-500" role="alert">{errors.phone}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-orange-500 focus:ring-orange-500/20 transition-colors appearance-none cursor-pointer"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="support">Technical Support</option>
                          <option value="owner">Owner Onboarding</option>
                          <option value="partnership">Partnership / API</option>
                          <option value="billing">Billing & Payments</option>
                          <option value="dispute">Dispute Resolution</option>
                          <option value="press">Press & Media</option>
                          <option value="careers">Careers</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                        Message <span className="text-orange-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-4 py-3 rounded-xl border transition-colors bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 resize-none ${
                          errors.message ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : "border-neutral-300 dark:border-neutral-700 focus:border-orange-500 focus:ring-orange-500/20"
                        }`}
                        placeholder="Describe your inquiry in detail (minimum 20 characters)..."
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && <p className="mt-1 text-xs text-red-500" role="alert">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              </div>

              {/* Sidebar: Office Hours + Quick Links */}
              <div>
                {/* Office Hours */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 mb-6"
                >
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-500" />
                    Office Hours
                  </h3>
                  <div className="space-y-3">
                    {OFFICE_HOURS.map((item, idx) => (
                      <div key={idx} className="flex justify-between py-2 border-b border-neutral-100 dark:border-neutral-800 last:border-0">
                        <span className="font-medium text-neutral-700 dark:text-neutral-300">{item.days}</span>
                        <span className="text-neutral-600 dark:text-neutral-400">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-4">
                    Emergency dispatch: <a href="tel:+8809613882200" className="text-orange-600 dark:text-orange-400 hover:underline">+880 9613-882200</a> (24/7)
                  </p>
                </motion.div>

                {/* Quick Links */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
                >
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">Quick Links</h3>
                  <div className="space-y-2">
                    {[
                      { href: "/how-it-works", label: "How Escrow Rental Works" },
                      { href: "/about", label: "Owner Verification Process" },
                      { href: "/equipment", label: "Browse Equipment" },
                      { href: "/register", label: "Become an Owner" },
                      { href: "/dashboard", label: "Owner Dashboard" },
                      { href: "/payment/success", label: "Payment Help" },
                    ].map((link, idx) => (
                      <a
                        key={idx}
                        href={link.href}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        {link.label}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0c1017]">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-black text-neutral-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mt-2">
                Quick answers to common questions
              </p>
            </motion.div>

            <div className="space-y-4">
              {FAQ.map((faq, idx) => (
                <motion.details
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  className="group bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <h3 className="font-semibold text-neutral-900 dark:text-white pr-8">{faq.q}</h3>
                    <span className="text-orange-500 font-bold text-xl">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed border-t border-neutral-200 dark:border-neutral-800">
                    {faq.a}
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600 to-orange-700">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
              Need Immediate Help?
            </h2>
            <p className="text-orange-100 mb-6">
              Our dispatch team is available 24/7 for urgent equipment issues.
            </p>
            <a
              href="tel:+8809613882200"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-white text-orange-600 font-bold text-sm hover:bg-orange-50 transition-colors shadow-lg"
            >
              <Phone className="w-5 h-5" />
              Call 24/7 Dispatch: +880 9613-882200
            </a>
          </div>
        </section>
      </main>

      
    </div>
  );
}