import Head from "next/head";
import { useRouter } from "next/router";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  keywords?: string;
  schema?: Record<string, any> | Record<string, any>[];
}

export function SEO({
  title = "Blueboxx DA | Premium IT Training Institute & EdTech Platform",
  description = "Blueboxx DA offers premium training in Full Stack Development, AI/ML, Data Science, Graphic Design, and Digital Marketing with 100% placement assistance.",
  image = "https://blueboxx.in/og-image.jpg",
  type = "website",
  keywords = "Blueboxx DA, Blueboxx Vadodara, Best IT Training Institute in Vadodara, Best Computer Institute in Vadodara, Blueboxx Designs & Animation, Blueboxx Training Institute, Software Training Institute Vadodara, AI Institute Vadodara, Full Stack Development Course, Graphic Design Institute Vadodara, Digital Marketing Institute Vadodara, Internship in Vadodara, Placement Training Vadodara, Job Ready Software Development Course",
  schema,
}: SEOProps) {
  const router = useRouter();
  // Assume domain is blueboxx.in for now
  const canonicalUrl = `https://blueboxx.in${router.asPath}`;

  // Organization Schema (default globally)
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Blueboxx DA",
    "url": "https://blueboxx.in",
    "logo": "https://blueboxx.in/logo.png",
    "description": "Premium IT Training Institute & EdTech Platform",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Vadodara",
      "addressRegion": "Gujarat",
      "addressCountry": "IN"
    }
  };

  const schemaData = schema ? (Array.isArray(schema) ? [defaultSchema, ...schema] : [defaultSchema, schema]) : [defaultSchema];

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Blueboxx DA" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Theme Color & Robots */}
      <meta name="theme-color" content="#1B2A6B" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </Head>
  );
}
