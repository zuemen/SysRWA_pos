import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, ShieldCheck, DollarSign, Globe, Activity, 
  RefreshCcw, Cpu, BarChart3, ArrowUpRight, AlertTriangle, 
  ChevronRight, MapPin, CheckCircle2, Lock, Fingerprint, 
  Search, Bell, BrainCircuit, History, ArrowRightLeft, 
  Leaf, Info, ExternalLink, Code, ShieldAlert
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// --- 多資產 RWA 數據配置 ---
const BBU_ASSETS = [
  {
    id: 'BBU-TX-001',
    name: '德州核心-超大型節點',
    client: 'NVIDIA 訓練中心 (Plano)',
    soh: 98.4215,
    rentFee: 2500,
    yield: 8.5,
    risk: '低風險',
    location: '德州 普萊諾',
    color: 'cyan',
    ulCert: 'UL-2024-XP99',
    installDate: '2024-10-15',
    txHash: '0x82f...a12c',
    issuer: 'Sysgration Official',
    aiStatus: '運作中 - 負載預測精準度 99.2%'
  },
  {
    id: 'BBU-TX-042',
    name: '邊緣 AI 運算集群',
    client: '德州 SME 創新實驗室',
    soh: 92.1580,
    rentFee: 1200,
    yield: 12.2,
    risk: '中風險',
    location: '德州 奧斯丁',
    color: 'purple',
    ulCert: 'UL-2024-SM12',
    installDate: '2024-11-20',
    txHash: '0x3e1...b5d4',
    issuer: 'Sysgration Official',
    aiStatus: '警示 - 偵測到毫秒級功率跳變'
  },
  {
    id: 'BBU-TW-101',
    name: '算力韌性示範機架',
    client: '台積電 德州供應鏈節點',
    soh: 99.8820,
    rentFee: 3200,
    yield: 6.8,
    risk: '極低風險',
    location: '德州 達拉斯',
    color: 'green',
    ulCert: 'UL-2024-TS01',
    installDate: '2024-12-05',
    txHash: '0x9a4...f7e2',
    issuer: 'Sysgration Official',
    aiStatus: '運作中 - 健康度衰減率低於預期'
  }
];

const PTENexus = () => {
  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const [selectedBbu, setSelectedBbu] = useState(BBU_ASSETS[0]);
  const [revenue, setRevenue] = useState(12450.80);
  const [localSoh, setLocalSoh] = useState(BBU_ASSETS[0].soh);
  const [isGridEmergency, setIsGridEmergency] = useState(false);
  const [showOracleModal, setShowOracleModal] = useState(false);
  const [showVcModal, setShowVcModal] = useState(false);
  const [showPaymentAnimation, setShowPaymentAnimation] = useState(false);
  const [sinkingFund, setSinkingFund] = useState(48200.00);
  const [notifications, setNotifications] = useState([]);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  // 模擬即時 IoT 預言機與 AI 分析
  useEffect(() => {
    const timer = setInterval(() => {
      const multi = isGridEmergency ? 5.0 : 1.0;
      setRevenue(r => r + (selectedBbu.rentFee / 30 / 24 / 60 / 30) * multi);
      setLocalSoh(s => s - 0.000001);
    }, 2000);
    return () => clearInterval(timer);
  }, [selectedBbu, isGridEmergency]);

  useEffect(() => {
    setLocalSoh(selectedBbu.soh);
  }, [selectedBbu]);

  const addNotification = (text, type) => {
    const id = Date.now();
    setNotifications(prev => [{ id, text, type }, ...prev].slice(0, 5));
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const handleSimulatePayment = () => {
    setShowPaymentAnimation(true);
    setTimeout(() => {
      setRevenue(r => r + selectedBbu.rentFee * 0.8);
      setSinkingFund(s => s + selectedBbu.rentFee * 0.2);
      setShowPaymentAnimation(false);
      addNotification(`資金清結算：已完成 $${selectedBbu.rentFee} 撥備分流。`, 'success');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans p-4 lg:p-8">
      {/* 背景霓虹光暈 */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      {/* 通知中心 */}
      <div className="fixed top-24 right-8 z-[100] w-80 space-y-2">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div 
              key={n.id} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}
              className={`p-4 rounded-2xl border text-[10px] font-bold shadow-2xl backdrop-blur-xl flex gap-3 items-center ${
                n.type === 'error' ? 'bg-red-500/20 border-red-500 text-red-400' :
                n.type === 'warning' ? 'bg-orange-500/20 border-orange-500 text-orange-400' :
                n.type === 'success' ? 'bg-green-500/20 border-green-500 text-green-400' :
                'bg-cyan-500/20 border-cyan-500 text-cyan-400'
              }`}
            >
              <BrainCircuit size={16} className="shrink-0" />
              <span>{n.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* 導覽列 */}
        <nav className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6 bg-slate-900/50 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/40">
              <Zap className="text-white fill-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">PTE-PAL <span className="text-cyan-400 text-sm tracking-widest ml-1 font-bold italic underline decoration-cyan-500/30 underline-offset-4 font-black">NEXUS v1.6</span></h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">系統電：AI 算力韌性與 RWA 金融運籌</p>
            </div>
          </div>
          
          <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            {[
              { id: 'DASHBOARD', label: '即時看板' },
              { id: 'FINANCE', label: '資產金融' },
              { id: 'GRID', label: '電網韌性' },
              { id: 'ROADMAP', label: '發展藍圖' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${activeTab === tab.id ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'text-slate-500 hover:text-white'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              {isWalletConnected && (
                <div className="flex items-center gap-2 mb-1 justify-end">
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                   <span className="text-[8px] font-black text-green-500 uppercase tracking-widest bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">KYC 認證已通過 (ERC-3643)</span>
                </div>
              )}
              <p className="text-[8px] text-slate-500 font-black uppercase tracking-[0.3em]">Protocol Yield (24H)</p>
              <p className="text-xl font-mono text-green-400 font-bold">${revenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
            </div>
            <button 
              onClick={() => setIsWalletConnected(!isWalletConnected)}
              className={`${isWalletConnected ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white text-black'} px-6 py-3 rounded-2xl font-black text-sm transition-all active:scale-95 shadow-xl`}
            >
              {isWalletConnected ? '0x82f...a12c' : '連結錢包 (合規准入)'}
            </button>
          </div>
        </nav>

        {/* 核心內容分頁 */}
        <AnimatePresence mode="wait">
          {activeTab === 'DASHBOARD' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
              {/* 資產選擇器 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {BBU_ASSETS.map((asset) => (
                  <button 
                    key={asset.id}
                    onClick={() => setSelectedBbu(asset)}
                    className={`p-4 rounded-2xl border transition-all text-left group relative overflow-hidden ${selectedBbu.id === asset.id ? 'bg-slate-800 border-cyan-500 shadow-lg shadow-cyan-500/10' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className={`text-[8px] font-black uppercase tracking-widest ${selectedBbu.id === asset.id ? 'text-cyan-400' : 'text-slate-500'}`}>{asset.id}</p>
                      {selectedBbu.id === asset.id && <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />}
                    </div>
                    <p className="text-sm font-black text-white group-hover:text-cyan-400 transition-colors tracking-tight">{asset.name}</p>
                    <p className="text-[10px] text-slate-500 mt-1 font-bold">{asset.client}</p>
                  </button>
                ))}
              </div>

              <DashboardView 
                revenue={revenue} 
                soh={localSoh} 
                selectedBbu={selectedBbu} 
                onVerifyOracle={() => setShowOracleModal(true)}
                onViewVc={() => setShowVcModal(true)}
                isGridEmergency={isGridEmergency}
              />
            </motion.div>
          )}
          {activeTab === 'FINANCE' && (
            <FinanceView 
              key="fin" 
              selectedBbu={selectedBbu} 
              onSimulate={handleSimulatePayment} 
              showPaymentAnimation={showPaymentAnimation}
              sinkingFund={sinkingFund}
              isWalletConnected={isWalletConnected}
            />
          )}
          {activeTab === 'GRID' && (
            <GridView 
              key="grid" 
              isEmergency={isGridEmergency} 
              onToggle={() => setIsGridEmergency(!isGridEmergency)} 
            />
          )}
          {activeTab === 'ROADMAP' && (
             <RoadmapView key="roadmap" />
          )}
        </AnimatePresence>

        {/* 互動彈窗 */}
        <OracleModal isOpen={showOracleModal} onClose={() => setShowOracleModal(false)} selectedBbu={selectedBbu} soh={localSoh} />
        <VcModal isOpen={showVcModal} onClose={() => setShowVcModal(false)} selectedBbu={selectedBbu} />
      </div>
    </div>
  );
};

// --- 分頁：運籌看板 (強化 Oracle 證明) ---
const DashboardView = ({ revenue, soh, selectedBbu, onVerifyOracle, onViewVc, isGridEmergency }) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <div className="lg:col-span-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatusCard 
          title="電池健康度 (SoH)" 
          value={`${soh.toFixed(6)}%`} 
          icon={<ShieldCheck className="text-cyan-400" />} 
          trend="IoT 預言機驗證" 
          status="Proof of Oracle"
          onClick={onVerifyOracle}
          clickable
          showVerifyIcon
        />
        <StatusCard 
          title="算力韌性貢獻" 
          value={`${(selectedBbu.rentFee/100 * (isGridEmergency ? 2.5 : 1)).toFixed(2)} MW`} 
          icon={<Activity className="text-yellow-400" />} 
          trend={isGridEmergency ? "VPP 緊急介入" : "動態介入中"} 
          status={isGridEmergency ? "獲利加倍" : "VPP 模式"} 
        />
        <StatusCard 
          title="資產數位身分 (SSI)" 
          value={selectedBbu.id} 
          icon={<Fingerprint className="text-purple-400" />} 
          trend="可驗證憑證 (VC)" 
          status="官方核發"
          onClick={onViewVc}
          clickable
          showVerifyIcon
        />
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-[32px] p-8 backdrop-blur-md relative overflow-hidden">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BrainCircuit className="text-cyan-400" size={20} /> 算力韌性即流動性 (PAL) 數據證明
            </h3>
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1 italic">
                Verified by Chainlink IoT Oracle | Tx Hash: {selectedBbu.txHash}
            </p>
          </div>
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${isGridEmergency ? 'bg-red-500/20 border-red-500 text-red-500 shadow-[0_0_10px_red]' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
              {isGridEmergency ? 'ERCOT 緊急狀態' : '物理狀態對齊中'}
            </span>
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={Array.from({ length: 20 }, (_, i) => ({ name: `${i}:00`, value: (isGridEmergency ? 80 : 30) + (selectedBbu.yield * 3) + Math.random() * 20 }))}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isGridEmergency ? "#ef4444" : "#22d3ee"} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={isGridEmergency ? "#ef4444" : "#22d3ee"} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '16px', fontSize: '12px', color: '#fff'}} />
              <Area type="monotone" dataKey="value" stroke={isGridEmergency ? "#ef4444" : "#22d3ee"} strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    <div className="lg:col-span-4 space-y-6">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[32px] p-8 text-white relative overflow-hidden group shadow-2xl shadow-indigo-500/20">
        <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
          <Cpu size={160} />
        </div>
        <h3 className="text-2xl font-black mb-2 italic tracking-tighter uppercase uppercase">AI 推論邊緣保護</h3>
        <p className="text-blue-100 text-sm mb-6 leading-relaxed italic">IoT 預言機偵測到機房溫度：{isGridEmergency ? '42' : '28'}°C。BBU 容量已優先鎖定冷卻系統，確保 GPU 熱穩定。</p>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] uppercase font-bold opacity-60 font-black tracking-widest text-white">電力優先權</p>
            <p className="text-xl font-bold">L1 - CRITICAL</p>
          </div>
          <button className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/30 transition-all border border-white/20 uppercase font-black">策略詳情</button>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-[32px] p-6 space-y-4">
        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2 underline decoration-cyan-500/30 underline-offset-4">
          AI 即時自動化審計日誌
        </h4>
        <div className="space-y-3">
          <AiLog time="10:42:01" text="[Oracle] 讀取 BMS 物理層數據，Tx 驗證通過。" />
          <AiLog time="10:42:05" text="[SSI] 資產 DID 狀態確認，未發現異常竄改紀錄。" />
          <AiLog time="10:43:12" text="[PAL] 偵測到負載波動，已自動觸發毫秒級補償。" />
        </div>
      </div>
    </div>
  </div>
);

// --- 分頁：資產金融 (強化 Exit Strategy & ERC-3643) ---
const FinanceView = ({ selectedBbu, onSimulate, showPaymentAnimation, sinkingFund, isWalletConnected }) => (
  <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
    <AnimatePresence>
      {showPaymentAnimation && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm"
        >
          <div className="bg-slate-900 p-12 rounded-[40px] border border-cyan-500/30 text-center shadow-2xl max-w-lg w-full">
            <motion.div 
              initial={{ y: 20 }} animate={{ y: 0 }}
              className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/50"
            >
              <DollarSign className="text-green-400" size={40} />
            </motion.div>
            <h4 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">零門檻 (Zero CAPEX) 智能分流演示</h4>
            <p className="text-slate-500 mb-8 font-black text-xs tracking-widest italic uppercase">資產：{selectedBbu.client} | 合規清算執行中</p>
            <div className="flex justify-center gap-12">
              <div className="text-center">
                <div className="w-1.5 h-24 bg-slate-800 mx-auto rounded-full overflow-hidden relative">
                   <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 1 }} className="w-full bg-cyan-500 absolute bottom-0 shadow-[0_0_10px_#06b6d4]" />
                </div>
                <p className="text-cyan-400 font-black mt-3">$2000 (80%)</p>
                <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest mt-1">投資人分潤 (ERC-3643)</p>
              </div>
              <div className="text-center">
                <div className="w-1.5 h-24 bg-slate-800 mx-auto rounded-full overflow-hidden relative">
                   <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 1, delay: 0.5 }} className="w-full bg-orange-500 absolute bottom-0 shadow-[0_0_10px_#f97316]" />
                </div>
                <p className="text-orange-400 font-black mt-3">$500 (20%)</p>
                <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest mt-1">重置基金儲備</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <RefreshCcw className="text-orange-400" />
          <h3 className="text-xl font-bold text-white uppercase tracking-tight">資產重置基金 (Sinking Fund)</h3>
        </div>
        <button 
          onClick={onSimulate}
          className="bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-orange-500/20 transition-all active:scale-95"
        >
          模擬收租分流
        </button>
      </div>
      <div className="space-y-8">
        <div>
          <div className="flex justify-between text-[10px] mb-3 font-black text-slate-500 uppercase tracking-widest">
            <span>2028 年硬體汰換儲備 (全自動撥備)</span>
            <span className="text-orange-400">已累積 {((sinkingFund/150000)*100).toFixed(1)}%</span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${(sinkingFund/150000)*100}%` }} className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-inner">
            <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-widest">目前準備金</p>
            <p className="text-lg font-mono text-white">${sinkingFund.toLocaleString()}</p>
          </div>
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-inner">
            <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-widest">退役觸發門檻</p>
            <p className="text-lg font-black text-red-500 font-bold tracking-tight italic">SoH &lt; 80%</p>
          </div>
        </div>
        <div className="p-4 bg-orange-950/20 border border-orange-500/20 rounded-2xl flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <ShieldAlert className="text-orange-500 shrink-0" size={16} />
            <p className="text-[9px] text-slate-400 italic leading-relaxed uppercase font-black tracking-widest">
               資產退役策略 (Exit Strategy)：當物理監測確認設備健康度跌破 80% 時，智能合約將自動撥款採購新一代 BBU 模組。
            </p>
          </div>
          <div className="flex items-center gap-2 pl-7">
             <div className="px-2 py-0.5 bg-orange-500 text-white text-[8px] font-black rounded uppercase">自動執行</div>
             <p className="text-[8px] text-orange-400 font-bold italic tracking-widest">舊資產轉入二級市場 (充電樁/農業儲能)</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 shadow-2xl">
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 className="text-purple-400" />
        <h3 className="text-xl font-bold text-white uppercase tracking-tight font-black underline decoration-purple-500/20 underline-offset-8">RWA 實體資產代幣化門戶</h3>
      </div>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 p-6 rounded-2xl border border-purple-500/20 relative group">
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col">
              <p className="text-xs font-bold text-purple-400 uppercase tracking-widest italic">資產系列：{selectedBbu.id}</p>
              {isWalletConnected && <span className="text-[8px] text-green-500 font-black mt-1">✓ 符合 ERC-3643 合規投資者標準</span>}
            </div>
            <span className="bg-purple-500 text-white text-[10px] px-3 py-1 rounded-full font-black shadow-lg shadow-purple-500/30">預期收益 {selectedBbu.yield}%</span>
          </div>
          <p className="text-3xl font-black text-white mb-2 tracking-tighter italic">425.00 <span className="text-sm font-normal text-slate-500 uppercase tracking-widest font-bold">/ 500 份額已鑄造</span></p>
          <div className="flex gap-4 mt-4 text-[9px] font-bold text-slate-500 uppercase tracking-widest border-t border-slate-800 pt-4">
            <span className="flex items-center gap-1 text-cyan-400 italic">資產 ID: {selectedBbu.id}</span>
            <span className="flex items-center gap-1 italic">監管: US Reg D (合規)</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            disabled={!isWalletConnected}
            className={`flex-1 py-4 rounded-2xl font-black text-xs transition-all uppercase tracking-widest italic ${isWalletConnected ? 'bg-cyan-500 text-slate-950 hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]' : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'}`}
          >
            {isWalletConnected ? '資助此實體資產' : '請先連結錢包進行 KYC'}
          </button>
          <button className="flex-1 bg-slate-800 py-4 rounded-2xl text-white font-black text-xs border border-slate-700 hover:bg-slate-700 transition-all uppercase tracking-widest italic">查看鏈上合約</button>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- 輔助組件：Roadmap ---
const RoadmapView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {ROADMAP_STEPS.map((step, idx) => (
      <div key={idx} className={`bg-slate-900 border p-8 rounded-[32px] relative overflow-hidden flex flex-col ${step.status === 'ACTIVE' ? 'border-cyan-500 shadow-lg shadow-cyan-500/10' : 'border-slate-800'}`}>
        {step.status === 'COMPLETED' && <div className="absolute top-4 right-4 text-green-500"><CheckCircle2 size={24} /></div>}
        {step.status === 'ACTIVE' && <div className="absolute top-4 right-4 text-cyan-400 animate-pulse font-black text-[10px] tracking-widest uppercase">執行中</div>}
        
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">{step.stage}</p>
        <h4 className="text-lg font-black text-white mb-1 uppercase tracking-tighter italic">{step.title}</h4>
        <p className="text-[10px] text-slate-400 font-bold mb-6 italic">{step.period}</p>
        
        <div className="space-y-4 flex-grow">
          {step.items.map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${step.status === 'COMPLETED' ? 'bg-green-500' : step.status === 'ACTIVE' ? 'bg-cyan-500' : 'bg-slate-700'}`} />
              <p className="text-[11px] text-slate-300 font-bold leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
        
        {step.status === 'ACTIVE' && (
          <div className="mt-8 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center gap-3">
             <Info className="text-cyan-400 shrink-0" size={16} />
             <p className="text-[9px] text-cyan-400 font-black tracking-widest leading-tight italic uppercase">PoC 正在演示：合規 RWA 代幣化與零門檻訂閱。</p>
          </div>
        )}
      </div>
    ))}
  </motion.div>
);

// --- 輔助組件：GridView (ERCOT) ---
const GridView = ({ isEmergency, onToggle }) => (
  <div className={`min-h-[500px] rounded-[32px] border transition-all duration-700 p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl ${isEmergency ? 'bg-red-950/20 border-red-500' : 'bg-slate-900 border-slate-800'}`}>
    {isEmergency && (
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/10 to-transparent animate-pulse" />
    )}
    <div className={`w-28 h-28 rounded-full flex items-center justify-center mb-8 border transition-all duration-500 ${isEmergency ? 'bg-red-500/10 border-red-500 animate-bounce shadow-[0_0_50px_rgba(239,68,68,0.3)]' : 'bg-yellow-500/10 border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.1)]'}`}>
      <AlertTriangle className={isEmergency ? 'text-red-500' : 'text-yellow-500'} size={56} />
    </div>
    <div className="text-center z-10 space-y-4 max-w-xl">
      <h3 className={`text-4xl font-black italic uppercase tracking-tighter transition-colors duration-500 ${isEmergency ? 'text-red-500' : 'text-white'}`}>
        ERCOT 電網調度實務
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed italic uppercase font-black tracking-widest">
        {isEmergency 
          ? '警告：偵測到電網負載尖峰 (Peak)。AI 已自動將德州境內所有 PTE 節點切換至 VPP 模式，提供需量反應服務並賺取流動性獎勵。' 
          : '當前電網穩定。BBU 處於 PAL 算力韌性模式，協助 SME 客戶優化電力品質並採集 ESG 數據紀錄。'}
      </p>
    </div>
    
    <div className="mt-12 flex flex-col items-center gap-6 z-10">
       <button 
         onClick={onToggle}
         className={`px-12 py-5 rounded-2xl font-black text-xl transition-all shadow-xl active:scale-95 border-2 ${isEmergency ? 'bg-red-500 text-white border-white animate-pulse' : 'bg-slate-800 text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-black'}`}
       >
         {isEmergency ? '解除電網緊急狀態' : '模擬 ERCOT 緊急狀態'}
       </button>
    </div>
  </div>
);

// --- 輔助組件：彈窗 ---
const OracleModal = ({ isOpen, onClose, selectedBbu, soh }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-slate-900 border border-cyan-500/30 p-8 rounded-[40px] max-w-2xl w-full shadow-2xl relative">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-2xl font-black text-white flex items-center gap-3"><Globe className="text-cyan-400" /> IoT 預言機物理證明 (Proof of Oracle)</h4>
            <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
               <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
               <span className="text-[10px] font-black text-cyan-400 tracking-widest uppercase italic">Verified by Chainlink</span>
            </div>
          </div>
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 font-mono text-[10px] space-y-4 text-slate-400">
             <div className="flex justify-between border-b border-slate-800 pb-2"><span>物理層讀值 (SoH):</span><span className="text-cyan-400 font-bold underline">{soh.toFixed(6)}%</span></div>
             <div className="flex justify-between border-b border-slate-800 pb-2"><span>上鏈交易哈希 (Tx Hash):</span><span className="text-white hover:text-cyan-400 cursor-pointer flex items-center gap-1">{selectedBbu.txHash} <ExternalLink size={10} /></span></div>
             <div className="flex justify-between border-b border-slate-800 pb-2"><span>加密簽名證明:</span><span className="text-green-500">SIGNATURE_VALID_0x82f...</span></div>
          </div>
          <p className="mt-6 text-[10px] text-slate-500 italic leading-relaxed uppercase font-black opacity-60">
             「數據直接從電池感應器加密後傳輸，不經過人工報表。投資者看見的健康度在區塊鏈瀏覽器上都有不可竄改記錄，實現 100% 自動化審計。」
          </p>
          <button onClick={onClose} className="w-full mt-8 bg-slate-800 py-4 rounded-2xl font-black uppercase tracking-widest text-white hover:bg-slate-700 transition-all italic">關閉證明</button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const VcModal = ({ isOpen, onClose, selectedBbu }) => {
  const [showRaw, setShowRaw] = useState(false);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-slate-900 border border-purple-500/30 p-10 rounded-[40px] max-w-xl w-full shadow-2xl overflow-hidden relative">
            <div className="flex justify-between items-center mb-8">
              <h4 className="text-2xl font-black text-white flex items-center gap-3 uppercase italic tracking-tighter"><Fingerprint className="text-purple-400" /> BBU 數位身分證 (SSI-VC)</h4>
              <button onClick={() => setShowRaw(!showRaw)} className="text-[10px] font-black text-slate-500 hover:text-purple-400 flex items-center gap-1 transition-colors uppercase italic"><Code size={12} /> {showRaw ? '查看簡介' : '查看 VC 原始碼'}</button>
            </div>
            
            {showRaw ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 font-mono text-[9px] text-purple-300 h-64 overflow-y-auto custom-scrollbar">
                <pre>{JSON.stringify({
                  "@context": ["https://www.w3.org/2018/credentials/v1"],
                  "type": ["VerifiableCredential", "BBUCredential"],
                  "issuer": `did:pte:issuer:${selectedBbu.issuer}`,
                  "issuanceDate": selectedBbu.installDate,
                  "credentialSubject": {
                    "id": `did:pte:tex:${selectedBbu.id}`,
                    "ulCertification": selectedBbu.ulCert,
                    "model": "HVDC-48V-G3",
                    "manufacturer": "Sysgration Plano Facility"
                  },
                  "proof": {
                    "type": "Ed25519Signature2018",
                    "jws": "eyJhbGciOiJFZERTQSIs..."
                  }
                }, null, 2)}</pre>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <VcField label="資產 DID" val={`did:pte:tex:${selectedBbu.id}`} />
                <VcField label="核發機構" val={selectedBbu.issuer} />
                <VcField label="UL 認證編號" val={selectedBbu.ulCert} />
                <VcField label="佈署日期" val={selectedBbu.installDate} />
                <div className="p-4 bg-purple-950/20 border border-purple-500/20 rounded-2xl mt-4">
                  <p className="text-[10px] text-slate-400 italic font-black leading-relaxed uppercase tracking-widest opacity-80 uppercase">
                    官方背書：每一組 BBU 均利用 SSI 技術簽發可驗證憑證 (VC)。這解決了二手市場的信任問題，轉賣做充電樁時這張憑證即為價值保證。
                  </p>
                </div>
              </div>
            )}
            
            <button onClick={onClose} className="w-full mt-10 bg-purple-600 py-4 rounded-2xl font-black hover:bg-purple-500 transition-all uppercase tracking-widest text-white shadow-xl shadow-purple-600/20 italic tracking-widest">確認憑證內容</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const VcField = ({ label, val }) => (
  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
    <span className="text-sm font-bold text-white tracking-tight">{val}</span>
  </div>
);

const AiLog = ({ time, text }) => (
  <div className="flex gap-3 items-start p-3 bg-slate-950/30 rounded-xl border border-slate-900 group hover:border-cyan-500/20 transition-all">
    <div className="w-1 h-6 bg-cyan-500 rounded-full mt-0.5" />
    <div>
      <p className="text-[8px] text-slate-500 font-black mb-1 italic uppercase tracking-widest">{time} | AI 運作日誌</p>
      <p className="text-[10px] text-slate-300 font-bold leading-tight italic tracking-tight">{text}</p>
    </div>
  </div>
);

const StatusCard = ({ title, value, icon, trend, status, onClick, clickable, showVerifyIcon }) => (
  <button onClick={onClick} disabled={!clickable} className={`bg-slate-900 border border-slate-800 p-6 rounded-[28px] transition-all group text-left w-full relative ${clickable ? 'hover:border-cyan-500 cursor-pointer' : ''}`}>
    {showVerifyIcon && <div className="absolute top-4 right-4 text-cyan-400/50 group-hover:text-cyan-400 transition-colors"><ShieldCheck size={18} /></div>}
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">{icon}</div>
      <div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] font-bold text-green-400 uppercase tracking-tight">{trend}</span>
          <span className={`text-[8px] px-1.5 py-0.5 rounded-md font-black tracking-tighter uppercase ${clickable ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'bg-slate-800 text-slate-500'}`}>{status}</span>
        </div>
      </div>
    </div>
    <p className="text-2xl font-black text-white tracking-tighter italic">{value}</p>
  </button>
);

const ROADMAP_STEPS = [
  {
    stage: '第一階段',
    title: '物理錨定與數據自動化',
    period: '2025 Q3 - 2026 Q1',
    status: 'COMPLETED',
    items: ['德州 Plano 廠自動化產線落地', 'IoT 閘道器與 BMS 深度整合', 'SoH 數據實時上鏈驗證']
  },
  {
    stage: '第二階段',
    title: '資產金融化與訂閱啟動',
    period: '2026 Q2 - 當前執行中',
    status: 'ACTIVE',
    items: ['SPV 特殊目的載體註冊完成', '合規 RWA 代幣鑄造門戶開放', 'SME 零門檻 (Zero CAPEX) 訂閱啟動']
  },
  {
    stage: '第三階段',
    title: '能源價值極大化',
    period: '2026 Q4',
    status: 'PENDING',
    items: ['ERCOT 需量反應供應商對接', 'VPP 虛擬電廠自動化營運', '智能合約自動分潤系統測試']
  },
  {
    stage: '第四階段',
    title: 'ESG 閉環與永續循環',
    period: '2027+',
    status: 'UPCOMING',
    items: ['重置基金自動觸發汰換機制', '二手 BBU 梯次利用市場建立', '碳權紀錄與綠電憑證核發']
  }
];

export default PTENexus;
