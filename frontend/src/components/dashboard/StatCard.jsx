export const StatCard = ({ label, value, trend, colorClass }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
    <p className="text-gray-500 text-sm font-medium">{label}</p>
    <div className="flex items-baseline gap-2 mt-1">
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      <span className={`text-xs font-semibold ${colorClass}`}>{trend}</span>
    </div>
    <div className={`h-1.5 w-full mt-3 rounded-full bg-gray-100`}>
      <div className={`h-full rounded-full ${colorClass.replace('text-', 'bg-')}`} style={{ width: '60%' }}></div>
    </div>
  </div>
);