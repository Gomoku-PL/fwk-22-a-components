import React from "react";
import "./DocLinkBar.css";

export default function DocLinkBar({
  links = [
    { label: "Privacy Policy", url: "/privacy" },
    { label: "Cookie Policy", url: "/cookies" },
    { label: "Data Rights", url: "/data-rights" },
  ],
  className = "",
}) {
  // Guard clause: if no links, render nothing
  if (!links || links.length === 0) return null;

  return (
    <nav className={`doc-link-bar ${className}`}>
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="doc-link"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
