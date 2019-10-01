#! /bin/bash
rm -rf Gemfile.lock
echo 'export BUNDLER_VERSION=$(cat Gemfile.lock | tail -1 | tr -d " ")' >> $BASH_ENV
source $BASH_ENV
gem install bundler
bundle install

docker run \
  -it \
  --rm  \
  --pid=host \
  -v /$(pwd)://app:rw \
  --workdir //app  \
  --publish 80:4000 \
  lakruzz/jekyll-plus:latest bundle exec jekyll serve --config _config.yml,_dev_config.yml --watch
