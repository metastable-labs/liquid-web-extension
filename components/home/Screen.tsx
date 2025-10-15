const Screen: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <div className={"h-full w-full " + (className ?? "")}>{children}</div>;
};

export default Screen;
