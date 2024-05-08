import cn from "../../cn";

interface Props extends React.HTMLProps<HTMLDivElement>{}

const Spinner = ({ className, ...props }: Props) => {
  return (
    <svg className={cn("animate-pulse rounded-full bg-gradient-to-tr to-violet-400 from-pink-200 ", className)} viewBox="0 0 24 24">
    </svg>
  )
}

export default Spinner;