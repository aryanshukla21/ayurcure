export const DoctorCard = ({ name, specialty, rating, experience, languages, fee }) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start gap-4">
      <div className="w-20 h-20 bg-ayur-green-light rounded-2xl overflow-hidden flex-shrink-0">
        {/* Placeholder for Doctor Image */}
        <div className="w-full h-full bg-gray-200" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className="text-lg font-bold text-gray-800">{name}</h4>
          <div className="flex items-center gap-1 text-sm font-bold text-gray-800">
            ⭐ <span>{rating}</span>
          </div>
        </div>
        <p className="text-ayur-orange text-sm font-medium uppercase tracking-wider">{specialty}</p>
        <div className="mt-4 space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span>💼</span> <span>{experience}+ years experience</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🌐</span> <span>{languages}</span>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-6 flex items-center justify-between pt-6 border-t border-gray-50">
      <div>
        <p className="text-xs text-gray-400 uppercase font-bold">Consultation Fee</p>
        <p className="text-xl font-bold text-gray-800">₹{fee}</p>
      </div>
      <button className="bg-ayur-orange text-white px-6 py-2 rounded-xl font-bold hover:scale-105 transition-transform">
        Select Doctor →
      </button>
    </div>
  </div>
);