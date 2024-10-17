
export const Group: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div className="flex gap-2 flex-col sm:flex-row">
      {children}
    </div>
  )
}