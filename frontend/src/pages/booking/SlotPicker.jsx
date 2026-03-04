export const SlotPicker = () => {
  const timeSlots = {
    morning: ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
    afternoon: ["01:00 PM", "02:00 PM", "03:30 PM"],
    evening: ["05:00 PM", "06:00 PM", "07:30 PM"]
  };

  return (
    <div className="space-y-8">
      {Object.entries(timeSlots).map(([period, slots]) => (
        <div key={period}>
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            {period === 'morning' ? '☀️' : period === 'afternoon' ? '🌤️' : '🌙'} {period}
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {slots.map((slot) => (
              <button
                key={slot}
                className={`py-3 rounded-xl border text-sm font-medium transition-all ${
                  slot === "10:00 AM" 
                  ? 'bg-ayur-orange border-ayur-orange text-white shadow-lg' 
                  : 'bg-white border-gray-200 text-gray-600 hover:border-ayur-orange hover:text-ayur-orange'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};