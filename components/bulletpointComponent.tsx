import React from "react";

interface BulletPointProps extends React.SVGProps<SVGSVGElement> {
  style?: React.CSSProperties; // Allow style prop
}

const BulletPoint: React.FC<BulletPointProps> = (_props) => {
  // Updated to prefix props with _
  return (
    <svg
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BulletPoint;
