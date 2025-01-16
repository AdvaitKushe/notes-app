import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'


//twMerge -> this merges the incoming className values with the ones we define all default RootLayouts should have





export const RootLayout = ({ children, className, ...props }: ComponentProps<'main'>) => {
    //this extends the main tag, so all main tags will be compatible with this component, and we can pass in any other props
  return (
    <main className={twMerge('flex flex-row h-screen', className)} {...props}>
      {children}
    </main>
  )
}

export const Sidebar = ({ className, children, ...props }: ComponentProps<'aside'>) => {
    //similar to the RootLayout component, this extends the aside tag, so all aside tags will be compatible with this component, and we can pass in any other props
  return (
    <aside
      className={twMerge('w-[250px] mt-10 h-[100vh + 10px] overflow-auto', className)}
      {...props}
    >
      {children}
    </aside>
  )
}


//forwardRef -> this allows us to pass in a ref to the component, and we can use it to access the DOM element so we can have specific information about the element
export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={twMerge('flex-1 overflow-auto', className)} {...props}>
        {children}
      </div>
    )
  }
)
