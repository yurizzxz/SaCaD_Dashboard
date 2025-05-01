export function Section ({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            {children}
        </div>
    );
}

export function Content(props: React.HTMLAttributes<HTMLDivElement>) {
    const { children, className = "", ...rest } = props;
  
    return (
      <div className={`px-4 lg:px-6 ${className}`} {...rest}>
        {children}
      </div>
    );
  }