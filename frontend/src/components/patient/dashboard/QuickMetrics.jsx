import React from 'react';
import { Pill, Droplets, Moon, Activity } from 'lucide-react';

const QuickMetrics = ({ metrics }) => {
  // Helper to get styling and icon based on metric type
  const getMetricStyle = (type) => {
    switch (type) {
      case 'medication':
        return { icon: Pill, iconBg: 'bg-green-100', iconColor: 'text-[#2C5F44]' };
      case 'hydration':
        return { icon: Droplets, iconBg: 'bg-amber-100', iconColor: 'text-[#A88B5D]' };
      case 'sleep':
        return { icon: Moon, iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' };
      default:
        return { icon: Activity, iconBg: 'bg-gray-100', iconColor: 'text-gray-600' };
    }
  };

  // Default fallback if backend returns empty array
  const defaultMetrics = [
    { title: 'Next Medication', value: '--', subtitle: 'No active schedule', type: 'medication' },
    { title: 'Hydration Goal', value: '--', subtitle: 'No data', type: 'hydration' },
    { title: 'Sleep Quality', value: '--', subtitle: 'No data', type: 'sleep' },
  ];

  const metricsToRender = metrics && metrics.length > 0 ? metrics : defaultMetrics;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metricsToRender.map((metric, index) => {
        const { icon: Icon, iconBg, iconColor } = getMetricStyle(metric.type);

        return (
          <div key={index} className="bg-[#F3F0E9] rounded-2xl p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}>
              <Icon size={24} />
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">{metric.title}</h4>
              <p className="text-sm font-bold text-gray-900 leading-tight">{metric.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{metric.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuickMetrics;