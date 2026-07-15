import Header from "@/components/shared/Header";
import IconWithText from "@/components/shared/IconWithText";
import AppLoader from "@/components/shared/Loader/AppLoader";
import { useEffect, useRef, useState } from "react";
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

type SecurityCodeContentProps = {
  onResponseResolve?: (
    isSuccess: boolean,
    setIsFetching: (state: boolean) => void,
  ) => void;
};

const SessionApprovalContent = ({
  onResponseResolve = () => { },
}: SecurityCodeContentProps) => {
  //local states
  const [isFetching, setIsFetching] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const loginIdentify = useLoginStore((state) => state.loginIdentifyInfo);
  const [approvalInfo, setApprovalInfo] = useState<{
    message?: string;
    status: "REQUESTING" | "PENDING" | "ACCEPTED" | "REJECTED" | "TIMEOUT";
    lastReqTime: Date;
  } | null>(null);
  const approvalStatusRef = useRef(approvalInfo);
  const timeoutRef = useRef<number | null>(null);
  const pollingRef = useRef(false);

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

    TIMEOUT: {
      title: "Approval expired",
      description1: "The approval request has expired.",
      description2: "Please send a new request.",
      icon: <TriangleAlert color="#FF2C2C" size={20} />,
    },
  };

  const stopPolling = () => {
    pollingRef.current = false;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const removeSession = async () => {
    await fetch("/api/remove-cookie", {
      method: "POST",
      body: JSON.stringify({
        cookieName: "approvalId",
      }),
    });
  };

  const handleRejected = (message?: string) => {
    stopPolling();
    removeSession();
    setApprovalInfo({
      status: "REJECTED",
      message: message ?? "Approval request was rejected.",
      lastReqTime: new Date(),
    });
  };

  const handleAccepted = () => {
    stopPolling();
    removeSession();

    setApprovalInfo({
      status: "ACCEPTED",
      lastReqTime: new Date(),
    });

    onResponseResolve(true, setIsFetching);
  };

  const startTimeout = (timeout: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setApprovalInfo((current) => {
        if (current?.status !== "PENDING") {
          return current;
        }

        stopPolling();

        return {
          ...current,
          status: "TIMEOUT",
        };
      });
    }, timeout * 1000);
  };

  const currentState =
    approvalStateConfig[approvalInfo?.status ?? "REQUESTING"];

  const startSessionApproval = async () => {
    if (
      approvalStatusRef.current?.status === "PENDING" ||
      approvalStatusRef.current?.status === "REQUESTING"
    ) {
      return;
    }

    setIsFetching(true);

    setApprovalInfo({
      status: "REQUESTING",
      message: "",
      lastReqTime: new Date(),
    });

    try {
      const { result } = await verifyLogin({
        loginIdentify,
        method: "session_approval",
        code: "",
      });


      if (result?.code === "SESSION_APPROVAL_REQUESTED") {
        setApprovalInfo({
          status: "PENDING",
          message: result.message,
          lastReqTime: new Date(),
        });

        if (result.timeout) {
          startTimeout(result.timeout);
        }

        intervalRef.current = window.setInterval(resolvePending, 1500);
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

  const resolvePending = async () => {
    if (approvalStatusRef.current?.status !== "PENDING") {
      return;
    }

    if (pollingRef.current) {
      return;
    }

    pollingRef.current = true;

    try {
      const { result } = await verifyLogin({
        loginIdentify,
        method: "session_approval",
        code: "",
      });

      if (result?.code === "LOGIN_SUCCESS") {
        handleAccepted();
        return;
      }

      if (result?.code === "WAITING_FOR_APPROVAL") {
        setApprovalInfo((current) => ({
          ...current!,
          message: result.message,
        }));

        return;
      }

      if (result?.code === "SESSION_APPROVAL_REQUESTED") {
        setApprovalInfo((current) => ({
          ...current!,
          message: result.message,
        }));

        if (result.timeout) {
          startTimeout(result.timeout);
        }

        return;
      }

      if (result?.message) {
        handleRejected(result.message);
      }
    } catch (error: any) {
      handleRejected(error?.response?.data?.message);
    } finally {
      pollingRef.current = false;
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        timeoutRef.current = null;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    approvalStatusRef.current = approvalInfo;
  }, [approvalInfo]);

  useEffect(() => {
    const init = async () => {
      await removeSession();
      startSessionApproval();
    };
    init();
  }, []);

  return (
    <div>
      <AppLoader loading={isFetching} />
      <Header
        title="Verify With Session Approval"
        description="Approve this login from trusted device where you're alreayd signed in."
      />
      <div className="flex flex-col items-center gap-2">
        <ApprovalDeviceAnimation
          className="h-46 w-auto mb-2 rotate-2    select-none
    pointer-events-auto
    touch-manipulation
    [-webkit-user-drag:none]
    [-webkit-user-select:none]
    [-webkit-touch-callout:none]
    [-webkit-tap-highlight-color:transparent]"
        />
        <span className=" flex flex-col items-center gap-1 mb-4">
          <IconWithText
            icon={currentState.icon}
            className="text-[18px] mr-2"
            title={currentState.title}
          />

          <span className="flex flex-col items-center">
            <p
              className={`text-gray-400 ${googleSansFlex.className} font-light text-[13px]`}
            >
              {currentState.description1}
            </p>

            <p
              className={`whitespace-pre-line text-gray-400 ${googleSansFlex.className} font-light text-[13px]`}
            >
              {currentState.description2}
            </p>
          </span>
        </span>
        {approvalInfo?.status === "TIMEOUT" ||
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
