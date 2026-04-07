'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import styles from './Projects.module.css';

const projects = [
    { slug: 'alpine-residence', title: "Alpine Residence", category: "Residential", year: "2024", image: "/project1.webp" },
    { slug: 'cultural-center', title: "Cultural Center", category: "Public", year: "2023", image: "/project2.webp" },
    { slug: 'urban-office-tower', title: "Urban Office Tower", category: "Commercial", year: "2023", image: "/hero.webp" },
    { slug: 'lakeside-villa', title: "Lakeside Villa", category: "Residential", year: "2024", image: "/project1.webp" },
    { slug: 'tech-campus', title: "Innovation Campus", category: "Commercial", year: "2023", image: "/project2.webp" },
    { slug: 'museum-of-art', title: "Museum of Modern Art", category: "Public", year: "2022", image: "/hero.webp" },
];

const filters = ['All', 'Residential', 'Commercial', 'Public'] as const;
type Filter = typeof filters[number];

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });
    const [activeFilter, setActiveFilter] = useState<Filter>('All');

    const filtered = activeFilter === 'All'
        ? projects
        : projects.filter((p) => p.category === activeFilter);

    return (
        <section id="projects" className={`section-padding ${styles.projects}`}>
            <div className="container" ref={ref}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 32 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <span className={styles.label}>Portfolio</span>
                    <h2>Selected Works</h2>
                    <p>A curated collection of our most impactful projects.</p>
                </motion.div>

                <motion.div
                    className={styles.filters}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.15, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            className={`${styles.filterBtn} ${activeFilter === filter ? styles.filterActive : ''}`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </motion.div>

                <div className={styles.grid}>
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project, index) => (
                            <motion.div
                                key={project.slug}
                                layout
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                            >
                                <Link href={`/projects/${project.slug}`} className={styles.card}>
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className={styles.image}
                                        />
                                        <div className={styles.overlay}>
                                            <span className={styles.category}>{project.category}</span>
                                        </div>
                                    </div>
                                    <div className={styles.info}>
                                        <h3>{project.title}</h3>
                                        <span className={styles.year}>{project.year}</span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <motion.div
                    className={styles.cta}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <Link href="/projects" className="btn btn-outline">View All Projects</Link>
                </motion.div>
            </div>
        </section>
    );
}
