export default function Input({ label, icon, error, size = 'default', className = '', ...props }) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-navy-800 mb-1.5">{label}</label>}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          className={`input ${icon ? 'input-icon' : ''} ${size === 'lg' ? 'input-lg' : ''} ${error ? 'border-danger focus:ring-danger/20 focus:border-danger' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  )
}
