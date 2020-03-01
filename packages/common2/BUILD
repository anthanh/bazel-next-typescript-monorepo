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
    name = "common2",
    srcs = [
        ":config",
        ":sources",
    ],
    visibility = ["//visibility:public"],
)
