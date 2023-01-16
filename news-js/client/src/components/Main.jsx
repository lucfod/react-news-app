import React from "react";

function Main({ children }) {
  return (
    <main className="w-full bg-gray-50 overflow-y-auto">
      <div className="container grid py-6 px-20 mx-auto">{children}</div>
    </main>
  );
}

export default Main;
