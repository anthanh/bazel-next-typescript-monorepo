package(default_visibility = ["//visibility:public"])

load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary", "copy_to_bin")
load("@io_bazel_rules_docker//nodejs:image.bzl", "nodejs_image" )

filegroup(
    name = "config",
    srcs = [
        "package.json",
        "next.config.js",
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

nodejs_image(
    name = "image",
    args = ["start ./packages/ssr-client-brand"],
    data = [
        ":copy_next",
        ":webapp",
        "@npm//:node_modules",
    ],
    entry_point = "@npm//:node_modules/next/dist/bin/next",
    node_modules = "@npm//:node_modules",
)

nodejs_image(
    name = "index",
    entry_point = "index.js",
    node_modules = "@npm//:node_modules",
)
