package(default_visibility = ["//visibility:public"])

filegroup(
    name = "config",
    srcs = glob([
        "package.json",
    ]),
)

filegroup(
    name = "sources",
    srcs = glob(["*.js"]),
)

filegroup(
    name = "common",
    srcs = [
        ":config",
        ":sources",
    ],
    visibility = ["//visibility:public"],
)


load("@bazel_tools//tools/build_defs/pkg:pkg.bzl", "pkg_tar")

pkg_tar(
    name = "common-tar",
    srcs = [
        ":common",
    ],
    package_dir = "packages/common",
    # Otherwise all directories are flattened:
    # <https://github.com/bazelbuild/rules_docker/issues/317>
    strip_prefix = ".",
)
