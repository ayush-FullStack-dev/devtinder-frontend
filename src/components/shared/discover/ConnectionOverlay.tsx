import ConnectionOverlayClient from "./ConnectionOverlayClient";

type ConnectionOverlayProps = {
    show: boolean;
    className?: string;
    onClose: () => void;
};

const ConnectionOverlay = ({
    show,
    className,
    onClose,
}: ConnectionOverlayProps) => {
    return (
        <ConnectionOverlayClient
            show={show}
            className={className}
            onClose={onClose}
        />
    );
};

export default ConnectionOverlay;