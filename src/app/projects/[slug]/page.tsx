import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from './project.module.css';

const projects: Record<string, {
    title: string;
    category: string;
    year: string;
    location: string;
    size: string;
    client: string;
    image: string;
    description: string;
    gallery: string[];
}> = {
    'alpine-residence': {
        title: 'Alpine Residence',
        category: 'Residential',
        year: '2024',
        location: 'Zermatt, Switzerland',
        size: '850 m²',
        client: 'Private Client',
        image: '/project1.png',
        description: 'A stunning private residence nestled in the Swiss Alps, designed to harmonize with its dramatic mountain surroundings. The home features expansive glass walls that frame panoramic views, while locally-sourced timber and stone anchor the structure to its alpine context.',
        gallery: ['/project1.png', '/project2.png', '/hero.png'],
    },
    'cultural-center': {
        title: 'Cultural Center',
        category: 'Public',
        year: '2023',
        location: 'Basel, Switzerland',
        size: '4,200 m²',
        client: 'City of Basel',
        image: '/project2.png',
        description: 'A dynamic cultural hub designed to foster community engagement and artistic expression. The multi-purpose facility includes exhibition spaces, a 500-seat auditorium, artist studios, and a rooftop sculpture garden.',
        gallery: ['/project2.png', '/hero.png', '/project1.png'],
    },
    'urban-office-tower': {
        title: 'Urban Office Tower',
        category: 'Commercial',
        year: '2023',
        location: 'Zurich, Switzerland',
        size: '28,000 m²',
        client: 'Swiss Finance Group',
        image: '/hero.png',
        description: 'A 25-story commercial tower that redefines the Zurich skyline. The building features a double-skin facade for energy efficiency, flexible floor plates, and a public plaza at street level.',
        gallery: ['/hero.png', '/project1.png', '/project2.png'],
    },
    'lakeside-villa': {
        title: 'Lakeside Villa',
        category: 'Residential',
        year: '2024',
        location: 'Lugano, Switzerland',
        size: '620 m²',
        client: 'Private Client',
        image: '/project1.png',
        description: 'An elegant lakefront property that maximizes its waterfront location. Cantilevered terraces extend over the lake, while the interior spaces flow seamlessly from public to private zones.',
        gallery: ['/project1.png', '/project2.png', '/hero.png'],
    },
    'tech-campus': {
        title: 'Innovation Campus',
        category: 'Commercial',
        year: '2023',
        location: 'Geneva, Switzerland',
        size: '15,000 m²',
        client: 'TechStart AG',
        image: '/project2.png',
        description: 'A state-of-the-art technology campus designed to foster innovation and collaboration. The complex includes research labs, co-working spaces, incubator facilities, and green courtyards.',
        gallery: ['/project2.png', '/hero.png', '/project1.png'],
    },
    'museum-of-art': {
        title: 'Museum of Modern Art',
        category: 'Public',
        year: '2022',
        location: 'Bern, Switzerland',
        size: '8,500 m²',
        client: 'Swiss Art Foundation',
        image: '/hero.png',
        description: 'A world-class museum designed to showcase contemporary art in optimal conditions. The building features adjustable natural lighting, climate-controlled galleries, and flexible exhibition spaces.',
        gallery: ['/hero.png', '/project1.png', '/project2.png'],
    },
};

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return Object.keys(projects).map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = projects[slug];

    if (!project) {
        notFound();
    }

    return (
        <>
            <Header />
            <main className={styles.main}>
                <section className={styles.hero}>
                    <Image src={project.image} alt={project.title} fill className={styles.heroImage} priority />
                    <div className={styles.heroOverlay} />
                    <div className={`container ${styles.heroContent}`}>
                        <span className={styles.category}>{project.category}</span>
                        <h1>{project.title}</h1>
                    </div>
                </section>

                <section className={`section-padding ${styles.details}`}>
                    <div className="container">
                        <div className={styles.grid}>
                            <div className={styles.description}>
                                <h2>Project Overview</h2>
                                <p>{project.description}</p>
                            </div>
                            <div className={styles.specs}>
                                <div className={styles.specItem}>
                                    <span className={styles.specLabel}>Location</span>
                                    <span className={styles.specValue}>{project.location}</span>
                                </div>
                                <div className={styles.specItem}>
                                    <span className={styles.specLabel}>Year</span>
                                    <span className={styles.specValue}>{project.year}</span>
                                </div>
                                <div className={styles.specItem}>
                                    <span className={styles.specLabel}>Size</span>
                                    <span className={styles.specValue}>{project.size}</span>
                                </div>
                                <div className={styles.specItem}>
                                    <span className={styles.specLabel}>Client</span>
                                    <span className={styles.specValue}>{project.client}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.gallery}>
                    <div className="container">
                        <div className={styles.galleryGrid}>
                            {project.gallery.map((img, index) => (
                                <div key={index} className={styles.galleryItem}>
                                    <Image src={img} alt={`${project.title} - Image ${index + 1}`} fill />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className={styles.cta}>
                    <div className="container">
                        <Link href="/#projects" className="btn btn-outline">← Back to Projects</Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
