

docker-push:
  sudo docker build .
  sudo docker tag isanjay112/courses-ui:latest
  sudo docker push
