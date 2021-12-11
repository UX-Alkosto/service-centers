import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import cleaner from "rollup-plugin-cleaner";
import filesize from "rollup-plugin-filesize";
import { terser } from "rollup-plugin-terser";
import minifyHTML from "rollup-plugin-minify-html-literals";
import cleanup from "rollup-plugin-cleanup";
import { name, version } from "./package.json";

// The main JavaScript bundle for modern browsers that support
// JavaScript modules and other ES2015+ features.
const config = {
    input: {
        servicio: "./src/js/servicio.js"
    },
    output: [{
        banner: `/*! ${name} - release: ${version} */`,
        dir: "dist/common/js/",
        chunkFileNames: "[name]-[hash].js",
        format: "es"
    }],
    plugins: [
        cleaner({
            targets: [
                "./dist/common/js/"
            ]
        }),
        minifyHTML(),
        resolve(),
        commonjs(),
        cleanup({
            comments: "none"
        }),
        babel({
            exclude: "node_modules/**", // only transpile our source code
            babelHelpers: "bundled",
        }),
        filesize({
            showMinifiedSize: true,
            showGzippedSize: true
        })
    ],
    preserveEntrySignatures: false
};

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== "development") {
    config.plugins.push(terser({
        module: true,
        warnings: true
    }));
}

export default config;