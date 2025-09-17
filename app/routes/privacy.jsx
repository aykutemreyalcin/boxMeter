export const meta = () => ([
  { title: "Privacy Policy" },
  { name: "description", content: "Privacy policy for this app." },
]);

export default function Privacy() {
  return (
    <main style={styles.main}>
      <section style={styles.card}>
        <h1 style={styles.title}>Privacy Policy</h1>
        <p style={styles.muted}>Last updated: {new Date().getFullYear()}</p>

        <div style={styles.content}>
          <p>
            We value your privacy. This page explains what information we collect,
            how we use it, and your choices.
          </p>

          <h2 style={styles.h2}>Information We Collect</h2>
          <p>
            - Store details needed to run the app (e.g., shop domain).<br />
            - App usage data to improve performance and reliability.
          </p>

          <h2 style={styles.h2}>How We Use Information</h2>
          <p>
            We use collected information to provide and improve app features,
            ensure security, and deliver support.
          </p>

          <h2 style={styles.h2}>Data Sharing</h2>
          <p>
            We do not sell your data. We may share minimal data with service
            providers strictly to operate this app.
          </p>

          <h2 style={styles.h2}>Data Retention</h2>
          <p>
            We retain data only as long as necessary for the purposes outlined
            here or as required by law.
          </p>

          <h2 style={styles.h2}>Your Rights</h2>
          <p>
            You can request access, correction, or deletion of your data. For
            Shopify-specific data requests, Shopify also provides data tools for
            merchants.
          </p>

          <h2 style={styles.h2}>Contact</h2>
          <p>
            Questions? Contact us at <a href="mailto:aykutemyeyalcinn@gmail.com">aykutemyeyalcinn@gmail.com</a>.
          </p>
        </div>
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
    maxWidth: 800,
    background: "#0f1116",
    border: "1px solid #1c1f2a",
    borderRadius: 12,
    padding: 28,
    boxShadow: "0 6px 30px rgba(0,0,0,0.35)",
    color: "#e6e7eb",
  },
  title: {
    fontSize: 32,
    lineHeight: 1.2,
    margin: 0,
  },
  h2: {
    fontSize: 18,
    marginTop: 24,
    marginBottom: 8,
  },
  muted: {
    color: "#9aa0aa",
    marginTop: 8,
    marginBottom: 20,
    fontSize: 13,
  },
  content: {
    fontSize: 15,
    lineHeight: 1.7,
    color: "#c7c9d1",
  },
};
