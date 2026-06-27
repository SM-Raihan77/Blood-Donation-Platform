import { getFundingHistory } from '@/lib/action/FundingHistory';
import React from 'react';

const TransactionPage = async () => {
    const history = await getFundingHistory();
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                    {history.map((item) => (
                        <tr key={item._id}>
                            <td>{item.userEmail}</td>
                            <td>${item.amount}</td>
                            <td>
                                {new Date(item.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionPage;