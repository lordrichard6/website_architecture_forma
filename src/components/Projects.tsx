import Image from 'next/image';
import Link from 'next/link';
import styles from './Projects.module.css';

const projects = [
    { slug: 'alpine-residence', title: "Alpine Residence", category: "Residential", year: "2024", image: "/project1.webp" },
    { slug: 'cultural-center', title: "Cultural Center", category: "Public", year: "2023", image: "/project2.webp" },
    { slug: 'urban-office-tower', title: "Urban Office Tower", category: "Commercial", year: "2023", image: "/hero.webp" },
    { slug: 'lakeside-villa', title: "Lakeside Villa", category: "Residential", year: "2024", image: "/project1.webp" },
    { slug: 'tech-campus', title: "Innovation Campus", category: "Commercial", year: "2023", image: "/project2.webp" },
    { slug: 'museum-of-art', title: "Museum of Modern Art", category: "Public", year: "2022", image: "/hero.webp" },
];

export default function Projects() {
    return (
        <section id="projects" className={`section-padding ${styles.projects}`}>
            <div className="container">
                <div className={styles.header}>
                    <span className={styles.label}>Portfolio</span>
                    <h2>Selected Works</h2>
                    <p>A curated collection of our most impactful projects.</p>
                </div>

                <div className={styles.grid}>
                    {projects.map((project) => (
                        <Link href={`/projects/${project.slug}`} key={project.slug} className={styles.card}>
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
                    ))}
                </div>

                <div className={styles.cta}>
                    <Link href="/projects" className="btn btn-outline">View All Projects</Link>
                </div>
            </div>
        </section>
    );
}
