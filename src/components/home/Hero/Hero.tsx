
import Container from '@/components/layout/Container/Container';
import styles from './Hero.module.css';
import Image from 'next/image';
import people from '@/assets/people_xl.png'
import Button from '@/components/ui/Button/Button';
import StatCard from './StatCard';
import Link from 'next/link';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <Container>
                <div className={styles.hero_wrap}>
                    <div className={styles.inner}>
                        <div className={styles.info}>
                            <h1 className={styles.title}>
                                FIND CLOTHES THAT MATCHES YOUR STYLE
                            </h1>
                            <span className={styles.description}>
                                Ознакомьтесь с нашим разнообразным ассортиментом тщательно сшитой одежды, созданной для того, чтобы подчеркнуть вашу индивидуальность и удовлетворить ваш стиль.
                            </span><Link href={'/catalog'}>
                                <Button variant='default' className={styles.button}>
                                    Перейти в каталог
                                </Button>
                            </Link>

                        </div>
                        <div className={styles.goals}>
                            <StatCard value="200+" label="International Brands" />
                            <div className={styles.hline} />
                            <StatCard value="2,000+" label="High-Quality Products" />
                            <div className={styles.hline} />
                            <StatCard value="30,000+" label="Happy Customers" />
                        </div>
                    </div>
                    <div className={styles.people}>
                        <div className={styles.starbig}>
                            <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M52 0C53.7654 27.955 76.0448 50.2347 104 52C76.0448 53.7654 53.7654 76.0448 52 104C50.2347 76.0448 27.955 53.7654 0 52C27.955 50.2347 50.2347 27.955 52 0Z" fill="black" />
                            </svg>
                        </div>
                        <div className={styles.starsm}>
                            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28 0C28.9506 15.0527 40.9472 27.0495 56 28C40.9472 28.9506 28.9506 40.9472 28 56C27.0495 40.9472 15.0527 28.9506 0 28C15.0527 27.0495 27.0495 15.0527 28 0Z" fill="black" />
                            </svg>
                        </div>
                        <Image src={people} alt="" className={styles.img} />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Hero;