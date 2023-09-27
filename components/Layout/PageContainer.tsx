type PageContainerProps = {
    children: React.ReactNode;
  };
  
  const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
    return (
      <div className="container mx-auto">
        {children}
      </div>
    );
  }
  
  export default PageContainer;
