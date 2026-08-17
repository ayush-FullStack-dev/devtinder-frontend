import styles from "@/app/style/module/loader/CheckingLoader.module.css";

const CheckingLoader = ({
  loaderStyle,
}: {
  className?: string;
  loaderStyle?: {};
}) => {
  return <span className={styles.loader} style={loaderStyle} />;
};

export default CheckingLoader;
