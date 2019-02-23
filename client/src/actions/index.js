import { POST_ARCHIVE, ARCHIVE_NOT_FOUND, ARCHIVE_FOUND, GET_ARCHIVE } from './types';

export const showCalendar = ({ dates }) => ({
  type: ARCHIVE_FOUND,
  dates
});

export const showSimilarUrls = ({ similarUrls }) => ({
  type: ARCHIVE_NOT_FOUND,
  similarUrls
});

export const getArchive = ({ html }) => ({
  type: GET_ARCHIVE,
  html
});

export const postArchive = ({ message, error }) => ({
  type: POST_ARCHIVE,
  message,
  error
});
