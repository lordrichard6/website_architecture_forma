'use client';
import { useEffect, useRef } from 'react';
import styles from './Cursor.module.css';

export default function Cursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;
        let rafId: number;

        const onMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        };

        const animate = () => {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
            rafId = requestAnimationFrame(animate);
        };

        const onEnterLink = () => ring.classList.add(styles.expanded);
        const onLeaveLink = () => ring.classList.remove(styles.expanded);

        window.addEventListener('mousemove', onMove);
        rafId = requestAnimationFrame(animate);

        const links = document.querySelectorAll('a, button, [role="button"]');
        links.forEach((el) => {
            el.addEventListener('mouseenter', onEnterLink);
            el.addEventListener('mouseleave', onLeaveLink);
        });

        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(rafId);
            links.forEach((el) => {
                el.removeEventListener('mouseenter', onEnterLink);
                el.removeEventListener('mouseleave', onLeaveLink);
            });
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className={styles.dot} />
            <div ref={ringRef} className={styles.ring} />
        </>
    );
}
