export const Button = ({ children, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-ayur-orange text-white hover:bg-opacity-90',
    secondary: 'bg-ayur-green text-white hover:bg-ayur-green-dark',
    outline: 'border-2 border-ayur-green text-ayur-green hover:bg-ayur-green hover:text-white',
  };

  return (
    <button className={`px-6 py-2.5 rounded-lg font-medium transition-all ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};