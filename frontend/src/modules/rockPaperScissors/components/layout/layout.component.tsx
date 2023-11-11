import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className="bg-gradient-to-tr from-violet-400 to-violet-600 min-h-screen">
      <Outlet />
    </div>
  );
};
