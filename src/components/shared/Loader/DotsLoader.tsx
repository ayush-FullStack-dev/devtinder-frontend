import styles from "@/app/style/module/loader/DotsLoader.module.css";

const DotsLoader = ({
  loaderStyle,
}: {
  className?: string;
  loaderStyle?: {};
}) => {
  return <span className={styles.loader} style={loaderStyle} />;
};

export default DotsLoader;
