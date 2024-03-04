const Button = ({ children, textonly, ...props }) => {
  let cssClass = "rounded-md px-4 py-2 ";
  if (!textonly) {
    cssClass += " bg-green hover:bg-lightGreen text-stone-100";
  } else {
    cssClass += " text-green";
  }

  return (
    <button {...props} className={cssClass}>
      {children}
    </button>
  );
};

export default Button;
