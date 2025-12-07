#!/bin/bash

alias format='./scripts/format.sh'
alias lint='./scripts/lint.sh'
alias test='./scripts/test.sh'
alias build='./scripts/build.sh'
alias run='./scripts/run.sh'

alias c='format && lint && test && build'
