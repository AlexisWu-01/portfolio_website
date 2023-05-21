import React, { useState, useEffect } from 'react';
import './portfolio_optimization.css';
import rawMdFile from './portfolio.md';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import histogramImage from './portfolio_img/daily_histogram.png';
import closingPrice from './portfolio_img/closing_price.png';
import correlation from './portfolio_img/correlation.png';
import efficientFrontier from './portfolio_img/efficient_frontier.png';
import mlResult from './portfolio_img/ml_result.png';
import modelResult from './portfolio_img/model_result.png';
import remarkSlug from 'remark-slug';
import remarkAutolinkHeadings from 'remark-autolink-headings';

function PortfolioOptimization() {
  const [content, setContent] = useState('');
  const [toc, setToc] = useState([]);

  const readmeUrl = rawMdFile;

  useEffect(() => {
    fetch(readmeUrl)
      .then(response => response.text())
      .then(text => {
        let updatedText = text;
        updatedText = updatedText.replace('portfolio_img/daily_histogram.png', histogramImage);
        updatedText = updatedText.replace('portfolio_img/closing_price.png', closingPrice);
        updatedText = updatedText.replace('portfolio_img/correlation.png', correlation);
        updatedText = updatedText.replace('portfolio_img/efficient_frontier.png', efficientFrontier);
        updatedText = updatedText.replace('portfolio_img/ml_result.png', mlResult);
        updatedText = updatedText.replace('portfolio_img/model_result.png', modelResult);
        setContent(updatedText);
      });
  }, [readmeUrl]);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('.portfolio-content h2, .portfolio-content h3'));
    const tocItems = [];
    let currentItem = { id: null, text: '', level: 0, children: [] };

    headings.forEach((heading) => {
      const level = parseInt(heading.tagName[1], 10);
      const item = {
        id: heading.id,
        text: heading.innerText,
        level: level,
        children: [],
      };

      if (level === currentItem.level) {
        currentItem.parent.children.push(item);
      } else if (level > currentItem.level) {
        currentItem.children.push(item);
      } else {
        let parent = currentItem.parent;
        while (level <= parent.level && parent.parent !== null) {
          parent = parent.parent;
        }
        parent.children.push(item);
      }

      item.parent = currentItem;
      tocItems.push(item);
      currentItem = item;
    });

    setToc(tocItems);
  }, [content]);

  const renderTocItems = (items, level = 1) => {
    return items.map(item => (
      <li key={item.id}>
        <button onClick={() => handleJumpToHeading(item.id)} style={{ paddingLeft: `${(level - 1) * 1.5}rem` }}>
          {item.text}
        </button>
        {item.children && item.children.length > 0 && (
          <ul>{renderTocItems(item.children, level + 1)}</ul>
        )}
      </li>
    ));
  };

  const handleJumpToHeading = (id) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio-details">
      <div className="portfolio-toc">
        <h2>Table of Contents</h2>
        <ul>{renderTocItems(toc)}</ul>
      </div>
      <div className="portfolio-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkSlug, remarkAutolinkHeadings, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
          children={content}
        />
      </div>
    </div>
  );
}

export default PortfolioOptimization;
