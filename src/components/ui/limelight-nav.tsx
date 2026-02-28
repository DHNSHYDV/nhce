"use client";

import React, { useState, useRef, useLayoutEffect, cloneElement } from 'react';

// --- Internal Types and Defaults ---

const DefaultHomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
);
const DefaultCompassIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
    </svg>
);
const DefaultBellIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
);

export type NavItem = {
    id: string | number;
    icon: React.ReactElement;
    label?: string;
    onClick?: () => void;
};

const defaultNavItems: NavItem[] = [
    { id: 'default-home', icon: <DefaultHomeIcon />, label: 'Home' },
    { id: 'default-explore', icon: <DefaultCompassIcon />, label: 'Explore' },
    { id: 'default-notifications', icon: <DefaultBellIcon />, label: 'Notifications' },
];

export type LimelightNavProps = {
    items?: NavItem[];
    activeIndex?: number;
    onTabChange?: (index: number) => void;
    className?: string;
    limelightClassName?: string;
    iconContainerClassName?: string;
    iconClassName?: string;
};

/**
 * An adaptive-width navigation bar with a "limelight" effect that highlights the active item.
 */
export const LimelightNav = ({
    items = defaultNavItems,
    activeIndex: externalActiveIndex,
    onTabChange,
    className,
    limelightClassName,
    iconContainerClassName,
    iconClassName,
}: LimelightNavProps) => {
    const [internalActiveIndex, setInternalActiveIndex] = useState(0);
    const activeIndex = externalActiveIndex !== undefined ? externalActiveIndex : internalActiveIndex;

    const [isReady, setIsReady] = useState(false);
    const navItemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const limelightRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        if (items.length === 0) return;

        const limelight = limelightRef.current;
        const activeItem = navItemRefs.current[activeIndex];

        if (limelight && activeItem) {
            const newLeft = activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2;
            limelight.style.left = `${newLeft}px`;

            if (!isReady) {
                setTimeout(() => setIsReady(true), 50);
            }
        }
    }, [activeIndex, isReady, items]);

    if (items.length === 0) {
        return null;
    }

    const handleItemClick = (index: number, itemOnClick?: () => void) => {
        if (externalActiveIndex === undefined) {
            setInternalActiveIndex(index);
        }
        onTabChange?.(index);
        itemOnClick?.();
    };

    return (
        <nav className={`relative inline-flex items-center h-14 rounded-none bg-black/40 text-foreground border border-white/5 px-2 ${className}`}>
            {items.map(({ id, icon, label, onClick }, index) => (
                <div
                    key={id}
                    ref={el => { navItemRefs.current[index] = el; }}
                    className={`relative z-20 flex h-full cursor-pointer items-center justify-center px-6 py-2 transition-colors ${activeIndex === index ? 'text-white' : 'text-white/40 hover:text-white/60'
                        } ${iconContainerClassName || ''}`}
                    onClick={() => handleItemClick(index, onClick)}
                    aria-label={label}
                >
                    <div className="flex flex-col items-center gap-1">
                        {cloneElement(icon as React.ReactElement<any>, {
                            className: `w-5 h-5 transition-opacity duration-300 ease-in-out ${activeIndex === index ? 'opacity-100' : 'opacity-40'
                                } ${(icon.props as any)?.className || ''} ${iconClassName || ''}`,
                        })}
                        {label && (
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] font-display">
                                {label}
                            </span>
                        )}
                    </div>
                </div>
            ))}

            <div
                ref={limelightRef}
                className={`absolute top-0 z-10 w-12 h-[2px] rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] ${isReady ? 'transition-[left] duration-500 ease-in-out' : ''
                    } ${limelightClassName || ''}`}
                style={{ left: '-999px' }}
            >
                <div className="absolute left-[-20%] top-[2px] w-[140%] h-12 [clip-path:polygon(10%_100%,30%_0,70%_0,90%_100%)] bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            </div>
        </nav>
    );
};
