import { useState } from "react";
import Layout from "../components/Layout";
import { Bluetooth as BluetoothIcon, Smartphone, Cpu, RefreshCw, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Bluetooth() {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState("");

  const handleScan = () => {
    setIsScanning(true);
    setError("");
    
    // Simulate scan delay and API restriction failure since this is a placeholder
    setTimeout(() => {
      setIsScanning(false);
      setError("Web Bluetooth API is currently restricted in this environment or no compatible Pure Air Guard sensors were found in range.");
    }, 3000);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto pt-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-blue-500/10 rounded-full mb-4">
            <BluetoothIcon className="w-12 h-12 text-blue-500" />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-3">Connect Smart Sensors</h1>
          <p className="text-muted-foreground text-lg">Pair your Pure Air Guard BLE humidity & temperature sensors for real-time automated tracking.</p>
        </div>

        <div className="bg-card rounded-3xl p-8 border border-border shadow-xl relative overflow-hidden">
          {/* Beta Ribbon */}
          <div className="absolute top-6 -right-12 rotate-45 bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider py-1 px-12 shadow-md">
            Beta Feature
          </div>

          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative mb-8">
              <Smartphone className="w-20 h-20 text-muted-foreground/30" />
              <Cpu className="w-12 h-12 text-blue-500 absolute -bottom-2 -right-2 bg-card rounded-lg p-1 border border-border shadow-sm" />
              
              {isScanning && (
                <>
                  <motion.div 
                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-0 rounded-full border-2 border-blue-400"
                  />
                  <motion.div 
                    animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
                    className="absolute inset-0 rounded-full border-2 border-blue-300"
                  />
                </>
              )}
            </div>

            <button 
              onClick={handleScan}
              disabled={isScanning}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100 flex items-center gap-3 text-lg"
            >
              {isScanning ? (
                <><RefreshCw className="w-5 h-5 animate-spin" /> Scanning for Devices...</>
              ) : (
                <><BluetoothIcon className="w-5 h-5" /> Pair New Sensor</>
              )}
            </button>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-xl text-orange-800 dark:text-orange-300 text-sm max-w-md text-center flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>{error}</p>
              </motion.div>
            )}
          </div>

          <div className="border-t border-border mt-8 pt-8">
            <h3 className="font-bold text-lg mb-4">How it works</h3>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted text-foreground flex items-center justify-center font-bold text-xs">1</span> Ensure your Pure Air Guard sensor is powered on and blinking blue.</li>
              <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted text-foreground flex items-center justify-center font-bold text-xs">2</span> Click the "Pair" button and grant browser permissions to access Bluetooth.</li>
              <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted text-foreground flex items-center justify-center font-bold text-xs">3</span> Select the device named "PAG-Sensor-XXXX" from the popup.</li>
              <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted text-foreground flex items-center justify-center font-bold text-xs">4</span> Assign the sensor to a specific room in the next step.</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
