interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

export default function Button({ children, type = "button" }: ButtonProps) {
  return (
    <button
      type={type}
      className="bg-dark rounded-md text-white hover:bg-black hover:shadow-sm transition ease-out px-2 py-2 text-sm leading-none"
    >
      {children}
    </button>
  );
}
