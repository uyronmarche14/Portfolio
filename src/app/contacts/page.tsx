"use client";
import { motion } from "framer-motion";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { contactInfo, socialLinks } from "../../data/contacts";

export default function page() {
  return (
    <main className="bg-background min-h-screen py-16 px-4 flex justify-center relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-secondary/10 to-tertiary/10 rounded-full blur-3xl"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-tertiary/5 rounded-full blur-3xl" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-32 right-20 w-8 h-8 border-2 border-primary/20 rounded-lg rotate-12"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-32 left-20 w-6 h-6 border-2 border-secondary/20 rounded-full"
        />
      </div>

      <div className="relative max-w-7xl w-full rounded-2xl p-8 md:p-12 backdrop-blur-sm">
        {/* Enhanced Header Section */}
        <motion.div className="relative mb-24">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute -top-6 -left-6 w-12 h-12 bg-primary/20 rounded-lg rotate-12"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute -bottom-4 -right-4 w-8 h-8 bg-secondary/20 rounded-full"
          />

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative z-10"
          >
            <span className="text-primary/60 uppercase tracking-wider text-sm mb-2 block">
              Contact Us
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-headline mb-6">
              Let&apos;s
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}
                Connect
              </span>
            </h1>
            <p className="text-paragraph text-lg max-w-2xl">
              I&apos;m here to help and answer any questions you might have. I
              look forward to hearing from you!
            </p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Contact */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-background/50 p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-primary/10"
          >
            <h2 className="text-2xl font-bold mb-6 text-headline">
              Quick Contact
            </h2>
            <div className="space-y-6">
              {contactInfo.emails.map((email, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <MdEmail className="text-2xl text-primary" />
                  <div>
                    <p className="font-medium text-headline">{email.label}</p>
                    <a
                      href={`mailto:${email.address}`}
                      className="text-paragraph hover:text-primary"
                    >
                      {email.address}
                    </a>
                  </div>
                </div>
              ))}

              {contactInfo.phones.map((phone, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <MdPhone className="text-2xl text-primary" />
                  <div>
                    <p className="font-medium text-headline">{phone.label}</p>
                    <a
                      href={`tel:${phone.number}`}
                      className="text-paragraph hover:text-primary"
                    >
                      {phone.number}
                    </a>
                  </div>
                </div>
              ))}

              <div className="flex items-center space-x-4">
                <MdLocationOn className="text-2xl text-primary" />
                <div>
                  <p className="font-medium text-headline">Location</p>
                  <p className="text-paragraph">
                    {contactInfo.location.address}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Media Grid */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-background/50 p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-primary/10"
          >
            <h2 className="text-2xl font-bold mb-6 text-headline">
              Connect With Us
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 p-4 rounded-lg bg-background/50 hover:bg-primary/10 transition-all duration-300 border border-primary/10"
                  >
                    <Icon className="text-2xl text-primary" />
                    <span className="font-medium text-paragraph">
                      {social.label}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-8"
        >
          <div className="bg-background/50 p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-primary/10">
            <h2 className="text-2xl font-bold mb-8 text-headline border-b border-primary/10 pb-4">
              Visit Us
            </h2>
            <a
              href="https://maps.google.com/?q=Taguig+City,+Philippines"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <iframe
                src={contactInfo.location.embedUrl}
                className="w-full h-[600px] rounded-xl shadow-md hover:shadow-lg transition-shadow"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
