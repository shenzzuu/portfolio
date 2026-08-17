import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink, GitCommit, GitPullRequest, GitMerge, FilePlus, Code } from 'lucide-react';
import './GithubActivity.css';

// Custom SVG to replace missing Github icon in lucide-react
const GithubIcon = ({ size = 24, color = "currentColor", className, style }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.2-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.4 5 1.8 5 1.8a5.5 5.5 0 0 0-.2 3.8A5.5 5.5 0 0 0 3.3 9.4c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

const EVENT_ICONS = {
  PushEvent: <GitCommit size={16} className="icon-accent" style={{backgroundColor: 'var(--color-bg)'}} />,
  PullRequestEvent: <GitPullRequest size={16} className="icon-accent" style={{backgroundColor: 'var(--color-bg)'}} />,
  IssuesEvent: <GitMerge size={16} className="icon-accent" style={{backgroundColor: 'var(--color-bg)'}} />,
  CreateEvent: <FilePlus size={16} className="icon-accent" style={{backgroundColor: 'var(--color-bg)'}} />,
  default: <Code size={16} className="icon-accent" style={{backgroundColor: 'var(--color-bg)'}} />
};

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString();
};

const getEventDescription = (event) => {
  const repoName = event.repo.name.split('/')[1] || event.repo.name;
  
  switch (event.type) {
    case 'PushEvent':
      const commitCount = event.payload.size || (event.payload.commits ? event.payload.commits.length : 0);
      if (commitCount === 0) return <span>Pushed to <strong>{repoName}</strong></span>;
      return <span>Pushed {commitCount} commit{commitCount !== 1 ? 's' : ''} to <strong>{repoName}</strong></span>;
    case 'PullRequestEvent':
      return <span>{event.payload.action === 'opened' ? 'Opened' : 'Updated'} PR on <strong>{repoName}</strong></span>;
    case 'IssuesEvent':
      return <span>{event.payload.action === 'opened' ? 'Opened' : 'Updated'} issue on <strong>{repoName}</strong></span>;
    case 'CreateEvent':
      return <span>Created {event.payload.ref_type} on <strong>{repoName}</strong></span>;
    case 'WatchEvent':
      return <span>Starred <strong>{repoName}</strong></span>;
    default:
      return <span>Activity on <strong>{repoName}</strong></span>;
  }
};

const GithubActivity = () => {
  const [repos, setRepos] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Exact names of the featured projects to filter out
  const FEATURED_REPOS = [
    'PlanPrep-Mobile-App',
    'Esports-Club-Management-System',
    'local-restaurant-finder'
  ];

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const [reposRes, eventsRes] = await Promise.all([
          fetch('https://api.github.com/users/shenzzuu/repos?sort=updated&per_page=15'),
          fetch('https://api.github.com/users/shenzzuu/events/public?per_page=10')
        ]);

        if (!reposRes.ok || !eventsRes.ok) {
          throw new Error('Failed to fetch from GitHub API');
        }

        const reposData = await reposRes.json();
        const eventsData = await eventsRes.json();
        
        // Filter out forks and featured projects, take top 4
        const filteredRepos = reposData
          .filter(repo => !repo.fork && !FEATURED_REPOS.includes(repo.name))
          .slice(0, 4);
          
        setRepos(filteredRepos);
        setEvents(eventsData.slice(0, 4)); // Keep latest 4 events for a clean UI timeline
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  if (loading || error) return null; // Silently hide if API issues/rate limit

  return (
    <section id="github-activity" className="section container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2, once: true }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
          <GithubIcon size={32} className="icon-accent" />
          <h2 className="section-title" style={{ margin: 0, padding: 0 }}>Open Source & Activity</h2>
        </div>
        
        <div className="github-layout-grid">
          {/* Left Column: Repositories */}
          <div className="github-repos-col">
            <h3 className="github-col-title">Other Repositories</h3>
            <div className="github-grid">
              {repos.map(repo => (
                <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="github-card glass-card">
                  <div className="github-card-header">
                    <h4>{repo.name}</h4>
                    <ExternalLink size={16} />
                  </div>
                  <p className="github-card-desc">{repo.description || 'No description provided.'}</p>
                  <div className="github-card-stats">
                    {repo.language && <span className="glass-pill-small">{repo.language}</span>}
                    <span className="stat" title="Stars"><Star size={14} /> {repo.stargazers_count}</span>
                    <span className="stat" title="Forks"><GitFork size={14} /> {repo.forks_count}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Activity Feed */}
          <div className="github-feed-col">
            <h3 className="github-col-title">Recent Activity</h3>
            <div className="github-timeline glass-card">
              {events.length > 0 ? events.map((event, index) => (
                <div key={event.id} className="timeline-item">
                  <div className="timeline-icon-wrapper">
                    {EVENT_ICONS[event.type] || EVENT_ICONS.default}
                    {index !== events.length - 1 && <div className="timeline-line"></div>}
                  </div>
                  <div className="timeline-content">
                    <p className="timeline-text">{getEventDescription(event)}</p>
                    <span className="timeline-date">{formatTimeAgo(event.created_at)}</span>
                  </div>
                </div>
              )) : (
                 <p className="timeline-text" style={{padding: '1rem'}}>No recent public activity.</p>
              )}
            </div>
          </div>
        </div>
        
      </motion.div>
    </section>
  );
};

export default GithubActivity;
