import fallbackImage from 'assets/img/fallBack.png';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

import { useLocation } from '@reach/router';
import { SeoProps } from '@types';

// add detailed seo props
export const Seo = ({
  seoTitle,
  seoDescription,
  imageSrc,
}: SeoProps): JSX.Element => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            lang
            keywords
            siteUrl
          }
        }
      }
    `,
  );
  const image = imageSrc ? imageSrc : fallbackImage;
  const { pathname } = useLocation();
  return (
    <Helmet
      htmlAttributes={{
        lang: site.siteMetadata.lang ?? 'ru',
      }}
      title={`${site.siteMetadata.title} | ${seoTitle}`}
      meta={[
        {
          name: 'charSet',
          content: 'utf-8',
        },
        {
          name: 'description',
          content: seoDescription ?? site.siteMetadata.description,
        },
        {
          property: 'og:title',
          content: seoTitle ?? site.siteMetadata.title,
        },
        {
          property: 'og:description',
          content: seoDescription ?? site.siteMetadata.description,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'og:image',
          content: image,
        },
        {
          name: 'og:image:height',
          content: 640,
        },
        {
          name: 'og:image:width',
          content: 480,
        },
        {
          name: 'og:url',
          content: (process.env.NODE_ENV === 'development' ? `https://localhost:8000${pathname}` : `${site.siteMetadata.siteUrl}${pathname}`),
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: site.siteMetadata.author,
        },
        {
          name: 'twitter:title',
          content: seoTitle ?? site.siteMetadata.title,
        },
        {
          name: 'twitter:description',
          content: seoDescription ?? site.siteMetadata.description,
        },
      ]}
    />
  );
};
