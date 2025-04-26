import PropTypes from "prop-types";
import { cn } from "../lib/utils";

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500",
        className
      )}
      {...props}
    />
  );
}

Input.propTypes = {
  className: PropTypes.string,
};
