"use client";

export default function NoteDetailsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ padding: 24 }}>
      <h2>Something went wrong.</h2>
      <p style={{ opacity: 0.8 }}>{error.message}</p>
      <button
        type="button"
        onClick={() => reset()}
        style={{
          marginTop: 12,
          padding: "10px 14px",
          borderRadius: 8,
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}