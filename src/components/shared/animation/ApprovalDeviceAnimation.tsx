type ApprovalDeviceAnimationProps = {
  className: string;
};

const ApprovalDeviceAnimation = ({
  className,
}: ApprovalDeviceAnimationProps) => {
  return (
    <img
      src="/images/ApprovalDevice.svg"
      alt="Approval Device"
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      className={`${className ? className : ""}`}
      loading="eager"
      fetchPriority="high"
      decoding="async"
    />
  );
};

export default ApprovalDeviceAnimation;
