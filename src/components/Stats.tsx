'use client';
import { Briefcase, Award, Users, Calendar } from 'lucide-react';
import styles from './Stats.module.css';

const stats = [
    { icon: Briefcase, value: '25+', label: 'Projects Completed' },
    { icon: Award, value: '15', label: 'Design Awards' },
    { icon: Users, value: '50+', label: 'Team Members' },
    { icon: Calendar, value: '25', label: 'Years Experience' },
];

export default function Stats() {
    return (
        <section className={styles.stats}>
            <div className="container">
                <div className={styles.grid}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.item}>
                            <stat.icon className={styles.icon} size={28} strokeWidth={1.5} />
                            <span className={styles.value}>{stat.value}</span>
                            <span className={styles.label}>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
