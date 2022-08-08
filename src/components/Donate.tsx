import * as PopoverPrimitive from "@radix-ui/react-popover";
import cx from "classnames";
import Currency from "./Currency";
import Duration from "./Duration";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import getStripe from "@utils/getStripe";

type FormData = {
  amount: string;
  currency: "gbp" | "usd" | "eur";
  duration: "monthly" | "once";
};

const Donate = () => {
  const { control, handleSubmit, register, watch } = useForm<FormData>({
    defaultValues: {
      amount: "5",
      currency: "gbp",
      duration: "once",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: data.amount,
        currency: data.currency,
        duration: data.duration,
      }),
    });

    const session = await response.json();

    if (session.statusCode === 500) {
      console.error(session.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: session.checkoutSessionId,
    });

    console.warn(error.message);
  };

  const inputAmount = watch("amount");

  const inputCurrency = () => {
    if (watch("currency") === "gbp") return "£";
    if (watch("currency") === "usd") return "$";
    if (watch("currency") === "eur") return "€";
  };

  return (
    <div className="relative inline-block text-left hocus:scale-110 transition-transform ease-in-out">
      <PopoverPrimitive.Root>
        <PopoverPrimitive.Trigger asChild>
          <button className="button-primary px-4">💸</button>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={4}
            className={cx(
              "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
              "w-80 rounded-lg p-6 shadow-md",
              "bg-white dark:bg-black",
            )}
          >
            <PopoverPrimitive.Arrow className="fill-current text-white dark:text-neutral-800" />
            <div className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              Keep me going 👉🏽👈🏽
            </div>
            <p className="mt-1 text-neutral-500 dark:text-neutral-400">
              Buy me a coffee (or two, or three 🥴)
            </p>

            <form className="mt-4 space-y-2" onSubmit={handleSubmit(onSubmit)}>
              <fieldset>
                <label htmlFor="amount" className="font-medium text-lg">
                  Amount
                </label>
                <div className="flex mt-1">
                  <input
                    {...register("amount", {
                      required: "This field is required",
                      min: {
                        value: 1,
                        message: "Amount must be greater than 1.",
                      },
                    })}
                    id="amount"
                    type="number"
                    step={1}
                    min={1}
                    className={cx(
                      "block w-full rounded-l-md py-2",
                      "text-center placeholder:text-neutral-500  dark:placeholder:text-neutral-600 bg-neutral-100",
                      "border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-900",
                      "focus:outline-none focus-visible:ring-2   focus-visible:ring-orange-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black",
                    )}
                  />
                  <Controller
                    name="currency"
                    control={control}
                    rules={{ required: "Please select a valid currency" }}
                    render={({ field: { value, onChange } }) => (
                      <Currency value={value} onChange={onChange} />
                    )}
                  />
                </div>
              </fieldset>

              <fieldset>
                <div className="mt-4 mb-8">
                  <Controller
                    name="duration"
                    control={control}
                    rules={{
                      required: "Please select an option",
                    }}
                    render={({ field: { onChange, value } }) => (
                      <Duration value={value} onChange={onChange} />
                    )}
                  />
                </div>
              </fieldset>

              <button
                type="submit"
                className="px-4 py-2 w-full bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 font-semibold rounded-md focus:outline-none focus-visible:ring-2   focus-visible:ring-orange-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black hocus:scale-105 transition-transform duration-[250ms] ease-in-out"
              >
                {`Tip ${inputCurrency()}${inputAmount}`}
              </button>
            </form>

            <PopoverPrimitive.Close
              className={cx(
                "absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1",
                "focus:outline-none focus-visible:ring-2 ring-offset-2 dark:focus-visible:ring-offset-black focus-visible:ring-offset-white focus-visible:ring-orange-500 focus-visible:ring-opacity-75",
              )}
            >
              <svg
                viewBox="0 0 15 15"
                fill="none"
                className="h-4 w-4 text-neutral-500 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-400"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </PopoverPrimitive.Close>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    </div>
  );
};

export default Donate;
