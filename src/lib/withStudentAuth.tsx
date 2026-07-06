import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

const ROLE_HOME: Record<string, string> = {
  admin: "/admin/dashboard",
  mentor: "/expert/dashboard",
  company: "/company/dashboard",
  student: "/student/dashboard",
};

/**
 * withStudentAuth – wraps a page component and ensures:
 *  1. User is authenticated (otherwise → /login)
 *  2. User has the 'student' role (otherwise → their own dashboard)
 */
export function withStudentAuth<T extends object>(WrappedComponent: React.ComponentType<T>) {
  return function ProtectedPage(props: T) {
    const router = useRouter();
    const { isAuthenticated, role } = useAuth();

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace("/login");
        return;
      }
      if (role && role !== "student") {
        router.replace(ROLE_HOME[role] ?? "/login");
      }
    }, [isAuthenticated, role, router]);

    // While redirecting, show nothing
    if (!isAuthenticated || (role && role !== "student")) return null;

    return <WrappedComponent {...props} />;
  };
}
