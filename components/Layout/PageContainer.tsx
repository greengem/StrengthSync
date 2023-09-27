type PageContainerProps = {
    children: React.ReactNode;
  };
  
  const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
    return (
      <div className="container mx-auto px-10">
        {children}
      </div>
    );
  }
  
  export default PageContainer;
