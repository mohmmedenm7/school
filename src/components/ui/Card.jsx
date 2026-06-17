import React from 'react';

export default function Card({ children, className, title, headerAction }) {
  return (
    <div className={`card glass-panel ${className || ''}`}>
      {title && (
        <div className="card__header">
          <h3 className="card__title">{title}</h3>
          {headerAction && <div className="card__header-action">{headerAction}</div>}
        </div>
      )}
      <div className="card__body">
        {children}
      </div>
    </div>
  );
}
