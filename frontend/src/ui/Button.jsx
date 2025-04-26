import PropTypes from "prop-types";
import { cn } from "../lib/utils";

export function Button({ className, children, ...props }) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md font-medium transition border border-gray-300",
        className // Allows external styles to fully override defaults
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// ✅ Add PropTypes validation
Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
