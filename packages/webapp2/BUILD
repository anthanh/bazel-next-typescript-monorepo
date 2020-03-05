package(default_visibility = ["//visibility:public"])

load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary")

filegroup(
    name = "config",
    srcs = [
        "package.json",
        "tsconfig.json",
        "next.config.js",
    ],
)

filegroup(
    name = "sources",
    srcs = ["pages/index.tsx"],
)

filegroup(
    name = "webapp2",
    srcs = [
        "//:config",
        ":config",
        ":sources",
    ],
)

nodejs_binary(
    name = "next",
    data = [
        "@npm//:node_modules",
    ],
    entry_point = "@npm//:node_modules/next/dist/bin/next",
    node_modules = "@npm//:node_modules",
)

# Build as node_binary but without output
# nodejs_binary(
#     name = "next_build",
#     args = ["build ./packages/webapp2"],
#     data = [
#         ":webapp2",
#         "@npm//:node_modules",
#     ],
#     entry_point = "@npm//:node_modules/next/dist/bin/next",
#     node_modules = "@npm//:node_modules",
# )

genrule(
    name = "build",
    srcs = [
        ":webapp2",
        "@npm//:node_modules",
    ],
    outs = ["next.tar.gz"],
    cmd = """
        $(location next) build ./packages/webapp2
        tar -czvf next.tar.gz packages/webapp2/.next
        mv next.tar.gz $(@D)
    """,
    tools = [":next"],
    # executable = True,
)

nodejs_binary(
    name = "start",
    args = ["./packages/webapp2"],
    data = [
        ":build",
        # ":next_build",
        ":webapp2",
        "@npm//:node_modules",
    ],
    entry_point = "@npm//:node_modules/next/dist/bin/next",
    node_modules = "@npm//:node_modules",
)


# DOCKER TARGETS
load("@io_bazel_rules_docker//container:container.bzl", "container_pull", "container_image", "container_push")

load("@bazel_tools//tools/build_defs/pkg:pkg.bzl", "pkg_tar")

pkg_tar(
    name = "webapp2-tar",
    srcs = [
        ":config",
        ":sources",
    ],
    package_dir = "packages/webapp2",
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
        "//packages/common2:common2-tar",
        ":webapp2-tar",
        ],
    ports = ["3000"],
    cmd = """
        apk --no-cache add git autoconf automake bash g++ libc6-compat libjpeg-turbo-dev libpng-dev make nasm
        yarn install --frozen-lockfile --production=false
        yarn workspace @monorepo/$PACKAGE run build
        yarn workspace @monorepo/$PACKAGE run start
    """,
    env = {
        "PACKAGE": "webapp2",
        "NODE_ENV": "production",
        "ENV": "{ENV}",

    },
    labels = {
        "PACKAGE": "webapp2",
        "ENV": "{ENV}",
    },
    stamp = True,
    visibility = ["//visibility:public"],
)
