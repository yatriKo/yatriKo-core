'use client';
import React from 'react';

import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  FaUserCog,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaThLarge,
  FaTrash,
} from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const userData = {
    labels: ['Travelers', 'Guest house owners', 'Bus owners', 'Travel agents'],
    datasets: [
      {
        label: 'Number of users',
        data: [10, 8, 7, 5],
        backgroundColor: ['#d6f365', '#f7b2f0', '#a0e9f1', '#b58af1'],
        borderRadius: 5,
      },
    ],
  };

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white shadow-lg p-4 rounded-xl text-black">
        <h2 className="text-lg font-semibold mb-4">Number of users</h2>
        <Bar data={userData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        <div className="mt-4 text-sm space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-lime-400 rounded-sm inline-block"></span>
            <p className="text-black">Travelers - 10</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-rose-400 rounded-sm inline-block"></span>
            <p className="text-black">Guest house owners - 8</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-cyan-400 rounded-sm inline-block"></span>
            <p className="text-black">Bus owners - 7</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-purple-500 rounded-sm inline-block"></span>
            <p className="text-black">Travel agents - 5</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 shadow-inner rounded-xl p-4 text-black">
        <h2 className="text-lg font-semibold mb-2">Approval Summary</h2>
        <div className="flex items-center gap-4 bg-white rounded p-3 mb-2 shadow-sm">
          <FaClock className="text-blue-900" />
          <div>
            <p className="font-semibold">Pending</p>
            <p>10</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white rounded p-3 mb-2 shadow-sm">
          <FaCheckCircle className="text-blue-900" />
          <div>
            <p className="font-semibold">Approved</p>
            <p>7</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white rounded p-3 shadow-sm">
          <FaTimesCircle className="text-blue-900" />
          <div>
            <p className="font-semibold">Denied</p>
            <p>9</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserRow = (
    name: string,
    owner: string,
    number: string | number,
    total: number
  ) => (
    <tr className="border-b text-center" key={`${name}-${number}`}>
      <td>{name}</td>
      <td>{owner}</td>
      <td>{number}</td>
      <td>{total}</td>
      <td><FaTrash className="text-red-500 cursor-pointer" /></td>
    </tr>
  );
  

  const renderUserManagement = () => {
    const userGroups = [
      'GUESTHOUSE OWNERS',
      'TRAVELERS',
      'BUS OWNERS',
      'GUESTHOUSE OWNERS',
      'TRAVELERS',
      'BUS OWNERS',
    ];
  
    return (
      <div className="h-[calc(100vh-100px)] overflow-y-auto pr-2 space-y-6 text-sm text-black">
        {userGroups.map((group) => (
          <div key={group} className="bg-gray-50 rounded-xl shadow p-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              {group} LIST
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border-separate border-spacing-y-2">
                <thead className="bg-gray-100 rounded">
                  <tr className="text-gray-600 text-sm">
                    <th className="p-3 rounded-l-lg">
                      {group.includes('GUEST')
                        ? 'Hotel'
                        : group.includes('BUS')
                        ? 'Bus'
                        : group.includes('DRIVER')
                        ? 'Driver'
                        : group.includes('GUIDE')
                        ? 'Guide'
                        : 'Traveler'}{' '}
                      Name
                    </th>
                    <th className="p-3">
                      {group.includes('GUEST')
                        ? "Hotel owner's name"
                        : group.includes('BUS')
                        ? "Bus owner's name"
                        : group.includes('DRIVER')
                        ? "License no."
                        : group.includes('GUIDE')
                        ? "Experience"
                        : 'Email/number'}
                    </th>
                    <th className="p-3">Number</th>
                    <th className="p-3">
                      {group.includes('BUS')
                        ? 'Total passengers'
                        : group.includes('GUIDE')
                        ? 'Tours done'
                        : 'Total guests'}
                    </th>
                    <th className="p-3 rounded-r-lg">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {renderUserRow('ABC', 'ajijs wwsjks', '982562829', 26)}
                  {renderUserRow('XYZ', 'Test user', '9812345678', 15)}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-[#1E3A44] text-white p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-6">Yatriको</h1>
          <nav className="space-y-4">
            <div
              className={`flex items-center gap-2 cursor-pointer font-semibold ${activeTab === 'dashboard' ? 'text-white' : 'text-gray-300'}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <FaThLarge /> Dashboard
            </div>
            <div
              className={`flex items-center gap-2 cursor-pointer ${activeTab === 'user' ? 'text-white' : 'text-gray-300'}`}
              onClick={() => setActiveTab('user')}
            >
              <FaUserCog /> User management
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <FaCheckCircle /> Approval
            </div>
          </nav>
        </div>
        <div className="text-sm flex items-center gap-2">
          <span>
            <FaUserCog className="inline" /> Chandler Bing
          </span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-white overflow-hidden">
  {activeTab === 'dashboard' && (
    <div key="dashboard">{renderDashboard()}</div>
  )}
  {activeTab === 'user' && (
    <div key="user">{renderUserManagement()}</div>
  )}
</main>

    </div>
  );
}
