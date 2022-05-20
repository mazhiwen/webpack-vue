const imagemin = require('imagemin');
const imageminGifsicle = require('imagemin-gifsicle');

(async () => {
  await imagemin(['images/*.gif'], 'build/images', {
    use: [
      imageminGifsicle(),
    ],
  });

  console.log('Images optimized');
})();
