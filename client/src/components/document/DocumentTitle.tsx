const DocumentTitle = () => {
  const submitHandler = () => {};
  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="border-none outline-none text-4xl"
        defaultValue="Untitled Document"
      />
    </form>
  );
};

export default DocumentTitle;
