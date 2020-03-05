package(default_visibility = ["//visibility:public"])

filegroup(
    name = "config",
    srcs = [
        "package.json",
        "yarn.lock",
        "tsconfig.base.json",
    ],
)

load("@bazel_tools//tools/build_defs/pkg:pkg.bzl", "pkg_tar")

pkg_tar(
    name = "root-tar",
    srcs = [
        ":config",
    ],
    package_dir = ".",
    # Otherwise all directories are flattened:
    # <https://github.com/bazelbuild/rules_docker/issues/317>
    strip_prefix = ".",
)