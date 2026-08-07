/**
 * Comparison section — Figma 549:5202.
 * Cards + icons are code; only the paperclip is a photographic asset.
 */

const STROKE = "rgba(37, 32, 29, 0.6)";

function IconX() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      className="size-[18px] shrink-0"
    >
      <path
        d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5"
        stroke={STROKE}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      className="size-[18px] shrink-0"
    >
      <path
        d="M3.75 9L7.5 12.75L15 5.25"
        stroke={STROKE}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      className="size-[18px] shrink-0"
    >
      <path
        d="M12 2.25V5.25M6 2.25V5.25M3 8.25H15M3 5.25C3 4.85218 3.15804 4.47064 3.43934 4.18934C3.72064 3.90804 4.10218 3.75 4.5 3.75H13.5C13.8978 3.75 14.2794 3.90804 14.5607 4.18934C14.842 4.47064 15 4.85218 15 5.25V14.25C15 14.6478 14.842 15.0294 14.5607 15.3107C14.2794 15.592 13.8978 15.75 13.5 15.75H4.5C4.10218 15.75 3.72064 15.592 3.43934 15.3107C3.15804 15.0294 3 14.6478 3 14.25V5.25ZM6 11.25H7.5V12.75H6V11.25Z"
        stroke={STROKE}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconDoor() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      className="size-[18px] shrink-0"
    >
      <path
        d="M10.5 9V9.0075"
        stroke={STROKE}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.25 15.75H15.75"
        stroke={STROKE}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 15.75V3.75C4.5 3.35218 4.65804 2.97064 4.93934 2.68934C5.22064 2.40804 5.60218 2.25 6 2.25H12C12.3978 2.25 12.7794 2.40804 13.0607 2.68934C13.342 2.97064 13.5 3.35218 13.5 3.75V15.75"
        stroke={STROKE}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconHammer() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      className="size-[18px] shrink-0"
    >
      <path
        d="M8.5605 7.5L3.02325 13.0635C2.87651 13.2093 2.76005 13.3826 2.68059 13.5736C2.60112 13.7645 2.5602 13.9693 2.5602 14.1761C2.5602 14.383 2.60112 14.5877 2.68059 14.7787C2.76005 14.9696 2.87651 15.143 3.02325 15.2888C3.31978 15.5837 3.72101 15.7493 4.13925 15.7493C4.55749 15.7493 4.95872 15.5837 5.25525 15.2888L10.8105 9.75"
        stroke={STROKE}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5303 9.53025L13.5908 11.4698C13.4501 11.6104 13.2594 11.6893 13.0605 11.6893C12.8616 11.6893 12.6709 11.6104 12.5303 11.4698L6.84075 5.78025C6.70015 5.6396 6.62116 5.44887 6.62116 5.25C6.62116 5.05113 6.70015 4.8604 6.84075 4.71975L8.78025 2.78025C8.9209 2.63965 9.11163 2.56066 9.3105 2.56066C9.50937 2.56066 9.7001 2.63965 9.84075 2.78025L15.5303 8.46975C15.6709 8.6104 15.7498 8.80113 15.7498 9C15.7498 9.19887 15.6709 9.3896 15.5303 9.53025Z"
        stroke={STROKE}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconHouse() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      className="size-[18px] shrink-0"
    >
      <path
        d="M3.75 9H2.25L9 2.25L15.75 9H14.25"
        stroke={STROKE}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 9V14.25C3.75 14.6478 3.90804 15.0294 4.18934 15.3107C4.47064 15.592 4.85218 15.75 5.25 15.75H12.75C13.1478 15.75 13.5294 15.592 13.8107 15.3107C14.092 15.0294 14.25 14.6478 14.25 14.25V9"
        stroke={STROKE}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.75 15.75V11.25C6.75 10.8522 6.90804 10.4706 7.18934 10.1893C7.47064 9.90804 7.85218 9.75 8.25 9.75H9.75C10.1478 9.75 10.5294 9.90804 10.8107 10.1893C11.092 10.4706 11.25 10.8522 11.25 11.25V15.75"
        stroke={STROKE}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconList() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      className="size-[18px] shrink-0"
    >
      <path
        d="M9.75 3.75H15.75M9.75 6.75H13.5M9.75 11.25H15.75M9.75 14.25H13.5"
        stroke={STROKE}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.25 3.75C2.25 3.55109 2.32902 3.36032 2.46967 3.21967C2.61032 3.07902 2.80109 3 3 3H6C6.19891 3 6.38968 3.07902 6.53033 3.21967C6.67098 3.36032 6.75 3.55109 6.75 3.75V6.75C6.75 6.94891 6.67098 7.13968 6.53033 7.28033C6.38968 7.42098 6.19891 7.5 6 7.5H3C2.80109 7.5 2.61032 7.42098 2.46967 7.28033C2.32902 7.13968 2.25 6.94891 2.25 6.75V3.75Z"
        stroke={STROKE}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.25 11.25C2.25 11.0511 2.32902 10.8603 2.46967 10.7197C2.61032 10.579 2.80109 10.5 3 10.5H6C6.19891 10.5 6.38968 10.579 6.53033 10.7197C6.67098 10.8603 6.75 11.0511 6.75 11.25V14.25C6.75 14.4489 6.67098 14.6397 6.53033 14.7803C6.38968 14.921 6.19891 15 6 15H3C2.80109 15 2.61032 14.921 2.46967 14.7803C2.32902 14.6397 2.25 14.4489 2.25 14.25V11.25Z"
        stroke={STROKE}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPricing() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      className="size-[18px] shrink-0"
    >
      <path
        d="M10.5 2.25V5.25C10.5 5.44891 10.579 5.63968 10.7197 5.78033C10.8603 5.92098 11.0511 6 11.25 6H14.25"
        stroke={STROKE}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.75 15.75H5.25C4.85218 15.75 4.47064 15.592 4.18934 15.3107C3.90804 15.0294 3.75 14.6478 3.75 14.25V3.75C3.75 3.35218 3.90804 2.97064 4.18934 2.68934C4.47064 2.40804 4.85218 2.25 5.25 2.25H10.5L14.25 6V14.25C14.25 14.6478 14.092 15.0294 13.8107 15.3107C13.5294 15.592 13.1478 15.75 12.75 15.75Z"
        stroke={STROKE}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 8.25H8.625C8.32663 8.25 8.04048 8.36853 7.8295 8.5795C7.61853 8.79048 7.5 9.07663 7.5 9.375C7.5 9.67337 7.61853 9.95952 7.8295 10.1705C8.04048 10.3815 8.32663 10.5 8.625 10.5H9.375C9.67337 10.5 9.95952 10.6185 10.1705 10.8295C10.3815 11.0405 10.5 11.3266 10.5 11.625C10.5 11.9234 10.3815 12.2095 10.1705 12.4205C9.95952 12.6315 9.67337 12.75 9.375 12.75H7.5"
        stroke={STROKE}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12.75V13.5M9 7.5V8.25"
        stroke={STROKE}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconHeartHouse() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      className="size-[18px] shrink-0"
    >
      <path
        d="M14.625 9.429L9 15L3.375 9.429C3.00398 9.06796 2.71173 8.63401 2.51666 8.15448C2.32159 7.67494 2.22792 7.16021 2.24155 6.6427C2.25519 6.12519 2.37582 5.6161 2.59587 5.1475C2.81591 4.6789 3.1306 4.26094 3.52012 3.91994C3.90963 3.57893 4.36553 3.32227 4.85911 3.16611C5.35269 3.00995 5.87325 2.95769 6.38803 3.0126C6.9028 3.06751 7.40062 3.22842 7.85016 3.48518C8.29969 3.74194 8.69119 4.089 9 4.5045C9.31015 4.09202 9.7021 3.74799 10.1513 3.49395C10.6005 3.23992 11.0974 3.08134 11.6107 3.02814C12.124 2.97494 12.6428 3.02827 13.1346 3.18479C13.6263 3.34131 14.0805 3.59766 14.4687 3.93777C14.8568 4.27789 15.1706 4.69446 15.3903 5.16142C15.6101 5.62838 15.7311 6.13566 15.7457 6.65153C15.7604 7.1674 15.6684 7.68074 15.4756 8.15944C15.2828 8.63813 14.9932 9.07187 14.625 9.4335"
        stroke={STROKE}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 4.5L6.53025 6.96975C6.38965 7.1104 6.31066 7.30113 6.31066 7.5C6.31066 7.69887 6.38965 7.8896 6.53025 8.03025L6.9375 8.4375C7.455 8.955 8.295 8.955 8.8125 8.4375L9.5625 7.6875C10.0101 7.23995 10.6171 6.98852 11.25 6.98852C11.8829 6.98852 12.4899 7.23995 12.9375 7.6875L14.625 9.375"
        stroke={STROKE}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.375 11.625L10.875 13.125M11.25 9.75L12.75 11.25"
        stroke={STROKE}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconDollar() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      className="size-[18px] shrink-0"
    >
      <path
        d="M12.525 6C12.3757 5.57643 12.1031 5.20722 11.7422 4.9399C11.3813 4.67258 10.9487 4.51937 10.5 4.5H7.5C6.90326 4.5 6.33097 4.73705 5.90901 5.15901C5.48705 5.58097 5.25 6.15326 5.25 6.75C5.25 7.34674 5.48705 7.91903 5.90901 8.34099C6.33097 8.76295 6.90326 9 7.5 9H10.5C11.0967 9 11.669 9.23705 12.091 9.65901C12.5129 10.081 12.75 10.6533 12.75 11.25C12.75 11.8467 12.5129 12.419 12.091 12.841C11.669 13.2629 11.0967 13.5 10.5 13.5H7.5C7.05131 13.4806 6.61868 13.3274 6.2578 13.0601C5.89691 12.7928 5.62429 12.4236 5.475 12"
        stroke={STROKE}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 2.25V4.5M9 13.5V15.75"
        stroke={STROKE}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCash() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      className="size-[18px] shrink-0"
    >
      <path
        d="M6.75 9C6.75 9.59674 6.98705 10.169 7.40901 10.591C7.83097 11.0129 8.40326 11.25 9 11.25C9.59674 11.25 10.169 11.0129 10.591 10.591C11.0129 10.169 11.25 9.59674 11.25 9C11.25 8.40326 11.0129 7.83097 10.591 7.40901C10.169 6.98705 9.59674 6.75 9 6.75C8.40326 6.75 7.83097 6.98705 7.40901 7.40901C6.98705 7.83097 6.75 8.40326 6.75 9Z"
        stroke={STROKE}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 13.5H3.75C3.35218 13.5 2.97064 13.342 2.68934 13.0607C2.40804 12.7794 2.25 12.3978 2.25 12V6C2.25 5.60218 2.40804 5.22064 2.68934 4.93934C2.97064 4.65804 3.35218 4.5 3.75 4.5H14.25C14.6478 4.5 15.0294 4.65804 15.3107 4.93934C15.592 5.22064 15.75 5.60218 15.75 6V9.375"
        stroke={STROKE}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 9H13.5075M4.5 9H4.5075M12 14.25H16.5M14.25 12L12 14.25L14.25 16.5"
        stroke={STROKE}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OpendoorWordmark() {
  return (
    <svg
      width={98}
      height={22}
      viewBox="0 0 98 22"
      fill="none"
      aria-label="Opendoor"
      className="h-[22px] w-[98px] shrink-0"
    >
      <path
        d="M59.0978 15.1435C58.7487 15.3028 58.238 15.5357 57.5325 15.5357C55.9174 15.5357 55.0676 14.404 55.0676 10.9205C55.0676 7.25929 56.1303 6.08343 57.66 6.08343C58.4467 6.08343 58.9566 6.54932 59.3176 7.01525V15.0475C59.2529 15.0728 59.1798 15.1061 59.0978 15.1435ZM62.6963 3.0215C62.6963 1.8746 62.7338 0.820812 62.7537 0.388315C62.7594 0.261773 62.6565 0.160129 62.5359 0.171385L59.4753 0.534301C59.3861 0.542658 59.3176 0.620592 59.3176 0.714222V3.82032C59.3176 4.61898 59.3601 5.43997 59.3601 5.43997C58.9141 5.30675 58.3188 5.19593 57.7454 5.19593C54.4302 5.19593 51.5825 7.0376 51.5825 11.6528C51.5825 15.691 53.6435 17.2886 55.7475 17.2886C57.2351 17.2886 58.4252 16.6673 59.339 15.8465H59.424L59.3807 17.0711C59.3758 17.2016 59.4849 17.3048 59.6085 17.2865L62.524 16.9466C62.6228 16.9323 62.6963 16.844 62.6963 16.7398V3.0215ZM7.1401 2.31126C9.4774 2.31126 10.3276 4.46349 10.3276 9.65549C10.3276 14.8697 9.3288 16.3565 7.22505 16.3565C4.84495 16.3565 4.03745 14.2262 4.03745 9.05658C4.03745 3.82005 5.0787 2.31126 7.1401 2.31126ZM7.2677 1.37941C3.84616 1.37941 0 3.68685 0 9.52246C0 14.8477 3.44258 17.2883 7.09731 17.2883C10.5188 17.2883 14.365 15.0472 14.365 9.1674C14.365 3.66485 10.9226 1.37941 7.2677 1.37941ZM19.3302 15.6022C19.7129 16.0681 20.2865 16.401 21.0091 16.401C22.6878 16.401 23.5804 15.4692 23.5804 11.4086C23.5804 8.23562 22.6666 7.12627 21.0515 7.12627C20.3046 7.12627 19.8037 7.33197 19.4625 7.4721C19.4155 7.49139 19.3713 7.50958 19.3302 7.52565V15.6022ZM19.3302 6.72701C20.223 5.92818 21.4127 5.19605 22.9003 5.19605C24.9191 5.19605 27.0653 6.59383 27.0653 10.6543C27.0653 15.2695 24.4729 17.2885 20.9241 17.2885C20.4779 17.2885 19.7766 17.1999 19.3091 17.0669C19.3091 17.0669 19.3302 17.6438 19.3302 18.4203V20.4448V21.4319C19.3302 21.5238 19.2642 21.6011 19.1768 21.6113L16.1437 21.9691C16.0411 21.9812 15.9515 21.8973 15.9515 21.7897V20.4448V5.72338C15.9515 5.63145 16.0174 5.55418 16.105 5.5438L19.0538 5.19573C19.1688 5.18206 19.2688 5.27843 19.265 5.39935L19.224 6.72701H19.3302ZM31.6721 9.89969L35.3057 9.69996C35.3057 7.01529 34.966 6.03892 33.6909 6.03892C32.607 6.03892 31.757 7.10396 31.6721 9.89969ZM28.3146 11.2088C28.3146 7.348 31.0556 5.19577 33.8607 5.19577C36.7591 5.19577 38.5779 6.69091 38.6817 10.6027C38.6836 10.6787 38.6243 10.7428 38.5511 10.7428H31.8055C31.7323 10.7428 31.6732 10.807 31.675 10.8832C31.7701 14.4076 33.0816 15.3802 35.242 15.3802C36.2965 15.3802 37.1467 15.1244 37.8581 14.7949C37.9106 14.7705 37.9713 14.7849 38.0087 14.8306L38.2912 15.1776C38.3341 15.23 38.3333 15.3074 38.2885 15.3572C37.5132 16.2108 35.9351 17.2884 33.8607 17.2884C30.1632 17.2884 28.3146 14.9808 28.3146 11.2088ZM43.3374 6.77129C44.4633 5.92829 45.8659 5.19601 47.4171 5.19601C49.2236 5.19601 50.2013 6.17234 50.2013 8.16939V16.8465C50.2013 16.9437 50.1255 17.0223 50.0324 17.0223H46.9696C46.8765 17.0223 46.8011 16.9437 46.8011 16.8465V9.03458C46.8011 7.68114 46.3333 7.25957 45.335 7.25957C44.5908 7.25957 43.8259 7.4369 43.3585 7.54793V16.8465C43.3585 16.9437 43.2827 17.0223 43.1901 17.0223H40.1478C40.0552 17.0223 39.9798 16.9437 39.9798 16.8465V5.72314C39.9798 5.63121 40.0456 5.55414 40.1333 5.54388L43.107 5.19188C43.2088 5.17998 43.2972 5.26507 43.2938 5.37232L43.2521 6.77129H43.3374ZM69.7993 6.06112C71.2445 6.06112 72.0733 6.90427 72.0733 11.3863C72.0733 15.6464 71.2024 16.4229 69.9268 16.4229C68.3757 16.4229 67.6744 15.4469 67.6744 10.8982C67.6744 7.0818 68.4607 6.06112 69.7993 6.06112ZM69.8633 5.19577C66.9945 5.19577 64.1046 7.01513 64.1046 11.2754C64.1046 15.3357 66.782 17.2886 69.8633 17.2886C72.796 17.2886 75.6434 15.4246 75.6434 11.1644C75.6434 7.12615 72.9445 5.19577 69.8633 5.19577ZM84.7478 11.3863C84.7478 6.90427 83.9194 6.06112 82.4743 6.06112C81.1352 6.06112 80.3493 7.0818 80.3493 10.8982C80.3493 15.4469 81.0506 16.4229 82.6018 16.4229C83.8769 16.4229 84.7478 15.6464 84.7478 11.3863ZM76.7788 11.2754C76.7788 7.01513 79.669 5.19577 82.5378 5.19577C85.6191 5.19577 88.3179 7.12615 88.3179 11.1644C88.3179 15.4246 85.4705 17.2886 82.5378 17.2886C79.4566 17.2886 76.7788 15.3357 76.7788 11.2754ZM93.113 6.90427C93.7715 6.17214 94.9827 5.19577 96.2153 5.19577C97.2351 5.19577 97.9552 5.77253 97.9552 6.85991C97.9552 7.92495 97.2141 8.61088 96.3853 8.61088C95.4723 8.61088 95.1526 8.21335 94.7492 7.52553C94.6217 7.28149 94.4938 7.23698 94.3024 7.23698C93.9204 7.23698 93.4315 7.52553 93.1341 7.81413V16.8133C93.1341 16.9286 93.0441 17.022 92.9339 17.022H89.9552C89.8446 17.022 89.7554 16.9286 89.7554 16.8133V5.72326C89.7554 5.63118 89.8212 5.55406 89.9089 5.54384L92.847 5.1995C92.9675 5.18536 93.0728 5.28633 93.069 5.41322L93.0276 6.90427H93.113Z"
        fill="#0041E7"
      />
    </svg>
  );
}

const TRADITIONAL_ITEMS = [
  { ok: false, text: "Can take months to close" },
  { ok: false, text: "No flexible move-out date" },
  { ok: false, text: "Repairs and updates needed" },
  { ok: false, text: "Stage house and run open houses" },
  { ok: true, text: "Your home gets listed on the open market" },
  { ok: false, text: "Negotiate offers with potential buyers" },
] as const;

const OPENDOOR_ITEMS = [
  { icon: IconCalendar, text: "Close in as few as 14 days" },
  { icon: IconDoor, text: "Flexible move-out date" },
  { icon: IconHammer, text: "No repairs or updates needed" },
  { icon: IconHouse, text: "No open houses or disruptions" },
  { icon: IconList, text: "Your home gets listed on the open market" },
  { icon: IconPricing, text: "Transparent, upfront pricing" },
  { icon: IconHeartHouse, text: "Opendoor handles all renovations and prep" },
  { icon: IconDollar, text: "Opendoor maximizes your sale price" },
  { icon: IconCash, text: "Keep additional proceeds after resale" },
] as const;

const TRAD_SHADOW =
  "shadow-[0px_0px_0px_1px_rgba(37,32,29,0.06),5px_4px_9.7px_0px_rgba(44,23,10,0.13)]";
const OD_SHADOW =
  "shadow-[5px_4px_9.7px_0px_rgba(44,23,10,0.09),0px_0px_0px_1px_rgba(100,57,31,0.12)]";

/**
 * Figma frame 549:5202 is 1440×634.
 * We keep that artboard 1:1 and scale with length/length (unitless) so
 * `transform: scale()` works — `scale(calc(100cqi / 758))` was invalid.
 */
const FRAME_W = 1440;
const FRAME_H = 634;

export function PromiseSection() {
  return (
    <section className="relative w-full overflow-x-clip bg-[#fbf9f9]">
      <div
        className="relative mx-auto w-full max-w-[1440px]"
        style={{ containerType: "inline-size" }}
      >
        {/* Height tracks the scaled artboard */}
        <div
          className="relative w-full"
          style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
        >
          <div
            className="absolute left-0 top-0 origin-top-left"
            style={{
              width: FRAME_W,
              height: FRAME_H,
              transform: `scale(calc(100cqi / ${FRAME_W}px))`,
            }}
          >
            {/* Copy — Figma x:120 y:95 w:335 */}
            <div className="absolute left-[120px] top-[95px] flex w-[335px] flex-col gap-5">
              <h2 className="text-[48px] font-medium leading-[50px] tracking-[-2.4px] text-[#25201d]">
                Our promise is certainty and convenience
              </h2>
              <p className="text-[20px] font-normal leading-[26px] tracking-[-1px] text-[rgba(37,32,29,0.6)]">
                Get a cash offer and explore the many ways we can help you sell
                your home with confidence. Whether you&apos;re looking for a
                quick.
              </p>
            </div>

            {/* Traditional Listing — Figma x:562 y:90 w:472 h:457 */}
            <div
              className={`absolute left-[562px] top-[90px] z-0 h-[457px] w-[472px] rounded-[20px] bg-[#f6f4f4] ${TRAD_SHADOW}`}
            >
              <p className="absolute left-7 top-7 w-[322px] text-[20px] font-medium tracking-[-1px] text-[#25201d]">
                Traditional Listing
              </p>
              <p className="absolute left-7 top-[62px] w-[323px] text-[16px] font-normal leading-[21px] tracking-[-0.8px] text-[rgba(37,32,29,0.6)]">
                Hire an agent, prep and stage your home, manage showings, handle
                inspections, and negotiate offers.
              </p>
              <div
                aria-hidden
                className="absolute left-7 top-[145px] h-px w-[323px] bg-[#e1dedc]"
              />
              <ul className="absolute left-7 top-[169px] flex w-[323px] flex-col gap-5">
                {TRADITIONAL_ITEMS.map((item) => (
                  <li key={item.text} className="flex items-center gap-3">
                    {item.ok ? <IconCheck /> : <IconX />}
                    <span className="min-w-0 flex-1 text-[16px] font-normal tracking-[-0.8px] text-[rgba(37,32,29,0.6)]">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* With Opendoor — Figma x:941 y:67 w:379 h:504 */}
            <div
              className={`absolute left-[941px] top-[67px] z-10 h-[504px] w-[379px] rounded-[20px] bg-white/90 backdrop-blur-[22px] ${OD_SHADOW}`}
            >
              <div className="absolute left-7 top-7 flex h-[26px] items-center gap-1">
                <p className="text-[20px] font-medium tracking-[-1px] text-[#25201d]">
                  With
                </p>
                <OpendoorWordmark />
              </div>
              <p className="absolute left-7 top-[62px] w-[323px] text-[16px] font-normal leading-[21px] tracking-[-0.8px] text-[rgba(37,32,29,0.6)]">
                Get most of the cash upfront, and get more after Opendoor
                renovates and sells your home.
              </p>
              <div
                aria-hidden
                className="absolute left-7 top-[124px] h-px w-[323px] bg-[#e1dedc]"
              />
              <ul className="absolute left-7 top-[148px] flex w-[323px] flex-col gap-5">
                {OPENDOOR_ITEMS.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3">
                    <Icon />
                    <span className="min-w-0 flex-1 text-[16px] font-normal tracking-[-0.8px] text-[rgba(37,32,29,0.6)]">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_0px_2px_white]"
              />
            </div>

            {/* Paperclip — Figma x:843.5 y:0 w:190 h:190 */}
            <div className="pointer-events-none absolute left-[843.5px] top-0 z-20 size-[190px] overflow-visible">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/promise/paperclip.png"
                alt=""
                width={190}
                height={190}
                className="block size-full max-w-none object-contain drop-shadow-[1px_2px_3px_rgba(44,23,10,0.2)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
