"use client";

import { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";

//---------------------------------------------------------

const CopyPromoCodeButton = ({ promoCode }: { promoCode: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promoCode);
      setCopied(true);
      toast.success("Promo code copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy promo code");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="copy-promo-code-button"
      aria-label={`Copy promo code ${promoCode}`}
    >
      {copied ? (
        <>
          <FaCheck size={14} />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <FaCopy size={14} />
          <span>Copy</span>
        </>
      )}
    </button>
  );
};

export default CopyPromoCodeButton;

