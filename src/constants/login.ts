import { LoginMethod } from "@/types/auth/login/login.type";
import {
  ShieldCheckIcon,
  FingerprintIcon,
  MailCheckIcon,
  KeyRoundIcon,
} from "lucide-react";

import { LockKeyIcon } from "@phosphor-icons/react";
import { IconComponent } from "@/types/icon.type";

export const loginMethodDetails: Record<
  LoginMethod,
  {
    title: string;
    description: string;
    icon: IconComponent;
  }
> = {
  trusted_session: {
    title: "Trusted Device",
    description: "Continue with this trusted device",
    icon: ShieldCheckIcon, // reference jaisa shield + check
  },

  passkey: {
    title: "Passkey",
    description: "Use your passkey to sign in",
    icon: FingerprintIcon, // fingerprint icon
  },

  password: {
    title: "Password",
    description: "Enter your account password",
    icon: LockKeyIcon, // lock icon
  },

  security_code: {
    title: "Security Code",
    description: "Enter your 10-character code",
    icon: KeyRoundIcon, // code/key feeling
  },

  session_approval: {
    title: "Session Approval",
    description: "Approve sign-in from another device",
    icon: MailCheckIcon, // approval/verification feel
  },
};
