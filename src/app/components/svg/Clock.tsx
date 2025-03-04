import { SVGProps } from "@/types/components";

export default function Clock({ className }: SVGProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0a9 9 0 0 1 18 0"
      />
    </svg>
  );
}
