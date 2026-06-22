import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={twMerge(clsx('bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl', className))}
      {...props}
    >
      {children}
    </div>
  )
}

const CardHeader = ({ children, className }) => (
  <div className={twMerge(clsx('p-6', className))}>{children}</div>
)

const CardBody = ({ children, className }) => (
  <div className={twMerge(clsx('p-6 pt-0', className))}>{children}</div>
)

const CardFooter = ({ children, className }) => (
  <div className={twMerge(clsx('p-6 pt-0', className))}>{children}</div>
)

export { Card, CardHeader, CardBody, CardFooter }
export default Card
