#!/usr/bin/env sh

echo "Installing development dependencies..."
set -x
# npm install --save-dev cross-env
set +x

echo "Running Jest test suite..."
set -x
npm test
