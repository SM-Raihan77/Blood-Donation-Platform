import { getFundingHistory } from '@/lib/action/FundingHistory';
import React from 'react';
import { Calendar, Mail, DollarSign, Wallet } from 'lucide-react'; // Elegant icons for UI

const TransactionPage = async () => {
    const history = await getFundingHistory();

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            
            {/* Page Header - Icon and Title aligned together */}
            <div className="flex items-center gap-3.5 mb-6">
                <div className="p-2.5 bg-red-50 text-red-600 rounded-xl shrink-0">
                    <Wallet size={24} />
                </div>
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-800">Transaction History</h1>
                    <p className="text-sm text-slate-500">View and track all platform funding logs</p>
                </div>
            </div>

            {/* Responsive Table Container */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-600">
                                <th className="px-6 py-4 text-sm font-semibold tracking-wide">
                                    <div className="flex items-center gap-2">
                                        <Mail size={16} className="text-slate-400" />
                                        <span>User Email</span>
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold tracking-wide">
                                    <div className="flex items-center gap-2">
                                        <DollarSign size={16} className="text-slate-400" />
                                        <span>Amount</span>
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold tracking-wide">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-slate-400" />
                                        <span>Date</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 text-slate-700">
                            {history && history.length > 0 ? (
                                history.map((item) => (
                                    <tr 
                                        key={item._id} 
                                        className="hover:bg-slate-50/50 transition-colors duration-200"
                                    >
                                        {/* Email Column */}
                                        <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                            {item.userEmail}
                                        </td>
                                        
                                        {/* Amount Column with Badging */}
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-lg text-sm">
                                                ৳{item.amount?.toLocaleString()}
                                            </span>
                                        </td>
                                        
                                        {/* Date Column */}
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {new Date(item.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="px-6 py-10 text-center text-slate-400 text-sm">
                                        No transactions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TransactionPage;