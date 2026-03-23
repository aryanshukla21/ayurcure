import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Save, Loader2 } from 'lucide-react';

// Reusing the exact components from the Add Admin feature!
import AdminInfoSection from '../../components/admin/settings/admin-form/AdminInfoSection';
import SecuritySection from '../../components/admin/settings/admin-form/SecuritySection';
import AdminPolicyCards from '../../components/admin/settings/admin-form/AdminPolicyCards';

const AdminEditAdminPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  // Simulate fetching the admin data based on the ID
  useEffect(() => {
    setIsLoading(true);
    // Simulating API latency and loading the data shown in the PDF (Sarah Jenkins)
    setTimeout(() => {
      setFormData({
        fullName: 'Sarah Jenkins',
        email: 'sarah.j@ayurcare.com',
        role: 'System Administrator',
        password: '', // Leave blank for security reasons
        confirmPassword: '' 
      });
      setIsLoading(false);
    }, 400); 
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    console.log('Saving admin changes for ID:', id, formData);
    // Simulate API call and redirect back to the table
    navigate('/admin/settings');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-[#3A6447] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 md:p-10 max-w-[1000px] mx-auto animate-in fade-in duration-300 flex flex-col h-full">
      
      {/* Header & Breadcrumbs */}
      <div className="mb-10">
        <div className="flex items-center text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-4">
          <Link to="/admin/settings" className="hover:text-[#3A6447] transition-colors">Settings</Link>
          <ChevronRight size={12} className="mx-2" />
          <Link to="/admin/settings" className="hover:text-[#3A6447] transition-colors">Staff Management</Link>
          <ChevronRight size={12} className="mx-2" />
          <span className="text-gray-900">Edit Admin</span>
        </div>
        
        <div className="flex items-end gap-4 mb-2">
          <h1 className="text-3xl md:text-[32px] font-extrabold text-gray-900 tracking-tight leading-none">
            Edit Admin
          </h1>
          <span className="bg-[#EAE5D9] text-[#79563E] text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
            ID: #{id}
          </span>
        </div>
        <p className="text-sm font-medium text-gray-500">
          Update the administrative profile and modify access levels.
        </p>
      </div>

      {/* Main Form Sections (Reused) */}
      <div className="flex-1">
        <AdminInfoSection formData={formData} onChange={handleInputChange} />
        <SecuritySection formData={formData} onChange={handleInputChange} />
        
        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 mt-8">
          <button 
            onClick={() => navigate('/admin/settings')}
            className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors px-6 py-3.5 cursor-pointer"
          >
            Discard Changes
          </button>
          <button 
            onClick={handleSaveChanges}
            className="bg-[#3A6447] hover:bg-[#2C4D36] text-white font-bold py-3.5 px-8 rounded-full flex items-center justify-center gap-2 shadow-sm transition-colors text-sm cursor-pointer"
          >
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>

      {/* Bottom Information Cards (Reused) */}
      <AdminPolicyCards />

    </div>
  );
};

export default AdminEditAdminPage;