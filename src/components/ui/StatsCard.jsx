import React from 'react';

export default function StatsCard({ title, value, change, icon, variant }) {
  const isPositive = change && change.startsWith('+');

  return (
    <div className={`stats-card ${variant ? `stats-card--${variant}` : ''}`}>
      {icon && <div className="stats-card__icon">{icon}</div>}
      <div className="stats-card__content">
        <span className="stats-card__title">{title}</span>
        <span className="stats-card__value">{value}</span>
        {change && (
          <span className={`stats-card__change ${isPositive ? 'stats-card__change--up' : 'stats-card__change--down'}`}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
