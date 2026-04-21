import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, ShieldCheck, DollarSign, Globe, Activity, 
  RefreshCcw, Cpu, BarChart3, ArrowUpRight, AlertTriangle, ChevronRight, MapPin
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
    rentFee: 2500, // 月租金 (USD)
    yield: 8.5,    // 預期年化 (%)
    risk: '低風險',
    location: '德州 普萊諾',
    color: 'cyan'
  },
  {
    id: 'BBU-TX-042',
    name: '邊緣 AI 運算集群',
    client: '德州 SME 創新實驗室',
    soh: 92.1580,
    rentFee: 1200,
    yield: 12.2,   // 風險較高，收益較高
    risk: '中風險',
    location: '德州 奧斯丁',
    color: 'purple'
  },
  {
    id: 'BBU-TW-101',
    name: '算力韌性示範機架',
    client: '台積電 德州供應鏈節點',
    soh: 99.8820,
    rentFee: 3200,
    yield: 6.8,    // 極度穩定，收益較低
    risk: '極低風險',
    location: '德州 達拉斯',
    color: 'green'
  }
];

const PTENexus = () => {
  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const [selectedBbu, setSelectedBbu] = useState(BBU_ASSETS[0]);
  const [revenue, setRevenue] = useState(12450.80);
  const [localSoh, setLocalSoh] = useState(BBU_ASSETS[0].soh);

  // 模擬即時 IoT 預言機數據跳動
  useEffect(() => {
    const timer = setInterval(() => {
      setRevenue(r => r + (selectedBbu.rentFee / 30 / 24 / 60 / 30)); // 根據租金動態計算收益
      setLocalSoh(s => s - 0.000001);
    }, 2000);
    return () => clearInterval(timer);
  }, [selectedBbu]);

  // 切換資產時重置 SoH
  useEffect(() => {
    setLocalSoh(selectedBbu.soh);
  }, [selectedBbu]);

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
              <p className="text-[10px] text-slate-500 font-bold uppercase">平台即時總收益</p>
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
                    className={`p-4 rounded-2xl border transition-all text-left group ${selectedBbu.id === asset.id ? 'bg-slate-800 border-cyan-500 shadow-lg shadow-cyan-500/10' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'}`}
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

              <DashboardView revenue={revenue} soh={localSoh} selectedBbu={selectedBbu} />
            </motion.div>
          )}
          {activeTab === 'FINANCE' && <FinanceView key="fin" selectedBbu={selectedBbu} />}
          {activeTab === 'GRID' && <GridView key="grid" />}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- 分頁：運籌看板 ---
const DashboardView = ({ revenue, soh, selectedBbu }) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <div className="lg:col-span-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatusCard title="電池健康度 (SoH)" value={`${soh.toFixed(6)}%`} icon={<ShieldCheck className="text-cyan-400" />} trend="IoT 預言機在線" status="極佳" />
        <StatusCard title="算力韌性貢獻" value={`${(selectedBbu.rentFee/100).toFixed(2)} MW`} icon={<Activity className="text-yellow-400" />} trend="動態介入中" status="VPP 模式" />
        <StatusCard title="碳權收益憑證" value={`${(selectedBbu.rentFee * 0.12).toFixed(0)}t`} icon={<Globe className="text-green-400" />} trend="GreenProof 驗證" status="已核發" />
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-[32px] p-8 backdrop-blur-md">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">算力即流動性 (PAL) 模擬數據</h3>
            <p className="text-xs text-slate-500">當前資產：{selectedBbu.id} | {selectedBbu.client} 專屬電力韌性數據</p>
          </div>
          <div className="flex gap-2">
            <span className="bg-slate-800 px-3 py-1 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedBbu.risk}</span>
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={Array.from({ length: 20 }, (_, i) => ({ name: `${i}:00`, value: 30 + (selectedBbu.yield * 5) + Math.random() * 20 }))}>
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
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[32px] p-8 text-white relative overflow-hidden group shadow-2xl shadow-indigo-500/20">
        <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
          <Cpu size={160} />
        </div>
        <h3 className="text-2xl font-black mb-2 italic tracking-tighter uppercase uppercase">AI 推論邊緣保護</h3>
        <p className="text-blue-100 text-sm mb-6 leading-relaxed italic">系統偵測到高強度推論任務。BBU 容量已鎖定，確保 GPU 冷卻系統絕對供電。</p>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] uppercase font-bold opacity-60 font-black tracking-widest text-white">當前權限等級</p>
            <p className="text-xl font-bold">L1 - 關鍵優先</p>
          </div>
          <button className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/30 transition-all border border-white/20">策略設定</button>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-[32px] p-6 space-y-4">
        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <MapPin size={12} className="text-red-500" /> 德州區域節點健康狀態
        </h4>
        <NodeItem label="Rack-01 (達拉斯)" status="穩定運行" val={92} />
        <NodeItem label="Rack-02 (普萊諾)" status="高負載" val={98} />
        <NodeItem label="Rack-03 (奧斯丁)" status="維護中" val={45} />
      </div>
    </div>
  </div>
);

// --- 分頁：資產金融 ---
const FinanceView = ({ selectedBbu }) => (
  <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 shadow-2xl">
      <div className="flex items-center gap-3 mb-8">
        <RefreshCcw className="text-orange-400" />
        <h3 className="text-xl font-bold text-white uppercase tracking-tight">資產重置基金 (Sinking Fund)</h3>
      </div>
      <div className="space-y-8">
        <div>
          <div className="flex justify-between text-[10px] mb-3 font-black text-slate-500 uppercase tracking-widest">
            <span>2028 年硬體汰換儲備進度</span>
            <span className="text-orange-400">已達成 32.5%</span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: '32.5%' }} className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-inner">
            <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-widest">基金總鎖倉價值</p>
            <p className="text-lg font-mono text-white">$48,200.00</p>
          </div>
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-inner">
            <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-widest">儲備金收益率</p>
            <p className="text-lg font-mono text-green-400">5.2% APY</p>
          </div>
        </div>
        <p className="text-[10px] text-slate-500 italic leading-relaxed uppercase font-black opacity-40">
          系統自動從客戶「{selectedBbu.client}」每月租金中撥備 20% 進入智能合約，確保算力韌性無縫更新。
        </p>
      </div>
    </div>

    <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 shadow-2xl">
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 className="text-purple-400" />
        <h3 className="text-xl font-bold text-white uppercase tracking-tight font-black underline decoration-purple-500/20 underline-offset-8">RWA 實體資產代幣化門戶</h3>
      </div>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 p-6 rounded-2xl border border-purple-500/20 relative">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xs font-bold text-purple-400 uppercase tracking-widest">資產編號：{selectedBbu.id}</p>
            <span className="bg-purple-500 text-white text-[10px] px-3 py-1 rounded-full font-black shadow-lg shadow-purple-500/30">預期年化 {selectedBbu.yield}%</span>
          </div>
          <p className="text-3xl font-black text-white mb-2">425.00 <span className="text-sm font-normal text-slate-500 uppercase tracking-tighter italic">/ 500 份額已鑄造</span></p>
          <div className="flex gap-4 mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-t border-slate-800 pt-4">
            <span className="flex items-center gap-1 text-cyan-400"><DollarSign size={10} /> 每月租金收益: ${selectedBbu.rentFee}</span>
            <span className="flex items-center gap-1"><ShieldCheck size={10} /> 剩餘期限: 42 個月</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="flex-1 bg-cyan-500 py-4 rounded-2xl text-slate-950 font-black text-sm hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all uppercase tracking-widest uppercase tracking-widest">贊助此顆 BBU</button>
          <button className="flex-1 bg-slate-800 py-4 rounded-2xl text-white font-black text-sm border border-slate-700 hover:bg-slate-700 transition-all uppercase tracking-widest uppercase tracking-widest">查看鏈上合約</button>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- 輔助組件 ---
const GridView = () => (
  <div className="h-[500px] bg-slate-900 rounded-[32px] border border-slate-800 flex flex-col items-center justify-center p-8 space-y-6 relative overflow-hidden shadow-2xl">
    <div className="w-24 h-24 bg-yellow-500/10 rounded-full flex items-center justify-center animate-pulse border border-yellow-500/20 shadow-[0_0_40px_rgba(234,179,8,0.1)]">
      <AlertTriangle className="text-yellow-500" size={48} />
    </div>
    <div className="text-center z-10">
      <h3 className="text-3xl font-black text-white mb-3 tracking-tighter italic uppercase">ERCOT 電網韌性即時地圖</h3>
      <p className="text-slate-500 max-w-md text-sm leading-relaxed mx-auto italic">
        正在串接德州能源節點。系統目前模擬 Node Plano-04 之「頻率調整」與「削峰填谷」收益生成。
      </p>
    </div>
    <div className="flex gap-4 mt-8">
      <div className="bg-slate-800 px-6 py-3 rounded-2xl border border-slate-700 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
        <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]" /> 電網穩定
      </div>
      <div className="bg-slate-800 px-6 py-3 rounded-2xl border border-slate-800 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
        <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_8px_#eab308]" /> VPP 啟動中
      </div>
    </div>
  </div>
);

const StatusCard = ({ title, value, icon, trend, status }) => (
  <div className="bg-slate-900 border border-slate-800 p-6 rounded-[28px] hover:border-slate-700 transition-all group relative overflow-hidden">
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-slate-950 rounded-xl group-hover:scale-110 transition-transform border border-slate-800">{icon}</div>
      <div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] font-bold text-green-400 uppercase">{trend}</span>
          <span className="text-[8px] px-1.5 py-0.5 bg-slate-800 rounded-md text-slate-500 font-bold tracking-tighter uppercase">{status}</span>
        </div>
      </div>
    </div>
    <p className="text-2xl font-black text-white tracking-tight">{value}</p>
  </div>
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
