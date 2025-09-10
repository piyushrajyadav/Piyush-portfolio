import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';

const ArticleCard = ({ title, link, pubDate, thumbnail }) => (
  <motion.div
    variants={fadeIn("right", "spring", 0.5, 0.75)}
    className="group bg-bgSecondaryDark dark:bg-bgSecondaryLight p-5 rounded-2xl sm:w-[360px] w-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
  >
    <div className="relative w-full h-[230px] overflow-hidden rounded-xl">
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />
      <img
        src={thumbnail || 'https://miro.medium.com/max/1400/1*psYl0y9DUzZWtHzFJLIvTw.png'}
        alt={title}
        className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <p className="text-white/90 text-sm font-medium">
          {new Date(pubDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>
    </div>

    <div className="mt-5 space-y-4">
      <h3 className="dark:text-white text-gray-800 font-bold text-[20px] leading-[1.4] group-hover:text-primary transition-colors duration-300 line-clamp-3 tracking-tight">
        {title}
      </h3>
      <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-300 font-medium text-[15px]"
        >
          Read Article
          <svg 
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M14 5l7 7m0 0l-7 7m7-7H3" 
            />
          </svg>
        </a>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-secondary font-medium">Medium</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        // Using a CORS proxy to handle Medium's RSS feed
        const response = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://medium.com/feed/@piyushrajyadav28'));
        const text = await response.text();
        
        // Parse the XML response
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');
        const items = xmlDoc.getElementsByTagName('item');
        
        const recentArticles = Array.from(items).slice(0, 3).map(item => {
          const title = item.getElementsByTagName('title')[0]?.textContent || '';
          const link = item.getElementsByTagName('link')[0]?.textContent || '';
          const pubDate = item.getElementsByTagName('pubDate')[0]?.textContent || '';
          
          // Try to get thumbnail from content:encoded or media:content
          let thumbnail = '';
          const contentEncoded = item.getElementsByTagName('content:encoded')[0]?.textContent || '';
          const imgMatch = contentEncoded.match(/<img[^>]+src="([^">]+)"/);
          if (imgMatch) {
            thumbnail = imgMatch[1];
          }
          
          return {
            title: title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
            link,
            pubDate,
            thumbnail
          };
        });
        
        setArticles(recentArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section className="relative w-full min-h-screen mx-auto">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div 
          variants={textVariant()}
          className="text-center mb-16"
        >
          <p className="sectionSubText">My Latest Writings</p>
          <h2 className="sectionHeadText">Tech Stories.</h2>
        </motion.div>

        <div className="mt-20 flex flex-wrap gap-8 justify-center">
          {loading ? (
            <div className="flex items-center justify-center w-full py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : articles.length > 0 ? (
            articles.map((article, index) => (
              <ArticleCard key={`article-${index}`} {...article} />
            ))
          ) : (
            <div className="text-center w-full py-20">
              <p className="text-secondary text-lg">Loading articles...</p>
            </div>
          )}
        </div>

        <motion.div 
          variants={fadeIn("up", "spring", 0.5, 0.75)}
          className="mt-16 text-center"
        >
          <a
            href="https://medium.com/@piyushrajyadav28"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-300"
          >
            Read More Stories
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionWrapper(Articles, "articles"); 