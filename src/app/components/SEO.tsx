import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title = "Fannisa Azzuri — Interior Design & Visual Merchandising Portfolio",
  description = "A collection of spaces shaped by material honesty and quiet detail — projects spanning residential, commercial, and retail work.",
  image = "/images/portrait-fannisa.jpeg", // Default fallback image
  url = "https://porto-fanniza.vercel.app",
}: SEOProps) {
  // Ensure the image URL is absolute for OpenGraph/Twitter
  const absoluteImage = image.startsWith("http") ? image : `${url}${image}`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* OpenGraph / Facebook / WhatsApp */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
    </Helmet>
  );
}
