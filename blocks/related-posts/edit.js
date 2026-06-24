import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";
import {
  PanelBody,
  ToggleControl,
  SelectControl,
  RangeControl,
  Button,
  Spinner,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";

import SectionSettingsControls from "../../components/SectionSettingsControls";

function PostCard({ post }) {
  const featuredImg = post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const date = new Date(post.date).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  return (
    <li className="card-catalog splide__slide">
      {featuredImg && (
        <div className="card-catalog__img ibg">
          <img
            src={featuredImg}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}
      <div className="card-catalog__content">
        <div className="card-catalog__top">
          <ul className="tags">
            <li>Post</li>
          </ul>
          <div className="meta">
            <time>{date}</time>
          </div>
        </div>
        <div className="card-catalog__tlbox">
          <span role="heading" aria-level="2" className="tl4">
            {post.title.rendered}
          </span>
          <span
            className="card-catalog__vec no-select"
            aria-hidden="true"
          ></span>
        </div>
      </div>
    </li>
  );
}

export default function Edit({ attributes, setAttributes }) {
  const { noPaddingTop, title, sourceType, postsCount, selectedPosts } =
    attributes;
  const [search, setSearch] = useState("");

  const blockProps = useBlockProps({ style: { padding: 0, margin: 0 } });

  const searchResults = useSelect(
    (select) => {
      if (!search || search.length < 2) return [];
      return (
        select("core").getEntityRecords("postType", "post", {
          search,
          per_page: 5,
          _fields: "id,title",
        }) || []
      );
    },
    [search],
  );

  const selectedPostsData = useSelect(
    (select) => {
      if (!selectedPosts || !selectedPosts.length) return [];
      return (
        select("core").getEntityRecords("postType", "post", {
          include: selectedPosts.join(","),
          per_page: selectedPosts.length,
          _embed: true,
        }) || []
      );
    },
    [selectedPosts],
  );

  const latestPosts = useSelect(
    (select) => {
      if (sourceType !== "latest") return null;
      return (
        select("core").getEntityRecords("postType", "post", {
          per_page: postsCount,
          orderby: "date",
          order: "desc",
          _embed: true,
        }) || []
      );
    },
    [sourceType, postsCount],
  );

  const randomPool = useSelect(
    (select) => {
      if (sourceType !== "random") return null;
      return (
        select("core").getEntityRecords("postType", "post", {
          per_page: 100,
          orderby: "date",
          order: "desc",
          _embed: true,
        }) || []
      );
    },
    [sourceType],
  );

  const randomPosts = randomPool
    ? [...randomPool].sort(() => Math.random() - 0.5).slice(0, postsCount)
    : null;

  const addPost = (post) => {
    if (selectedPosts.includes(post.id)) return;
    setAttributes({ selectedPosts: [...selectedPosts, post.id] });
    setSearch("");
  };

  const removePost = (id) => {
    setAttributes({ selectedPosts: selectedPosts.filter((p) => p !== id) });
  };

  const displayPosts =
    sourceType === "latest"
      ? latestPosts
      : sourceType === "random"
      ? randomPosts
      : sourceType === "manual"
      ? selectedPostsData
      : null;

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />

        <PanelBody
          title={__("Posts source", "overchain-blocks")}
          initialOpen={true}
        >
          <SelectControl
            label={__("Source type", "overchain-blocks")}
            value={sourceType}
            options={[
              {
                label: __("Latest posts", "overchain-blocks"),
                value: "latest",
              },
              {
                label: __("Random posts", "overchain-blocks"),
                value: "random",
              },
              {
                label: __("Manual selection", "overchain-blocks"),
                value: "manual",
              },
            ]}
            onChange={(v) => setAttributes({ sourceType: v })}
          />

          {sourceType !== "manual" && (
            <RangeControl
              label={__("Number of posts", "overchain-blocks")}
              value={postsCount}
              onChange={(v) => setAttributes({ postsCount: v })}
              min={1}
              max={12}
            />
          )}

          {sourceType === "manual" && (
            <div>
              <p style={{ marginBottom: "8px", fontWeight: 500 }}>
                {__("Search posts", "overchain-blocks")}
              </p>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={__("Type post title...", "overchain-blocks")}
                style={{
                  width: "100%",
                  padding: "6px 10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  marginBottom: "8px",
                }}
              />
              {searchResults.length > 0 && (
                <div
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    marginBottom: "12px",
                  }}
                >
                  {searchResults.map((post) => (
                    <button
                      key={post.id}
                      onClick={() => addPost(post)}
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "8px 10px",
                        textAlign: "left",
                        background: "none",
                        border: "none",
                        borderBottom: "1px solid #eee",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                    >
                      {post.title.rendered}
                    </button>
                  ))}
                </div>
              )}

              {selectedPosts.length > 0 && selectedPostsData.length > 0 && (
                <div>
                  <p
                    style={{
                      marginBottom: "6px",
                      fontSize: "12px",
                      opacity: 0.6,
                    }}
                  >
                    {__("Selected posts:", "overchain-blocks")}
                  </p>
                  {selectedPostsData.map((post) => (
                    <div
                      key={post.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "6px 0",
                        borderBottom: "1px solid #eee",
                        fontSize: "13px",
                      }}
                    >
                      <span>{post.title.rendered}</span>
                      <Button
                        variant="link"
                        isDestructive
                        onClick={() => removePost(post.id)}
                        style={{ padding: 0 }}
                      >
                        ✕
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <section className={`related ${noPaddingTop ? "pbs4" : "pbs2"}`}>
          <div className="related__container">
            <div className="related__body section-body">
              <div className="heading">
                <RichText
                  tagName="h2"
                  className="tl2"
                  placeholder={__("Section title", "overchain-blocks")}
                  value={title}
                  onChange={(v) => setAttributes({ title: v })}
                />
              </div>

              <div className="related__splide base-splide">
                <div className="splide">
                  <div className="splide__track">
                    <ul className="splide__list">
                      {displayPosts === null && <Spinner />}
                      {displayPosts && displayPosts.length === 0 && (
                        <p style={{ opacity: 0.5 }}>
                          {sourceType === "manual"
                            ? __(
                                "Select posts in the sidebar.",
                                "overchain-blocks",
                              )
                            : __("No posts found.", "overchain-blocks")}
                        </p>
                      )}
                      {displayPosts &&
                        displayPosts.map((post) => (
                          <PostCard key={post.id} post={post} />
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
