"use client";

import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Aarav Sharma",
        role: "Technical Team",
        review:
            "Bit By Bit Club helped me improve my coding skills and meet amazing developers.",
    },
    {
        name: "Priya Verma",
        role: "Design Team",
        review:
            "The club atmosphere, events, and hackathons motivated me to build real projects.",
    },
    {
        name: "Rohan Patil",
        role: "Social Media Team",
        review:
            "One of the best communities for learning technology and teamwork.",
    },
];

export default function Testimonials() {
    return (
        <section className="relative py-24 px-4 md:px-10 overflow-hidden">
            <div className="max-w-7xl mx-auto">

                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-4xl md:text-6xl font-bold text-center mb-16"
                >
                    Member Reviews
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="group relative rounded-2xl glass-strong overflow-hidden transform-gpu min-h-[260px] p-10 hover:scale-[1.03]"
                        >
                            {/* Border beam on hover */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                                style={{
                                    boxShadow: `inset 0 0 0 1px var(--border-accent)`,
                                }}
                            />

                            {/* Animated beam line */}
                            <div
                                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: `linear-gradient(90deg, transparent, var(--accent-primary), transparent)`,
                                    animation: 'border-beam 2s linear infinite',
                                    backgroundSize: '200% 100%',
                                }}
                            />
                            <p
                                className="text-lg leading-relaxed mb-6"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                "{item.review}"
                            </p>

                            <div>
                                <h3
                                    className="text-2xl font-semibold"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    {item.name}
                                </h3>
                                <p
                                    className="text-sm"
                                    style={{ color: 'var(--accent-primary)' }}
                                >
                                    {item.role}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}