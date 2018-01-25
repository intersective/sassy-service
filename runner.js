const gulp = require('gulp');
const sass = require('gulp-sass');
const writeVariables = require('gulp-sass-vars');

const fs = require('fs');
const del = require('del');
const _ = require('lodash');
const path = require('path');
const async = require('async');

const config = require('./config');

// Copy sources to a directory
const copy = (source, target, done) => {
	gulp.src(source)
		.pipe(gulp.dest(target))
		.on('end', done);
}

// Write vars into file
const write = (target, vars, done) => {
	let dest = path.dirname(target);
	gulp.src(target)
		.pipe(writeVariables(vars, {verbose: false}))
		.pipe(gulp.dest(dest))
		.on('end', done);
}

// Compiling
const compile = (source, target, options, done) => {
	options = _.merge({
		outputStyle: 'compressed'
	}, options);

	gulp.src(source)
		.pipe(sass(options))
		.pipe(gulp.dest(target))
		.on('end', done);
}

// Check exists directory
const isExists = (target, createIfNotExists = true) => {
	let found = fs.existsSync(target);
	if (!found && createIfNotExists) {
		fs.mkdirSync(target);
		found = true;
	}
	return found;
}

// Setup a program directory
const setup = (program) => {
	let styleDir = path.resolve(path.join(config.directory.source, program.styleVersion));
	let programDir = path.resolve(path.join(config.directory.build, _.toString(program.id)));
	let programDirTmp = path.resolve(path.join(programDir, 'tmp'));
	let programDirBuild = path.resolve(path.join(programDir, 'build'));

	isExists(styleDir);
	isExists(programDir);
	isExists(programDirTmp);
	isExists(programDirBuild);

	return {
		styleDir: styleDir,
		programDir: programDir,
		programDirTmp: programDirTmp,
		programDirBuild: programDirBuild
	}
}

const build = (programs, done) => {
	async.each(programs, (program, nextProgam) => {
		let paths = setup(program);

		async.waterfall([
			// Delete old style sources
			(callback) => {
				del([
					path.join(paths.programDirTmp, '/**/*'),
					path.join(paths.programDirBuild, '/**/*'),
				]).then(() => {
					callback();
				});
			},

			// Copy SCSS files to tmp directory
			(callback) => {
				copy(path.join(paths.styleDir, '/**/*.*'), paths.programDirTmp, callback);
			},

			// Inject vars to scss file
			(callback) => {
				async.each(program.files, (file, nextEach) => {
					write(path.join(paths.programDirTmp, file.target), file.vars, nextEach);
				}, (err) => {
					callback(err)
				});
			},

			(callback) => {
				compile(path.join(paths.programDirTmp, program.rootFile), paths.programDirBuild, {}, callback);
			}

		], (err) => {
			nextProgam(err);
		});

	}, (err) => {
		done(err);
	});
}

module.exports = {
  build: build
}
