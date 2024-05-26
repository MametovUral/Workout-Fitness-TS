import { useRouteError } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
}

function ErrorPage() {
  const error = useRouteError() as RouteError;

  return (
    <div className="w-full h-screen flex justify-center flex-col items-center">
      <h1 className="font-bold text-4xl mb-10">Oops!</h1>
      <p className="mb-10 text-xl">Sorry, an unexpected error has occurred.</p>
      <p className="text-slate-400 text-xl">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;
