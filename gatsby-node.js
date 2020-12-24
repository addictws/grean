/* eslint-disable @typescript-eslint/restrict-plus-operands, @typescript-eslint/no-var-requires */
const path = require('path');
const POSTS_PER_PAGE = 6;

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const postsResult = await graphql(`
  {
    allContentfulPost(limit: 100, sort: {fields: date, order: DESC}) {
      edges {
        node {
          slug
          tags {
            slug
            }
          }
          author {
            slug
          }
        }
      }
    }
  }
`);
  const authorsResult = await graphql(`
  {
    allContentfulAuthor {
      edges {
        node {        
          slug
        }
      }
    }
  }  
`);
  const tagsResult = await graphql(`
  {
    allContentfulTag {
      edges {
        node {
          slug
        }
      }
    }
  }
`);
  // Handle errors
  if (postsResult.errors || authorsResult.errors || tagsResult.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  const posts = postsResult.data.allContentfulPost.edges;
  // Create paginated index
  const indexTemplate = path.resolve('./src/templates/index.tsx');
  const numPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? '/' : `/${i + 1}`,
      component: indexTemplate,
      context: {
        limit: POSTS_PER_PAGE,
        skip: i * POSTS_PER_PAGE,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  // post creatipon logic

  const postTemplate = path.resolve('./src/templates/post.tsx');
  posts.forEach(({ post }, index) => {
    const prev = index === 0 ? null : posts[index - 1].node;
    const next = index === posts.length - 1 ? null : posts[index + 1].node;
    createPage({
      path: `/${post.slug}/`,
      component: postTemplate,
      context: {
        prev,
        next,
        slug: post.slug,
        primaryTag: post.tags ? post.tags[0].slug : '',
      },
    });
  });

  // tag creation logic
  const tags = tagsResult.data.allContentfulTag.edges;
  const tagTemplate = path.resolve('./src/templates/tags.tsx');
  tags.forEach(({ tag }) => {
    createPage({
      path: `/tags/${tag.slug}/`,
      component: tagTemplate,
      context: {
        tag: tag.slug,
      },
    });
  });

  // Create author pages
  const authorTemplate = path.resolve('./src/templates/author.tsx');
  const authors = authorsResult.data.allContentfulAuthor.edges;
  authors.edges.forEach(({ author }) => {
    createPage({
      path: `/author/${author.slug}/`,
      component: authorTemplate,
      context: {
        author: author.slug,
      },
    });
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  // adds sourcemaps for tsx in dev mode
  if (stage === 'develop' || stage === 'develop-html') {
    actions.setWebpackConfig({
      devtool: 'eval-source-map',
    });
  }
};