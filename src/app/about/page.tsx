"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import profile from "../../../public/images/ronron.jpg";
import { FaPython, FaReact, FaAndroid } from "react-icons/fa";
import { BiLogoJavascript } from "react-icons/bi";
import { SiTailwindcss, SiExpo } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { serviceCards } from "../../data/services";

export default function About() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const technologies = [
    { name: "Python", icon: <FaPython className="text-2xl" /> },
    { name: "Javascript", icon: <BiLogoJavascript className="text-2xl" /> },
    { name: "C#", icon: <TbBrandCSharp className="text-2xl" /> },
    { name: "React", icon: <FaReact className="text-2xl" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-2xl" /> },
    { name: "React Native", icon: <FaReact className="text-2xl" /> },
    { name: "Android Studio", icon: <FaAndroid className="text-2xl" /> },
    { name: "Expo Router", icon: <SiExpo className="text-2xl" /> },
  ];

  const timelineEvents = [
    {
      year: "2025",
      title: "Internship",
      description: "Will Complete a 6-month internship at a tech company",
    },
    {
      year: "2024",
      title: "Thesis Project",
      description:
        "Completed my thesis project on AI Interviewer mobile application development",
    },
    {
      year: "2024",
      title: "Freelancing",
      description: "Started freelancing as a web and mobile developer",
    },
    {
      year: "2024",
      title: "Student President (Director)",
      description:
        "Served as the Student President of the Computer Science course",
    },
    {
      year: "2023",
      title: "Learning Mobile Development",
      description: "Started learning mobile development with React Native",
    },
    {
      year: "2021",
      title: "Learning Journey",
      description: "Started learning programming and web development",
    },
  ];

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
        {/* Header Section with enhanced animations */}
        <motion.div className="relative mb-24" style={{ opacity, scale }}>
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

          {/* Section Title */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative z-10"
          >
            <span className="text-primary/60 uppercase tracking-wider text-sm mb-2 block">
              About Me
            </span>
            <h1 className="text-5xl font-bold text-headline mb-6">
              Developing Application
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}
                Experiences
              </span>
            </h1>
            <motion.div
              className="absolute w-[300px] h-[300px] rounded-full bg-primary/20 blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{ top: "20%", left: "15%" }}
            />
            <motion.div
              className="absolute w-[200px] h-[200px] rounded-full bg-secondary/20 blur-3xl"
              animate={{
                x: [0, -50, 0],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{ bottom: "20%", right: "15%" }}
            />
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center md:justify-start"
          >
            {/* Profile Info */}
            <div className="relative">
              <div className="w-[550px] h-[400px] rounded-2xl overflow-hidden border-2 border-primary/20 shadow-lg">
                <Image
                  src={profile}
                  alt="Profile photo"
                  fill
                  className="object-cover transform hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-4 -right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg"
              >
                Beginner
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Bio */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-headline">
                Hey there i am
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {" "}
                  Ron Marche Rhyss Q. Uy
                </span>
              </h2>
              <p className="text-paragraph text-lg leading-relaxed">
                I’m a developer who loves building all kinds of applications,
                from web to mobile and beyond. I enjoy creating awesome UIs and
                adding features that make applications feel more alive and
                interactive. I’ve been developing applications for two years
                now, and I’ve learned a lot from my experiences. I’m a
                self-taught developer, and much of my knowledge comes from
                resources available on the internet.
              </p>
            </div>

            {/* Skills (No More Percentages) */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-headline">
                Technologies
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                    className="p-3 rounded-lg border border-primary/10 hover:border-primary/30 bg-background/50 shadow-sm flex items-center justify-center gap-2 text-base font-medium text-headline transition-all hover:scale-105"
                  >
                    {tech.icon}
                    {tech.name}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
          </motion.div>
        </div>

        {/* After the Technologies section and before Services section */}
        <section className="mt-24">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-background/50 rounded-2xl p-8 border border-primary/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Personal Story */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-headline">
                My Journey
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {" "}
                  as a Developer
                </span>
              </h3>
              <div className="space-y-4 text-paragraph">
                <p>
                  My passion for programming began in senior high school. I was
                  fascinated by how applications work and how they can make
                  people&apos;s lives easier.
                </p>
                <p>
                  What drives me is the endless possibility of creating
                  something new and innovative. I love the challenge of solving
                  problems and learning new technologies. During my time at
                  Taguig City University, I served as the Student President
                  (Director) of the Computer Science course, which helped me
                  develop leadership skills and foster a collaborative
                  environment with my peers.
                </p>
                <p>
                  Currently, I&apos;m focused on expanding my knowledge in both
                  web and mobile development, and I enjoy sharing what I&apos;ve
                  learned with others through tutoring and mentorship.
                </p>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-headline">Quick Facts</h3>
              <div className="space-y-4">
                {[
                  { label: "Based in", value: "Philippines" },
                  { label: "Education", value: "Computer Science" },
                  { label: "Favorite Tech", value: "React & React Native" },
                  { label: "Learning", value: "Advanced Backend Development" },
                  {
                    label: "Hobbies",
                    value: "Gaming, Learning, Teaching, and Coding",
                  },
                ].map((fact, index) => (
                  <motion.div
                    key={fact.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-4"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span className="text-headline font-medium">
                      {fact.label}:
                    </span>
                    <span className="text-paragraph">{fact.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section className="mt-24">
          <motion.h2
            className="text-3xl font-extrabold text-headline mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            What I Do
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceCards.map((card, index) => (
              <motion.div
                key={card.title}
                className="group p-8 rounded-2xl bg-background/50 border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-lg relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative space-y-6">
                  {/* Icon and Title */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <card.icon className="text-4xl text-primary" />
                      {card.additionalIcons && (
                        <div className="flex gap-2 ml-2">
                          {card.additionalIcons.map((Icon, idx) => (
                            <Icon
                              key={idx}
                              className="text-2xl text-paragraph/60 hover:text-primary transition-colors"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <h4 className="text-xl font-bold text-headline">
                      {card.title}
                    </h4>
                  </div>

                  {/* Description */}
                  <p className="text-paragraph text-sm leading-relaxed">
                    {card.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {card.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Experience and Highlight */}
                  <div className="pt-4 border-t border-primary/10 space-y-2">
                    <p className="text-sm text-paragraph flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary/60" />
                      {card.experience}
                    </p>
                    <p className="text-sm text-paragraph/80 italic">
                      &quot;{card.highlight}&quot;
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline Section - Now the last section */}
        <section className="mt-24 mb-8">
          <motion.div
            className="bg-background/50 rounded-2xl p-8 border border-primary/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-headline mb-8">
              My Timeline
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}
                Journey
              </span>
            </h3>

            <div className="relative border-l-2 border-primary/20 ml-4">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="mb-8 ml-6 relative cursor-pointer"
                >
                  <div className="absolute -left-[2.2rem] w-4 h-4 rounded-full bg-primary border-4 border-background" />
                  <div className="flex flex-col gap-1">
                    <span className="text-primary font-bold">{event.year}</span>
                    <h4 className="text-headline font-semibold">
                      {event.title}
                    </h4>
                    <p className="text-paragraph text-sm">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
