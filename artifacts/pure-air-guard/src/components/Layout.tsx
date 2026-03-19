import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Home, 
  Activity, 
  Bell, 
  ClipboardCheck, 
  Lightbulb, 
  Bluetooth, 
  Menu, 
  X,
  Wind
} from "lucide-react";
import { useGetAlerts } from "@workspace/api-client-react/src/generated/api";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: alerts } = useGetAlerts({ status: 'active' });

  const activeAlertCount = alerts?.length || 0;

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Rooms", href: "/rooms", icon: Home },
    { name: "Readings", href: "/readings", icon: Activity },
    { 
      name: "Alerts", 
      href: "/alerts", 
      icon: Bell,
      badge: activeAlertCount > 0 ? activeAlertCount : undefined 
    },
    { name: "Inspections", href: "/inspections", icon: ClipboardCheck },
    { name: "Prevention Tips", href: "/recommendations", icon: Lightbulb },
    { name: "Sensors", href: "/bluetooth", icon: Bluetooth },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row overflow-hidden">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-sidebar text-sidebar-foreground z-50">
        <div className="flex items-center gap-2 font-display font-bold text-lg tracking-wide">
          <div className="p-1.5 bg-primary rounded-lg">
            <Wind className="w-5 h-5 text-white" />
          </div>
          Pure Air Guard
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 -mr-2 text-sidebar-foreground/80 hover:text-white transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {(isMobileMenuOpen || window.innerWidth >= 768) && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className={`
              fixed md:static inset-y-0 left-0 z-40 w-[260px] 
              bg-sidebar text-sidebar-foreground border-r border-sidebar-border
              flex flex-col h-[100dvh]
            `}
          >
            <div className="hidden md:flex items-center gap-3 p-6 font-display font-bold text-xl tracking-wide">
              <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-xl shadow-lg shadow-primary/20">
                <Wind className="w-6 h-6 text-white" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                Pure Air Guard
              </span>
            </div>

            <nav className="flex-1 px-4 py-6 md:py-2 space-y-1.5 overflow-y-auto">
              <div className="text-xs font-semibold text-sidebar-foreground/40 uppercase tracking-wider mb-4 ml-2">Menu</div>
              {navItems.map((item) => {
                const isActive = location === item.href;
                const Icon = item.icon;
                
                return (
                  <Link key={item.name} href={item.href}>
                    <div className={`
                      flex items-center justify-between px-3 py-3 rounded-xl cursor-pointer
                      transition-all duration-200 group
                      ${isActive 
                        ? "bg-primary text-white font-medium shadow-md shadow-primary/20" 
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}
                    `}>
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                        <span>{item.name}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span className="bg-destructive text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </nav>
            
            <div className="p-4 mt-auto">
              <div className="bg-sidebar-accent/50 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
                <p className="text-xs text-sidebar-foreground/60 mb-2">System Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse"></div>
                  <span className="text-sm font-medium text-emerald-400">All Sensors Online</span>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 h-[100dvh] overflow-y-auto bg-background/50 relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-primary/5 to-transparent -z-10 pointer-events-none" />
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
