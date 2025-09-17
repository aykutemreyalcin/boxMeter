export const meta = () => ([
  { title: "Demo" },
  { name: "description", content: "Product demo video." },
]);

export default function Demo() {
  return (
    <main style={styles.main}>
      {/* Only the video, per request */}
      <video
        style={styles.video}
        src="/demo.mp4"
        controls
        playsInline
        preload="metadata"
      />
    </main>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0b0c0f",
    padding: 24,
  },
  video: {
    width: "100%",
    maxWidth: 1100,
    borderRadius: 12,
    background: "#000",
    outline: "none",
    boxShadow: "0 6px 30px rgba(0,0,0,0.35)",
  },
};

