import styles from './About.module.css';

export default function About() {
    return (
        <section id="about" className={`section-padding ${styles.about}`}>
            <div className="container">
                <div className={styles.wrapper}>
                    <div className={styles.left}>
                        <h2>About<br />The Studio</h2>
                    </div>

                    <div className={styles.right}>
                        <p className={styles.lead}>
                            FORMA is an award-winning architecture studio based in Zurich, Switzerland. We believe in the power of design to transform lives and communities.
                        </p>
                        <p className={styles.body}>
                            Founded in 2005, our multidisciplinary team brings together architects, urban planners, and designers who share a passion for creating meaningful spaces. From private residences to large-scale public buildings, we approach every project with the same dedication to craft, sustainability, and innovation.
                        </p>

                        <div className={styles.stats}>
                            <div className={styles.stat}>
                                <span className={styles.num}>120+</span>
                                <span className={styles.label}>Projects</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.num}>18</span>
                                <span className={styles.label}>Years</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.num}>24</span>
                                <span className={styles.label}>Awards</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
