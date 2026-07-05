const CircleLoader = ({
  loaderStyle,
}: {
  className?: string;
  loaderStyle?: {};
}) => {
  return <span
  className="loader"
  style={loaderStyle}
/>;
};

export default CircleLoader;
