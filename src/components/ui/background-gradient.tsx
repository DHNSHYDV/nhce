export default function BackgroundGradient() {
    return (
        <div className="fixed inset-0 -z-10 bg-[#020617] transition-colors duration-500 overflow-hidden">
            {/* Primary Green Glow - Pulsing */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.4, 0.3],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-[-10%] left-[20%] w-[1000px] h-[1000px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none"
            />

            {/* Cyan/Blue Secondary Glow - Floating */}
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute bottom-[-10%] right-[10%] w-[800px] h-[800px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none"
            />

            {/* Central Depth Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,rgba(16,185,129,0.05),transparent)]" />

            {/* Grid Pattern overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.08)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        </div>
    );
}

import { motion } from "framer-motion";
