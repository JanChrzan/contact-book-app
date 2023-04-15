type ErrorMessageProps = {
  errorMessage: string;
};
const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return (
    <>
      {errorMessage && (
        <div className="mx-2 mt-2 text-center text-sm text-red-500">
          <p>{errorMessage}</p>
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
