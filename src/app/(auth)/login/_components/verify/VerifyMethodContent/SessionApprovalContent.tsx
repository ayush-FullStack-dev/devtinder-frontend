import Header from "@/components/shared/Header";
import IconWithText from "@/components/shared/IconWithText";
import AppLoader from "@/components/shared/Loader/AppLoader";
import { useEffect, useState } from "react";
import { googleSansFlex } from "@/assets/fonts/font.google";
import ApprovalDeviceAnimation from "@/components/shared/ApprovalDeviceAnimation";
import DotsLoader from "@/components/shared/Loader/DotsLoader";
import { useLoginStore } from "@/store/login.store";
import { verifyLogin } from "@/services/login/verifyLogin";
import {
  Clock,
  CircleCheckBig,
  CircleX,
  TriangleAlert,
  LoaderCircle,
} from "lucide-react";
import { getSocket } from "@/lib/socket";

type SecurityCodeContentProps = {
  onResponseResolve?: (
    isSuccess: boolean,
    setIsFetching: (state: boolean) => void,
  ) => void;
};

const SessionApprovalContent = ({
  onResponseResolve = () => { },
}: SecurityCodeContentProps) => {
  //types 
  type approvalSocketSchema = {
    approvalId: string;
    status: "approved" | "declined" | "expired"
  }

  type approvalStatusSchema = "REQUESTING" | "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";

  //local states
  const [isFetching, setIsFetching] = useState(false);
  const loginIdentify = useLoginStore((state) => state.loginIdentifyInfo);
  const [approvalInfo, setApprovalInfo] = useState<{
    message?: string;
    status: approvalStatusSchema
  } | null>(null);

  //config
  const approvalStateConfig = {
    REQUESTING: {
      title: "Requesting Session Approval",
      description1: "We're sending a notification to your trusted devices.",
      description2: "This usually takes a few seconds.",
      icon: <LoaderCircle color="#5a3dcb" size={20} className="animate-spin" />,
    },

    PENDING: {
      title: "Waiting for approval",
      description1: "Check a device where you're already signed in.",
      description2: "Approve the request to continue.",
      icon: <Clock color="#5a3dcb" size={25} />,
    },

    ACCEPTED: {
      title: "Signing you in...",
      description1: "Approval received successfully.",
      description2: "Please wait a moment.",
      icon: <CircleCheckBig color="#10b981" size={20} />,
    },

    REJECTED: {
      title: approvalInfo?.message || "Request rejected",
      description1: "The approval request was rejected.",
      description2: "You can request another approval.",
      icon: <CircleX color="#ef4444" size={20} />,
    },

    EXPIRED: {
      title: "Approval expired",
      description1: "The approval request has expired.",
      description2: "Please send a new request.",
      icon: <TriangleAlert color="#FF2C2C" size={20} />,
    },
  };


  const removeSession = async () => {
    await fetch("/api/remove-cookie", {
      method: "POST",
      body: JSON.stringify({
        cookieName: "approvalId",
      }),
    });
  };

  const handleRejected = (message?: string, status: approvalStatusSchema = "REJECTED") => {
    removeSession();
    setApprovalInfo({
      status,
      message: message ?? "Approval request was rejected.",
    });
  };

  const handleAccepted = () => {
    removeSession();

    setApprovalInfo({
      status: "ACCEPTED",
    });

    onResponseResolve(true, setIsFetching);
  };


  const currentState =
    approvalStateConfig[approvalInfo?.status ?? "REQUESTING"];

  const startSessionApproval = async () => {
    if (
      approvalInfo?.status === "PENDING" ||
      approvalInfo?.status === "REQUESTING"
    ) {
      return;
    }

    setIsFetching(true);

    setApprovalInfo({
      status: "REQUESTING",
      message: "",
    });

    try {
      const { result } = await verifyLogin({
        loginIdentify,
        method: "session_approval",
        code: "",
      });

      alert(result?.success ? result?.approvalId : "")

      if (result?.code === "SESSION_APPROVAL_REQUESTED") {
        setApprovalInfo({
          status: "PENDING",
          message: result.message,
        });
        return;
      }

      if (result?.code === "LOGIN_SUCCESS") {
        handleAccepted();
        return;
      }

      if (result?.message) {
        handleRejected(result.message);
      }
    } catch (error: any) {
      handleRejected(error?.response?.data?.message);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (approvalInfo?.status !== "PENDING") return;

    const handleApproval = () => {
      try {
        const socket = getSocket("/auth");

        socket.connect();

        const handleDecision = async (data: approvalSocketSchema) => {

          const status = data.status
          switch (status) {
            case "approved":
              const { result } = await verifyLogin({
                loginIdentify,
                method: "session_approval",
                code: "",
              });

              if (result?.code === "LOGIN_SUCCESS") {
                socket.off("approval:update");
                socket.disconnect();

                handleAccepted();
              } else {
                socket.off("approval:update");
                socket.disconnect();

                handleRejected("", "EXPIRED");
              }

              break;

            case "declined":
              socket.off("approval:update");
              socket.disconnect();

              handleRejected();
              break;
            case "expired":
              socket.off("approval:update");
              socket.disconnect();

              handleRejected("", "EXPIRED");
              break

            default:
              socket.off("approval:update");
              socket.disconnect();

              handleRejected("Unexpected Error we can't procces this req right now.", "REJECTED");
              break;
          }
        };

        socket.on("approval:update", handleDecision
        );
      } catch (error: any) {
        handleRejected(error?.message);
      }
    };


    handleApproval()
  }, [approvalInfo?.status]);

  useEffect(() => {
    const init = async () => {
      await removeSession();
      startSessionApproval();
    };

    init();

    return () => {
      const socket = getSocket("/auth");

      socket.off("approval:update");

      socket.disconnect();
    };
  }, []);

  return (
    <div className="ml-2">
      <AppLoader loading={isFetching} />
      <Header
        title="Verify With Session Approval"
        description="Approve this login from trusted device where you're alreayd signed in."
      />
      <div className="flex flex-col items-center gap-2">
        <ApprovalDeviceAnimation
          className="h-39 md:h-42 mt-0 md:-mt-3 w-auto mb-2 rotate-2    select-none
    pointer-events-auto
    touch-manipulation
    [-webkit-user-drag:none]
    [-webkit-user-select:none]
    [-webkit-touch-callout:none]
    [-webkit-tap-highlight-color:transparent]"
        />
        <div className="mb-2 flex flex-col items-center gap-2 px-4 text-center">
          <IconWithText
            icon={currentState.icon}
            className="text-lg md:text-xl"
            title={currentState.title}
          />

          <div className="flex max-w-sm flex-col items-center gap-1 md:max-w-md lg:max-w-lg">
            <p
              className={`${googleSansFlex.className} text-xs leading-5 font-light text-gray-400 sm:text-sm md:text-[15px]`}
            >
              {currentState.description1}
            </p>

            <p
              className={`${googleSansFlex.className} whitespace-pre-line warp-break-words text-xs leading-5 font-light text-gray-400 sm:text-sm md:text-[15px]`}
            >
              {currentState.description2}
            </p>
          </div>
        </div>
        {approvalInfo?.status === "EXPIRED" ||
          approvalInfo?.status === "REJECTED" ? (
          <button
            onClick={startSessionApproval}
            className="
        text-[#5a3dcb]
        font-medium
        transition-all
        hover:opacity-80
      "
          >
            ↻ Resend request
          </button>
        ) : (
          <DotsLoader
            loaderStyle={{
              color: "#5a3dcb",
              fontSize: "1px",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SessionApprovalContent;
