import { useState, useEffect } from "react";
import axios from "axios";
import "../Postlist.css";

const ListPost = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState("-published_at");
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://suitmedia-backend.suitdev.com/api/ideas",
          {
            params: {
              "page[number]": page,
              "page[size]": size,
              "append[]": ["small_image", "medium_image"],
              sort: sort,
            },
          }
        );
        setPosts(response.data.data);
        setTotalPages(response.data.meta.total_pages);
        setTotalPosts(response.data.meta.total_count);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [page, size, sort]);

  const startItem = (page - 1) * size + 1;
  const endItem = Math.min(page * size, totalPosts);

  return (
    <div className="list-post-container">
      <div className="controls flex justify-between items-center">
        <div className="controls-left">
          <span className="showing-info">
            Showing {startItem}-{endItem} of {totalPosts}
          </span>
        </div>
        <div className="controls-right flex gap-x-5">
          <label className="flex gap-x-2 items-center">
            Show:
            <select
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="control-select b-2 "
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </label>
          <label className="flex gap-x-2 items-center">
            Sort by:
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="control-select"
            >
              <option value="-published_at">Newest</option>
              <option value="published_at">Oldest</option>
            </select>
          </label>
        </div>
      </div>

      <div className="posts-grid">
        {posts.map((post) => {
          const imageUrl =
            post.small_image?.url ||
            post.medium_image?.url ||
            "path/to/default-image.jpg";

          const publishedDate = new Date(post.published_at).toLocaleDateString(
            "id-ID",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          );

          return (
            <div key={post.id} className="post-card">
              <img
                src={imageUrl}
                alt={post.title}
                loading="lazy"
                className="post-image"
              />
              <p className="post-date">{publishedDate}</p>{" "}
              {/* Tanggal Publikasi */}
              <h3 className="post-title">{post.title}</h3>
            </div>
          );
        })}
      </div>

      {/* Kontrol Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`pagination-button ${page === i + 1 ? "active" : ""}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListPost;
