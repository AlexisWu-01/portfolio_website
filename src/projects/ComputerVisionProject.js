// ComputerVisionProject.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { marked } from 'marked';
import { Renderer } from 'marked';
import { Link } from 'react-scroll';
import './ComputerVisionProject.css';

const renderer = new Renderer();

renderer.image = (href, title, text) => {
  const src = href.replace(/^http:\/\//i, 'https://');
  return `<img src="${src}" alt="${text}"${title ? ` title="${title}"` : ''} class="project-image" />`;
};

marked.setOptions({
  renderer: renderer,
  breaks: true,
});

function extractHeadings(content) {
  const regex = /<h([1-3])[^>]*>(.*?)<\/h[1-3]>/g;
  const headings = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    headings.push({
      level: parseInt(match[1], 10),
      title: match[2],
      id: match[2].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    });
  }

  return headings;
}


function handleTocClick(e, headingId) {
  e.preventDefault();
  console.log('Heading ID:', headingId);
  const target = document.getElementById(headingId);
  // console.log('Target Element:', target);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }
}



function updateHeadingIds(content, toc) {
  return toc.reduce(
    (updatedContent, heading) =>
      updatedContent.replace(
        new RegExp(`<h${heading.level}>${heading.title}</h${heading.level}>`, 'g'),
        `<h${heading.level} id="${heading.id}">${heading.title}</h${heading.level}>`
      ),
    content
  );
}

function ComputerVisionProject() {
  const [readme, setReadme] = useState('');
  const [toc, setToc] = useState([]);
  const { titleParam, readmeUrlParam } = useParams();
  const title = decodeURIComponent(titleParam);
  const readmeUrl = decodeURIComponent(readmeUrlParam);

  console.log('Title:', title);
  console.log('Readme URL:', readmeUrl);

  useEffect(() => {
    const fetchReadme = async () => {
      const response = await fetch(readmeUrl);
      const readmeContent = await response.text();
      const renderedReadme = marked(readmeContent);
      const headings = extractHeadings(renderedReadme);
      setToc(headings);
      setReadme(renderedReadme);
    };

    fetchReadme();
  }, [readmeUrl]);

  return (
    <div className="project-details">
      <h2>{title}</h2>
      <div className="project-container">
        <div className="table-of-contents">
          <h3>Table of Contents</h3>
          <ul>
            {toc.map((heading) => (
              <li key={heading.id} style={{ marginLeft: `${(heading.level - 1) * 16}px` }}>
                <a href={`#${heading.id}`} onClick={(e) => handleTocClick(e, heading.id)} className="toc-link">
                  {heading.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="project-readme" dangerouslySetInnerHTML={{ __html: updateHeadingIds(readme, toc) }} />
      </div>
    </div>
  );
}

export default ComputerVisionProject;
