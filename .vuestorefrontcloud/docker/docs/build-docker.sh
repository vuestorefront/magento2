TAG=`git rev-parse HEAD`
docker build --progress plain -t registry.storefrontcloud.io/docs-storefrontcloud-io/v2-sdk-magento2:${TAG:0:8} -f Dockerfile ../../../
# docker push registry.storefrontcloud.io/docs-storefrontcloud-io/v2-magento2:${TAG:0:8}
