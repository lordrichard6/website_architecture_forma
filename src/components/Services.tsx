import styles from './Services.module.css';

const services = [
    {
        icon: '🏛️',
        title: 'Master Planning',
        desc: 'Comprehensive urban design and master planning for sustainable communities.',
    },
    {
        icon: '🏠',
        title: 'Residential',
        desc: 'Bespoke homes and luxury residences crafted with precision.',
    },
    {
        icon: '🏢',
        title: 'Commercial',
        desc: 'Dynamic office spaces and commercial developments that inspire.',
    },
    {
        icon: '✨',
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
                        <div key={index} className={styles.card}>
                            <span className={styles.icon}>{service.icon}</span>
                            <h3>{service.title}</h3>
                            <p>{service.desc}</p>
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
