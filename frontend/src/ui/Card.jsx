import PropTypes from "prop-types";
import { cn } from "../lib/utils";

export function Card({ className, children, ...props }) {
  return (
    <div className={cn("bg-white shadow-lg rounded-lg p-6", className)} {...props}>
      {children}
    </div>
  );
}

// ✅ Add PropTypes validation
Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
