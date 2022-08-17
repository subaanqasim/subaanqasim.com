import * as ToastPrimitive from "@radix-ui/react-toast";
import cx from "classnames";
import React, { useEffect } from "react";

type EmailToastProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  status: "error" | "idle" | "loading" | "success";
};

const EmailToast = ({ open, setOpen, status }: EmailToastProps) => {
  const info = () => {
    switch (status) {
      case "error":
        return {
          title: "❌ Error",
          description:
            "Uh oh. Something went wrong. Please try again, but if the problem persists, please contact me via a different method above.",
          colour: "red-500",
        };
      case "success":
        return {
          title: "✅ Email sent!",
          description:
            "Thanks for getting in touch. I'll get back to you within 48 hours 🚀",
          colour: "green-500",
        };
      default:
        return {
          title: "🟠 Hang in there...",
          description: "Your email is sending. Please wait...",
          colour: "orange-500",
        };
    }
  };

  return (
    <>
      <ToastPrimitive.Root
        open={open}
        onOpenChange={setOpen}
        duration={6500}
        className={cx(
          "z-50 fixed bottom-4 inset-x-4 w-auto md:bottom-4 md:right-4 md:left-auto md:top-auto md:w-full md:max-w-sm shadow-lg rounded-md",
          "bg-white dark:bg-black",
          "radix-state-open:animate-toast-slide-in-bottom md:radix-state-open:animate-toast-slide-in-right",
          "radix-state-closed:animate-toast-hide",
          "radix-swipe-end:animate-toast-swipe-out",
          "translate-x-radix-toast-swipe-move-x",
          "radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-200 radix-swipe-cancel:ease-[ease]",
          "focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75",
          `border-[0.5px] border-${info().colour}`,
        )}
      >
        <div className="flex">
          <div className="w-0 flex-1 flex items-center pl-5 py-4">
            <div className="w-full radix">
              <ToastPrimitive.Title className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {info().title}
              </ToastPrimitive.Title>
              <ToastPrimitive.Description className="mt-1 text-sm text-neutral-700 dark:text-neutral-400">
                {info().description}
              </ToastPrimitive.Description>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col px-3 py-2 space-y-1">
              <div className="h-0 flex-1 flex">
                <ToastPrimitive.Close className="w-full border border-transparent rounded-lg px-3 py-2 flex items-center justify-center text-sm font-medium text-neutral-700 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900 focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75">
                  Dismiss
                </ToastPrimitive.Close>
              </div>
            </div>
          </div>
        </div>
      </ToastPrimitive.Root>

      <ToastPrimitive.Viewport />
    </>
  );
};

export default EmailToast;
