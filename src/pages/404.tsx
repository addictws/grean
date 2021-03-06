import { SiteNav } from 'components/header';
import { Wrapper } from 'components/layout';
import { PostCard } from 'components/post';
import { Link, graphql } from 'gatsby';
import { IndexLayout } from 'layouts';
import React from 'react';
import { colors } from 'styles/colors';
import { PostFeed, SiteHeader, SiteNavMain, inner, outer } from 'styles/shared';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { NotFoundTemplateProps } from '@types';

const NotFoundPage = ({ data }: NotFoundTemplateProps) => {
  const { edges } = data.allContentfulPost;

  return (
    <IndexLayout>
      <Wrapper>
        <header css={[SiteHeader, outer]}>
          <div css={[outer, SiteNavMain]}>
            <div css={inner}>
              <SiteNav />
            </div>
          </div>
        </header>
        <main id="site-main" css={[outer, ErrorContent]} className="error-content">
          <div css={[inner]}>
            <section style={{ textAlign: 'center' }}>
              <ErrorCode>404</ErrorCode>
              <ErrorDescription>Page not found</ErrorDescription>
              <Link css={ErrorLink} to="">
                Go to the front page →
              </Link>
            </section>

            <div css={PostFeed} className="post-feed">
              {edges.map(({ node }) => (
                <PostCard key={node.slug} post={node} />
              ))}
            </div>
          </div>
        </main>
      </Wrapper>
    </IndexLayout>
  );
};

export const pageQuery = graphql`
  query {
    allContentfulPost(sort: { fields: updatedAt, order: DESC }, limit: 3) {
      edges {
        node {
          title
          slug
          updatedAt(formatString: "d MMM yyyy")
          featured
          tags {
            slug
            tagName
          }
          hero {
            fluid(maxWidth: 2540) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          body {
            childMarkdownRemark {
              htmlAst
              excerpt(format: PLAIN, pruneLength: 200)
              timeToRead
            }
          }
          author {
            name
            slug
            subtitle
            avatar {
              fluid(maxWidth: 800) {
                ...GatsbyContentfulFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;

const ErrorContent = css`
  padding: 14vw 4vw 6vw;

  @media (max-width: 800px) {
    padding-top: 24vw;
  }

  @media (max-width: 500px) {
    padding-top: 28vw;
  }

  @media (min-width: 940px) {
    .post-card {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }
  }
`;

const ErrorCode = styled.h1`
  margin: 0;
  /* color: var(--lightgrey); */
  color: ${colors.lightgrey};
  font-size: 12vw;
  line-height: 1em;
  letter-spacing: -5px;
  opacity: 0.75;

  @media (max-width: 800px) {
    font-size: 11.2rem;
  }
`;

const ErrorDescription = styled.p`
  margin: 0;
  /* color: var(--midgrey); */
  color: ${colors.midgrey};
  font-size: 3rem;
  line-height: 1.3em;
  font-weight: 400;

  @media (max-width: 800px) {
    margin: 5px 0 0 0;
    font-size: 1.8rem;
  }
`;

const ErrorLink = css`
  display: inline-block;
  margin-top: 5px;
`;

export default NotFoundPage;
