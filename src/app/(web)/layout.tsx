import Header from "@/components/shared/Header/Header";

const WebLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default WebLayout;