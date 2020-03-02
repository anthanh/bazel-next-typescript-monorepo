package(default_visibility = ["//visibility:public"])

load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary")

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
