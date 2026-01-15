import Image from 'next/image';
import styles from './Projects.module.css';

const projects = [
    { id: 1, title: "Alpine Residence", category: "Residential", year: "2024", image: "/project1.png" },
    { id: 2, title: "Cultural Center", category: "Public", year: "2023", image: "/project2.png" },
    { id: 3, title: "Urban Office Tower", category: "Commercial", year: "2023", image: "/hero.png" },
];

export default function Projects() {
    return (
        <section id="projects" className={`section-padding ${styles.projects}`}>
            <div className="container">
                <div className={styles.header}>
                    <h2>Selected Works</h2>
                    <p>A curated collection of our most impactful projects.</p>
                </div>

                <div className={styles.grid}>
                    {projects.map((project) => (
                        <div key={project.id} className={styles.card}>
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
                        </div>
                    ))}
                </div>

                <div className={styles.cta}>
                    <a href="#" className="btn btn-outline">View All Projects</a>
                </div>
            </div>
        </section>
    );
}
