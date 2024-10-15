import "@styles/globals.css";

export const metadata = {
  title: "Fav Menus",
  desc: "Store your favourite menus",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-black overflow-y-scroll overflow-x-hidden">
        <main className="app min-h-screen">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
