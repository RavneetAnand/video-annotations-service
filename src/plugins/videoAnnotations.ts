import { Options } from '../server';
import jwt from 'jsonwebtoken';
import sqlite from 'sqlite3';
import { getAll, getByParams, insert, updateOrDelete } from '../utils/sql';

let db: sqlite.Database;

/**
 * Provide token after the user validation.
 * @param {*} message It contains the parameters sent to the method.
 * @returns Token authentication.
 */
const authenticateUser = async (message: {
  username: string;
  password: string;
}) => {
  let token = '';

  if (message?.username === 'test' && message?.password === 'test') {
    const user = await getByParams(
      db,
      `SELECT * FROM User WHERE userName = ?`,
      [message.username],
    );

    const secretKey = 'your_secret_key';

    token = jwt.sign(user as object, secretKey);
  }
  return { accessToken: token };
};

const getAllVideos = async () => {
  return await getAll(db, 'SELECT * FROM Video');
};

const createVideo = async (
  message: {
    videoId: string;
    title: string;
    description: string;
    url: string;
    duration: number;
  },
  userId: number,
) => {
  return await insert(
    db,
    `INSERT INTO Video (title, description, url, duration, dateCreated, createdBy, dateLastUpdated, lastUpdatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      message.title,
      message.description,
      message.url,
      message.duration,
      new Date(),
      userId,
      new Date(),
      userId,
    ],
  );
};

const deleteVideo = async (videoId: string) => {
  try {
    await updateOrDelete(
      db,
      `DELETE FROM Annotation WHERE videoId = ?`,
      videoId,
    );
    await updateOrDelete(db, `DELETE FROM Video WHERE id = ?`, videoId);
    return true;
  } catch (err: any) {
    console.error(err.message);
    return false;
  }
};

const getAnnotationsByVideoId = async (videoId: string) => {
  return await getAll(
    db,
    `SELECT * FROM Annotation WHERE videoId = ${videoId}`,
  );
};

const createAnnotations = async (
  message: {
    videoId: string;
    annotationTypeId: number;
    startTime: number;
    endTime: number;
    notes: string;
  },
  userId: number,
) => {
  try {
    const validationFailed = await validateAnnotationDuration(
      message.startTime,
      message.endTime,
      message.videoId,
    );

    if (validationFailed !== '') {
      throw new Error(validationFailed);
    }

    const response = await insert(
      db,
      `INSERT INTO Annotation (videoId, startTime, endTime, annotationTypeId, notes, dateCreated, createdBy, dateLastUpdated, lastUpdatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        message.videoId,
        message.startTime,
        message.endTime,
        message.annotationTypeId,
        message.notes,
        userId,
        new Date(),
        new Date(),
        userId,
      ],
    );

    return response;
  } catch (err: any) {
    console.error(err.message);
    return { error: err.message };
  }
};

const updateAnnotations = async (
  message: {
    annotationId: number;
    videoId: number;
    annotationTypeId: number;
    startTime: number;
    endTime: number;
    notes: string;
  },
  userId: number,
) => {
  try {
    const validationFailed = await validateAnnotationDuration(
      message.startTime,
      message.endTime,
      message.videoId.toString(),
    );

    if (validationFailed !== '') {
      throw new Error(validationFailed);
    }

    const response = await updateOrDelete(
      db,
      `UPDATE Annotation SET startTime = ?, endTime = ?, annotationTypeId = ?, notes = ?, dateLastUpdated = ?, lastUpdatedBy = ? WHERE id = ?`,
      [
        message.startTime,
        message.endTime,
        message.annotationTypeId,
        message.notes,
        new Date(),
        userId,
        message.annotationId,
      ],
    );

    return response;
  } catch (err: any) {
    console.error(err.message);
    return { error: err.message };
  }
};

const deleteAnnotations = async (annotationId: string) => {
  try {
    await updateOrDelete(
      db,
      `DELETE FROM Annotation WHERE id = ?`,
      annotationId,
    );
    return true;
  } catch (err: any) {
    console.error(err.message);
    return false;
  }
};

export const videoAnnotationService = (options?: Options) => {
  if (options?.database !== undefined) {
    db = options.database;
  }

  return {
    authenticateUser,
    getAllVideos,
    createVideo,
    deleteVideo,
    getAnnotationsByVideoId,
    createAnnotations,
    updateAnnotations,
    deleteAnnotations,
  };
};

async function validateAnnotationDuration(
  startTime: number,
  endTime: number,
  videoId: string,
) {
  let error = '';
  const videoDuration = (await getByParams(
    db,
    `SELECT duration FROM Video WHERE id = ?`,
    [videoId],
  )) as { duration: number };

  if (videoDuration === undefined) {
    error = 'Video not found.';
  }

  if (startTime < 0 || startTime > videoDuration?.duration) {
    error = 'Invalid start time.';
  }

  if (endTime < 0 || endTime > videoDuration?.duration) {
    error = 'Invalid end time.';
  }
  return error;
}
