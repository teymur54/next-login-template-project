"use client";
import { useRouter } from "next/navigation";
import Provider from "./Provider";

const LayoutProvider = ({ children }) => {
  const router = useRouter();

  if (router.pathname === "/auth/login") {
    return <>{children}</>;
  } else {
    return (
      <html lang="en">
        <body>
          <Provider>
            <div className="h-screen">sssdfdf{children}</div>
          </Provider>
        </body>
      </html>
    );
  }
};

export default LayoutProvider;
