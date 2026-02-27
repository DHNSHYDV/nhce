export default function BackgroundGradient() {
    return (
        <div className="fixed inset-0 -z-10 bg-slate-950">
            {/* Primary Green Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,#10b98115,transparent)]" />

            {/* Secondary Depth Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_400px,#05966910,transparent)]" />

            {/* Grid Pattern overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            {/* Bottom Fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
        </div>
    );
}
