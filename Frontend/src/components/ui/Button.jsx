export default function Button({
  children, variant = 'primary', size = 'md',
  icon, iconRight, loading, className = '', ...props
}) {
  const v = {
    primary: 'btn-primary', secondary: 'btn-secondary',
    ghost: 'btn-ghost', danger: 'btn-danger', success: 'btn-success'
  }
  const s = { sm: 'btn-sm', md: 'btn-md', lg: 'btn-lg', xl: 'btn-xl', icon: 'btn-icon' }

  return (
    <button className={`btn ${v[variant]} ${s[size]} ${className}`} disabled={loading} {...props}>
      {loading ? (
        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      ) : icon}
      {size !== 'icon' && children}
      {!loading && iconRight}
    </button>
  )
}
