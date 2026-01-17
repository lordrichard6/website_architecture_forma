'use client';
import { Building2, Home, Building, Sparkles } from 'lucide-react';
import styles from './Services.module.css';

const services = [
    {
        icon: Building2,
        title: 'Master Planning',
        desc: 'Comprehensive urban design and master planning for sustainable communities.',
    },
    {
        icon: Home,
        title: 'Residential',
        desc: 'Bespoke homes and luxury residences crafted with precision.',
    },
    {
        icon: Building,
        title: 'Commercial',
        desc: 'Dynamic office spaces and commercial developments that inspire.',
    },
    {
        icon: Sparkles,
        title: 'Interior Design',
        desc: 'Transformative interiors that blend form and function seamlessly.',
    },
];

export default function Services() {
    return (
        <section id="services" className={`section-padding ${styles.services}`}>
            <div className="container">
                <div className={styles.header}>
                    <span className={styles.label}>Our Expertise</span>
                    <h2>Services</h2>
                    <p className={styles.intro}>
                        From concept to completion, we deliver architectural excellence across every discipline.
                    </p>
                </div>

                <div className={styles.grid}>
                    {services.map((service, index) => (
                        <div key={index} className={styles.card} style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className={styles.iconWrapper}>
                                <service.icon className={styles.icon} size={32} strokeWidth={1.5} />
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.desc}</p>
                            <div className={styles.hoverLine} />
                        </div>
                    ))}
                </div>

                <div className={styles.cta}>
                    <a href="/services" className="btn btn-outline">Explore All Services</a>
                </div>
            </div>
        </section>
    );
}
