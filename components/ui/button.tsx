import * as React from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      default: 'bg-primary text-primary-foreground hover:opacity-90',
      outline: 'border-2 border-primary text-primary hover:bg-primary/5',
      ghost: 'hover:bg-muted text-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:opacity-90',
    }
    
    const sizes = {
      default: 'h-10 px-4 py-2 text-sm',
      sm: 'h-9 px-3 text-xs',
      lg: 'h-12 px-8 text-base',
      icon: 'h-10 w-10',
    }
    
    const finalClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ''}`
    
    return (
      <button
        className={finalClassName}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }
