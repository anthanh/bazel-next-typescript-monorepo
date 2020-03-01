package(default_visibility = ["//visibility:public"])

load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary")

filegroup(
    name = "config",
    srcs = [
        "package.json",
    ],
)

filegroup(
    name = "sources",
    srcs = [
        "main.js"
    ],
)

filegroup(
    name = "webapp",
    srcs = [
        ":config",
        ":sources",
    ],
)

nodejs_binary(
    name = "start",
    args = [],
    data = [
        ":webapp",
        "@npm//@monorepo/common",
        "@npm//lodash",
    ],
    entry_point = "main.js",
)
