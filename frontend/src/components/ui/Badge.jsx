import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const Badge = ({ children, variant = 'default', className }) => {
  const variants = {
    default: 'bg-brown-100 text-brown-800',
    primary: 'bg-brown-600 text-white',
    gold: 'bg-gold-500 text-brown-900',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
  }
  
  return (
    <span
      className={twMerge(clsx('px-3 py-1 rounded-full text-sm font-medium', variants[variant], className))}
    >
      {children}
    </span>
  )
}

export default Badge
