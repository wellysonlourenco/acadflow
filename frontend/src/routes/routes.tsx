import { AuthProvider } from "@/context/AuthContext";
import { Categoria } from "@/pages/app/categoria/categoria";
import { Certificates } from "@/pages/app/certificates/certificates";
import { CreateFormEvents } from "@/pages/app/events/create-events";
import { Events } from "@/pages/app/events/events";
import { Inscricoes } from "@/pages/app/inscricoes/inscricao";
import { Participations } from "@/pages/app/participations/participations";
import { createBrowserRouter, Outlet } from "react-router-dom";

import { AppLayout } from "@/pages/app/_layouts/app";
import { AuthLayout } from "@/pages/app/_layouts/auth";
import { UserProfile } from "@/pages/app/account/profile";
import { Dashboard } from "@/pages/app/dashboard/dashboard";
import { EventCard } from "@/pages/app/events/events-card/event-card";
import { ValidatePresence } from "@/pages/app/presence/validate-presence";
import { Orders } from "../pages/app/orders/orders";
import { SignIn } from "../pages/auth/sing-in";
import { SignUp } from "../pages/auth/sing-up";
import { ProtectedRoute } from "./ProtectedRoute";

const AuthProviderWrapper = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
);

export const router = createBrowserRouter([
  {
    element: <AuthProviderWrapper />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <AppLayout />,
            children: [
              { path: "/", element: <Dashboard /> },
              { path: "/orders", element: <Orders /> },
              { path: "/events", element: <Events /> },
              { path: "/events-card", element: <EventCard /> },
              {
                element: <ProtectedRoute allowedRoles={['ADMIN']} />,
                children: [
                  { path: "/categories", element: <Categoria /> },
                  { path: "/events-create", element: <CreateFormEvents /> },
                  { path: "/validate-presence", element: <ValidatePresence /> },
                ]
              },
              { path: "/participations", element: <Participations /> },
              { path: "/inscricoes", element: <Inscricoes /> },
              { path: "/certificates", element: <Certificates /> },
              { path: "/minha-conta", element: <UserProfile /> },
            ],
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: "/sign-in", element: <SignIn /> },
          { path: "/sign-up", element: <SignUp /> }
        ],
      }
    ],
  },
]);