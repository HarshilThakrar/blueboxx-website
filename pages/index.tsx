import { HomePage } from "../src/pages/HomePage";
import { MainLayout } from "../src/layout/MainLayout";
import { SEO } from "../src/components/seo/SEO";

export default function IndexPage() {
  return (
    <>
      <SEO 
        keywords="Blueboxx DA, AI Powered Learning Platform, EdTech Platform, IT Training Institute, Internships, Placements, Jobs, Mentorship, Skill Development, Career Growth, Professional Certification, Industry Experts"
      />
      <MainLayout>
      <HomePage />
    </MainLayout>
    </>
  );
}
