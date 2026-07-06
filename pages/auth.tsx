import { AuthPage } from "../src/pages/AuthPage";
import { MainLayout } from "../src/layout/MainLayout";

export default function AuthRoute() {
  return (
    <MainLayout>
      <AuthPage />
    </MainLayout>
  );
}
