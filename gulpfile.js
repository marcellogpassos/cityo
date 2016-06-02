var gulp = require('gulp');

gulp.task('default', function () {

    var src_dir = "./bower_components/";
    var dst_dir = "./public/lib/";

    gulp.src(src_dir + "angular/angular.min.js")
        .pipe(gulp.dest(dst_dir + "angular"));

    gulp.src(src_dir + "angular-input-masks/angular-input-masks-standalone.min.js")
        .pipe(gulp.dest(dst_dir + "angular-input-masks"));

    gulp.src(src_dir + "angular-resource/angular-resource.min.js")
        .pipe(gulp.dest(dst_dir + "angular-resource"));

    gulp.src(src_dir + "angular-ui-router/release/angular-ui-router.min.js")
        .pipe(gulp.dest(dst_dir + "angular-ui-router"));

    gulp.src(src_dir + "jquery/dist/*")
        .pipe(gulp.dest(dst_dir + "jquery"));

    gulp.src(src_dir + "Materialize/dist/**/*")
        .pipe(gulp.dest(dst_dir + "Materialize"));

});