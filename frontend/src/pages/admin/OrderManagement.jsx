import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Button } from '../../components/common/Button';

export const OrderManagement = () => {
  const orders = [
    { id: "#ORD-8291", customer: "Anjali Sharma", email: "anjali@example.com", date: "Oct 24, 2023", total: "$124.50", payment: "Paid", status: "Shipped" },
    { id: "#ORD-8290", customer: "Rahul Kapoor", email: "rahul.k@domain.in", date: "Oct 23, 2023", total: "$89.00", payment: "Pending", status: "Processing" },
    { id: "#ORD-8289", customer: "Priya Varma", email: "priya@webmail.com", date: "Oct 23, 2023", total: "$340.20", payment: "Paid", status: "Shipped" },
    { id: "#ORD-8288", customer: "Suresh Menon", email: "s.menon@mail.org", date: "Oct 22, 2023", total: "$55.75", payment: "Refunded", status: "Cancelled" },
  ];

  return (
    <DashboardLayout activeTab="Orders">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Orders Management</h2>
          <p className="text-gray-500 mt-2">Real-time overview of all customer purchases and fulfillment status.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="flex items-center gap-2">📥 Export CSV</Button>
          <Button variant="primary" className="flex items-center gap-2"><span>+</span> Create Order</Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 font-medium mb-2">Total Orders</p>
            <h3 className="text-3xl font-bold text-gray-800">1,284</h3>
            <p className="text-sm text-green-500 font-bold mt-2">↑ +12% <span className="text-gray-400 font-normal">from last month</span></p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 font-medium mb-2">Pending Processing</p>
            <h3 className="text-3xl font-bold text-gray-800">42</h3>
            <p className="text-sm text-red-500 font-bold mt-2">⚠️ Action required</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 font-medium mb-2">Total Revenue</p>
            <h3 className="text-3xl font-bold text-gray-800">$14,290.00</h3>
            <p className="text-sm text-green-500 font-bold mt-2">↑ +8.4% <span className="text-gray-400 font-normal">growth</span></p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 font-medium mb-2">Shipped Today</p>
            <h3 className="text-3xl font-bold text-gray-800">18</h3>
            <p className="text-sm text-gray-400 font-medium mt-2">Target: 25 orders</p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3 px-4 w-1/3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-gray-400">🔍</span>
              <input type="text" placeholder="Search by Order ID or Customer..." className="w-full bg-transparent p-3 outline-none text-sm" />
            </div>
            <div className="flex gap-4">
              <select className="bg-gray-50 border border-gray-200 text-sm p-3 rounded-xl outline-none font-medium text-gray-600">
                <option>Status: All</option>
                <option>Pending</option>
                <option>Shipped</option>
              </select>
              <select className="bg-gray-50 border border-gray-200 text-sm p-3 rounded-xl outline-none font-medium text-gray-600">
                <option>Date: Last 30 Days</option>
                <option>Last 7 Days</option>
              </select>
            </div>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <th className="pb-4 font-bold">Order ID</th>
                <th className="pb-4 font-bold">Customer</th>
                <th className="pb-4 font-bold">Date</th>
                <th className="pb-4 font-bold">Total</th>
                <th className="pb-4 font-bold">Payment</th>
                <th className="pb-4 font-bold">Status</th>
                <th className="pb-4 font-bold text-right pr-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders.map((order, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-5 font-bold text-gray-800">{order.id}</td>
                  <td className="py-5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-ayur-orange/20 text-ayur-orange flex items-center justify-center text-xs font-bold">
                      {order.customer.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{order.customer}</p>
                      <p className="text-xs text-gray-500">{order.email}</p>
                    </div>
                  </td>
                  <td className="py-5 text-gray-600">{order.date}</td>
                  <td className="py-5 font-bold text-gray-800">{order.total}</td>
                  <td className="py-5">
                    <span className={`text-xs font-bold ${order.payment === 'Paid' ? 'text-green-600' : order.payment === 'Pending' ? 'text-yellow-600' : 'text-gray-500'}`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${order.status === 'Shipped' ? 'bg-blue-500' : order.status === 'Processing' ? 'bg-yellow-400' : 'bg-gray-400'}`}></span>
                      <span className="text-gray-600 font-medium">{order.status}</span>
                    </div>
                  </td>
                  <td className="py-5 text-right pr-4 text-gray-400 hover:text-gray-600 cursor-pointer">
                    ⋮
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="flex justify-between items-center mt-8 text-sm text-gray-500">
            <p>Showing 1 to 4 of 1,284 results</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 hover:text-gray-800 font-bold">Previous</button>
              <button className="w-8 h-8 rounded-lg bg-ayur-orange text-white font-bold">1</button>
              <button className="w-8 h-8 rounded-lg hover:bg-gray-100 font-bold">2</button>
              <button className="px-4 py-2 hover:text-gray-800 font-bold">Next</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};