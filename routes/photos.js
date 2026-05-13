router.post(
    '/upload',
    requireUser,
    (req, res, next) => {
      photoController.upload.single('photo')(req, res, (err) => {
        if (err) {
          return res.status(400).render('error', {
            title: 'Upload failed',
            message: err.message
          });
        }
  
        next();
      });
    },
    photoController.handleUpload
  );    