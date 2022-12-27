import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Button } from "@components/ui";

export default function Newsletter() {
  return (
    <form
      action="#"
      className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-700/70"
    >
      <h2 className="flex text-sm font-semibold text-neutral-900 dark:text-neutral-100">
        <EnvelopeIcon className="h-6 w-6 flex-none fill-neutral-200/20 stroke-neutral-400 dark:fill-neutral-100/10 dark:stroke-neutral-500" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        Get notified when I publish something... so not very often 🤧 &mdash;
        Unsubscribe at any time.
      </p>
      <div className="mt-6 flex flex-col gap-4 xs:flex-row lg:flex-col">
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          className="min-w-0 flex-auto appearance-none rounded-md border border-neutral-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-neutral-800/5 placeholder:text-neutral-400 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 dark:border-neutral-700 dark:bg-neutral-700/[0.15] dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus:border-cyan-400 dark:focus:ring-cyan-400/10 sm:text-sm"
        />
        <Button
          variant="primary"
          size="medium"
          glowColour="pink-purple"
          type="submit"
        >
          Join
        </Button>
      </div>
      <p className="mt-3 text-xs text-neutral-500">
        Note: I <span className="italic">definitely</span> do not keep your data
        forever, nor do I sell that data for infinite profit.
      </p>
    </form>
  );
}
