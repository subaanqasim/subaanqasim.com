import Link from "next/link";

interface FeaturedPostProps {
  type: "project" | "article" | "shot";
  title: string;
  excerpt: string;
  slug: string;
}

const FeaturedPost = ({ type, title, excerpt, slug }: FeaturedPostProps) => {
  const urlBase = type === "project" || "article" ? `${type}s` : "photography";

  return (
    <>
      <Link href={`/${urlBase}/${slug}`}>
        <a className="border-[3px] border-neutral-300 dark:border-neutral-600 rounded-lg p-4 w-full md:w-1/3 hocus:scale-[1.02] hocus:-translate-y-1 transition-all">
          <div className="flex flex-col justify-between h-full">
            <div>
              <h4 className="mb-1 text-lg">{title}</h4>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {excerpt}
              </p>
            </div>
            <div className="flex md:justify-between gap-4 mt-6 text-sm text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1"
                >
                  <path
                    d="M7.50009 0.877014C3.84241 0.877014 0.877258 3.84216 0.877258 7.49984C0.877258 11.1575 3.8424 14.1227 7.50009 14.1227C11.1578 14.1227 14.1229 11.1575 14.1229 7.49984C14.1229 3.84216 11.1577 0.877014 7.50009 0.877014ZM1.82726 7.49984C1.82726 4.36683 4.36708 1.82701 7.50009 1.82701C10.6331 1.82701 13.1729 4.36683 13.1729 7.49984C13.1729 10.6328 10.6331 13.1727 7.50009 13.1727C4.36708 13.1727 1.82726 10.6328 1.82726 7.49984ZM8 4.50001C8 4.22387 7.77614 4.00001 7.5 4.00001C7.22386 4.00001 7 4.22387 7 4.50001V7.50001C7 7.63262 7.05268 7.7598 7.14645 7.85357L9.14645 9.85357C9.34171 10.0488 9.65829 10.0488 9.85355 9.85357C10.0488 9.65831 10.0488 9.34172 9.85355 9.14646L8 7.29291V4.50001Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="after:-mt-[0.13em] after:table">15 min</span>
              </div>
              {/* <div className="flex items-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
              >
                <path
                  d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="after:-mt-[0.1em] after:table">10,000</span>
            </div> */}
            </div>
          </div>
        </a>
      </Link>
    </>
  );
};

export default FeaturedPost;
