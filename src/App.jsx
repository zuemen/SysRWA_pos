import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, ShieldCheck, DollarSign, Globe, Activity, 
  RefreshCcw, Cpu, BarChart3, ArrowUpRight, AlertTriangle, 
  ChevronRight, MapPin, CheckCircle2, Lock, Fingerprint, 
  Search, Bell, BrainCircuit, History, ArrowRightLeft, 
  Leaf, Info, ExternalLink, Code, ShieldAlert, FileSearch, Database
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
    risk: '極低風險 (穩定收租)',
    location: '德州 普萊諾',
    color: 'cyan',
    ulCert: 'UL-2024-XP99',
    installDate: '2024-10-15',
    txHash: '0x82f...a12c',
    issuer: '系統電官方簽署',
    aiStatus: '運作中 - 設備租賃價值穩定'
  },
  {
    id: 'BBU-TX-042',
    name: '邊緣 AI 運算集群',
    client: '德州 SME 創新實驗室',
    soh: 92.1580,
    rentFee: 1200,
    yield: 12.2,
    risk: '中回報 (動態租約)',
    location: '德州 奧斯丁',
    color: 'purple',
    ulCert: 'UL-2024-SM12',
    installDate: '2024-11-20',
    txHash: '0x3e1...b5d4',
    issuer: '系統電官方簽署',
    aiStatus: '警示 - 偵測到電網負荷變動'
  },
  {
    id: 'BBU-TW-101',
    name: '算力韌性示範機架',
    client: '台積電 德州供應鏈節點',
    soh: 99.8820,
    rentFee: 3200,
    yield: 6.8,
    risk: '保本型 (長約擔保)',
    location: '德州 達拉斯',
    color: 'green',
    ulCert: 'UL-2024-TS01',
    installDate: '2024-12-05',
    txHash: '0x9a4...f7e2',
    issuer: '系統電官方簽署',
    aiStatus: '運作中 - 準備金撥備充足'
  }
];

// --- 發展藍圖數據 ---
const ROADMAP_STEPS = [
  {
    stage: '第一階段',
    title: '實體錨定與自動化審計',
    period: '2025 Q3 - 2026 Q1',
    status: 'COMPLETED',
    items: ['德州 Plano 廠自動化產線落地', 'IoT 數據公正人與 BMS 整合', '健康度 SoH 數據實時上鏈證明']
  },
  {
    stage: '第二階段',
    title: '份額認購與零門檻訂閱',
    period: '2026 Q2 - 當前執行中',
    status: 'ACTIVE',
    items: ['SPV 設備資產隔離載體完成', '合規認購門戶 (KYC) 開放', '中小企業 (SME) 租賃合約啟動']
  },
  {
    stage: '第三階段',
    title: '電力生財：虛擬電廠',
    period: '2026 Q4',
    status: 'PENDING',
    items: ['ERCOT 電網需量反應對接', 'VPP 高峰饋電自動化營運', '智能分流與回扣獎勵金系統']
  },
  {
    stage: '第四階段',
    title: 'ESG 循環與資產更新',
    period: '2027+',
    status: 'UPCOMING',
    items: ['準備金自動觸發汰換換機', '舊電池二次壽命轉售市場', '數位足跡與碳權憑證紀錄']
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
      
      // AI 即時日誌隨機觸發
      if (Math.random() > 0.99) {
        addNotification(`AI 自動稽核：資產 ${selectedBbu.id} 運作效率維持 92.1%。`, 'success');
      }
    }, 2000);
    return () => clearInterval(timer);
  }, [selectedBbu, isGridEmergency]);

  useEffect(() => {
    setLocalSoh(selectedBbu.soh);
    addNotification(`AI 接入：正在同步 ${selectedBbu.id} 物理環境與租賃數據。`, 'info');
  }, [selectedBbu]);

  const addNotification = (text, type) => {
    const id = Date.now();
    setNotifications(prev => [{ id, text, type }, ...prev].slice(0, 5));
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 6000);
  };

  const handleSimulatePayment = () => {
    setShowPaymentAnimation(true);
    setTimeout(() => {
      const platformTake = selectedBbu.rentFee * 0.8;
      const fundTake = selectedBbu.rentFee * 0.2;
      setRevenue(r => r + platformTake);
      setSinkingFund(s => s + fundTake);
      setShowPaymentAnimation(false);
      addNotification(`資產租金結算完成：$${fundTake} 已自動撥付至設備更新準備金。`, 'success');
    }, 3000);
  };

  const handleEmergencyToggle = () => {
    const newState = !isGridEmergency;
    setIsGridEmergency(newState);
    if (newState) {
      addNotification('🚨 緊急啟動：德州電網過載！AI 已將資產切換至 VPP 高頻放電模式。', 'error');
    } else {
      addNotification('✅ 狀態恢復：電網回穩，系統轉回常規設備保護模式。', 'success');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans p-4 lg:p-8">
      {/* 背景霓虹光暈 */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      {/* 通知中心 */}
      <div className="fixed top-24 right-8 z-[100] w-80 space-y-3">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div 
              key={n.id} initial={{ opacity: 0, x: 50, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
              className={`p-4 rounded-2xl border text-[10px] font-black shadow-2xl backdrop-blur-2xl flex gap-3 items-center ${
                n.type === 'error' ? 'bg-red-500/20 border-red-500 text-red-400' :
                n.type === 'warning' ? 'bg-orange-500/20 border-orange-500 text-orange-400' :
                n.type === 'success' ? 'bg-green-500/20 border-green-500 text-green-400' :
                'bg-cyan-500/20 border-cyan-500 text-cyan-400'
              }`}
            >
              <BrainCircuit size={16} className="shrink-0" />
              <span className="leading-tight">{n.text}</span>
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
              <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">PTE-PAL <span className="text-cyan-400 text-sm tracking-widest ml-1 font-bold italic underline decoration-cyan-500/30 underline-offset-4 font-black tracking-[0.2em]">NEXUS 管理平台</span></h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">系統電 40 年工藝：設備租賃與自動化審計系統</p>
            </div>
          </div>
          
          <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            {[
              { id: 'DASHBOARD', label: '即時看板' },
              { id: 'FINANCE', label: '設備金融' },
              { id: 'GRID', label: '電力調度' },
              { id: 'ROADMAP', label: '執行藍圖' }
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
              {isWalletConnected && <span className="block text-[8px] font-black text-green-500 uppercase tracking-widest mb-1">合規 KYC 通過 (ERC-3643)</span>}
              <p className="text-[8px] text-slate-500 font-black uppercase tracking-[0.3em]">設備租賃總收益 (USD)</p>
              <p className="text-xl font-mono text-green-400 font-bold">${revenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
            </div>
            <button 
              onClick={() => setIsWalletConnected(!isWalletConnected)}
              className={`${isWalletConnected ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white text-black'} px-6 py-3 rounded-2xl font-black text-sm transition-all active:scale-95 shadow-xl`}
            >
              {isWalletConnected ? '0x82f...a12c (審核通過)' : '連結錢包 (合規准入)'}
            </button>
          </div>
        </nav>

        <AnimatePresence mode="wait">
          {activeTab === 'DASHBOARD' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {BBU_ASSETS.map((asset) => (
                  <button 
                    key={asset.id}
                    onClick={() => setSelectedBbu(asset)}
                    className={`p-5 rounded-2xl border transition-all text-left group relative overflow-hidden ${selectedBbu.id === asset.id ? 'bg-slate-800 border-cyan-500 shadow-lg shadow-cyan-500/10' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className={`text-[9px] font-black uppercase tracking-widest ${selectedBbu.id === asset.id ? 'text-cyan-400' : 'text-slate-500'}`}>{asset.id}</p>
                      {selectedBbu.id === asset.id && <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#06b6d4]" />}
                    </div>
                    <p className="text-base font-black text-white group-hover:text-cyan-400 transition-colors tracking-tighter italic uppercase">{asset.name}</p>
                    <p className="text-[10px] text-slate-500 mt-1 font-bold italic">{asset.client}</p>
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
              onToggle={handleEmergencyToggle} 
            />
          )}
          {activeTab === 'ROADMAP' && (
             <RoadmapView key="roadmap" />
          )}
        </AnimatePresence>

        <OracleModal isOpen={showOracleModal} onClose={() => setShowOracleModal(false)} selectedBbu={selectedBbu} soh={localSoh} />
        <VcModal isOpen={showVcModal} onClose={() => setShowVcModal(false)} selectedBbu={selectedBbu} />
      </div>
    </div>
  );
};

const DashboardView = ({ revenue, soh, selectedBbu, onVerifyOracle, onViewVc, isGridEmergency }) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <div className="lg:col-span-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatusCard title="自動化數據審計 (SoH)" value={`${soh.toFixed(6)}%`} icon={<Database className="text-cyan-400" />} trend="公正第三方認證" status="數據來源驗證" onClick={onVerifyOracle} clickable showVerifyIcon />
        <StatusCard title="電力調度貢獻" value={`${(selectedBbu.rentFee/100 * (isGridEmergency ? 2.5 : 1)).toFixed(2)} MW`} icon={<Zap className="text-yellow-400" />} trend={isGridEmergency ? "VPP 緊急饋電" : "韌性保護中"} status={isGridEmergency ? "獲利加倍" : "需量反應"} />
        <StatusCard title="設備數位身分證" value={selectedBbu.id} icon={<Fingerprint className="text-purple-400" />} trend="SSI 全生命週期" status="查看 VC 憑證" onClick={onViewVc} clickable showVerifyIcon />
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-[32px] p-8 backdrop-blur-md relative overflow-hidden">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-3 italic">
              <BrainCircuit className="text-cyan-400 animate-pulse" size={24} /> AI 即時資產分析摘要
            </h3>
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">物理對象：{selectedBbu.name} | 稽核紀錄 Tx: {selectedBbu.txHash}</p>
          </div>
          <div className="flex gap-2">
            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${isGridEmergency ? 'bg-red-500/20 border-red-500 text-red-500 shadow-[0_0_10px_red]' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
              {isGridEmergency ? 'ERCOT 危急' : '自動化稽核對齊中'}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <AiMetric label="轉換效率" val="92.1%" sub="Industry Leading" />
          <AiMetric label="熱能負荷" val={isGridEmergency ? "高" : "正常"} sub={isGridEmergency ? "42.8°C" : "27.4°C"} danger={isGridEmergency} />
          <AiMetric label="負載預測" val="99.2%" sub="Precision" />
          <AiMetric label="ESG 減碳" val={`${(revenue * 0.01).toFixed(1)}t`} sub="Total Verified" />
        </div>

        <div className="h-[200px]">
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
      <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-6 space-y-4 shadow-2xl">
        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2 underline decoration-cyan-500/30 underline-offset-4">AI 實時稽核日誌</h4>
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar italic font-bold">
          <AiLog time="10:42" text="[物理層] 物聯網預言機加密簽名確認。" />
          <AiLog time="10:45" text="[租賃層] 租金流水分潤條款已鎖定。" />
          <AiLog time="10:52" text="[審計層] 每秒 SoH 數據已同步至公正第三方。" />
        </div>
      </div>
      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[32px] p-8 text-white relative overflow-hidden group shadow-2xl">
        <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform"><BrainCircuit size={160} /></div>
        <h3 className="text-2xl font-black mb-2 italic tracking-tighter uppercase font-black">AI 資產保全策略</h3>
        <p className="text-blue-100 text-xs mb-6 leading-relaxed italic font-bold">「BMS 讓電池能用，而 IoT 層讓電池值錢」。AI 已根據即時狀態自動預留備援容量，確保資產產出的穩定現金流。</p>
        <button className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black hover:bg-white/30 transition-all border border-white/20 uppercase tracking-widest">策略管理</button>
      </div>
    </div>
  </div>
);

const FinanceView = ({ selectedBbu, onSimulate, showPaymentAnimation, sinkingFund, isWalletConnected }) => (
  <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
    <AnimatePresence>
      {showPaymentAnimation && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 p-12 rounded-[40px] border border-cyan-500/30 text-center shadow-2xl max-w-lg w-full">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/50"><DollarSign className="text-green-400" size={40} /></div>
            <h4 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter italic">租金自動分流演示</h4>
            <p className="text-slate-500 mb-8 font-black text-xs tracking-widest italic uppercase">客戶：{selectedBbu.client}</p>
            <div className="flex justify-center gap-12">
              <div className="text-center">
                <div className="w-1.5 h-24 bg-slate-800 mx-auto rounded-full overflow-hidden relative"><motion.div initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 1 }} className="w-full bg-cyan-500 absolute bottom-0" /></div>
                <p className="text-cyan-400 font-black mt-3">$2000 (80%)</p>
                <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest mt-1">投資人分紅</p>
              </div>
              <div className="text-center">
                <div className="w-1.5 h-24 bg-slate-800 mx-auto rounded-full overflow-hidden relative"><motion.div initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 1, delay: 0.5 }} className="w-full bg-orange-500 absolute bottom-0" /></div>
                <p className="text-orange-400 font-black mt-3">$500 (20%)</p>
                <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest mt-1">更新準備金</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 shadow-2xl relative overflow-hidden group">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3"><RefreshCcw className="text-orange-400" /><h3 className="text-xl font-bold text-white uppercase tracking-tight italic font-black">設備更新準備金 (Sinking Fund)</h3></div>
        <button onClick={onSimulate} className="bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-orange-500/20 transition-all active:scale-95">模擬自動收租分流</button>
      </div>
      <div className="space-y-8">
        <div>
          <div className="flex justify-between text-[10px] mb-3 font-black text-slate-500 uppercase tracking-widest"><span>2028 年舊換新資金積累</span><span className="text-orange-400">達成率 {((sinkingFund/150000)*100).toFixed(1)}%</span></div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${(sinkingFund/150000)*100}%` }} className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 shadow-[0_0_15px_rgba(249,115,22,0.5)]" /></div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-inner"><p className="text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-widest">目前存額</p><p className="text-lg font-mono text-white">${sinkingFund.toLocaleString()}</p></div>
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-inner"><p className="text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-widest italic">汰換啟動門檻</p><p className="text-lg font-black text-red-500 tracking-tighter">SoH &lt; 80%</p></div>
        </div>
        <div className="p-4 bg-orange-950/20 border border-orange-500/20 rounded-2xl space-y-3">
          <div className="flex items-start gap-3"><ShieldAlert className="text-orange-500 shrink-0" size={16} /><p className="text-[9px] text-slate-400 italic leading-relaxed uppercase font-black tracking-widest">資產二次壽命策略：當 AI 診斷確認設備衰減至 80% 以下時，準備金將自動採購新一代 BBU。舊電池轉入二級市場（充電樁），實現 100% 價值回收。</p></div>
          <div className="flex items-center gap-2 pl-7"><div className="px-2 py-0.5 bg-orange-500 text-white text-[8px] font-black rounded uppercase shadow-lg shadow-orange-500/20 animate-pulse">自動執行</div><p className="text-[8px] text-orange-400 font-bold italic tracking-widest">保證投資人資產永遠是賺錢的活設備。</p></div>
        </div>
      </div>
    </div>
    <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 shadow-2xl relative">
      <div className="flex items-center gap-3 mb-8"><BarChart3 className="text-purple-400" /><h3 className="text-xl font-bold text-white uppercase tracking-tight italic font-black">合規資產份額化認購</h3></div>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-900/10 to-indigo-900/10 p-6 rounded-2xl border border-purple-500/20 relative group">
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col"><p className="text-xs font-black text-purple-400 uppercase tracking-widest italic">資產編號：{selectedBbu.id}</p>{isWalletConnected && <span className="text-[8px] text-green-500 font-black mt-1">✓ 符合 ERC-3643 合規標準</span>}</div>
            <span className="bg-purple-500 text-white text-[10px] px-3 py-1 rounded-full font-black shadow-lg shadow-purple-500/30 tracking-widest italic">{selectedBbu.yield}% APY</span>
          </div>
          <p className="text-3xl font-black text-white mb-2 tracking-tighter italic">425.00 <span className="text-sm font-normal text-slate-500 uppercase tracking-widest font-bold">/ 500 份額</span></p>
          <div className="flex gap-4 mt-4 text-[9px] font-bold text-slate-500 uppercase tracking-widest border-t border-slate-800 pt-4 italic"><span className="flex items-center gap-1 text-cyan-400 tracking-widest">資產抵押率: 150%</span><span className="flex items-center gap-1 tracking-widest">監管: US Reg D 合規</span></div>
        </div>
        <div className="flex gap-4">
          <button disabled={!isWalletConnected} className={`flex-1 py-4 rounded-2xl font-black text-xs transition-all uppercase tracking-widest italic ${isWalletConnected ? 'bg-cyan-500 text-slate-950 hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]' : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'}`}>{isWalletConnected ? '認購此顆實體 BBU' : '請先連結錢包 KYC'}</button>
          <button className="flex-1 bg-slate-800 py-4 rounded-2xl text-white font-black text-xs border border-slate-700 hover:bg-slate-700 transition-all uppercase tracking-widest italic">查看審計合約</button>
        </div>
      </div>
    </div>
  </motion.div>
);

const GridView = ({ isEmergency, onToggle }) => (
  <div className={`min-h-[500px] rounded-[32px] border transition-all duration-700 p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl ${isEmergency ? 'bg-red-950/20 border-red-500' : 'bg-slate-900 border-slate-800'}`}>
    {isEmergency && <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/10 to-transparent animate-pulse" />}
    <motion.div animate={isEmergency ? { scale: [1, 1.1, 1] } : {}} transition={{ repeat: Infinity, duration: 1 }} className={`w-32 h-32 rounded-full flex items-center justify-center mb-8 border transition-all duration-500 ${isEmergency ? 'bg-red-500/10 border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.4)]' : 'bg-yellow-500/10 border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.1)]'}`}><AlertTriangle className={isEmergency ? 'text-red-500' : 'text-yellow-500'} size={64} /></motion.div>
    <div className="text-center z-10 space-y-4 max-w-xl">
      <h3 className={`text-5xl font-black italic uppercase tracking-tighter transition-colors duration-500 ${isEmergency ? 'text-red-500' : 'text-white'}`}>ERCOT 電力調度實測</h3>
      <p className="text-slate-400 text-sm leading-relaxed italic uppercase font-black tracking-[0.2em]">
        {isEmergency ? '系統偵測到電網頻率大幅波動，BBU 已自動切換至虛擬電廠 (VPP) 模式，參與需量反應服務，實時獲利回饋倍率提升至 5.0x。' : '目前德州電網負載穩定。BBU 處於日常設備租賃模式，持續為 AI 機房提供高品質的電力韌性保障。'}
      </p>
    </div>
    <div className="mt-12 flex flex-col items-center gap-6 z-10">
       <button onClick={onToggle} className={`px-16 py-6 rounded-2xl font-black text-2xl transition-all shadow-xl active:scale-95 border-2 ${isEmergency ? 'bg-red-500 text-white border-white animate-pulse' : 'bg-slate-800 text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-black'}`}>{isEmergency ? '結束電網緊急應變' : '模擬 ERCOT 緊急模式 (VPP)'}</button>
       <div className="flex gap-4">
          <div className="bg-slate-800/80 px-4 py-2 rounded-xl text-[9px] font-black text-slate-400 uppercase tracking-widest border border-slate-700 flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${isEmergency ? 'bg-slate-600' : 'bg-green-500 animate-pulse'}`} /> 能源韌性模式</div>
          <div className="bg-slate-800/80 px-4 py-2 rounded-xl text-[9px] font-black text-slate-400 uppercase tracking-widest border border-slate-700 flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${isEmergency ? 'bg-red-500 animate-pulse' : 'bg-slate-600'}`} /> VPP 獲利加倍中</div>
       </div>
    </div>
  </div>
);

const RoadmapView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {ROADMAP_STEPS.map((step, idx) => (
      <div key={idx} className={`bg-slate-900 border p-8 rounded-[32px] relative overflow-hidden flex flex-col ${step.status === 'ACTIVE' ? 'border-cyan-500 shadow-lg shadow-cyan-500/10' : 'border-slate-800'}`}>
        {step.status === 'COMPLETED' && <div className="absolute top-4 right-4 text-green-500"><CheckCircle2 size={24} /></div>}
        {step.status === 'ACTIVE' && <div className="absolute top-4 right-4 text-cyan-400 animate-pulse font-black text-[10px] tracking-widest uppercase">當前執行中</div>}
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">{step.stage}</p>
        <h4 className="text-lg font-black text-white mb-1 uppercase tracking-tighter italic">{step.title}</h4>
        <p className="text-[10px] text-slate-400 font-bold mb-6 italic">{step.period}</p>
        <div className="space-y-4 flex-grow">{step.items.map((item, i) => (<div key={i} className="flex gap-3 items-start"><div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${step.status === 'COMPLETED' ? 'bg-green-500' : step.status === 'ACTIVE' ? 'bg-cyan-500' : 'bg-slate-700'}`} /><p className="text-[11px] text-slate-300 font-black leading-relaxed italic uppercase">{item}</p></div>))}</div>
        {step.status === 'ACTIVE' && <div className="mt-8 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center gap-3 italic"><Info className="text-cyan-400 shrink-0" size={16} /><p className="text-[9px] text-cyan-400 font-black tracking-widest leading-tight uppercase italic font-black">PoC 正在演示：自動化審計與租賃代幣化。</p></div>}
      </div>
    ))}
  </motion.div>
);

const AiMetric = ({ label, val, sub, danger }) => (
  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-inner group hover:border-cyan-500/30 transition-all"><p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p><p className={`text-xl font-black italic tracking-tighter ${danger ? 'text-red-500 animate-pulse' : 'text-cyan-400'}`}>{val}</p><p className="text-[8px] text-slate-600 font-bold uppercase mt-1 italic">{sub}</p></div>
);

const AiLog = ({ time, text }) => (
  <div className="flex gap-3 items-start p-3 bg-slate-950/30 rounded-xl border border-slate-900 group hover:border-cyan-500/20 transition-all"><div className="w-1 h-8 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]" /><div><p className="text-[8px] text-slate-500 font-black mb-1 italic tracking-widest">{time} | 自動化稽核</p><p className="text-[10px] text-slate-300 font-bold leading-tight italic tracking-tight">{text}</p></div></div>
);

const OracleModal = ({ isOpen, onClose, selectedBbu, soh }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-slate-900 border border-cyan-500/30 p-10 rounded-[40px] max-w-2xl w-full shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-center mb-8"><h4 className="text-2xl font-black text-white flex items-center gap-3 italic tracking-tighter uppercase"><Globe className="text-cyan-400" /> 物聯網預言機：物理證明</h4><div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-lg flex items-center gap-2"><div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" /><span className="text-[8px] font-black text-cyan-400 tracking-widest uppercase italic">Verified by Chainlink Oracle</span></div></div>
          <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 font-mono text-[10px] space-y-5 text-slate-400 relative italic font-bold"><div className="flex justify-between border-b border-slate-800 pb-2"><span>物理精度讀值 (SoH):</span><span className="text-cyan-400 font-black underline italic tracking-widest">{soh.toFixed(6)}%</span></div><div className="flex justify-between border-b border-slate-800 pb-2"><span>上鏈交易哈希 (Tx Hash):</span><span className="text-white hover:text-cyan-400 cursor-pointer flex items-center gap-1 font-bold underline tracking-tighter">{selectedBbu.txHash} <ExternalLink size={10} /></span></div><div className="flex justify-between border-b border-slate-800 pb-2"><span>數據完整性:</span><span className="text-green-500 font-black tracking-widest">AUTHENTIC_✓</span></div></div>
          <p className="mt-8 text-[11px] text-slate-500 italic leading-relaxed font-black opacity-80 border-l-2 border-cyan-500 pl-4 uppercase">「數據直接從電池感應器加密推送，不經過人工報表。投資者看見的健康度變化在區塊鏈上都有不可竄改記錄，實現 100% 自動化審計。」</p>
          <button onClick={onClose} className="w-full mt-10 bg-slate-800 py-4 rounded-2xl font-black uppercase tracking-widest text-white hover:bg-slate-700 transition-all italic tracking-widest shadow-xl shadow-cyan-500/5">關閉證明</button>
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
            <div className="flex justify-between items-center mb-8"><h4 className="text-2xl font-black text-white flex items-center gap-3 uppercase italic tracking-tighter"><Fingerprint className="text-purple-400" /> 設備數位身分證 (SSI-VC)</h4><button onClick={() => setShowRaw(!showRaw)} className="text-[10px] font-black text-slate-500 hover:text-purple-400 flex items-center gap-1 transition-colors uppercase italic"><Code size={12} /> {showRaw ? '查看簡介' : '查看 VC 原始碼'}</button></div>
            {showRaw ? (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 font-mono text-[9px] text-purple-300 h-64 overflow-y-auto custom-scrollbar italic leading-relaxed"><pre>{JSON.stringify({ "@context": ["https://www.w3.org/2018/credentials/v1"], "type": ["VerifiableCredential", "BBUCredential"], "issuer": `did:pte:issuer:Sysgration_Official`, "issuanceDate": selectedBbu.installDate, "credentialSubject": { "id": `did:pte:tex:${selectedBbu.id}`, "ulCertification": selectedBbu.ulCert, "manufacturer": "Sysgration Plano Facility" }, "proof": { "type": "Ed25519Signature2018", "jws": "eyJhbGciOiJFZERTQSIs..." } }, null, 2)}</pre></motion.div>) : (<div className="space-y-5"><VcField label="資產 DID (全球唯一 ID)" val={`did:pte:tex:${selectedBbu.id}`} /><VcField label="官方認證背書" val={selectedBbu.issuer} /><VcField label="UL 安全認證編號" val={selectedBbu.ulCert} /><VcField label="德州佈署日期" val={selectedBbu.installDate} /><div className="p-4 bg-purple-950/20 border border-purple-500/20 rounded-2xl mt-4 italic font-black"><p className="text-[10px] text-slate-400 italic font-black leading-relaxed uppercase tracking-widest opacity-80 uppercase">官方背書：每一組 BBU 均利用 SSI 技術簽發數位憑證。這解決了二手市場的信任問題，未來轉賣時，這張憑證就是價值保證。</p></div></div>)}
            <button onClick={onClose} className="w-full mt-10 bg-purple-600 py-4 rounded-2xl font-black hover:bg-purple-500 transition-all uppercase tracking-widest text-white shadow-xl shadow-purple-600/20 italic tracking-widest">確認憑證內容</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const VcField = ({ label, val }) => (<div className="flex justify-between items-center border-b border-slate-800 pb-3"><span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span><span className="text-sm font-black text-white tracking-tight italic">{val}</span></div>);

const StatusCard = ({ title, value, icon, trend, status, onClick, clickable, showVerifyIcon }) => (
  <button onClick={onClick} disabled={!clickable} className={`bg-slate-900 border border-slate-800 p-7 rounded-[28px] transition-all group text-left w-full relative overflow-hidden ${clickable ? 'hover:border-cyan-500 cursor-pointer shadow-lg shadow-cyan-500/5' : ''}`}>
    {showVerifyIcon && <div className="absolute top-4 right-4 text-cyan-400/50 group-hover:text-cyan-400 transition-colors animate-pulse"><FileSearch size={18} /></div>}
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 shadow-inner">{icon}</div>
      <div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{title}</p>
        <div className="flex items-center gap-2 mt-0.5"><span className="text-[9px] font-black text-green-400 uppercase tracking-tighter">{trend}</span><span className={`text-[8px] px-2 py-0.5 rounded-md font-black tracking-tighter uppercase ${clickable ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'bg-slate-800 text-slate-500'}`}>{status}</span></div>
      </div>
    </div>
    <p className="text-3xl font-black text-white tracking-tighter italic">{value}</p>
  </button>
);

export default PTENexus;
/ /   u p d a t e   1 . 9 . 5  
 