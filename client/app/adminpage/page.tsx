'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaUserCog, FaCheckCircle, FaTimesCircle, FaClock, FaThLarge } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Dashboard() {
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

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-[#1E3A44] text-white p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-6">Yatriको</h1>
          <nav className="space-y-4">
            <div className="flex items-center gap-2 text-white font-semibold">
              <FaThLarge /> Dashboard
            </div>
            <div className="flex items-center gap-2">
              <FaUserCog /> User management
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle /> Approval
            </div>
          </nav>
        </div>
        <div className="text-sm flex items-center gap-2">
          <span className="text-white">
            <FaUserCog className="inline" /> Chandler Bing
          </span>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-white">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Number of users box */}
    <div className="bg-white shadow-lg p-4 rounded-xl text-black w-full" style={{ borderRadius: '10px' }}>
      <h2 className="text-lg font-semibold mb-4">Number of users</h2>
      <Bar data={userData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      <div className="mt-4 text-sm space-y-2">
        {/* Legend items */}
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

    {/* Approval Summary box */}
    <div className="bg-gray-100 shadow-inner rounded-xl p-4 text-black w-full">
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
</main>

    </div>
  );
}