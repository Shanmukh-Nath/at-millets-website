import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";

/* =========================================================
   DUMMY DATA (REPLACE LATER WITH REAL METRICS)
========================================================= */

const GRAPH_DATA = [
  {
    key: "farmers",
    values: [120, 240, 380, 620, 820, 1000],
    years: ["2019", "2020", "2021", "2022", "2023", "2024"],
  },
  {
    key: "regions",
    values: [1, 2, 3, 4, 6, 8],
    years: ["2019", "2020", "2021", "2022", "2023", "2024"],
  },
  {
    key: "production",
    values: [20, 40, 65, 110, 150, 180],
    years: ["2019", "2020", "2021", "2022", "2023", "2024"],
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const ImpactGraphsSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section style={styles.wrapper}>
      <div style={styles.backgroundGlow} />
      <div style={styles.backgroundPattern} />

      <motion.div
        ref={ref}
        style={styles.container}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* HEADER */}
        <div style={styles.header}>
          <span style={styles.eyebrow}>
            <span style={styles.dot}>●</span>
            {t("impact.eyebrow")}
          </span>

          <h2 style={styles.title}>
            {t("impact.title")}
            <br />
            <span style={styles.titleAccent}>{t("impact.titleAccent")}</span>
          </h2>

          <p style={styles.subtitle}>{t("impact.subtitle")}</p>
        </div>

        {/* GRAPHS */}
        <div style={styles.graphGrid}>
          <div style={styles.gridLines}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={styles.gridLine} />
            ))}
          </div>

          {GRAPH_DATA.map((graph, i) => (
            <GraphCard
              key={graph.key}
              data={graph.values}
              years={graph.years}
              label={t(`impact.cards.${graph.key}.label`)}
              unit={t(`impact.cards.${graph.key}.unit`)}
              delay={i * 0.15}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ImpactGraphsSection;

/* =========================================================
   GRAPH CARD
========================================================= */

const GraphCard = ({ data, years, label, unit, delay }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const max = Math.max(...data);

  return (
    <motion.div
      style={styles.card}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div style={styles.cardHeader}>
        <span style={styles.cardLabel}>{label}</span>
      </div>

      <div style={styles.chart}>
        {data.map((value, i) => {
          const height = (value / max) * 100;

          return (
            <motion.div
              key={i}
              style={styles.barWrap}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <motion.div
                style={{
                  ...styles.bar,
                  height: `${height}%`,
                }}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                whileHover={{ scaleX: 1.05 }}
              />

              {/* DOT */}
              <motion.div
                style={{
                  ...styles.barDot,
                  opacity: activeIndex === i ? 1 : 0,
                }}
                animate={{
                  opacity: activeIndex === i ? 1 : 0,
                  scale: activeIndex === i ? 1 : 0.6,
                }}
              />

              {/* TOOLTIP */}
              {activeIndex === i && (
                <motion.div
                  style={styles.tooltip}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <strong>{value}</strong> {unit}
                  <div style={styles.tooltipSub}>{years[i]}</div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

/* =========================================================
   STYLES (PREMIUM + RESPONSIVE)
========================================================= */

const styles = {
  wrapper: {
    position: "relative",
    padding: "160px 0",
    background: "#ffffff",
    overflow: "hidden",
  },

  backgroundGlow: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at 15% 25%, rgba(120,194,154,0.18), transparent 55%), radial-gradient(circle at 85% 75%, rgba(60,139,101,0.14), transparent 55%)",
    pointerEvents: "none",
  },

  backgroundPattern: {
    position: "absolute",
    inset: 0,
    background:
      "repeating-linear-gradient(135deg, rgba(120,194,154,0.05) 0 2px, transparent 2px 14px)",
    opacity: 0.35,
    pointerEvents: "none",
  },

  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px",
    position: "relative",
    zIndex: 2,
  },

  header: {
    maxWidth: 640,
    marginBottom: 88,
  },

  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: "0.7rem",
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: "#3c8b65",
    fontWeight: 600,
    marginBottom: 24,
    padding: "8px 20px",
    background: "rgba(60,139,101,0.08)",
    borderRadius: 50,
    border: "1px solid rgba(60,139,101,0.15)",
  },

  dot: { fontSize: "0.5rem", color: "#78c29a" },

  title: {
    fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
    fontWeight: 900,
    lineHeight: 1.1,
    color: "#0d2817",
    marginBottom: 20,
  },

  titleAccent: {
    background: "linear-gradient(135deg,#3c8b65,#78c29a)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtitle: {
    fontSize: "1.05rem",
    lineHeight: 1.7,
    color: "#3f5f4f",
  },

  graphGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 32,
  },
  gridLines: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    pointerEvents: "none",
  },

  gridLine: {
    height: 1,
    background: "rgba(60,139,101,0.08)",
  },

  card: {
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(10px)",
    borderRadius: 24,
    padding: "32px 28px",
    border: "1px solid rgba(60,139,101,0.12)",
    boxShadow: "0 12px 40px rgba(60,139,101,0.1)",
  },

  cardHeader: {
    marginBottom: 24,
  },

  cardLabel: {
    fontSize: "0.8rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#5f8f75",
    fontWeight: 700,
  },

  chart: {
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
    gap: 16,
    height: 220,
    paddingBottom: 16,
    borderBottom: "1px solid rgba(60,139,101,0.25)",
  },

  barWrap: {
    position: "relative",
    flex: 1,
    height: "100%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },

  bar: {
    width: "100%",
    minHeight: 6,
    borderRadius: 12,
    background: "linear-gradient(180deg,#9dd8bd 0%,#3c8b65 100%)",
    boxShadow: "0 6px 16px rgba(60,139,101,0.25)",
  },

  barDot: {
    position: "absolute",
    top: -6,
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#3c8b65",
  },

  tooltip: {
    position: "absolute",
    bottom: "100%",
    transform: "translateY(-8px)",
    padding: "8px 12px",
    fontSize: "0.75rem",
    background: "#0d2817",
    color: "#ffffff",
    borderRadius: 10,
    whiteSpace: "nowrap",
    boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
    zIndex: 10,
  },

  tooltipSub: {
    fontSize: "0.65rem",
    opacity: 0.8,
    marginTop: 2,
  },
};
