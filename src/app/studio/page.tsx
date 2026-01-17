import Image from 'next/image';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from './studio.module.css';

const team = [
    { name: 'Marcus Weber', role: 'Founding Partner', image: '/project1.webp' },
    { name: 'Elena Fischer', role: 'Design Director', image: '/project2.webp' },
    { name: 'Thomas Brunner', role: 'Technical Director', image: '/hero.webp' },
    { name: 'Sophie Meier', role: 'Senior Architect', image: '/project1.webp' },
    { name: 'Lukas Hoffmann', role: 'Project Architect', image: '/project2.webp' },
    { name: 'Anna Keller', role: 'Interior Designer', image: '/hero.webp' },
];

const awards = [
    { year: '2024', title: 'Swiss Design Award', project: 'Alpine Residence' },
    { year: '2023', title: 'European Architecture Prize', project: 'Cultural Center' },
    { year: '2023', title: 'Best Commercial Building', project: 'Urban Office Tower' },
    { year: '2022', title: 'Sustainability Excellence Award', project: 'Eco Campus' },
];

export default function StudioPage() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <section className={styles.hero}>
                    <div className="container">
                        <span className={styles.label}>Who We Are</span>
                        <h1>Our Studio</h1>
                        <p>A collective of visionary architects and designers.</p>
                    </div>
                </section>

                <section className={`section-padding ${styles.philosophy}`}>
                    <div className="container">
                        <div className={styles.philosophyContent}>
                            <h2>Our Philosophy</h2>
                            <p>
                                At FORMA, we believe architecture is more than buildings—it&apos;s about creating
                                experiences that enhance human life. Founded in 1999, our Zurich-based studio
                                has grown into a team of 50+ professionals united by a passion for design excellence.
                            </p>
                            <p>
                                We approach each project as a unique opportunity to balance innovation with
                                timelessness, sustainability with beauty, and client vision with expert craft.
                            </p>
                        </div>
                    </div>
                </section>

                <section className={`section-padding ${styles.teamSection}`}>
                    <div className="container">
                        <h2 className="text-center">The Team</h2>
                        <div className={styles.teamGrid}>
                            {team.map((member, index) => (
                                <div key={index} className={styles.teamCard}>
                                    <div className={styles.teamImage}>
                                        <Image src={member.image} alt={member.name} fill />
                                    </div>
                                    <h3>{member.name}</h3>
                                    <span>{member.role}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className={`section-padding ${styles.awardsSection}`}>
                    <div className="container">
                        <h2 className="text-center">Recognition</h2>
                        <div className={styles.awardsList}>
                            {awards.map((award, index) => (
                                <div key={index} className={styles.awardItem}>
                                    <span className={styles.awardYear}>{award.year}</span>
                                    <div className={styles.awardInfo}>
                                        <strong>{award.title}</strong>
                                        <span>{award.project}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
