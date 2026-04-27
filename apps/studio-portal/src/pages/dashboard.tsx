import React from 'react';

// Devopstrio API-First Design Studio
// Executive Dashboard

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-indigo-500/30">
            {/* Global Topbar */}
            <header className="border-b border-indigo-500/20 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-screen-2xl mx-auto px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center font-black shadow-lg shadow-indigo-600/30">DS</div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight">API Design Studio <span className="text-indigo-400 font-normal ml-2">Enterprise</span></h1>
                            <p className="text-xs text-slate-400 font-mono">devopstrio.co.uk / platform-eng</p>
                        </div>
                    </div>
                    <nav className="hidden md:flex gap-8">
                        {['Portfolio', 'Governance', 'Codegen Config', 'Consumer Analytics'].map((item) => (
                            <a key={item} href="#" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">{item}</a>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="max-w-screen-2xl mx-auto px-8 py-10">
                {/* Executive KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    {[
                        { label: 'Total Managed APIs', value: '142', sub: 'Across 14 Domains' },
                        { label: 'Governance Score', value: '94%', sub: 'Global Compliance', color: 'emerald' },
                        { label: 'Active Mock Servers', value: '38', sub: 'Supporting 82 UI Devs', color: 'blue' },
                        { label: 'Code Stubs Generated', value: '1.2k', sub: 'Last 30 Days', color: 'purple' }
                    ].map((kpi, idx) => (
                        <div key={idx} className="bg-slate-900/40 p-6 rounded-3xl border border-white/5 hover:bg-slate-900/60 transition-all cursor-default relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all"></div>
                            <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">{kpi.label}</span>
                            <div className="text-4xl font-black mt-2 text-white">{kpi.value}</div>
                            <div className={`text-xs mt-2 ${kpi.color ? `text-${kpi.color}-400` : 'text-slate-400'}`}>{kpi.sub}</div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    {/* Active API Contracts List */}
                    <div className="xl:col-span-8 bg-slate-900/40 rounded-[2.5rem] p-8 border border-white/5">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-lg font-bold">Active Contract Pipeline</h2>
                            <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                                + New OpenAPI Contract
                            </button>
                        </div>

                        <div className="space-y-4">
                            {[
                                { name: 'Customer Identity API', type: 'REST / OpenAPI 3.1', ver: 'v2.4.0', status: 'Published', gov: '98%', consumers: 42 },
                                { name: 'Order Fulfillment Streaming', type: 'AsyncAPI 2.6', ver: 'v1.0.0-draft', status: 'In Design', gov: '45%', consumers: 0 },
                                { name: 'Global Payment Gateway', type: 'REST / OpenAPI 3.0', ver: 'v3.1.2', status: 'Reviewing', gov: '82%', consumers: 12 },
                            ].map((api, idx) => (
                                <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-[#020617]/50 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-white mb-1">{api.name}</span>
                                        <span className="text-xs text-slate-400 font-mono">{api.type} | {api.ver}</span>
                                    </div>
                                    <div className="flex items-center gap-8 mt-4 md:mt-0">
                                        <div className="flex flex-col items-center">
                                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">State</span>
                                            <span className={`text-xs font-bold px-2 py-1 rounded bg-slate-800 text-slate-300`}>{api.status}</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Score</span>
                                            <span className={`text-xs font-bold ${parseInt(api.gov) > 80 ? 'text-emerald-400' : 'text-rose-400'}`}>{api.gov}</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Consumers</span>
                                            <span className="text-xs font-bold text-blue-400">{api.consumers} Apps</span>
                                        </div>
                                        <button className="text-indigo-400 hover:text-white transition-colors">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Operational Engines Console */}
                    <div className="xl:col-span-4 space-y-6">
                        <div className="bg-gradient-to-br from-indigo-900/20 to-[#020617] p-8 rounded-[2.5rem] border border-indigo-500/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <svg className="w-32 h-32 text-indigo-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                            </div>
                            <h3 className="font-bold text-lg mb-6 relative z-10">Governance Engine</h3>
                            <ul className="space-y-4 relative z-10">
                                <li className="flex justify-between items-center bg-black/20 p-3 rounded-lg text-sm">
                                    <span className="text-slate-300">Auth RFC Check</span>
                                    <span className="text-emerald-400 font-bold">PASS</span>
                                </li>
                                <li className="flex justify-between items-center bg-black/20 p-3 rounded-lg text-sm">
                                    <span className="text-slate-300">Pagination Standard</span>
                                    <span className="text-emerald-400 font-bold">PASS</span>
                                </li>
                                <li className="flex justify-between items-center bg-black/20 p-3 rounded-lg text-sm">
                                    <span className="text-slate-300">Backward Compat</span>
                                    <span className="text-amber-400 font-bold">WARN</span>
                                </li>
                            </ul>
                            <button className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all relative z-10">
                                Edit Global Ruleset
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
