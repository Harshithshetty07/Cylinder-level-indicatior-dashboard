'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HydraulicCylinderIndicator = () => {
  const [extension, setExtension] = useState(70);
  const [pressure, setPressure] = useState(1250);
  const [isOperating, setIsOperating] = useState(false);
  const [operationMode, setOperationMode] = useState('manual'); // manual, auto, extend, retract
  const [flowRate, setFlowRate] = useState(0);
  const [temperature, setTemperature] = useState(68);

  
  // Auto operation effect
  useEffect(() => {
    let interval;
    if (operationMode === 'auto') {
      interval = setInterval(() => {
        setExtension(prev => {
          const newVal = prev + (Math.random() - 0.5) * 10;
          return Math.max(0, Math.min(100, newVal));
        });
      }, 2000);
    } else if (operationMode === 'extend') {
      interval = setInterval(() => {
        setExtension(prev => Math.min(100, prev + 2));
      }, 100);
    } else if (operationMode === 'retract') {
      interval = setInterval(() => {
        setExtension(prev => Math.max(0, prev - 2));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [operationMode]);



  // Update pressure and flow based on extension
  useEffect(() => {
    const basePressure = 1000;
    const pressureVariation = extension * 15 + Math.random() * 100;
    setPressure(basePressure + pressureVariation);

    if (operationMode !== 'manual') {
      setFlowRate(2.5 + Math.random() * 1.5);
      setTemperature(68 + extension * 0.3 + Math.random() * 5);
    } else {
      setFlowRate(0);
    }
  }, [extension, operationMode]);

  const handleExtensionChange = (newExtension) => {
    setIsOperating(true);
    setExtension(newExtension);
    setTimeout(() => setIsOperating(false), 500);
  };

  const getPressureColor = (pressure) => {
    if (pressure < 1000) return 'text-green-400';
    if (pressure < 1500) return 'text-yellow-400';
    if (pressure < 2000) return 'text-orange-400';
    return 'text-red-400';
  };

  const getPressureStatus = (pressure) => {
    if (pressure < 1000) return 'Normal';
    if (pressure < 1500) return 'Elevated';
    if (pressure < 2000) return 'High';
    return 'Critical';
  };

  // Hydraulic fluid particles
  const fluidParticles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 2,
    duration: 1 + Math.random() * 2,
  }));
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800/60 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl max-w-6xl w-full">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Hydraulic Cylinder Level Indicator </h1>
          <p className="text-gray-400">Real-time hydraulic system monitoring</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Hydraulic Cylinder Visualization */}
          <div className="lg:col-span-2">
            <div className="relative bg-gray-800/40 rounded-2xl p-6 border border-gray-700/30">

              {/* Cylinder Assembly - Now Vertical */}
              <div className="relative mx-auto flex justify-center" style={{ width: '300px', height: '550px' }}>

                {/* Cylinder Base (Bottom) */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-32 bg-gradient-to-b from-gray-600 to-gray-700 rounded-b-xl border-4 border-gray-500 shadow-lg">
                  <div className="absolute inset-2 bg-gradient-to-b from-gray-700 to-gray-600 rounded-b-lg"></div>

                  {/* Hydraulic Ports */}
                  <div className="absolute -left-3 top-4 w-6 h-6 bg-blue-600 rounded-full border-2 border-blue-400">
                    <div className="absolute inset-1 bg-blue-400 rounded-full"></div>
                  </div>
                  <div className="absolute -right-3 top-4 w-6 h-6 bg-red-600 rounded-full border-2 border-red-400">
                    <div className="absolute inset-1 bg-red-400 rounded-full"></div>
                  </div>

                  {/* Fluid Flow Animation */}
                  {operationMode !== 'manual' && (
                    <>
                      <motion.div
                        className="absolute -left-1 top-6 w-2 h-2 bg-blue-400 rounded-full"
                        animate={{
                          y: [0, -20, -40, -60],
                          opacity: [0, 1, 1, 0]
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      <motion.div
                        className="absolute -right-1 top-6 w-2 h-2 bg-red-400 rounded-full"
                        animate={{
                          y: [-60, -40, -20, 0],
                          opacity: [0, 1, 1, 0]
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </>
                  )}
                </div>

                {/* Cylinder Barrel - Vertical */}
                <motion.div
                  className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-16 bg-gradient-to-b from-gray-500 to-gray-600 border-4 border-gray-400 shadow-inner"
                  animate={{ height: `${245 + extension * 1.5}px` }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <div className="absolute inset-2 bg-gradient-to-b from-gray-600 to-gray-500 rounded-sm"></div>

                  {/* Hydraulic Fluid */}
                  <div className="absolute inset-3 bg-gradient-to-b from-blue-500/60 to-blue-600/60 rounded-sm overflow-hidden">
                    {/* Fluid particles */}
                    {operationMode !== 'manual' && fluidParticles.map((particle) => (
                      <motion.div
                        key={particle.id}
                        className="absolute w-1 h-1 bg-blue-300 rounded-full"
                        animate={{
                          y: operationMode === 'extend' ? [extension * 1.5 + 200, 0] : [0, extension * 1.5 + 200],
                          x: [Math.random() * 30, Math.random() * 30],
                          opacity: [0, 0.8, 0]
                        }}
                        transition={{
                          duration: particle.duration,
                          repeat: Infinity,
                          delay: particle.delay,
                          ease: "linear"
                        }}
                      />
                    ))}

                    {/* Pressure waves */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-blue-400/20 via-blue-300/40 to-blue-400/20"
                      animate={{
                        y: operationMode === 'extend' ? [-50, extension * 1.5 + 50] : [extension * 1.5 + 50, -50],
                        opacity: [0, 0.6, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </motion.div>

                {/* Piston Rod - Vertical */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 w-8 bg-gradient-to-b from-gray-400 to-gray-500 border-2 border-gray-300 shadow-lg"
                  style={{ bottom: '110px' }}
                  animate={{ height: `${150 + extension * 2}px` }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <div className="absolute inset-1 bg-gradient-to-b from-gray-300 to-gray-400"></div>
                </motion.div>

                {/* Piston Head - Moves vertically */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 w-20 h-12 bg-gradient-to-b from-gray-600 to-gray-700 rounded-t-lg border-4 border-gray-500 shadow-lg"
                  animate={{ bottom: `${290 + extension * 2}px` }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <div className="absolute inset-2 bg-gradient-to-b from-gray-700 to-gray-600 rounded-t-md"></div>

                  {/* Load attachment point */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-yellow-600 rounded-full border-2 border-yellow-400">
                    <div className="absolute inset-1 bg-yellow-400 rounded-full"></div>
                  </div>
                </motion.div>

                {/* Extension measurement - Vertical scale */}
                <div className="absolute left-8 top-8 bottom-8 w-1 bg-gray-600 rounded-full">
                  <motion.div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-green-400 to-green-500 rounded-full"
                    animate={{ height: `${extension}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <div className="absolute left-12 bottom-8 text-xs text-gray-400">0%</div>
                <div className="absolute left-12 top-8 text-xs text-gray-400">100%</div>

                {/* Operation Status Indicator */}
                <AnimatePresence>
                  {isOperating && (
                    <motion.div
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/50"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <span className="text-blue-300 text-sm font-medium">OPERATING</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Load indicator */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 w-16 h-6 bg-orange-600 rounded border-2 border-orange-400"
                  animate={{ bottom: `${300 + extension * 2}px` }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <div className="absolute inset-1 bg-orange-400 rounded-sm"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs text-white font-bold">LOAD</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">

            {/* Extension Control */}
            <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/30">
              <h3 className="text-xl font-bold text-white mb-4">Extension Control</h3>

              {/* Digital Display */}
              <div className="bg-black/50 rounded-lg p-4 mb-4 border border-gray-600">
                <div className="text-center">
                  <motion.div
                    className="text-3xl font-mono text-green-400"
                    key={extension}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {extension.toFixed(1)}%
                  </motion.div>
                  <div className="text-sm text-gray-400 mt-1">Extension</div>
                </div>
              </div>

              {/* Manual Slider */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-300">
                  Manual Control
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={extension}
                  onChange={(e) => handleExtensionChange(parseFloat(e.target.value))}
                  disabled={operationMode !== 'manual'}
                  className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${extension}%, #374151 ${extension}%, #374151 100%)`
                  }}
                />
              </div>

              {/* Operation Mode */}
              <div className="space-y-3 mt-6">
                <label className="block text-sm font-medium text-gray-300">
                  Operation Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { mode: 'manual', label: 'Manual', icon: '🎛️' },
                    { mode: 'auto', label: 'Auto', icon: '🤖' },
                    { mode: 'extend', label: 'Extend', icon: '⬆️' },
                    { mode: 'retract', label: 'Retract', icon: '⬇️' }
                  ].map((option) => (
                    <motion.button
                      key={option.mode}
                      onClick={() => setOperationMode(option.mode)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${operationMode === option.mode
                        ? 'bg-blue-600 text-white border-2 border-blue-400'
                        : 'bg-gray-700 text-gray-300 border-2 border-gray-600 hover:bg-gray-600'
                        }`}
                    >
                      {option.icon} {option.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* System Status */}
            {/* <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/30">
              <h3 className="text-xl font-bold text-white mb-4">System Status</h3>
              
              <div className="space-y-4"> */}
            {/* Pressure */}
            {/* <div className="flex justify-between items-center">
                  <span className="text-gray-300">Pressure:</span>
                  <div className="text-right">
                    <motion.span
                      className={`text-lg font-mono ${getPressureColor(pressure)}`}
                      key={pressure}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {pressure.toFixed(0)} PSI
                    </motion.span>
                    <div className={`text-xs ${getPressureColor(pressure)}`}>
                      {getPressureStatus(pressure)}
                    </div>
                  </div>
                </div> */}

            {/* Flow Rate */}
            {/* <div className="flex justify-between items-center">
                  <span className="text-gray-300">Flow Rate:</span>
                  <span className="text-white font-mono">
                    {flowRate.toFixed(1)} GPM
                  </span>
                </div> */}

            {/* Temperature */}
            {/* <div className="flex justify-between items-center">
                  <span className="text-gray-300">Temperature:</span>
                  <span className={`font-mono ${
                    temperature > 80 ? 'text-red-400' : 
                    temperature > 75 ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    {temperature.toFixed(1)}°F
                  </span>
                </div> */}

            {/* Load */}
            {/* <div className="flex justify-between items-center">
                  <span className="text-gray-300">Load:</span>
                  <span className="text-white font-mono">
                    {(extension * 25 + 500).toFixed(0)} lbs
                  </span>
                </div> */}

            {/* Cycle Count */}
            {/* <div className="flex justify-between items-center">
                  <span className="text-gray-300">Cycles:</span>
                  <span className="text-white font-mono">
                    12,847
                  </span>
                </div>
              </div>
            </div> */}

            {/* Emergency Controls */}
            <div className="bg-red-900/20 rounded-xl p-4 border border-red-700/50">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setOperationMode('manual');
                  setExtension(0);
                }}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg border-2 border-red-400 transition-colors duration-200"
              >
                🛑 EMERGENCY STOP
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
          border: 2px solid white;
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
          border: 2px solid white;
        }
        input[type="range"]:disabled::-webkit-slider-thumb {
          background: #6b7280;
          box-shadow: 0 0 5px rgba(107, 114, 128, 0.3);
        }
      `}</style>
    </div>
  );
};

export default HydraulicCylinderIndicator;