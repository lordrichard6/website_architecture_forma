import styles from './Stats.module.css';

const stats = [
    { value: '25+', label: 'Projects Completed' },
    { value: '15', label: 'Design Awards' },
    { value: '50+', label: 'Team Members' },
    { value: '25', label: 'Years Experience' },
];

export default function Stats() {
    return (
        <section className={styles.stats}>
            <div className="container">
                <div className={styles.grid}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.item}>
                            <span className={styles.value}>{stat.value}</span>
                            <span className={styles.label}>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
