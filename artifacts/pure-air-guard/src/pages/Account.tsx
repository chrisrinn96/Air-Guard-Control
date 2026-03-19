import Layout from "../components/Layout";
import { useUserTier, TIER_CONFIGS, UserTier } from "../context/UserTierContext";
import { Check, Zap, Crown, Building2, UserCircle, Lock, Infinity as InfinityIcon } from "lucide-react";
import { motion } from "framer-motion";

const TIER_ICONS = {
  1: UserCircle,
  2: Zap,
  3: Crown,
  4: Building2,
};

const TIER_COLORS = {
  1: "border-slate-300 dark:border-slate-700",
  2: "border-blue-400",
  3: "border-purple-500",
  4: "border-amber-500",
};

const TIER_ACCENT = {
  1: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  2: "bg-blue-600 text-white",
  3: "bg-purple-600 text-white",
  4: "bg-amber-500 text-white",
};

const TIER_FEATURES: Record<UserTier, string[]> = {
  1: [
    "Monitor up to 1 sensor",
    "Dashboard overview",
    "Manual readings",
    "Basic alerts",
    "Prevention tips",
    "Ad-supported",
  ],
  2: [
    "Monitor up to 3 sensors",
    "No advertisements",
    "24-hour humidity chart",
    "Historical data (24h)",
    "Manual readings",
    "All Tier 1 features",
  ],
  3: [
    "Unlimited sensors",
    "30-day historical data",
    "Mould Alert push notifications",
    "Advanced charts",
    "No advertisements",
    "All Tier 2 features",
  ],
  4: [
    "Unlimited sensors",
    "365-day historical data",
    "Compliance reporting tab",
    "PDF report generation",
    "Legal proof documentation",
    "All Tier 3 features",
  ],
};

const TIER_LOCKED: Record<UserTier, string[]> = {
  1: ["History tab", "Humidity charts", "Multiple sensors", "Mould alerts", "Compliance"],
  2: ["Unlimited sensors", "30-day history", "Mould alerts", "Compliance"],
  3: ["Compliance tab", "PDF reporting", "365-day history"],
  4: [],
};

export default function Account() {
  const { tier, setTier } = useUserTier();

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Subscription & Plan</h1>
        <p className="text-muted-foreground mt-1">Choose your tier to unlock features. Use this page to test different plans.</p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 mb-8 flex items-start gap-3">
        <span className="text-2xl">🧪</span>
        <div>
          <p className="font-semibold text-amber-800 dark:text-amber-400">Developer Testing Mode</p>
          <p className="text-sm text-amber-700 dark:text-amber-500 mt-0.5">Click any plan below to instantly switch tiers and test gated features. In production this would connect to a payment provider.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {([1, 2, 3, 4] as UserTier[]).map((t, idx) => {
          const config = TIER_CONFIGS[t];
          const Icon = TIER_ICONS[t];
          const isActive = tier === t;
          const features = TIER_FEATURES[t];
          const locked = TIER_LOCKED[t];

          return (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              onClick={() => setTier(t)}
              className={`
                relative bg-card rounded-2xl border-2 p-6 cursor-pointer transition-all duration-200 hover:shadow-xl
                ${isActive ? `${TIER_COLORS[t]} shadow-lg` : "border-border hover:border-primary/30"}
              `}
            >
              {isActive && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 ${TIER_ACCENT[t]} text-xs font-bold px-3 py-1 rounded-full shadow`}>
                  ✓ Current Plan
                </div>
              )}

              <div className={`inline-flex p-2.5 rounded-xl mb-4 ${TIER_ACCENT[t]}`}>
                <Icon className="w-5 h-5" />
              </div>

              <h3 className="text-xl font-display font-bold text-foreground mb-0.5">Tier {t}</h3>
              <p className="text-sm font-semibold text-muted-foreground mb-1">{config.label}</p>
              <p className="text-xs text-muted-foreground mb-5">{config.tagline}</p>

              <div className="text-2xl font-display font-bold mb-1">
                {t === 1 ? "Free" : t === 2 ? "£4.99" : t === 3 ? "£9.99" : "£19.99"}
              </div>
              {t > 1 && <p className="text-xs text-muted-foreground mb-5">per month</p>}
              {t === 1 && <div className="mb-5" />}

              <div className="space-y-2 mb-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Includes</p>
                {features.map(f => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-foreground">{f}</span>
                  </div>
                ))}
              </div>

              {locked.length > 0 && (
                <div className="space-y-2 border-t border-border pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Locked</p>
                  {locked.map(f => (
                    <div key={f} className="flex items-start gap-2 text-sm">
                      <Lock className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground/60 line-through">{f}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className={`mt-6 w-full py-2.5 rounded-xl text-sm font-semibold text-center transition-all ${
                isActive ? `${TIER_ACCENT[t]} opacity-80` : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
              }`}>
                {isActive ? "Active Plan" : `Switch to Tier ${t}`}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4">Current Plan Summary — Tier {tier}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: "Sensors", value: TIER_CONFIGS[tier].maxSensors === Infinity ? "Unlimited" : String(TIER_CONFIGS[tier].maxSensors) },
            { label: "Ads", value: TIER_CONFIGS[tier].showAds ? "Shown" : "None" },
            { label: "History", value: TIER_CONFIGS[tier].showHistory ? `${TIER_CONFIGS[tier].historyDays === 1 ? "24h" : TIER_CONFIGS[tier].historyDays + "d"}` : "None" },
            { label: "Charts", value: TIER_CONFIGS[tier].showHumidityChart ? "Enabled" : "Locked" },
            { label: "Mould Alerts", value: TIER_CONFIGS[tier].showMouldAlerts ? "Enabled" : "Locked" },
            { label: "Compliance", value: TIER_CONFIGS[tier].showCompliance ? "Enabled" : "Locked" },
          ].map(item => (
            <div key={item.label} className="bg-muted/40 rounded-xl p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              <p className="font-semibold text-sm text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
