import cn from "@/cn";
import { forwardRef } from "react";

export interface TextoClickableProps extends React.HTMLProps<HTMLParagraphElement> { }

const TextoClickable = forwardRef<HTMLParagraphElement, TextoClickableProps>(({ className,...props }, ref) => {
  return (
    <span
      {...props}
      ref={ref}
      className={cn("hover:underline hover:cursor-pointer", className)}>{props.children}
    </span>
  )
})
TextoClickable.displayName = "TextoClickable"
export default TextoClickable;