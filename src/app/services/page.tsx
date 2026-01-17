import { Building2, Home, Building, Sparkles } from 'lucide-react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from './services.module.css';

const services = [
    {
        icon: Building2,
        title: 'Master Planning & Urban Design',
        desc: 'We create comprehensive master plans that shape communities. Our urban design approach balances functionality, sustainability, and aesthetic excellence to create spaces that enhance quality of life.',
        features: ['Site Analysis', 'Zoning Strategies', 'Infrastructure Planning', 'Environmental Integration'],
    },
    {
        icon: Home,
        title: 'Residential Architecture',
        desc: 'From luxury villas to multi-family housing, we design homes that reflect the unique vision of each client while maximizing comfort, light, and connection to the environment.',
        features: ['Custom Villas', 'Apartment Buildings', 'Renovations', 'Interior Architecture'],
    },
    {
        icon: Building,
        title: 'Commercial & Office Spaces',
        desc: 'We create dynamic workspaces that inspire productivity and collaboration. Our commercial projects blend innovative design with practical functionality.',
        features: ['Corporate Headquarters', 'Office Buildings', 'Retail Spaces', 'Mixed-Use Developments'],
    },
    {
        icon: Sparkles,
        title: 'Interior Design',
        desc: 'Our interior design team transforms spaces into experiences. We select materials, finishes, and furnishings that create cohesive, beautiful environments.',
        features: ['Space Planning', 'Material Selection', 'Furniture Design', 'Lighting Design'],
    },
];

export default function ServicesPage() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <section className={styles.hero}>
                    <div className="container">
                        <span className={styles.label}>What We Do</span>
                        <h1>Our Services</h1>
                        <p>Comprehensive architectural solutions from concept to completion.</p>
                    </div>
                </section>

                <section className={`section-padding ${styles.servicesList}`}>
                    <div className="container">
                        {services.map((service, index) => (
                            <div key={index} className={styles.serviceItem}>
                                <div className={styles.serviceIcon}>
                                    <service.icon size={48} strokeWidth={1.2} />
                                </div>
                                <div className={styles.serviceContent}>
                                    <h2>{service.title}</h2>
                                    <p>{service.desc}</p>
                                    <ul className={styles.features}>
                                        {service.features.map((feature, i) => (
                                            <li key={i}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.cta}>
                    <div className="container">
                        <h2>Ready to Start Your Project?</h2>
                        <p>Let&apos;s discuss how we can bring your vision to life.</p>
                        <a href="/#contact" className="btn btn-primary">Get in Touch</a>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
