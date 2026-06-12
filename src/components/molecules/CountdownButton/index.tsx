import { useState, useEffect } from "react";
import { Button, type ButtonProps } from "@/components/atoms/Button";
import { VERIFY_OTP_MESSAGES } from "@/consts/messages";

export type CountdownButtonProps = Omit<ButtonProps, "onClick"> & {
  initialSeconds?: number;
  onResend: () => void;
};

export const CountdownButton = ({
  initialSeconds = 60,
  onResend,
  disabled,
  ...rest
}: CountdownButtonProps) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleClick = () => {
    if (!isActive) {
      onResend();
      setSeconds(initialSeconds);
      setIsActive(true);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      disabled={isActive || disabled}
      {...rest}
    >
      {isActive ? VERIFY_OTP_MESSAGES.BUTTONS.RESEND_IN(seconds) : VERIFY_OTP_MESSAGES.BUTTONS.RESEND}
    </Button>
  );
};
