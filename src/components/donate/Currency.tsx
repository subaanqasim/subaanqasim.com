import * as SelectPrimitive from "@radix-ui/react-select";
import cn from "classnames";

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

const Currency = ({ value, onChange }: any) => {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onChange}>
      <SelectPrimitive.Trigger asChild aria-label="Currency">
        <button className="flex items-center rounded-r-md border border-neutral-300 bg-neutral-100 py-2 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-neutral-700 dark:bg-neutral-900 dark:focus-visible:ring-offset-black">
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon className="ml-2">
            <ChevronDownIcon />
          </SelectPrimitive.Icon>
        </button>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Content>
        <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-neutral-700 dark:text-neutral-300">
          <ChevronUpIcon />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="rounded-lg bg-white p-2 shadow-lg dark:bg-neutral-800">
          <SelectPrimitive.Group>
            {["GBP", "USD", "EUR"].map((currency, i) => (
              <SelectPrimitive.Item
                key={`${currency}-${i}`}
                value={currency.toLowerCase()}
                className={cn(
                  "text-md relative flex items-center rounded-md px-8 py-2 font-medium text-neutral-700 focus:bg-neutral-100 dark:text-neutral-300 dark:focus:bg-neutral-900",
                  "radix-disabled:opacity-50",
                  "select-none focus:outline-none focus-visible:ring-2   focus-visible:ring-orange-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black",
                )}
              >
                <SelectPrimitive.ItemText>{currency}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <CheckIcon />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Group>
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-neutral-700 dark:text-neutral-300">
          <ChevronDownIcon />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  );
};

export default Currency;
