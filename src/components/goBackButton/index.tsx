import Link from "next/link";

const GoBackButton = () => {
  return (<>
    {/* ✅ Back Button */}
    <div
      style={{
        position: "fixed",
        bottom: "0rem",
        right: "0rem",
        left: "0rem",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Link href="/">
        <button
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          ← Back to Home
        </button>
      </Link>
    </div>
  </>)
}

export default GoBackButton;