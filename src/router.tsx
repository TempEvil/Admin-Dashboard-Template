import { lazy, Suspense } from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
//? Layout
import AdminLayout from "./layouts/AdminLayout";
//? Routes
const Dashboard = lazy(() => import("./views/pages/dashboard/index"));
const DashboardAddNew = lazy(() => import("./views/pages/dashboard/DashboardAddNew"));
const DashboardEdit = lazy(() => import("./views/pages/dashboard/DashboardEdit"));
const DashboardView = lazy(() => import("./views/pages/dashboard/DashboardView"));

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <Routes>
          {/* <Route path="/login" element={<AdminLogin />} /> */}
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/add-new" element={<DashboardAddNew />} />
            <Route path="dashboard/edit/:id" element={<DashboardEdit />} />
            <Route path="dashboard/view/:id" element={<DashboardView />} />
            {/* Not Found */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
