package(default_visibility = ["//visibility:public"])

load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary", "copy_to_bin")
load("@io_bazel_rules_docker//nodejs:image.bzl", "nodejs_image" )

filegroup(
    name = "config",
    srcs = [
        "package.json",
        "tsconfig.json",
        "next.config.js",
        "next-env.d.ts",
    ],
)

filegroup(
    name = "sources",
    srcs = ["pages/index.js"],
)

filegroup(
    name = "webapp",
    srcs = [
        "//:config",
        ":config",
        ":sources",
    ],
)

copy_to_bin(
    name = "copy_next",
    srcs = glob([".next/**"]),
)

nodejs_binary(
    name = "next",
    data = [
        "@npm//:node_modules",
    ],
    entry_point = "@npm//:node_modules/next/dist/bin/next",
    node_modules = "@npm//:node_modules",
)

# nextjs generates a comples tree with hashed files, so we zip it together
genrule(
    name = "build",
    srcs = [
        ":webapp",
        "@npm//:node_modules",
    ],
    outs = ["next.tar.gz"],
    cmd = """
        $(location next) build ./packages/webapp
        tar -czvf next.tar.gz packages/webapp/.next
        mv next.tar.gz $(@D)
    """,
    tools = [":next"],
)

# pass build file, expand and run production mode webapp
genrule(
    name = "start",
    srcs = [
        ":build",
        ":webapp",
        "@npm//:node_modules",
    ],
    outs = ['lol.txt'],
    cmd = """
        tar -xvzf $(location :build)
        $(location next) start ./packages/webapp
    """,
    tools = [":next"],
    executable = True,
)

# DOCKER TARGETS
load("@io_bazel_rules_docker//container:container.bzl", "container_pull", "container_image", "container_push")

load("@bazel_tools//tools/build_defs/pkg:pkg.bzl", "pkg_tar")

pkg_tar(
    name = "webapp-tar",
    srcs = [
        ":config",
        ":sources",
    ],
    package_dir = "packages/webapp",
    # Otherwise all directories are flattened:
    # <https://github.com/bazelbuild/rules_docker/issues/317>
    strip_prefix = ".",
)

container_image(
    name = "image",
    base = "@node_image//image",
    workdir = "/home/app/",
    directory = "/home/app/",
    tars = [
        "//:root-tar",
        "//packages/common:common-tar",
        ":webapp-tar",
        ],
    ports = ["3000"],
    cmd = """
        apk --no-cache add git autoconf automake bash g++ libc6-compat libjpeg-turbo-dev libpng-dev make nasm
        yarn install --frozen-lockfile --production=false
        yarn workspace @monorepo/$PACKAGE run build
        yarn workspace @monorepo/$PACKAGE run start
    """,
    env = {
        "PACKAGE": "webapp",
        "NODE_ENV": "production",
        "ENV": "{ENV}",

    },
    labels = {
        "PACKAGE": "webapp",
        "ENV": "{ENV}",
    },
    stamp = True,
    visibility = ["//visibility:public"],
)
