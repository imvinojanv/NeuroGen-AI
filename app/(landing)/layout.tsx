const LandingLayout = ({
    children
} : {
    children: React.ReactNode;
}) => {
  return (
    <main className="h-full bg-[#111827] overflow-auto">
        <div className="stars">
          <div className="mx-auto max-w-screen-xl h-full w-full">
              {children}
          </div>
          <div className="small"></div>
          <div className="medium"></div>
          <div className="big"></div>
        </div>
    </main>
  );
}

export default LandingLayout;