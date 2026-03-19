import { useGetDashboardSummary, useGetRooms } from "@workspace/api-client-react/src/generated/api";
import Layout from "../components/Layout";
import { 
  Droplets, 
  ThermometerSun, 
  AlertOctagon, 
  Home as HomeIcon,
  Wind
} from "lucide-react";
import RiskBadge from "../components/RiskBadge";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Dashboard() {
  const { data: summary, isLoading: loadingSummary } = useGetDashboardSummary();
  const { data: rooms, isLoading: loadingRooms } = useGetRooms();

  if (loadingSummary || loadingRooms) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        </div>
      </Layout>
    );
  }

  const stats = [
    {
      title: "Total Monitored Rooms",
      value: summary?.totalRooms || 0,
      icon: HomeIcon,
      color: "bg-blue-500",
      lightColor: "bg-blue-500/10 text-blue-600"
    },
    {
      title: "Active Risk Alerts",
      value: summary?.activeAlerts || 0,
      icon: AlertOctagon,
      color: "bg-red-500",
      lightColor: "bg-red-500/10 text-red-600",
      alert: (summary?.activeAlerts || 0) > 0
    },
    {
      title: "Average Humidity",
      value: `${summary?.avgHumidity?.toFixed(1) || 0}%`,
      icon: Droplets,
      color: "bg-teal-500",
      lightColor: "bg-teal-500/10 text-teal-600"
    },
    {
      title: "Average Temperature",
      value: `${summary?.avgTemperature?.toFixed(1) || 0}°C`,
      icon: ThermometerSun,
      color: "bg-amber-500",
      lightColor: "bg-amber-500/10 text-amber-600"
    }
  ];

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Environment Overview</h1>
        <p className="text-muted-foreground mt-1">Monitor indoor air quality and prevent mould growth across all properties.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card rounded-2xl p-6 shadow-lg shadow-black/5 border border-border hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                <h3 className={`text-3xl font-display font-bold ${stat.alert ? 'text-destructive' : 'text-foreground'}`}>
                  {stat.value}
                </h3>
              </div>
              <div className={`p-3 rounded-xl ${stat.lightColor} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart / Visual Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-gradient-to-br from-primary to-accent rounded-3xl p-8 text-white shadow-xl shadow-primary/20 relative overflow-hidden"
        >
          {/* Decorative background circle */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-black/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-medium mb-6">
                <Wind className="w-4 h-4" /> System Healthy
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">Overall Mould Risk is Low</h2>
              <p className="text-white/80 max-w-md text-lg">
                Your properties are maintaining ideal humidity levels. Keep ventilation active during showers and cooking.
              </p>
            </div>
            
            <div className="mt-8 flex gap-4">
              <Link href="/rooms">
                <div className="px-6 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 hover:scale-105 transition-all shadow-lg cursor-pointer">
                  View All Rooms
                </div>
              </Link>
              <Link href="/recommendations">
                <div className="px-6 py-3 bg-black/20 backdrop-blur-md text-white border border-white/30 font-semibold rounded-xl hover:bg-black/30 transition-all cursor-pointer hidden sm:block">
                  Read Prevention Tips
                </div>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Room Quick Status */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-3xl p-6 shadow-lg shadow-black/5 border border-border flex flex-col h-full"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-display font-bold">Room Status</h3>
            <Link href="/rooms">
              <span className="text-sm text-primary hover:underline cursor-pointer">View All</span>
            </Link>
          </div>
          
          <div className="space-y-4 overflow-y-auto flex-1 pr-2">
            {rooms?.slice(0, 5).map((room) => (
              <div key={room.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors border border-border/50">
                <div>
                  <p className="font-semibold text-sm">{room.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{room.type.replace('_', ' ')}</p>
                </div>
                <RiskBadge level={room.mouldRiskLevel} showIcon={false} />
              </div>
            ))}
            
            {(!rooms || rooms.length === 0) && (
              <div className="text-center py-8 text-muted-foreground flex flex-col items-center">
                <HomeIcon className="w-10 h-10 text-muted-foreground/30 mb-3" />
                <p>No rooms monitored yet.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
