const exifr = require('exifr');

async function extractPhotoSettings(imagePath) {
  try {
    const data = await exifr.parse(imagePath, {
      pick: [
        'Make',
        'Model',
        'LensModel',
        'FNumber',
        'ExposureTime',
        'ISO',
        'FocalLength',
        'ExposureMode',
        'WhiteBalance',
        'Flash'
      ]
    });

    if (!data) {
      return null;
    }

    return {
      camera_make: data.Make || null,
      camera_model: data.Model || null,
      lens_model: data.LensModel || null,
      aperture: data.FNumber ? `f/${data.FNumber}` : null,
      shutter_speed: data.ExposureTime ? `1/${Math.round(1 / data.ExposureTime)}s` : null,
      iso: data.ISO || null,
      focal_length: data.FocalLength ? `${data.FocalLength}mm` : null,
      exposure_mode: data.ExposureMode || null,
      white_balance: data.WhiteBalance || null,
      flash: data.Flash || null
    };

  } catch (error) {
    console.error('Could not extract EXIF data:', error);
    return null;
  }
}

module.exports = { extractPhotoSettings };