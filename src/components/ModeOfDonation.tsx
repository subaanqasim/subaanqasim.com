import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import cx from "classnames";

const starters = [
  { id: "monthly", title: "Monthly (coming soon)", disabled: true },
  { id: "once", title: "One-time", disabled: false },
];

const ModeOfDonation = ({ value, onChange }: any) => {
  return (
    <>
      <legend className=" font-medium text-lg mt-4">
        One-time, or monthly?
      </legend>
      <RadioGroupPrimitive.Root
        aria-label="One-time or recurring?"
        value={value}
        onValueChange={onChange}
      >
        <div className="mt-3 space-y-3">
          {starters.map((option) => (
            <div key={option.id} className="flex items-center">
              <RadioGroupPrimitive.Item
                id={option.id}
                value={option.id}
                disabled={option.disabled}
                className={cx(
                  "peer relative w-4 h-4 rounded-full",
                  "border border-transparent text-white",
                  "radix-state-checked:bg-orange-600",
                  "radix-state-unchecked:bg-neutral-300 dark:radix-state-unchecked:bg-neutral-700",
                  "focus:outline-none focus:ring-0 focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black",
                )}
              >
                <RadioGroupPrimitive.Indicator className="absolute inset-0 flex items-center justify-center leading-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                </RadioGroupPrimitive.Indicator>
              </RadioGroupPrimitive.Item>
              <label
                htmlFor={option.id}
                className={cx(
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
