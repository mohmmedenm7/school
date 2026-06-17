import React from 'react';
import { Link } from 'react-router';

export default function LessonCard({ lesson, courseId, isActive }) {
  const hasThumbnail = lesson.playbackId && lesson.playbackId.length > 0;
  const thumbnailUrl = hasThumbnail
    ? `https://image.mux.com/${lesson.playbackId}/thumbnail.png?width=160&height=90&fit_mode=crop`
    : null;

  return (
    <Link
      to={`/watch/${lesson.id}`}
      className={`lesson-card${isActive ? ' lesson-card--active' : ''}`}
      dir="rtl"
    >
      <div className="lesson-card__order">
        <span>{lesson.order}</span>
      </div>

      <div className="lesson-card__thumbnail">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={lesson.title}
            className="lesson-card__thumb-img"
            loading="lazy"
          />
        ) : (
          <div className="lesson-card__thumb-placeholder">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        )}
        <span className="lesson-card__duration">{lesson.duration}</span>
      </div>

      <div className="lesson-card__info">
        <h4 className="lesson-card__title">{lesson.title}</h4>
        <span className="lesson-card__meta">
          الدرس {lesson.order} • {lesson.duration}
        </span>
      </div>

      <div className="lesson-card__play-icon">
        {isActive ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}
      </div>
    </Link>
  );
}
