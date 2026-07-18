export default function CarMark({
  className = "",
  strokeWidth = 1.5,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 600 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M35 150c-14 0-24-9-24-21s10-19 24-19h17c6-20 17-38 34-52C118 24 168 10 225 10h130c46 0 90 14 126 40l40 29c14 10 30 16 47 18l14 2c14 2 24 12 24 24 0 14-11 25-25 25H35Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M170 148c8-40 46-70 90-70h60c30 0 58 12 79 33l18 18"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M262 78 246 148M356 78l6 70"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <circle cx="168" cy="170" r="34" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="168" cy="170" r="12" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="430" cy="170" r="34" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="430" cy="170" r="12" stroke="currentColor" strokeWidth={strokeWidth} />
      <path d="M11 150h566" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  );
}
