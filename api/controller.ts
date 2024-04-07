import { videoAnnotationService as service } from '../src/plugins/videoAnnotations';

const {
  authenticateUser,
  getAllVideos,
  createVideo,
  deleteVideo,
  getAnnotationsByVideoId,
  createAnnotations,
  updateAnnotations,
  deleteAnnotations,
} = service();

let controllers = {
  authenticateUser: async (
    req: { body: { username: string; password: string } },
    res: { json: (arg0: { accessToken: string }) => void },
  ) => {
    try {
      const data = await authenticateUser(req.body);
      res.json(data);
    } catch (err: any) {
      console.error(err.message);
    }
  },

  getAllVideos: async (_: any, res: { json: (arg0: unknown) => void }) => {
    try {
      const data = await getAllVideos();
      res.json(data);
    } catch (err: any) {
      console.error(err.message);
    }
  },

  createVideo: async (req: any, res: { json: (arg0: unknown) => void }) => {
    const user = req.auth;
    try {
      const data = await createVideo(req.body, user.id);
      res.json(data);
    } catch (err: any) {
      console.error(err.message);
    }
  },

  deleteVideo: async (
    req: { params: { videoId: string } },
    res: { json: (arg0: boolean) => void },
  ) => {
    try {
      const data = await deleteVideo(req.params.videoId);
      res.json(data);
    } catch (err: any) {
      console.error(err.message);
    }
  },

  getAnnotationsByVideoId: async (
    req: { params: { videoId: string } },
    res: { json: (arg0: unknown) => void },
  ) => {
    try {
      const data = await getAnnotationsByVideoId(req.params.videoId);
      res.json(data);
    } catch (err: any) {
      console.error(err.message);
    }
  },

  createAnnotations: async (
    req: any,
    res: { json: (arg0: unknown) => void },
  ) => {
    const user = req.auth;
    try {
      const data = await createAnnotations(req.body, user.id);
      res.json(data);
    } catch (err: any) {
      console.error(err.message);
    }
  },

  updateAnnotations: async (
    req: any,
    res: { json: (arg0: unknown) => void },
  ) => {
    const user = req.auth;
    try {
      const data = await updateAnnotations(req.body, user.id);
      res.json(data);
    } catch (err: any) {
      res.json(err.message);
    }
  },

  deleteAnnotations: async (
    req: { params: { annotationId: string } },
    res: { json: (arg0: unknown) => void },
  ) => {
    try {
      const data = await deleteAnnotations(req.params.annotationId);
      res.json(data);
    } catch (err: any) {
      res.json(err.message);
    }
  },
};

export default controllers;
