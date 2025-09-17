import { Link } from "@remix-run/react";

export const meta = () => ([
  { title: "Welcome" },
  { name: "description", content: "Welcome to the app." },
]);

export default function Welcome() {
  return (
    <main style={styles.main}>
      <section style={styles.card}>
        <div style={styles.badge}>Welcome</div>
        <h1 style={styles.title}>You’re all set 🎉</h1>
        <p style={styles.subtitle}>
          Thanks for signing up. Your app is ready. Jump in or explore at your
          own pace.
        </p>

        <div style={styles.actions}>
          <Link to="/app" style={{ ...styles.button, ...styles.primary }}>
            Open App
          </Link>
          <Link to="/auth/login" style={{ ...styles.button, ...styles.ghost }}>
            Link Store
          </Link>
        </div>

        <p style={styles.note}>
          Need a hand? Visit <Link to="/privacy" style={styles.link}>Privacy</Link> or
          contact <a href="mailto:aykutemyeyalcinn@gmail.com" style={styles.link}>aykutemyeyalcinn@gmail.com</a>.
        </p>
      </section>
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
    padding: "32px",
  },
  card: {
    width: "100%",
    maxWidth: 720,
    background: "#0f1116",
    border: "1px solid #1c1f2a",
    borderRadius: 12,
    padding: 28,
    boxShadow: "0 6px 30px rgba(0,0,0,0.35)",
    color: "#e6e7eb",
    textAlign: "center",
  },
  badge: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: 999,
    background: "#1a2234",
    color: "#9ab6ff",
    fontSize: 12,
    letterSpacing: 0.3,
    marginBottom: 12,
  },
  title: {
    fontSize: 34,
    lineHeight: 1.2,
    margin: 0,
  },
  subtitle: {
    color: "#b9bdc7",
    marginTop: 12,
    fontSize: 16,
  },
  actions: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    marginTop: 24,
    flexWrap: "wrap",
  },
  button: {
    display: "inline-block",
    padding: "10px 16px",
    borderRadius: 10,
    border: "1px solid #253049",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 14,
  },
  primary: {
    background: "#335cff",
    color: "#fff",
    borderColor: "#335cff",
  },
  ghost: {
    background: "transparent",
    color: "#d7d9df",
  },
  note: {
    marginTop: 20,
    color: "#9aa0aa",
    fontSize: 13,
  },
  link: {
    color: "#9ab6ff",
    textDecoration: "none",
  },
};
