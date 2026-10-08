// OrientationGate.jsx
import { useDeviceOrientation } from "../hooks/useDeviceOrientation";

export default function OrientationGate({ children }) {
  const { isLandscape, permissionGranted, isIOS, requestPermission } =
    useDeviceOrientation();

  // لو iOS ولسا ما طلبنا إذن
  if (isIOS && !permissionGranted) {
    return (
      <div style={styles.container}>
        <div style={{ fontSize: "48px" }}>📖</div>
        <h2 style={styles.title}> Right G1 Interactive Book</h2>
        <p style={styles.text}>click to start</p>
        <button onClick={requestPermission} style={styles.button}>
          start ▶
        </button>
      </div>
    );
  }

  // لو الجهاز عمودي
  if (!isLandscape) {
    return (
      <div style={styles.container}>
        <div
          style={{
            fontSize: "64px",
            animation: "spin 2s ease-in-out infinite alternate",
          }}
        >
          📱
        </div>
        <h2 style={styles.title}>Turn Your Device</h2>
        <p style={styles.text}>Please turn your device sideways to continue.</p>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(-90deg); }
          }
        `}</style>
      </div>
    );
  }

  // أفقي ✅
  return children;
}

const styles = {
  container: {
    height: "100dvh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#1a1a2e",
    color: "white",
    gap: "16px",
    textAlign: "center",
    padding: "2rem",
  },
  title: { margin: 0, fontSize: "22px", fontWeight: 500 },
  text: { margin: 0, opacity: 0.7, fontSize: "15px" },
  button: {
    padding: "12px 36px",
    fontSize: "16px",
    borderRadius: "12px",
    border: "none",
    background: "#e94560",
    color: "white",
    cursor: "pointer",
    marginTop: "8px",
  },
};
