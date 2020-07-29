---
layout: post
title: Debugging GutHub Actions
categories: web
tags:
    - github
---

I've built a few [github actions][actions] recently. They're a nice & powerful feature, but debugging them is a bit awkward, because they're running on someone elses computer. I thought I'd write down a few notes while the experience was fresh in my mind.

![someone elses computer](https://miro.medium.com/max/650/1*el4nHcOQdfHxzzcTC99jDw.png)

## Debugging actions on other triggers

The action I was [writing this morning][doc_action] was meant to only run when we made a release, but obviously I didn't want to make a release just to test things. I worked around this by adding the branch I was working on to the `on` stanza:

```yaml

on:
  release:
    types: [created]
  push:
    branches:
      - my_working_branch
```

This means the workflow I am debugging will run on every push to my branch, as well as on creation of a release. **You need to be careful if the action is destructive or modifies things!**

Also, don't forget to remove this before you merge the updated action!

## Making the run more verbose

By default the steps in an action swallow their standard output. This is handy as it keeps the logs tidy, but when you're trying to work out a problem, not so much.

You can set a [secret][secrets] to disable this behaviour. Make a secret called `ACTIONS_STEP_DEBUG` with a value of `true` and you should see more information in the Actions log.

## Directories & branches

Not really debugging related, but stuff I learned along the way...

In my specific case, I needed to checkout the code in to one directory and use it to build into another. Setting the working directory for tasks is easy, `working-directory` for each, except for the `checkout` action, for that you need [`with: path:`][with_path].

The `checkout` action also only pulls in the branch being built, which was annoying as I wanted to use a `git worktree` to manage the directory being built. This can be fixed by a `git fetch`. The reason the `checkout` action doesn't pull in all the branches is preformance - a large repository with lots of branches could take a while.

[with_path]: https://github.com/ComplianceAsCode/auditree-framework/blob/main/.github/workflows/documentation.yml#L14-L15
[actions]: https://github.com/features/actions
[doc_action]: https://github.com/ComplianceAsCode/auditree-framework/blob/main/.github/workflows/documentation.yml
[secrets]: https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets#creating-encrypted-secrets-for-a-repository