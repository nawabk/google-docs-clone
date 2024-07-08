const Loader = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="mt-10 rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin"></div>
      <p className="text-xl flex justify-center items-center">Loading...</p>
    </div>
  );
};

export default Loader;
