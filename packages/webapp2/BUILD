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
    srcs = ["pages/index.tsx"],
)

filegroup(
    name = "webapp2",
    srcs = [
        ":config",
        ":sources",
        "//:config",
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
