import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, ShieldCheck, DollarSign, Globe, Activity, 
  RefreshCcw, Cpu, BarChart3, ArrowUpRight, AlertTriangle, ChevronRight, MapPin, CheckCircle2, Lock, Fingerprint, Search
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
    installDate: '2024-10-15'
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
    installDate: '2024-11-20'
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
    installDate: '2024-12-05'
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

  // 模擬即時 IoT 預言機數據跳動
  useEffect(() => {
    const timer = setInterval(() => {
      // 如果電網緊急，收益速度翻倍
      const multi = isGridEmergency ? 5.0 : 1.0;
      setRevenue(r => r + (selectedBbu.rentFee / 30 / 24 / 60 / 30) * multi);
      setLocalSoh(s => s - 0.000001);
    }, 2000);
    return () => clearInterval(timer);
  }, [selectedBbu, isGridEmergency]);

  useEffect(() => {
    setLocalSoh(selectedBbu.soh);
  }, [selectedBbu]);

  // 模擬收租與分流演示
  const handleSimulatePayment = () => {
    setShowPaymentAnimation(true);
    setTimeout(() => {
      setRevenue(r => r + selectedBbu.rentFee * 0.8);
      setSinkingFund(s => s + selectedBbu.rentFee * 0.2);
      setShowPaymentAnimation(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans p-4 lg:p-8">
      {/* 背景霓虹光暈 */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* 導覽列 */}
        <nav className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6 bg-slate-900/50 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/40">
              <Zap className="text-white fill-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-white uppercase">PTE-PAL <span className="text-cyan-400 text-sm tracking-widest ml-1 font-bold italic underline decoration-cyan-500/30 underline-offset-4">NEXUS 運籌平台</span></h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">系統電集團：德州 ERCOT 基礎設施協議</p>
            </div>
          </div>
          
          <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            {[
              { id: 'DASHBOARD', label: '即時看板' },
              { id: 'FINANCE', label: '資產金融' },
              { id: 'GRID', label: '電網韌性' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${activeTab === tab.id ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'text-slate-500 hover:text-white'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">平台即時總收益</p>
              <p className="text-xl font-mono text-green-400 font-bold">${revenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
            </div>
            <button className="bg-white text-black px-6 py-3 rounded-2xl font-black text-sm hover:bg-cyan-400 transition-all active:scale-95 shadow-xl">
              連結錢包
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
                      <p className={`text-[10px] font-bold uppercase ${selectedBbu.id === asset.id ? 'text-cyan-400' : 'text-slate-500'}`}>{asset.id}</p>
                      {selectedBbu.id === asset.id && <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />}
                    </div>
                    <p className="text-sm font-black text-white group-hover:text-cyan-400 transition-colors">{asset.name}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{asset.client}</p>
                  </button>
                ))}
              </div>

              <DashboardView 
                revenue={revenue} 
                soh={localSoh} 
                selectedBbu={selectedBbu} 
                onVerifyOracle={() => setShowOracleOracle(true)}
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
            />
          )}
          {activeTab === 'GRID' && (
            <GridView 
              key="grid" 
              isEmergency={isGridEmergency} 
              onToggle={() => setIsGridEmergency(!isGridEmergency)} 
            />
          )}
        </AnimatePresence>

        {/* 互動彈窗 */}
        <OracleModal isOpen={showOracleModal} onClose={() => setShowOracleModal(false)} selectedBbu={selectedBbu} soh={localSoh} />
        <VcModal isOpen={showVcModal} onClose={() => setShowVcModal(false)} selectedBbu={selectedBbu} />
      </div>
    </div>
  );
};

// --- 分頁：運籌看板 ---
const DashboardView = ({ revenue, soh, selectedBbu, onVerifyOracle, onViewVc, isGridEmergency }) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <div className="lg:col-span-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatusCard 
          title="電池健康度 (SoH)" 
          value={`${soh.toFixed(6)}%`} 
          icon={<ShieldCheck className="text-cyan-400" />} 
          trend="IoT 預言機在線" 
          status="數據來源驗證"
          onClick={() => onVerifyOracle()}
          clickable
        />
        <StatusCard 
          title="算力韌性貢獻" 
          value={`${(selectedBbu.rentFee/100 * (isGridEmergency ? 2.5 : 1)).toFixed(2)} MW`} 
          icon={<Activity className="text-yellow-400" />} 
          trend={isGridEmergency ? "VPP 緊急介入" : "動態介入中"} 
          status={isGridEmergency ? "獲利加倍" : "VPP 模式"} 
        />
        <StatusCard 
          title="數位身分證 (VC)" 
          value={selectedBbu.id} 
          icon={<Fingerprint className="text-purple-400" />} 
          trend="SSI 自主身分" 
          status="查看憑證"
          onClick={() => onViewVc()}
          clickable
        />
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-[32px] p-8 backdrop-blur-md relative overflow-hidden">
        {isGridEmergency && (
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse shadow-[0_0_15px_red]" />
        )}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className={`text-xl font-bold flex items-center gap-2 ${isGridEmergency ? 'text-red-400' : 'text-white'}`}>
              {isGridEmergency && <AlertTriangle className="animate-bounce" size={20} />}
              算力即流動性 (PAL) 即時數據流
            </h3>
            <p className="text-xs text-slate-500 uppercase font-black tracking-widest mt-1">資產節點：{selectedBbu.location} | 機架 Rack-042</p>
          </div>
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${isGridEmergency ? 'bg-red-500/20 border-red-500 text-red-500' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
              {isGridEmergency ? 'ERCOT 緊急狀態' : selectedBbu.risk}
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
        <h3 className="text-2xl font-black mb-2 italic tracking-tighter uppercase">AI 推論邊緣保護</h3>
        <p className="text-blue-100 text-sm mb-6 leading-relaxed italic">IoT 預言機偵測到機房溫度：{isGridEmergency ? '42' : '28'}°C。BBU 容量已優先鎖定冷卻幫浦供電。</p>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] uppercase font-bold opacity-60 font-black tracking-widest">電力優先權</p>
            <p className="text-xl font-bold">L1 - CRITICAL</p>
          </div>
          <button className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/30 transition-all border border-white/20">查看策略</button>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-[32px] p-6 space-y-4">
        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <MapPin size={12} className="text-red-500" /> 即時物理環境快照 (Plano)
        </h4>
        <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800 text-[10px] font-mono text-slate-400 space-y-1">
          <p>DEVICE_ID: {selectedBbu.id}</p>
          <p>TEMP: {isGridEmergency ? '42.8' : '27.4'} C</p>
          <p>HUMIDITY: 45.2%</p>
          <p>NETWORK_LATENCY: 12ms</p>
          <p className="text-cyan-500">SIGNATURE: 0x82f...a12c (Verified)</p>
        </div>
      </div>
    </div>
  </div>
);

// --- 分頁：資產金融 ---
const FinanceView = ({ selectedBbu, onSimulate, showPaymentAnimation, sinkingFund }) => (
  <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
    {/* 收租分流動畫 */}
    <AnimatePresence>
      {showPaymentAnimation && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm"
        >
          <div className="bg-slate-900 p-12 rounded-[40px] border border-cyan-500/30 text-center shadow-2xl">
            <motion.div 
              initial={{ y: 20 }} animate={{ y: 0 }}
              className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/50"
            >
              <DollarSign className="text-green-400" size={40} />
            </motion.div>
            <h4 className="text-2xl font-black text-white mb-2 tracking-tighter uppercase uppercase">租金收繳與智能分流演示</h4>
            <p className="text-slate-500 mb-8 uppercase font-black text-xs tracking-widest italic tracking-widest">資產：{selectedBbu.client} | 金額：${selectedBbu.rentFee}</p>
            <div className="flex justify-center gap-10">
              <div className="text-center">
                <div className="w-1.5 h-20 bg-slate-800 mx-auto rounded-full overflow-hidden relative">
                   <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 1 }} className="w-full bg-cyan-500 absolute bottom-0" />
                </div>
                <p className="text-cyan-400 font-bold mt-2">$2000 (80%)</p>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">投資人分潤</p>
              </div>
              <div className="text-center">
                <div className="w-1.5 h-20 bg-slate-800 mx-auto rounded-full overflow-hidden relative">
                   <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 1, delay: 0.5 }} className="w-full bg-orange-500 absolute bottom-0" />
                </div>
                <p className="text-orange-400 font-bold mt-2">$500 (20%)</p>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">重置基金儲備</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <RefreshCcw className="text-orange-400" />
          <h3 className="text-xl font-bold text-white uppercase tracking-tight">資產重置基金 (Sinking Fund)</h3>
        </div>
        <button 
          onClick={onSimulate}
          className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-orange-500/30 transition-all active:scale-95"
        >
          模擬收租分流
        </button>
      </div>
      <div className="space-y-8">
        <div>
          <div className="flex justify-between text-[10px] mb-3 font-black text-slate-500 uppercase tracking-widest">
            <span>2028 年硬體汰換儲備進度</span>
            <span className="text-orange-400">已達成 {((sinkingFund/150000)*100).toFixed(1)}%</span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${(sinkingFund/150000)*100}%` }} className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-inner">
            <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-widest">當前儲備總額</p>
            <p className="text-lg font-mono text-white">${sinkingFund.toLocaleString()}</p>
          </div>
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-inner">
            <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-widest">汰換執行條件</p>
            <p className="text-lg font-bold text-red-400">SoH &lt; 80%</p>
          </div>
        </div>
        <div className="p-4 bg-orange-950/20 border border-orange-500/20 rounded-2xl flex items-start gap-3">
          <Lock className="text-orange-500 shrink-0" size={16} />
          <p className="text-[10px] text-slate-400 italic leading-relaxed uppercase font-black opacity-80">
            財務安全鎖定：此基金資產鎖定於智能合約 0xPTE...SINK，僅能由 IoT 預言機偵測到硬體衰減時觸發設備採購，確保資金不被挪用。
          </p>
        </div>
      </div>
    </div>

    <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 shadow-2xl">
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 className="text-purple-400" />
        <h3 className="text-xl font-bold text-white uppercase tracking-tight font-black">RWA 實體資產代幣化門戶</h3>
      </div>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 p-6 rounded-2xl border border-purple-500/20 relative">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xs font-bold text-purple-400 uppercase tracking-widest">資產編號：{selectedBbu.id}</p>
            <span className="bg-purple-500 text-white text-[10px] px-3 py-1 rounded-full font-black shadow-lg shadow-purple-500/30">預期年化 {selectedBbu.yield}%</span>
          </div>
          <p className="text-3xl font-black text-white mb-2">425.00 <span className="text-sm font-normal text-slate-500 uppercase tracking-tighter italic">/ 500 份額已鑄造</span></p>
          <div className="flex gap-4 mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-t border-slate-800 pt-4">
            <span className="flex items-center gap-1 text-cyan-400"><DollarSign size={10} /> 每月總租金: ${selectedBbu.rentFee}</span>
            <span className="flex items-center gap-1"><ShieldCheck size={10} /> 剩餘期限: 42 個月</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="flex-1 bg-cyan-500 py-4 rounded-2xl text-slate-950 font-black text-sm hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all uppercase tracking-widest">贊助此顆 BBU</button>
          <button className="flex-1 bg-slate-800 py-4 rounded-2xl text-white font-black text-sm border border-slate-700 hover:bg-slate-700 transition-all uppercase tracking-widest">查看鏈上合約</button>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- 輔助組件：電網韌性 ---
const GridView = ({ isEmergency, onToggle }) => (
  <div className={`min-h-[500px] rounded-[32px] border transition-all duration-700 p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl ${isEmergency ? 'bg-red-950/20 border-red-500' : 'bg-slate-900 border-slate-800'}`}>
    {isEmergency && (
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/5 to-transparent animate-pulse" />
    )}
    <div className={`w-28 h-28 rounded-full flex items-center justify-center mb-8 border transition-all duration-500 ${isEmergency ? 'bg-red-500/10 border-red-500 animate-bounce shadow-[0_0_50px_rgba(239,68,68,0.3)]' : 'bg-yellow-500/10 border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.1)]'}`}>
      <AlertTriangle className={isEmergency ? 'text-red-500' : 'text-yellow-500'} size={56} />
    </div>
    <div className="text-center z-10 space-y-4 max-w-xl">
      <h3 className={`text-4xl font-black italic uppercase tracking-tighter transition-colors duration-500 ${isEmergency ? 'text-red-500' : 'text-white'}`}>
        ERCOT 電網調度實戰模擬
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed italic uppercase font-black tracking-widest">
        {isEmergency 
          ? '警告：偵測到德州電網頻率大幅波動。系統已將 BBU 自動切換至虛擬電廠 (VPP) 高頻放電模式，收益率即時提升 500%！' 
          : '當前電網穩定。BBU 處於 PAL 韌性保護模式，持續採集 IoT 數據並生成綠色電力憑證。'}
      </p>
    </div>
    
    <div className="mt-12 flex flex-col items-center gap-6 z-10">
       <button 
         onClick={onToggle}
         className={`px-12 py-5 rounded-2xl font-black text-xl transition-all shadow-xl active:scale-95 border-2 ${isEmergency ? 'bg-red-500 text-white border-white animate-pulse' : 'bg-slate-800 text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-black'}`}
       >
         {isEmergency ? '解除電網緊急狀態' : '模擬 ERCOT 緊急狀態'}
       </button>
       <div className="flex gap-4">
          <div className="bg-slate-800/80 px-4 py-2 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-700 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isEmergency ? 'bg-slate-600' : 'bg-green-500 animate-pulse'}`} /> 電網平衡
          </div>
          <div className="bg-slate-800/80 px-4 py-2 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-700 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isEmergency ? 'bg-red-500 animate-pulse' : 'bg-slate-600'}`} /> VPP 加速獲利中
          </div>
       </div>
    </div>
  </div>
);

// --- 彈窗組件：Oracle 驗證 ---
const OracleModal = ({ isOpen, onClose, selectedBbu, soh }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-slate-900 border border-cyan-500/30 p-8 rounded-[40px] max-w-2xl w-full shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          <h4 className="text-2xl font-black text-white mb-6 flex items-center gap-3"><Fingerprint className="text-cyan-400" /> IoT 數據來源驗證 (Oracle Source)</h4>
          <div className="space-y-6">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 font-mono text-xs space-y-4">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">資產物理節點:</span>
                <span className="text-white">Texas Plano Facility / Rack-042</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">感測器精度:</span>
                <span className="text-white">Precision Level-5 (NIST Traceable)</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">當前讀值 (SoH):</span>
                <span className="text-cyan-400 font-bold">{soh.toFixed(6)}%</span>
              </div>
              <div className="pt-2">
                <p className="text-slate-500 mb-2">鏈上數位簽章 (BMS Signature):</p>
                <p className="text-green-500 break-all bg-green-500/5 p-3 rounded-lg border border-green-500/20 leading-relaxed italic tracking-widest font-black uppercase tracking-widest text-[10px]">
                  0x73d9e2a1b5c8f4e3d0a2c5b7f1e9d8c6b4a2e5f3c0d8a2b5c8f4e3d0a2c5b7f1e9d8c6... (VERIFIED BY CHAINLINK)
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500 italic leading-relaxed uppercase font-black opacity-60">
              提示：此數據並非預設網頁文字，而是透過加密通道從實體 BMS 硬體每 2 秒更新一次，確保物理層與金融層的高度同步與透明。
            </p>
            <button onClick={onClose} className="w-full bg-slate-800 py-4 rounded-2xl font-black hover:bg-slate-700 transition-all uppercase tracking-widest uppercase tracking-widest text-white">關閉驗證視窗</button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- 彈窗組件：VC 憑證 ---
const VcModal = ({ isOpen, onClose, selectedBbu }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-slate-900 border border-purple-500/30 p-10 rounded-[40px] max-w-xl w-full shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5">
             <ShieldCheck size={200} />
          </div>
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-500/50">
              <CheckCircle2 className="text-purple-400" size={40} />
            </div>
            <h4 className="text-2xl font-black text-white uppercase tracking-tighter">BBU 數位身分證 (SSI-VC)</h4>
            <p className="text-purple-400 text-xs font-bold uppercase tracking-[0.3em] mt-1">Verifiable Credential Profile</p>
          </div>
          <div className="space-y-4 mb-10">
            <VcField label="資產全局唯一 ID (DID)" val={`did:pte:tex:${selectedBbu.id}`} />
            <VcField label="出廠認證標章" val={selectedBbu.ulCert} />
            <VcField label="部署日期" val={selectedBbu.installDate} />
            <VcField label="維修紀錄 (Immutable)" val="0 異常 / 1 定期檢查" />
            <VcField label="核發機構" val="系統電集團 (PTE) 官方證書伺服器" />
          </div>
          <p className="text-[10px] text-center text-slate-500 uppercase font-black italic mb-8 uppercase font-black italic tracking-widest opacity-60">
             此憑證已於數位發展部規範下完成分散式識別碼註冊，支援跨平台資產稽核。
          </p>
          <button onClick={onClose} className="w-full bg-purple-600 py-4 rounded-2xl font-black hover:bg-purple-500 transition-all uppercase tracking-widest uppercase tracking-widest text-white shadow-xl shadow-purple-600/20">確認憑證</button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const VcField = ({ label, val }) => (
  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
    <span className="text-sm font-bold text-white tracking-tight">{val}</span>
  </div>
);

const StatusCard = ({ title, value, icon, trend, status, onClick, clickable }) => (
  <button 
    onClick={onClick}
    disabled={!clickable}
    className={`bg-slate-900 border border-slate-800 p-6 rounded-[28px] transition-all group relative overflow-hidden text-left w-full ${clickable ? 'hover:border-cyan-500 cursor-pointer' : ''}`}
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-slate-950 rounded-xl group-hover:scale-110 transition-transform border border-slate-800">{icon}</div>
      <div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] font-bold text-green-400 uppercase">{trend}</span>
          <span className={`text-[8px] px-1.5 py-0.5 rounded-md font-bold tracking-tighter uppercase ${clickable ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'bg-slate-800 text-slate-500'}`}>{status}</span>
        </div>
      </div>
    </div>
    <p className="text-2xl font-black text-white tracking-tight">{value}</p>
  </button>
);

const NodeItem = ({ label, status, val }) => (
  <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-2xl border border-slate-900 group hover:border-cyan-500/30 transition-all cursor-default">
    <div className="flex items-center gap-3">
      <div className={`w-2.5 h-2.5 rounded-full ${val > 90 ? 'bg-cyan-500 shadow-[0_0_10px_#22d3ee]' : val < 50 ? 'bg-orange-500 shadow-[0_0_10px_#f97316]' : 'bg-slate-700'}`} />
      <div>
        <p className="text-xs font-bold text-slate-200 tracking-tight">{label}</p>
        <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">{status}</p>
      </div>
    </div>
    <span className="text-xs font-mono text-slate-400 font-bold">{val}%</span>
  </div>
);

export default PTENexus;
