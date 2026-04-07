'use client';
import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { Briefcase, Award, Users, Calendar } from 'lucide-react';
import styles from './Stats.module.css';

const stats = [
    { icon: Briefcase, value: 120, suffix: '+', label: 'Projects Completed' },
    { icon: Award, value: 24, suffix: '', label: 'Design Awards' },
    { icon: Users, value: 50, suffix: '+', label: 'Team Members' },
    { icon: Calendar, value: 20, suffix: '', label: 'Years Experience' },
];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!active) return;
        const duration = 1800;
        const start = performance.now();

        const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    }, [active, target]);

    return <>{count}{suffix}</>;
}

export default function Stats() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });

    return (
        <section className={styles.stats} ref={ref}>
            <div className="container">
                <div className={styles.grid}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.item}>
                            <stat.icon className={styles.icon} size={28} strokeWidth={1.5} />
                            <span className={styles.value}>
                                <CountUp target={stat.value} suffix={stat.suffix} active={isInView} />
                            </span>
                            <span className={styles.label}>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
