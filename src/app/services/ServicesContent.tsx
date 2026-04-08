'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import styles from './services.module.css';

const services = [
    {
        num: '01',
        img: '/service-planning.webp',
        title: 'Master Planning & Urban Design',
        desc: 'We create comprehensive master plans that shape communities. Our urban design approach balances functionality, sustainability, and aesthetic excellence to create spaces that enhance quality of life for generations.',
        features: ['Site Analysis', 'Zoning Strategies', 'Infrastructure Planning', 'Environmental Integration'],
    },
    {
        num: '02',
        img: '/service-cultural.webp',
        title: 'Cultural & Civic Architecture',
        desc: 'From concert halls to civic libraries and cultural institutions, we design spaces that anchor communities and stand as lasting expressions of public life. Our cultural projects balance programmatic complexity with architectural clarity.',
        features: ['Cultural Institutions', 'Concert Halls & Theatres', 'Libraries & Museums', 'Civic & Government Buildings'],
    },
    {
        num: '03',
        img: '/service-residential.webp',
        title: 'Residential Architecture',
        desc: 'From luxury villas to multi-family housing, we design homes that reflect the unique vision of each client while maximising comfort, light, and connection to the natural environment.',
        features: ['Custom Villas', 'Apartment Buildings', 'Renovations', 'Interior Architecture'],
    },
    {
        num: '04',
        img: '/service-commercial.webp',
        title: 'Commercial & Office Spaces',
        desc: 'We create dynamic workspaces that inspire productivity and collaboration. Our commercial projects blend innovative design with practical functionality to serve both the organisation and the people within it.',
        features: ['Corporate Headquarters', 'Office Buildings', 'Retail Spaces', 'Mixed-Use Developments'],
    },
    {
        num: '05',
        img: '/service-sustainable.webp',
        title: 'Sustainable Design',
        desc: 'Sustainability is not a specification — it is a design philosophy. We integrate passive house principles, renewable systems, and material accountability from the very first sketch, targeting net-zero performance without compromising architectural ambition.',
        features: ['Net-Zero Buildings', 'Passive House Certification', 'LEED & BREEAM', 'Circular Material Strategy'],
    },
    {
        num: '06',
        img: '/service-heritage.webp',
        title: 'Heritage & Adaptive Reuse',
        desc: 'Historic structures carry memory that new buildings cannot replicate. We approach every heritage project with deep respect for existing fabric, transforming protected and historic buildings into contemporary spaces without erasing what makes them irreplaceable.',
        features: ['Listed Building Works', 'Adaptive Reuse', 'Conservation & Restoration', 'Mixed-Use Transformation'],
    },
    {
        num: '07',
        img: '/service-interior.webp',
        title: 'Interior Architecture',
        desc: 'Our interior architecture practice works at the intersection of space, material, and light. We design interiors that are inseparable from the building around them — cohesive, considered, and built to endure.',
        features: ['Space Planning', 'Material & Finish Selection', 'Custom Furniture', 'Lighting Design'],
    },
];

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

// ── Individual service row ────────────────────────────────
// Each item owns its own useInView ref so it animates independently on scroll
function ServiceItem({ service, index }: { service: typeof services[0]; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });
    const reducedMotion = useReducedMotion();

    // #5 — alternating slide direction (odd items from right)
    const isReversed = index % 2 !== 0;

    return (
        <motion.div
            ref={ref}
            className={`${styles.serviceItem} ${isReversed ? styles.serviceItemReversed : ''}`}
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: isReversed ? 32 : -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={reducedMotion ? { duration: 0 } : { delay: 0.1, duration: 0.7, ease: EASE }}
        >
            {/* ── Image column — clip-path wipe on enter ── */}
            <motion.div
                className={`${styles.serviceImageWrap} ${isReversed ? styles.serviceImageRight : ''}`}
                initial={{ clipPath: reducedMotion ? 'inset(0% 0 0% 0)' : 'inset(100% 0 0% 0)' }}
                animate={isInView ? { clipPath: 'inset(0% 0 0% 0)' } : {}}
                transition={reducedMotion ? { duration: 0.3 } : { delay: 0.2, duration: 0.9, ease: EASE }}
            >
                <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className={styles.serviceImg}
                />
            </motion.div>

            {/* ── Content column ── */}
            <div className={`${styles.serviceContent} ${isReversed ? styles.serviceContentLeft : ''}`}>
                {/* #12 — large ghost number */}
                <span className={styles.serviceNum}>{service.num}</span>
                <h2 className={styles.serviceTitle}>{service.title}</h2>
                <p>{service.desc}</p>
                <ul className={styles.features}>
                    {service.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}

// ── Section wrapper — owns intro animation ────────────────
export default function ServicesContent() {
    const sectionRef = useRef<HTMLElement>(null);
    const introInView = useInView(sectionRef, { once: true, margin: '-60px' });
    const reducedMotion = useReducedMotion();

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: reducedMotion ? 0 : 20 },
        animate: introInView ? { opacity: 1, y: 0 } : {},
        transition: reducedMotion
            ? { duration: 0.3 }
            : { delay, duration: 0.7, ease: EASE },
    });

    return (
        <section ref={sectionRef} id="services-list" className={`section-padding ${styles.servicesList}`}>
            <div className="container">

                {/* #11 — section intro eyebrow + heading */}
                <div className={styles.servicesIntro}>
                    <motion.span className={styles.servicesEyebrow} {...fadeUp(0)}>
                        Our Expertise
                    </motion.span>
                    <motion.h2 className={styles.servicesHeading} {...fadeUp(0.1)}>
                        What We Offer
                    </motion.h2>
                </div>

                {/* Service items — each animates independently */}
                {services.map((service, index) => (
                    <ServiceItem key={service.num} service={service} index={index} />
                ))}

            </div>
        </section>
    );
}
