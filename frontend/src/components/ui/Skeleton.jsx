const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={`skeleton rounded ${className}`}
      {...props}
    />
  )
}

export default Skeleton
