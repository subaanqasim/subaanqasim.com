import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import cn from "classnames";

const starters = [
  { id: "monthly", title: "Monthly (coming soon)", disabled: true },
  { id: "once", title: "One-time", disabled: false },
];

const ModeOfDonation = ({ value, onChange }: any) => {
  return (
    <>
      <legend className=" mt-4 text-lg font-medium">
        One-time, or monthly?
      </legend>
      <RadioGroupPrimitive.Root
        aria-label="One-time or recurring?"
        value={value}
        onValueChange={onChange}
      >
        <div className="mt-1 space-y-2">
          {starters.map((option) => (
            <div key={option.id} className="flex items-center">
              <RadioGroupPrimitive.Item
                id={option.id}
                value={option.id}
                disabled={option.disabled}
                className={cn(
                  "peer relative h-4 w-4 rounded-full",
                  "border border-transparent text-white",
                  "radix-state-checked:bg-orange-600",
                  "radix-state-unchecked:bg-neutral-300 dark:radix-state-unchecked:bg-neutral-700",
                  "focus:outline-none focus:ring-0 focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black",
                )}
              >
                <RadioGroupPrimitive.Indicator className="leading-0 absolute inset-0 flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                </RadioGroupPrimitive.Indicator>
              </RadioGroupPrimitive.Item>
              <label
                htmlFor={option.id}
                className={cn(
                  "ml-2 block radix-disabled:text-red-500",
                  option.disabled && "text-neutral-500",
                )}
              >
                {option.title}
              </label>
            </div>
          ))}
        </div>
      </RadioGroupPrimitive.Root>
    </>
  );
};

export default ModeOfDonation;
