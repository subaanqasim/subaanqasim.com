import React, { useEffect, useState } from "react";
import { InferGetStaticPropsType } from "next";
import Wrapper from "../components/Wrapper";
import SocialMediaCard from "../components/SocialMediaCard";
import EmailToast from "../components/EmailToast";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";
import { getBannerImage } from "@utils/getBannerImage";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import cx from "classnames";
import { Provider as ToastProvider } from "@radix-ui/react-toast";

const socials = [
  {
    platform: "Twitter",
    handle: "@subaanqasim",
    href: "https://twitter.com/subaanqasim",
    iconColour: "text-teal-500",
    buttonText: "Follow",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        strokeWidth="0.75"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z"></path>
      </svg>
    ),
  },
  {
    platform: "Instagram",
    handle: "@subaanqasim",
    href: "https://instagram.com/subaanqasim",
    iconColour: "text-orange-600",
    buttonText: "Follow",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        strokeWidth="0.75"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <rect x="4" y="4" width="16" height="16" rx="4"></rect>
        <circle cx="12" cy="12" r="3"></circle>
        <line x1="16.5" y1="7.5" x2="16.5" y2="7.501"></line>
      </svg>
    ),
  },
  {
    platform: "LinkedIn",
    handle: "/u/subaan-qasim",
    href: "https://linkedin.com/u/subaan-qasim",
    iconColour: "text-blue-500",
    buttonText: "Connect",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        strokeWidth="0.75"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <rect x="4" y="4" width="16" height="16" rx="2"></rect>
        <line x1="8" y1="11" x2="8" y2="16"></line>
        <line x1="8" y1="8" x2="8" y2="8.01"></line>
        <line x1="12" y1="16" x2="12" y2="11"></line>
        <path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
      </svg>
    ),
  },
];

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const formSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(50, { message: "Name must be less than 50 characters" }),
  email: z
    .string({ required_error: "Your email is required" })
    .email({ message: "Invalid email address" }),
  subject: z
    .string({ required_error: "Subject required" })
    .min(1, { message: "Subject is required" })
    .max(256, { message: "Subject must be less than 256 characters" }),
  message: z
    .string({ required_error: "Please enter your message" })
    .min(1, { message: "Message is required" }),
});

const Contact = ({
  bannerImage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { pathname } = useRouter();
  const { mutate: addView } = trpc.proxy.views.addView.useMutation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    addView({ path: pathname });
  }, [pathname, addView]);

  const {
    mutate: sendEmail,
    isLoading,
    isSuccess,
    status,
  } = trpc.proxy.email.sendEmail.useMutation({
    onSuccess: () => {
      setOpen(true);
    },
    onError: () => {
      setOpen(true);
    },
    onMutate: () => {
      setOpen(true);
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    sendEmail({ ...data });
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [reset, isSuccess]);

  return (
    <ToastProvider>
      <Wrapper
        title="Contact"
        description="Get in touch with me via email or connect with me on social media."
        image={bannerImage}
      >
        <header>
          <h1>Contact</h1>
        </header>

        <main>
          <p className="text-lg mt-2 text-neutral-600 dark:text-neutral-300">
            Got a question, idea, or just wanna chat? Get in touch via your
            preferred avenue below.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4 max-w-xl mx-auto">
            {socials.map((social) => (
              <SocialMediaCard
                key={social.platform}
                platform={social.platform}
                handle={social.handle}
                href={social.href}
                iconColour={social.iconColour}
                buttonText={social.buttonText}
                icon={social.icon}
              />
            ))}
          </div>

          <div className="max-w-xl mx-auto p-4 bg-neutral-100 dark:bg-neutral-800 mt-8 rounded-md">
            <h2 className="mt-2 mb-8">Get in touch via email</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative z-0 mb-8 w-full group">
                <input
                  {...register("name", { required: true })}
                  id="name"
                  type="text"
                  placeholder=" "
                  className={cx(
                    errors.name?.message
                      ? "border-red-600 dark:border-red-500"
                      : "border-neutral-300 dark:border-neutral-600",
                    "block py-2 px-4 w-full text-neutral-900 bg-transparent border-[1px] rounded-md dark:text-neutral-100  dark:focus:border-amber-500 focus:outline-none focus:ring-0 focus:border-amber-500 peer ",
                  )}
                />
                <label
                  htmlFor="name"
                  className="peer-focus:font-medium absolute left-0 text-xl text-neutral-500 dark:text-neutral-300 duration-300 transform -translate-y-9 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 dark:peer-focus:text-amber-500 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:left-4 peer-focus:-translate-y-8"
                >
                  Name<span className="text-red-500 font-medium">*</span>
                </label>

                <p className="text-red-600 dark:text-red-500 text-sm mt-1">
                  {errors?.name?.message}
                </p>
              </div>

              <div className="relative z-0 mb-8 w-full group">
                <input
                  {...register("email", { required: true })}
                  id="email"
                  type="email"
                  placeholder=" "
                  className={cx(
                    errors.email?.message
                      ? "border-red-600 dark:border-red-500"
                      : "border-neutral-300 dark:border-neutral-600",
                    "block py-2 px-4 w-full text-neutral-900 bg-transparent border-[1px] rounded-md dark:text-neutral-100  dark:focus:border-amber-500 focus:outline-none focus:ring-0 focus:border-amber-500 peer ",
                  )}
                />
                <label
                  htmlFor="email"
                  className="peer-focus:font-medium absolute left-0 text-xl text-neutral-500 dark:text-neutral-300 duration-300 transform -translate-y-9 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 dark:peer-focus:text-amber-500 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:left-4 peer-focus:-translate-y-8"
                >
                  Email<span className="text-red-500 font-medium">*</span>
                </label>
                <p className="text-red-600 dark:text-red-500 text-sm mt-1">
                  {errors?.email?.message}
                </p>
              </div>

              <div className="relative z-0 mb-8 w-full group">
                <input
                  {...register("subject", { required: true })}
                  id="subject"
                  type="text"
                  placeholder=" "
                  className={cx(
                    errors.subject?.message
                      ? "border-red-600 dark:border-red-500"
                      : "border-neutral-300 dark:border-neutral-600",
                    "block py-2 px-4 w-full text-neutral-900 bg-transparent border-[1px] rounded-md dark:text-neutral-100  dark:focus:border-amber-500 focus:outline-none focus:ring-0 focus:border-amber-500 peer ",
                  )}
                />
                <label
                  htmlFor="subject"
                  className="peer-focus:font-medium absolute left-0 text-xl text-neutral-500 dark:text-neutral-300 duration-300 transform -translate-y-9 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 dark:peer-focus:text-amber-500 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:left-4 peer-focus:-translate-y-8"
                >
                  Subject<span className="text-red-500 font-medium">*</span>
                </label>
                <p className="text-red-600 dark:text-red-500 text-sm mt-1">
                  {errors?.subject?.message}
                </p>
              </div>

              <div className="relative z-0 mb-8 w-full group">
                <textarea
                  {...register("message", { required: true })}
                  id="message"
                  placeholder=" "
                  rows={5}
                  className={cx(
                    errors.message?.message
                      ? "border-red-600 dark:border-red-500"
                      : "border-neutral-300 dark:border-neutral-600",
                    "block py-2 px-4 w-full text-neutral-900 bg-transparent border-[1px] rounded-md dark:text-neutral-100  dark:focus:border-amber-500 focus:outline-none focus:ring-0 focus:border-amber-500 peer ",
                  )}
                />
                <label
                  htmlFor="message"
                  className="peer-focus:font-medium absolute left-0 text-xl text-neutral-500 dark:text-neutral-300 duration-300 transform -translate-y-9 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-500 dark:peer-focus:text-amber-500 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:left-4 peer-focus:-translate-y-8"
                >
                  Message<span className="text-red-500 font-medium">*</span>
                </label>
                <p className="text-red-600 dark:text-red-500 text-sm mt-1">
                  {errors?.message?.message}
                </p>
              </div>

              <button
                type="submit"
                disabled={!isValid || isLoading}
                className="px-8 py-2 dark:bg-neutral-100 bg-neutral-800 text-neutral-100  dark:text-neutral-800 rounded-md mt-6 w-full text-center disabled:hocus:scale-100 hocus:scale-105 transition-all disabled:bg-neutral-300 dark:disabled:bg-neutral-600 disabled:text-neutral-500 dark:disabled:text-neutral-400 disabled:cursor-not-allowed focus:outline-none focus-visible:ring focus-visible:ring-amber-500 focus-visible:ring-opacity-75"
              >
                Send
              </button>
            </form>
          </div>
          <EmailToast open={open} setOpen={setOpen} status={status} />
        </main>
      </Wrapper>
    </ToastProvider>
  );
};

export default Contact;

export const getStaticProps = async () => {
  const bannerImage = await getBannerImage();

  return {
    props: {
      bannerImage,
    },
  };
};
