//https://github.com/babel/gulp-babel

const mode = process.env.NODE_ENV || 'development';
const dev = mode === 'development';
const prod = mode === 'production';
var started = false;

//const path        = require('path');
//const fs          = require('fs');
var gulp            = require('gulp');
//var clean         = require('gulp-clean'); // outdate
const del           = require('del');
var rename          = require('gulp-rename');
var nodemon         = require('gulp-nodemon');
const svelte        = require('rollup-plugin-svelte');
const resolve       = require('rollup-plugin-node-resolve');
const commonjs      = require('rollup-plugin-commonjs');
const rollup        = require('gulp-better-rollup');
//var browserSync     = require('browser-sync').create();
//const babel       = require('gulp-babel');

//===============================================
// Rollup
//===============================================
var frontrollupconfig = {
    //input: 'src/main.js',
    plugins: [
        svelte({
			dev: !dev,
			css: css => {
				css.write('public/bundle.css');
			}
        }),
        resolve(),
        commonjs(),
    ]
}
function frontrollup_build(){
    return gulp.src('src/client/cliententrypoint.js')
    //.pipe(rollup(frontrollupconfig, 'umd'))
    .pipe(rollup(
        frontrollupconfig,
        {
            format: 'cjs',
        }
    ))
    //.pipe(rollup(require('./rollup.config.js'), 'umd'))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('public/'));
}
exports.frontrollup_build = frontrollup_build;
//===============================================
// Backend Server Build
//===============================================
function backend_build(done){
    return gulp.src('./app.js')
		//.pipe(babel({
            //presets: ['@babel/preset-env', { modules: false }],
            //presets: ['@babel/preset-env'],
            //plugins: [
                //["add-module-exports"],
                //["@babel/plugin-syntax-dynamic-import"]
            //]
        //}))
        .pipe(rename('backend.js'))
        .pipe(gulp.dest('./'))
    done();
}
exports.backend_build = backend_build;
async function cleanbundle(done){
    //return gulp.src(['public/bundle.js','public/bundle.js.map'], {read: false, allowEmpty:true})
        //.pipe(clean());
    //del
    del.sync([ 'public/bundle.js','public/bundle.js.map']);
    return done();
}
exports.cleanbundle = cleanbundle;
function serve(done){
    var stream = nodemon({
        //nodemon: require('nodemon'),
        script: 'app.js',
        //watch:['src/client'],
        //watch:['public/'],
        ext: 'js svelte',
        ignore: ['gulpfile.js','rollup.config.js','node_modules/','data/','src'],
        //tasks: ['cleanscript'],
        done: done,
	}).on('start', function () {
        //console.log('===================================');
        //console.log('started!');
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			done();
			started = true; 
        } 
        //console.log('started END=========!');
    }).on('restart', function () {
        //console.log('===================================');
        //console.log('restarted!');
        //cleanscript();
    }).on('crash', function() {
        //console.log('===================================');
        //console.error('Application has crashed!\n');
        stream.emit('restart', 5);  // restart the server in 5 seconds
    });
    return stream;
}
exports.serve = serve;
function watch(done) {
    gulp.watch(['./app.js','./src/**/*.*'], gulp.series(backend_build));
    //gulp.watch(['./src/client/**/*.*'], gulp.series( cleanbundle, frontrollup_build, lib_test, refreshbrowser));
    gulp.watch(['./src/**/*.*'], gulp.series( cleanbundle, frontrollup_build, copy_html));
    gulp.watch(['./src/common/**/*.*'], gulp.series( copy_common));
    return done();
}
exports.watch = watch;
function copy_html(){
    return gulp.src('src/client/index.html')
        .pipe(gulp.dest('public/'));
}
exports.copy_html = copy_html;
function copy_css(){
    return gulp.src('src/client/global.css')
        .pipe(gulp.dest('public/'));
}
exports.copy_css = copy_css;
function copy_svg(){
    return gulp.src('src/client/icons/*.svg')
        .pipe(gulp.dest('public/'));
}
exports.copy_svg = copy_svg;
function copy_common(){
    return gulp.src('src/common/*.js')
    //.pipe(rollup(frontrollupconfig, 'umd'))
    //.pipe(rename('gunjstrustsharekey.js'))
    .pipe(gulp.dest('public/'));
}
exports.copy_common = copy_common;

const build = gulp.series(
    frontrollup_build, 
    backend_build, 
    copy_css, copy_html, 
    copy_svg, 
    watch, 
    serve, 
    copy_common
    //browser_sync,
);

/*
 * Export a default task
 */
exports.default  = build;