# NextJS Bazel Monorepo Example

This is an example of frontend monorepo with several packages:

- **common**: Shared elements for any application (JS)
- **common2**: Shared elements for any application (TS)
- **webapp2**: An example universal (SSR) client app build in nextJS that depends on `common`
- **webapp2**: An example universal (SSR) client app build in nextJS + Typescript that depends on `common2`

- [NextJS Bazel Monorepo Example](#nextjs-bazel-monorepo-example)
  - [Prerequisites](#prerequisites)
  - [Available Commands](#available-commands)
    - [Install](#install)
    - [Run webapp (JS) (nexJS + common)](#run-webapp-js-nexjs--common)
    - [Run webapp2 (TS) (nexJS + common2)](#run-webapp2-ts-nexjs--common2)
    - [Build webapp docker image](#build-webapp-docker-image)
    - [Run webapp docker image](#run-webapp-docker-image)


## Prerequisites

* [Bazelisk](https://github.com/bazelbuild/bazelisk)
* [Yarn](https://yarnpkg.com/)
* [nodeJS](https://nodejs.org/es/)

## Available Commands

### Install

Installs all dependencies for every package

```bash
yarn
```

### Run webapp (JS) (nexJS + common)

Installs all dependencies for every package

```bash
yarn start:webapp
// or:
bazelisk run //packages/webapp:start
```

### Run webapp2 (TS) (nexJS + common2)

Installs all dependencies for every package

```bash
yarn start:webapp2
// or:
bazelisk run //packages/webapp2:start
```

### Build webapp docker image

```bash
bazelisk run //packages/webapp:image --platforms=@io_bazel_rules_go//go/toolchain:linux_amd64
```

### Run webapp docker image

```bash
docker run -it -p 3000:3000 bazel/packages/webapp:image
```