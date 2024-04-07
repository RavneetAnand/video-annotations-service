import { Express } from 'express';
import controller from './controller';

export const routes = (app: Express) => {
  // URL to authenticate a user.
  app.post('/authenticate', controller.authenticateUser);

  // URL to get all videos.
  app.get('/videos', controller.getAllVideos);

  // URL to create a video metadata.
  app.post('/videos', controller.createVideo);

  // URL to delete a video.
  app.delete('/videos/:videoId', controller.deleteVideo);

  // URL to get all video annotations by video ID.
  app.get('/annotations/:videoId', controller.getAnnotationsByVideoId);

  // URL to create video annotations.
  app.post('/annotations', controller.createAnnotations);

  // URL to update video annotations.
  app.put('/annotations', controller.updateAnnotations);

  // URL to delete a video annotation.
  app.delete('/annotations/:annotationId', controller.deleteAnnotations);
};
