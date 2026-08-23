import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const defaultArticles = [
  {
    title: "Building Autonomous Multi-Agent AI Workflows with LangGraph",
    link: "https://medium.com/@piyushrajyadav28",
    pubDate: new Date().toISOString(),
    thumbnail: "https://miro.medium.com/max/1400/1*psYl0y9DUzZWtHzFJLIvTw.png",
    summary: "Deep dive into stateful graph engineering, cyclic agent loops, and low-latency inference orchestration."
  },
  {
    title: "Securing Multi-Agent Systems Against Inter-Agent Trust Exploitation",
    link: "https://medium.com/@piyushrajyadav28",
    pubDate: new Date().toISOString(),
    thumbnail: "https://miro.medium.com/max/1400/1*psYl0y9DUzZWtHzFJLIvTw.png",
    summary: "How to build real-time security middleware layers preventing privilege escalations in agent networks."
  },
  {
    title: "Designing High-Throughput Distributed Microservices with Spring Boot & Redis",
    link: "https://medium.com/@piyushrajyadav28",
    pubDate: new Date().toISOString(),
    thumbnail: "https://miro.medium.com/max/1400/1*psYl0y9DUzZWtHzFJLIvTw.png",
    summary: "Architecting sub-millisecond cache layers and resilient messaging pipelines for cloud-native scale."
  },
  {
    title: "Zero-Trust Architecture in Cloud-Native Kubernetes Clusters",
    link: "https://medium.com/@piyushrajyadav28",
    pubDate: new Date().toISOString(),
    thumbnail: "https://miro.medium.com/max/1400/1*psYl0y9DUzZWtHzFJLIvTw.png",
    summary: "Implementing robust RBAC, network policies, and Helm automated pipelines in production."
  }
];

function ArticleCard({ title, link, pubDate, thumbnail, summary }) {
  const formattedDate = pubDate
    ? new Date(pubDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Recent";

  return (
    <div className="w-[320px] sm:w-[360px] md:w-[390px] flex-shrink-0 h-[430px] flex flex-col select-none">
      <a
        href={link || "https://medium.com/@piyushrajyadav28"}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-full h-full rounded-2xl md:rounded-3xl p-[1.5px] bg-gradient-to-br from-purple-400/40 via-indigo-300/20 to-teal-400/30 dark:from-purple-500/30 dark:via-white/[0.08] dark:to-teal-400/20 hover:from-purple-500 hover:to-teal-400 transition-all duration-300 hover:scale-[1.015] shadow-md shadow-purple-500/5 dark:shadow-none flex flex-col justify-between overflow-hidden cursor-pointer"
      >
        <div className="relative h-full w-full rounded-2xl md:rounded-3xl p-5 md:p-6 bg-white dark:bg-[#0b0c16] flex flex-col justify-between overflow-hidden border border-slate-200/90 dark:border-white/[0.06]">
          {/* Subtle interior laser grid & ambient glow */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.08] bg-[linear-gradient(to_right,#804dee_1px,transparent_1px),linear-gradient(to_bottom,#804dee_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="pointer-events-none absolute -inset-20 bg-gradient-to-br from-purple-500/10 via-transparent to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />

          <div>
            {/* Article Thumbnail */}
            <div className="relative w-full h-[180px] overflow-hidden rounded-xl bg-slate-100 dark:bg-black/50 border border-slate-200/70 dark:border-white/[0.08]">
              <img
                src={thumbnail || "https://miro.medium.com/max/1400/1*psYl0y9DUzZWtHzFJLIvTw.png"}
                alt={title}
                className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

              {/* Floating Header Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                <span className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium bg-black/70 backdrop-blur-md text-teal-300 rounded-full border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  Medium Story
                </span>
                <span className="px-2 py-0.5 text-[10px] font-medium bg-black/60 text-gray-300 rounded-md backdrop-blur-md">
                  {formattedDate}
                </span>
              </div>
            </div>

            {/* Title & Summary */}
            <div className="mt-4">
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-purple-600 dark:group-hover:text-teal-300 transition-colors duration-200 line-clamp-2">
                {title}
              </h3>
              {summary && (
                <p className="mt-2 text-xs text-slate-600 dark:text-gray-300 leading-relaxed font-normal line-clamp-2">
                  {summary}
                </p>
              )}
            </div>
          </div>

          {/* Bottom Action Row */}
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between text-xs font-semibold text-purple-600 dark:text-teal-400">
            <span className="group-hover:translate-x-0.5 transition-transform duration-200">
              Read Article on Medium
            </span>
            <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}

function Blogs() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "https://api.allorigins.win/raw?url=" +
            encodeURIComponent("https://medium.com/feed/@piyushrajyadav28")
        );
        const text = await response.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");
        const items = xmlDoc.getElementsByTagName("item");

        if (items && items.length > 0) {
          const allArticles = Array.from(items).map((item) => {
            const title = item.getElementsByTagName("title")[0]?.textContent || "";
            const link = item.getElementsByTagName("link")[0]?.textContent || "";
            const pubDate = item.getElementsByTagName("pubDate")[0]?.textContent || "";

            let thumbnail = "";
            const contentEncoded =
              item.getElementsByTagName("content:encoded")[0]?.textContent || "";
            const imgMatch = contentEncoded.match(/<img[^>]+src="([^">]+)"/);
            if (imgMatch) {
              thumbnail = imgMatch[1];
            }

            return {
              title: title
                .replace(/&amp;/g, "&")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">"),
              link,
              pubDate,
              thumbnail,
            };
          });
          setArticles(allArticles);
        } else {
          setArticles(defaultArticles);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles(defaultArticles);
      }
    };

    fetchArticles();
  }, []);

  const displayArticles = articles.length > 0 ? articles : defaultArticles;

  return (
    <section className="w-full my-16 md:my-28 relative z-10 overflow-hidden" id="articles">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-8">
        <motion.div
          variants={textVariant()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <p className="sectionSubText text-slate-500 dark:text-gray-300">Engineering Insights & Research</p>
          <h2 className="sectionHeadText text-slate-900 dark:text-white">Tech Stories & Articles.</h2>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-3 text-sm md:text-base text-slate-600 dark:text-gray-300 max-w-3xl leading-relaxed"
        >
          Continuous stream of engineering publications on stateful agentic loops, distributed scalability, and cloud-native architecture. Hover over any card to pause and read.
        </motion.p>
      </div>

      {/* Articles Continuous Marquee with Pause on Hover and Edge Fades */}
      <div className="marquee-container relative w-full py-4 overflow-hidden">
        {/* Left & Right Edge Gradient Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-36 bg-gradient-to-r from-bgPrimaryLight dark:from-bgPrimaryDark to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-36 bg-gradient-to-l from-bgPrimaryLight dark:from-bgPrimaryDark to-transparent z-20" />

        <div className="overflow-hidden w-full">
          <div className="animate-marquee-left-fast flex gap-7 pl-6">
            {[...displayArticles, ...displayArticles, ...displayArticles, ...displayArticles].map(
              (article, idx) => (
                <ArticleCard key={`art-${idx}`} {...article} />
              )
            )}
          </div>
        </div>
      </div>

      {/* View All Button */}
      <div className="mt-10 text-center">
        <a
          href="https://medium.com/@piyushrajyadav28"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs md:text-sm font-semibold hover:bg-purple-600 dark:hover:bg-teal-400 dark:hover:text-slate-950 transition-all duration-300 shadow-md hover:scale-105 cursor-pointer"
        >
          <span>Explore All Articles on Medium</span>
          <span>↗</span>
        </a>
      </div>
    </section>
  );
}

export default SectionWrapper(Blogs, "articles");
