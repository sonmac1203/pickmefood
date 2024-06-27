// components/Breadcrumbs.js
import Link from "next/link";

const Breadcrumbs = ({ crumbs }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {crumbs.map((crumb, index) => (
          <li
            key={index}
            className={`breadcrumb-item ${
              index === crumbs.length - 1 ? "active" : ""
            }`}
          >
            {crumb.href ? (
              <Link href={crumb.href}>
                <span>{crumb.title}</span>
              </Link>
            ) : (
              <span>{crumb.title}</span>
            )}
            {index < crumbs.length - 1 && <span className="separator">›</span>}
          </li>
        ))}
      </ol>
      <style jsx>{`
        .breadcrumb {
          list-style-type: none;
          padding: 0;
          display: flex;
          align-items: center;
        }
        .breadcrumb-item.active {
          font-weight: bold;
          color: #333;
        }
        .breadcrumb-item:not(.active) {
          color: #666;
        }
        .breadcrumb-item:not(.active):hover {
          color: #000;
        }
        .separator {
          margin: 0 5px;
          color: #999;
        }
      `}</style>
    </nav>
  );
};

export default Breadcrumbs;
