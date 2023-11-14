const TickIcon = () => {
  return (
    <svg
      className="tick"
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 512 512"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="32"
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192Z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M368 192L256.13 320l-47.95-48m-16.23 48L144 272m161.71-80l-51.55 59"
      />
    </svg>
  );
};

export default TickIcon;
