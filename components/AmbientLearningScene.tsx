import styles from "@/components/AmbientLearningScene.module.css";

type Props = {
  variant?: "lesson" | "site";
};

export default function AmbientLearningScene({ variant = "site" }: Props) {
  return (
    <div className={`${styles.scene} ${styles[variant]}`} aria-hidden="true">
      <div className={styles.screen}>
        <span />
        <span />
        <span />
      </div>
      <div className={styles.disk}>
        <i />
      </div>
      <div className={styles.cursor} />
      <div className={styles.orbit}>
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
