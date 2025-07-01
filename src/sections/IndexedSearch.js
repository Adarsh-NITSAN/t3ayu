"use client";

import getAPIData from "@/utils/GetData";
import DOMPurify from "dompurify";
import moment from "moment/moment";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
const sanitizeLink = dynamic(() => import("@/utils/sanitizeLink"), {
  ssr: false,
});

const IndexedSearch = () => {
  const params = useSearchParams();
  const router = useRouter();
  const t = useTranslations();

  let initialSearchTerm = params.get("search_query");
  const [searchData, setSearchData] = useState([]);
  const [resultSearchTerm, setResultSearchTerm] = useState(null);
  const [searchTerm, setSearchTerm] = useState();

  useEffect(() => {
    const searchResults = async () => {
      try {
        const { data } = await getAPIData(
          `search/score/desc/0/1/${initialSearchTerm}`
        );

        if (
          data &&
          data.content &&
          data.content.colPos0 &&
          data.content.colPos0.length > 0 &&
          data.content.colPos0[1].content &&
          data.content.colPos0[1].content.data
        ) {
          setResultSearchTerm(initialSearchTerm);
          setSearchData(data.content.colPos0[1].content.data.resultrows);
        }
      } catch (e) {
        console.log(e);
      }
    };
    setSearchTerm(initialSearchTerm);
    searchResults();
  }, [initialSearchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm && !searchTerm.trim()) {
      setResultSearchTerm(searchTerm);
      return;
    }
    router.push(`/search?search_query=${searchTerm}`);
  };

  return (
    <div className="search-section">
      <div className="tx-indexedsearch-searchbox">
        <form className="tx-indexedsearch-form" onSubmit={handleSubmit}>
          <div className="tx-indexedsearch-searchbox-wrap">
            <input
              type="text"
              className="tx-indexedsearch-searchbox-sword"
              placeholder="Search ..."
              defaultValue={resultSearchTerm}
              onChange={handleChange}
            />
            <button type="submit" className="tx-indexedsearch-searchbox-button">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
      <div className="search-result">
        <p className="result__value">Search for {initialSearchTerm}</p>
        {searchData && searchData.length > 0 ? (
          searchData.map(({ date, title_text, url, teaser }, index) => {
            return (
              <div className="result__box" key={index}>
                {title_text && (
                  <h3>
                    <Link href={url} aria-label="title">
                      {title_text}
                    </Link>
                  </h3>
                )}
                {teaser && (
                  <p
                    className="search-description"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(teaser),
                    }}
                    onClick={(e) => sanitizeLink(e, router)}
                  />
                )}
              </div>
            );
          })
        ) : (
          <>
            <h2>Nothing Found</h2>
            <p>
              {`Sorry, but nothing matched your search terms. Please try again
                using different keywords.`}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default IndexedSearch;
