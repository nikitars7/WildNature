import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf = () => {
  // Search for fonts .otf
  return (
    app.gulp
      .src(`${app.path.srcFolder}/fonts/*.otf`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>",
          })
        )
      )
      // Convert to .ttf
      .pipe(
        fonter({
          formats: ["ttf"],
        })
      )
      // Discharge
      .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
  );
};

export const ttfToWoff = () => {
  //Search for fonts .ttf
  return (
    app.gulp
      .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>",
          })
        )
      )
      // Convert to .woff
      .pipe(
        fonter({
          formats: ["woff"],
        })
      )
      // Discharge
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
      // Search for fonts .ttf
      .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
      // Convert to .woff2
      .pipe(ttf2woff2())
      //Discharge
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
  );
};

export const fontsStyle = () => {
  // Файл стилей подключения шрифтов
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
  //Check if exist font files
  fs.readdir(app.path.build.fonts, (err, fontsFiles) => {
    if (fontsFiles) {
      // Check if fonts file is exist
      if (!fs.existsSync(fontsFile)) {
        // If doesnt , create it
        fs.writeFile(fontsFile, "", cb);
        let newFileOnly;
        for (let i = 0; i < fontsFiles.length; i++) {
          //Записываем подключение шрифтов в файл стилей
          let fontFileName = fontsFiles[i].split(".")[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split("-")[0]
              ? fontFileName.split("-")[0]
              : fontFileName;
            let fontWeight = fontFileName.split("-")[1]
              ? fontFileName.split("-")[1]
              : fontFileName;
            if (fontWeight.toLowerCase() === "thin") {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === "extralight") {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === "light") {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === "medium") {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === "semibold") {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === "bold") {
              fontWeight = 700;
            } else if (
              fontWeight.toLowerCase() === "extrabold" ||
              fontWeight.toLowerCase() === "heavy"
            ) {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === "black") {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }
            fs.appendFile(
              fontsFile,
              `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`,
              cb
            );
          }
        }
      } else {
        console.log(
          "Файл scss/fonts.scss уже существует.Для обновления нужно его удалить !"
        );
      }
    }
  });
  return app.gulp.src(`${app.path.srcFolder}`);
  function cb() {}
};
