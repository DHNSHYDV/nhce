export default function BackgroundGradient() {
    return (
        <div className="fixed inset-0 -z-10 bg-background transition-colors duration-500">
            {/* Primary Green Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,rgba(16,185,129,0.08),transparent)] dark:bg-[radial-gradient(circle_800px_at_50%_-100px,rgba(16,185,129,0.15),transparent)]" />

            {/* Secondary Depth Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_400px,rgba(5,150,105,0.05),transparent)] dark:bg-[radial-gradient(circle_600px_at_50%_400px,rgba(5,150,105,0.1),transparent)]" />

            {/* Grid Pattern overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(16,185,129,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.08)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50 dark:opacity-100" />
        </div>
    );
}
