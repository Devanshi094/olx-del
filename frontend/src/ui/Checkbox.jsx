import * as RadixCheckbox from "@radix-ui/react-checkbox";
import PropTypes from "prop-types";
import { Check } from "lucide-react";
import { cn } from "../lib/utils";

export function Checkbox({ className, checked, onCheckedChange, ...props }) {
  return (
    <RadixCheckbox.Root
      className={cn(
        "w-4 h-4 border border-gray-300 rounded flex items-center justify-center data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 transition",
        className
      )}
      checked={checked}
      onCheckedChange={onCheckedChange}
      {...props}
    >
      <RadixCheckbox.Indicator>
        <Check className="text-white w-3 h-3" />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
}

// ✅ Add PropTypes validation
Checkbox.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool,
  onCheckedChange: PropTypes.func,
};
