import cn from "@/cn";
import { forwardRef } from "react";

export interface TextoClickableProps extends React.HTMLProps<HTMLParagraphElement> { }

const TextoClickable = forwardRef<HTMLParagraphElement, TextoClickableProps>(({ className,...props }, ref) => {
  return (
    <p
      {...props}
      ref={ref}
      className={cn("hover:underline hover:cursor-pointer", className)}>{props.children}
    </p>
  )
})
TextoClickable.displayName = "TextoClickable"
export default TextoClickable;