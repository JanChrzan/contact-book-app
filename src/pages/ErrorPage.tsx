import { FC } from "react";

const ErrorPage: FC = () => {
  return (
    <div className="max-h-[90%] w-11/12 rounded-2xl bg-Oxford-Blue py-8 px-6 shadow-xl sm:w-96">
      <div className="flex flex-col items-center">
        <h2 className="text-6xl font-bold text-white sm:text-8xl xl:text-9xl">
          404
        </h2>
        <h3 className="mb-3 text-center font-bold text-white sm:text-2xl xl:text-3xl">
          <span className="text-red-600">Oops!</span> Page not found
        </h3>
        <p className="mb-4 text-center text-xs text-white sm:text-base">
          The page you’re looking for doesn’t exist.
        </p>
        <a
          href="/"
          className="mt-2 rounded-full bg-red-700 px-4 py-2 text-xs text-white duration-150 hover:bg-red-800 sm:mt-5 sm:min-w-[100px] sm:text-base"
        >
          Go home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
