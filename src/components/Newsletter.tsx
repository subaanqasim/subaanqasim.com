import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Newsletter() {
  return (
    <form
      action="#"
      className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-700/70"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <EnvelopeIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something... so not very often 🤧 &mdash;
        Unsubscribe at any time.
      </p>
      <div className="mt-6 flex">
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
        />
        <button type="submit" className="ml-4 flex-none">
          Join
        </button>
      </div>
      <p className="mt-3 text-xs text-zinc-500">
        Note: I <span className="italic">definitely</span> do not keep your data
        forever, nor do I sell that data for infinite profit.
      </p>
    </form>
  );
}
