import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, ShieldCheck, DollarSign, Globe, Activity,
  RefreshCcw, Cpu, BarChart3, ArrowUpRight, TrendingUp,
  ChevronRight, MapPin, CheckCircle2, Lock, Fingerprint,
  Search, Bell, BrainCircuit, History, ArrowRightLeft,
  Leaf, Info, ExternalLink, Code, ShieldAlert, FileSearch, Database,
  PiggyBank, Recycle, BadgeDollarSign, LineChart, Target, Landmark
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend
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
    aiStatus: '警示 - 偵測到租約更新需求'
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

// --- 收益比較數據 ---
const ROI_COMPARISON = [
  { name: '定期存款', roi: 1.8, risk: '極低', color: '#64748b' },
  { name: '政府公債', roi: 3.2, risk: '低', color: '#6366f1' },
  { name: 'REITs', roi: 5.5, risk: '中', color: '#8b5cf6' },
  { name: 'BBU-TX-001', roi: 8.5, risk: '低', color: '#22d3ee' },
  { name: 'BBU-TX-042', roi: 12.2, risk: '中低', color: '#a855f7' },
  { name: 'BBU-TW-101', roi: 6.8, risk: '極低', color: '#22c55e' },
];

// --- 年度收益預測 ---
const REVENUE_PROJECTION = Array.from({ length: 8 }, (_, i) => ({
  year: `Y${i + 1}`,
  租賃收益: Math.round(6900 * (1 + i * 0.05)),
  二次市場: Math.round(800 * (1 + i * 0.12)),
  ESG碳權: Math.round(300 + i * 150),
}));

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
    title: '多元收益擴展',
    period: '2026 Q4',
    status: 'PENDING',
    items: ['B2B 多租戶升級方案上線', '二次壽命 (充電樁市場) 轉售收益啟動', 'ESG 碳足跡憑證商業化']
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
  const [showOracleModal, setShowOracleModal] = useState(false);
  const [showVcModal, setShowVcModal] = useState(false);
  const [showPaymentAnimation, setShowPaymentAnimation] = useState(false);
  const [sinkingFund, setSinkingFund] = useState(48200.00);
  const [notifications, setNotifications] = useState([]);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setRevenue(r => r + (selectedBbu.rentFee / 30 / 24 / 60 / 30));
      setLocalSoh(s => s - 0.000001);
      if (Math.random() > 0.99) {
        addNotification(`AI 自動稽核：資產 ${selectedBbu.id} 本月租賃收益達成率 102.3%。`, 'success');
      }
    }, 2000);
    return () => clearInterval(timer);
  }, [selectedBbu]);

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
              { id: 'REVENUE', label: '收益分析' },
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

        {/* 核心內容分頁 */}
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
          {activeTab === 'REVENUE' && (
            <RevenueView key="revenue" selectedBbu={selectedBbu} revenue={revenue} />
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

const DashboardView = ({ revenue, soh, selectedBbu, onVerifyOracle, onViewVc }) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <div className="lg:col-span-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatusCard title="自動化數據審計 (SoH)" value={`${soh.toFixed(6)}%`} icon={<Database className="text-cyan-400" />} trend="公正第三方認證" status="數據來源驗證" onClick={onVerifyOracle} clickable showVerifyIcon />
        <StatusCard title="月租金現金流" value={`$${selectedBbu.rentFee.toLocaleString()}`} icon={<BadgeDollarSign className="text-green-400" />} trend={`年化 ${selectedBbu.yield}% APY`} status="穩定收租中" />
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
            <span className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border bg-slate-800 border-slate-700 text-slate-400">
              自動化稽核對齊中
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <AiMetric label="轉換效率" val="92.1%" sub="Industry Leading" />
          <AiMetric label="租金達成率" val="102.3%" sub="本月目標超達" />
          <AiMetric label="負載預測" val="99.2%" sub="Precision" />
          <AiMetric label="ESG 減碳" val={`${(revenue * 0.01).toFixed(1)}t`} sub="Total Verified" />
        </div>

        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={Array.from({ length: 20 }, (_, i) => ({ name: `${i}:00`, value: 30 + (selectedBbu.yield * 3) + Math.random() * 20 }))}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '16px', fontSize: '12px', color: '#fff'}} />
              <Area type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
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

// --- 收益分析分頁 ---
const RevenueView = ({ selectedBbu, revenue }) => {
  const monthlyRental = BBU_ASSETS.reduce((sum, a) => sum + a.rentFee, 0);
  const annualRental = monthlyRental * 12;
  const secondaryEstimate = Math.round(annualRental * 0.12);
  const esgEstimate = Math.round(annualRental * 0.04);
  const totalAnnual = annualRental + secondaryEstimate + esgEstimate;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* 三大收益流概覽 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RevenueStreamCard
          icon={<Landmark className="text-cyan-400" size={28} />}
          title="設備租賃收益"
          subtitle="主力穩定現金流"
          monthly={`$${monthlyRental.toLocaleString()}`}
          annual={`$${annualRental.toLocaleString()}`}
          color="cyan"
          desc="以長期合約為基底，NVIDIA、台積電等級企業客戶持續付租，每月固定現金流入，可預期性最高。"
          badge="核心收益"
        />
        <RevenueStreamCard
          icon={<Recycle className="text-green-400" size={28} />}
          title="二次壽命轉售"
          subtitle="電池退役後的第二人生"
          monthly={`$${Math.round(secondaryEstimate/12).toLocaleString()}`}
          annual={`$${secondaryEstimate.toLocaleString()}`}
          color="green"
          desc="SoH 衰退至 80% 後，電池進入充電樁/儲能二級市場，平均殘值回收率達 60-70%，形成額外非線性收益。"
          badge="資產回收"
        />
        <RevenueStreamCard
          icon={<Leaf className="text-emerald-400" size={28} />}
          title="ESG 碳權收益"
          subtitle="可驗證減碳憑證商業化"
          monthly={`$${Math.round(esgEstimate/12).toLocaleString()}`}
          annual={`$${esgEstimate.toLocaleString()}`}
          color="emerald"
          desc="IoT 數據上鏈後形成可驗證碳足跡報告，通過第三方認證的碳憑證可在碳市場交易，開啟合規增益收益。"
          badge="ESG 加成"
        />
      </div>

      {/* 年度總收益摘要 */}
      <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic flex items-center gap-3"><TrendingUp className="text-cyan-400" /> 年度多元收益預測</h3>
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">三組 BBU 資產組合 | 8 年展望</p>
          </div>
          <div className="bg-slate-950 px-6 py-3 rounded-2xl border border-slate-800">
            <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">首年預估總收益</p>
            <p className="text-2xl font-black text-green-400 font-mono">${totalAnnual.toLocaleString()}</p>
          </div>
        </div>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={REVENUE_PROJECTION} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="year" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', fontSize: '11px', color: '#fff' }} formatter={(v, name) => [`$${v.toLocaleString()}`, name]} />
              <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }} />
              <Bar dataKey="租賃收益" stackId="a" fill="#22d3ee" radius={[0,0,0,0]} />
              <Bar dataKey="二次市場" stackId="a" fill="#22c55e" radius={[0,0,0,0]} />
              <Bar dataKey="ESG碳權" stackId="a" fill="#6ee7b7" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ROI 比較 */}
      <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 shadow-2xl">
        <h3 className="text-xl font-black text-white uppercase tracking-tighter italic flex items-center gap-3 mb-6"><Target className="text-purple-400" /> 投報率比較：傳統 vs BBU RWA</h3>
        <div className="space-y-3">
          {ROI_COMPARISON.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-24 shrink-0">{item.name}</span>
              <div className="flex-1 h-6 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.roi / 14) * 100}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="h-full rounded-xl flex items-center justify-end pr-3"
                  style={{ backgroundColor: item.color }}
                >
                  <span className="text-[9px] font-black text-slate-950 whitespace-nowrap">{item.roi}%</span>
                </motion.div>
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest w-12 shrink-0 ${item.risk === '低' || item.risk === '極低' ? 'text-green-400' : 'text-yellow-400'}`}>{item.risk}</span>
            </div>
          ))}
        </div>
        <p className="text-[9px] text-slate-600 italic mt-6 font-black uppercase tracking-widest">* APY 數值為預估值，實際收益受市場與設備狀況影響。BBU RWA 屬物理資產支撐，非純金融衍生品。</p>
      </div>

      {/* 投資人收益分潤說明 */}
      <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-[32px] p-8 shadow-2xl">
        <h3 className="text-xl font-black text-white uppercase tracking-tighter italic flex items-center gap-3 mb-6"><PiggyBank className="text-cyan-400" /> 投資人月結算分潤模型</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800 text-center">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">每月租金收入（三機合計）</p>
            <p className="text-3xl font-black text-white font-mono">${monthlyRental.toLocaleString()}</p>
            <p className="text-[9px] text-slate-500 italic mt-2 font-black uppercase">客戶付租金額</p>
          </div>
          <div className="bg-slate-950/60 p-6 rounded-2xl border border-cyan-500/20 text-center">
            <p className="text-[9px] font-black text-cyan-400 uppercase tracking-widest mb-2">投資人分紅（80%）</p>
            <p className="text-3xl font-black text-cyan-400 font-mono">${Math.round(monthlyRental * 0.8).toLocaleString()}</p>
            <p className="text-[9px] text-slate-500 italic mt-2 font-black uppercase">每月自動分配至持份人</p>
          </div>
          <div className="bg-slate-950/60 p-6 rounded-2xl border border-orange-500/20 text-center">
            <p className="text-[9px] font-black text-orange-400 uppercase tracking-widest mb-2">設備更新準備金（20%）</p>
            <p className="text-3xl font-black text-orange-400 font-mono">${Math.round(monthlyRental * 0.2).toLocaleString()}</p>
            <p className="text-[9px] text-slate-500 italic mt-2 font-black uppercase">自動撥入 Sinking Fund</p>
          </div>
        </div>
        <div className="mt-6 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl flex items-start gap-3">
          <Info className="text-cyan-400 shrink-0 mt-0.5" size={16} />
          <p className="text-[10px] text-slate-300 italic leading-relaxed font-black uppercase tracking-widest">分潤流程 100% 由智能合約自動執行，無人工干預。投資人可隨時在區塊鏈瀏覽器查驗每筆分紅交易記錄，實現完全透明的資產管理。</p>
        </div>
      </div>
    </motion.div>
  );
};

const RevenueStreamCard = ({ icon, title, subtitle, monthly, annual, color, desc, badge }) => {
  const colorMap = {
    cyan: 'border-cyan-500/30 shadow-cyan-500/5',
    green: 'border-green-500/30 shadow-green-500/5',
    emerald: 'border-emerald-500/30 shadow-emerald-500/5',
  };
  const badgeColor = {
    cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    green: 'bg-green-500/20 text-green-400 border-green-500/30',
    emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  };
  return (
    <div className={`bg-slate-900 border rounded-[32px] p-7 shadow-lg ${colorMap[color]}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">{icon}</div>
        <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${badgeColor[color]}`}>{badge}</span>
      </div>
      <h4 className="text-lg font-black text-white uppercase tracking-tighter italic mb-1">{title}</h4>
      <p className="text-[10px] text-slate-500 font-bold italic mb-4">{subtitle}</p>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
          <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest mb-1">月收益</p>
          <p className="text-base font-black text-white font-mono">{monthly}</p>
        </div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
          <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest mb-1">年收益</p>
          <p className="text-base font-black text-white font-mono">{annual}</p>
        </div>
      </div>
      <p className="text-[9px] text-slate-400 leading-relaxed italic font-bold">{desc}</p>
    </div>
  );
};

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
