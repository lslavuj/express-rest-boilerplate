#!/bin/bash

local_branch_name="$(git rev-parse --abbrev-ref HEAD)"
valid_branch_regex='^main|((build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)\/([A-Z]+-[0-9]+|NO-ID)\/[a-zA-Z0-9\-]+)$'
message="ERROR: Invalid branch name!\nBranch names must follow this pattern: ${valid_branch_regex}\nRename your branch and try again.\n\n"

if [[ ! $local_branch_name =~ $valid_branch_regex ]]; then
    printf "$message"
    exit 1
fi

exit 0
