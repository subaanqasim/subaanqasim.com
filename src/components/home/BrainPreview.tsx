import { Button } from "@components/ui";
import {
  ArrowPathIcon,
  ArrowRightIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

export default function BrainPreview() {
  return (
    <div className="demarcated-section">
      <h2 className="flex text-sm font-semibold text-neutral-900 dark:text-neutral-100">
        <CpuChipIcon className="h-6 w-6 flex-none fill-neutral-200/20 stroke-neutral-400 dark:fill-neutral-100/10 dark:stroke-neutral-500" />
        <span className="ml-3">My Brain</span>
      </h2>

      <p className="mt-6 text-center text-lg font-medium motion-safe:animate-pulse">
        Coming soon...
      </p>
      <div className="relative mt-2 flex h-full w-full items-center justify-center rounded-md border border-neutral-300 p-6 motion-safe:animate-pulse dark:border-neutral-800">
        <ArrowPathIcon className="h-8 w-8 stroke-neutral-400 motion-safe:animate-spin dark:stroke-neutral-600" />
      </div>

      <div className="relative">
        <Button
          variant="tertiary"
          size="large"
          state="disabled"
          className="group mt-6 w-full"
        >
          Explore my brain
          <ArrowRightIcon className="h-4 w-4 stroke-neutral-500 dark:stroke-neutral-400" />
        </Button>
        <span className="absolute inset-0 -z-[1] rounded-full bg-neutral-200/70 motion-safe:animate-ping-small dark:bg-neutral-700/70" />
      </div>
    </div>
  );
}
