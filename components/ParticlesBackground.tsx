'use client';

import Particles from "react-tsparticles";

export default function ParticlesBackground() {
    return (
        <div className="hidden md:block absolute inset-0 -z-10">
            <Particles
                options={{
                    background: {
                        color: {
                            value: "transparent",
                        },
                    },
                    particles: {
                        number: {
                            value: 40,
                        },
                        color: {
                            value: "#00ff99",
                        },
                        links: {
                            enable: true,
                            color: "#00ff99",
                            distance: 150,
                        },
                        move: {
                            enable: true,
                            speed: 1,
                        },
                        size: {
                            value: 2,
                        },
                        opacity: {
                            value: 0.5,
                        },
                    },
                }}
            />
        </div>
    );
}