"use client";
import React from "react";
import {
  LineChart, Line, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar
} from "recharts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const data = [
  { name: "12 Aug", revenue: 12000, orders: 8000 },
  { name: "13 Aug", revenue: 14000, orders: 9500 },
  { name: "14 Aug", revenue: 10000, orders: 7000 },
  { name: "15 Aug", revenue: 16000, orders: 10500 },
  { name: "16 Aug", revenue: 14500, orders: 9800 },
  { name: "17 Aug", revenue: 15000, orders: 9900 },
  { name: "18 Aug", revenue: 17000, orders: 11000 },
];

const categoryData = [
  { name: "Electronics", value: 1200000 },
  { name: "Fashion", value: 950000 },
  { name: "Home & Kitchen", value: 750000 },
  { name: "Beauty & Personal Care", value: 500000 },
];
const COLORS = ["#FF7A00", "#FFB74D", "#FFCC80", "#FFE0B2"];

const trafficData = [
  { name: "Direct Traffic", value: 40 },
  { name: "Organic Search", value: 30 },
  { name: "Social Media", value: 15 },
  { name: "Referral Traffic", value: 10 },
  { name: "Email Campaigns", value: 5 },
];

export default function AdminDashboard() {
  return (
    <div className="bg-[#fafafa] min-h-screen p-6 rounded-2xl">
      <div className="grid grid-cols-4 gap-6">
        {/* Stat Cards */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-gray-500 text-sm">Total Sales</p>
          <h2 className="text-2xl font-bold">$983,410</h2>
          <p className="text-green-500 text-xs">+1.5% vs last week</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <h2 className="text-2xl font-bold">58,375</h2>
          <p className="text-red-500 text-xs">-2.0% vs last week</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-gray-500 text-sm">Total Visitors</p>
          <h2 className="text-2xl font-bold">237,782</h2>
          <p className="text-green-500 text-xs">+0.2% vs last week</p>
        </div>
        {/* Top Categories */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex justify-between">
            <p className="text-sm font-medium">Top Categories</p>
            <a href="#" className="text-orange-500 text-xs">See All</a>
          </div>
          <div className="flex items-center mt-4">
            <PieChart width={120} height={120}>
              <Pie
                data={categoryData}
                cx={60}
                cy={60}
                innerRadius={35}
                outerRadius={55}
                dataKey="value"
              >
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            <div className="ml-4 text-xs">
              {categoryData.map((c, i) => (
                <p key={i} className="flex justify-between w-48">
                  <span>{c.name}</span>
                  <span>${c.value.toLocaleString()}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Analysis */}
        <div className="bg-white p-4 rounded-lg shadow-sm border col-span-2">
          <div className="flex justify-between">
            <p className="text-sm font-medium">Revenue Analytics</p>
            <button className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
              Last 8 Days
            </button>
          </div>
          <div className="h-48 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#FF7A00" strokeWidth={2} />
                <Line type="monotone" dataKey="orders" stroke="#FFB74D" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Target */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm font-medium">Monthly Target</p>
          <div className="flex flex-col items-center mt-4">
            <div className="w-28 h-28">
              <CircularProgressbar
                value={85}
                text={`85%`}
                styles={buildStyles({
                  pathColor: "#FF7A00",
                  textColor: "#333",
                  trailColor: "#eee",
                })}
              />
            </div>
            <p className="mt-2 text-green-600 text-xs font-medium">Great Progress! 🚀</p>
            <p className="text-xs text-gray-500 text-center">
              Our revenue increased by <b>$300,205</b> and reached <b>$3,400,000</b>.
            </p>
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm font-medium">Active Users</p>
          <h2 className="text-2xl font-bold mt-1">2,758</h2>
          <p className="text-green-500 text-xs">+6.2% last month</p>
          <div className="mt-3 text-xs space-y-1">
            <div className="flex justify-between"><span>United States</span><span>36%</span></div>
            <div className="flex justify-between"><span>United Kingdom</span><span>24%</span></div>
            <div className="flex justify-between"><span>Indonesia</span><span>17.5%</span></div>
            <div className="flex justify-between"><span>Russia</span><span>15%</span></div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white p-4 rounded-lg shadow-sm border col-span-2">
          <div className="flex justify-between">
            <p className="text-sm font-medium">Conversion Rate</p>
            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">This Week</span>
          </div>
          <div className="mt-4 text-xs space-y-2">
            <div className="flex justify-between"><span>Product Views</span><span>25,000</span></div>
            <div className="flex justify-between"><span>Add to Cart</span><span>12,000</span></div>
            <div className="flex justify-between"><span>Proceeded to Checkout</span><span>8,500</span></div>
            <div className="flex justify-between"><span>Completed Purchases</span><span>6,200</span></div>
          </div>
        </div>

        {/* This Week */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm font-medium">This Week</p>
          <p className="text-xs mt-3 flex justify-between">Orders <span>3,000</span></p>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm font-medium">Traffic Sources</p>
          <div className="mt-3">
            <BarChart width={250} height={150} data={trafficData}>
              <XAxis dataKey="name" hide />
              <Bar dataKey="value" fill="#FF7A00" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
}
