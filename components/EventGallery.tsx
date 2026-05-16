"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const images = [
    "/events/events-1.png",
    "/events/events-2.png",
    "/events/events-3.png",
    "/events/events-4.png",
    "/events/events-5.png",
    "/events/events-6.png",
    "/events/events-7.png",
    "/events/events-8.png",
];

export default function EventGallery() {
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
                    Glimpse Of Our Events
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{
                                scale: 1.03,
                            }}
                            className="group relative rounded-2xl bg-zinc-900/80 border border-white/5 md:bg-transparent md:border-none md:glass-strong overflow-hidden transform-gpu"
                        >
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
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
                            <Image
                                src={img}
                                alt='event'
                                width={600}
                                height={400}
                                className="w-full h-[260px] object-cover"
                            />

                            <div className="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}