import {
  useState,
  useRef,
  type ClipboardEvent,
  type KeyboardEvent,
  type ChangeEvent,
} from "react";
import clsx from "clsx";
import "./index.scss";

export type OtpInputProps = {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
};

export const OtpInput = ({
  length = 6,
  value,
  onChange,
  disabled = false,
  className,
}: OtpInputProps) => {
  const [internalOtp, setInternalOtp] = useState<string[]>(
    Array(length).fill(""),
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Map prop `value` if provided
  const otpArray =
    value !== undefined
      ? value.padEnd(length, "").split("").slice(0, length)
      : internalOtp;

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (isNaN(Number(val))) return; // Only allow numbers

    const newOtp = [...otpArray];
    // Allow taking the last character if they somehow type multiple (though maxLength is 1)
    newOtp[index] = val.substring(val.length - 1);

    if (value === undefined) setInternalOtp(newOtp);
    onChange?.(newOtp.join(""));

    // Move to next input if there's a value
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otpArray[index] && index > 0) {
        // Current input is empty and pressing backspace, move to previous
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text/plain")
      .trim()
      .slice(0, length);
    if (!/^\d+$/.test(pastedData)) return; // Only allow numbers

    const newOtp = [...otpArray];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }

    if (value === undefined) setInternalOtp(newOtp);
    onChange?.(newOtp.join(""));

    // Focus the next empty input or the last one
    const focusIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className={clsx("otp-input", className)}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={otpArray[index]}
          disabled={disabled}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="otp-input__field"
          aria-label={`Digit ${index + 1}`}
        />
      ))}
      <input type="hidden" name="otp" value={otpArray.join("")} />
    </div>
  );
};
