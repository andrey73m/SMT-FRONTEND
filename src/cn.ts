import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export default (...args: ClassValue[]) => {
  return twMerge(clsx(args));
}