import cn from "@/cn";

export interface SpinnerProps extends React.HTMLProps<HTMLDivElement>{}

const Spinner = ({ className }: SpinnerProps) => {
  return (
    <svg className={cn("animate-pulse rounded-full bg-gradient-to-tr to-violet-400 from-pink-200 ", className)} viewBox="0 0 24 24">
    </svg>
  )
}

export default Spinner;