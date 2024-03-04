const Input = ({ label, id, textarea, ...props }) => {
  const classes =
    "py-2 px-2 bg-stone-100 w-full border-greenDark focus:outline-none focus:border-b-2";

  return (
    <div className="flex flex-col flex-1 items-start my-2">
      <label htmlFor={id} className="text-sm uppercase font-medium mb-2">
        {label}
      </label>
      {textarea ? (
        <textarea id={id} {...props} className={classes}></textarea>
      ) : (
        <input id={id} {...props} className={classes} />
      )}
    </div>
  );
};

export default Input;
