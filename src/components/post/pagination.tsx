import { Link } from 'gatsby';
import { darken } from 'polished';
import React from 'react';
import { colors } from 'styles/colors';

import { css } from '@emotion/react';
import { PaginationProps } from '@types';

export const Pagination: React.FC<PaginationProps> = ({ currentPage, numPages }) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();

  return (
    <nav css={navCss}>
      <div>
        {!isFirst && (
          <Link to={prevPage} rel="prev">
            {/* << symbol */}
            {String.fromCharCode(171)}
          </Link>
        )}

        {Array.from({ length: numPages }, (_, i) => (
          <Link key={`pagination-number${i + 1}`} className={i + 1 === currentPage ? 'active' : ''} to={`/${i === 0 ? '' : i + 1}`}>
            {i + 1}
          </Link>
        ))}

        {!isLast && (
          <Link to={nextPage} rel="next">
            {/* >> symbol */}
            {String.fromCharCode(187)}
          </Link>
        )}
      </div>
    </nav>
  );
};

const navCss = css`
  text-align: center;
  margin-bottom: 40px;
  div {
    display: inline-block;
  }

  a {
    font-family: "-apple-system", BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell;
    background: #fff;
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    transition: background-color .3s;
    border: 1px solid #ddd;
    margin: 0 4px;
    box-shadow: rgba(39, 44, 49, 0.06) 8px 14px 38px, rgba(39, 44, 49, 0.03) 1px 3px 8px;
    border-radius: 6px;
    margin-bottom: 5px;
    min-width: 50px;

    &.active {
      border: 1px solid #36a6e2;
      color: #36a6e2;
      font-weight: bold
      /* -webkit-box-shadow:inset 3px 0px 0px 0px ${darken(0.05, colors.darkgrey)};
      -moz-box-shadow:inset 3px 0px 0px 0px ${darken(0.05, colors.darkgrey)};
      box-shadow:inset 3px 0px 0px 0px ${darken(0.05, colors.darkgrey)}; */
    }

    &:hover:not(.active) {
      background-color: #ddd;
    }

    &:hover {
      text-decoration: none;
    }
  }
`;

