import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

export default function SEO({ title, description, keywords, type = 'website', image, url }) {
  const siteTitle = 'Ahmed Abdullah — Design & Digital Marketing';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = 'High-converting design and digital marketing specialist. Helping brands dominate the digital landscape.';
  const defaultImage = 'https://ahmedabdullah.com/og-image.jpg'; // Example absolute URL

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name='description' content={description || defaultDescription} />
      {keywords && <meta name='keywords' content={keywords} />}
      
      {/* Open Graph tags for social sharing */}
      <meta property='og:type' content={type} />
      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={description || defaultDescription} />
      <meta property='og:image' content={image || defaultImage} />
      {url && <meta property='og:url' content={url} />}
      <meta property='og:site_name' content={siteTitle} />

      {/* Twitter Card tags */}
      <meta name='twitter:creator' content='@AhmedAbdullah' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={fullTitle} />
      <meta name='twitter:description' content={description || defaultDescription} />
      <meta name='twitter:image' content={image || defaultImage} />
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  type: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
};
