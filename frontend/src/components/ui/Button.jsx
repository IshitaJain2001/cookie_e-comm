import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const Button = ({ children, variant = 'primary', size = 'md', className, ...props }) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
  
  const variants = {
    primary: 'bg-brown-600 text-white hover:bg-brown-700 shadow-lg',
    secondary: 'bg-cream-200 text-brown-800 hover:bg-cream-300',
    gold: 'bg-gold-500 text-brown-900 hover:bg-gold-600 shadow-lg',
    outline: 'border-2 border-brown-600 text-brown-600 hover:bg-brown-600 hover:text-white',
    ghost: 'text-brown-600 hover:bg-cream-200',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  }
  
  return (
    <button
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
