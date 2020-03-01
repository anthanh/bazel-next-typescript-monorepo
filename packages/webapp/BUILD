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

nodejs_binary(
    name = "start",
    args = ["./packages/webapp"],
    data = [
        ":build",
        ":webapp",
        "@npm//:node_modules",
    ],
    entry_point = "@npm//:node_modules/next/dist/bin/next",
    node_modules = "@npm//:node_modules",
)
