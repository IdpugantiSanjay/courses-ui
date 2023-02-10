docker-push:
  # build docker image with latest tag applied
  sudo docker build -t isanjay112/courses-ui:latest .
  # push the built docker image to dockerhub. watchtower will watch and automatically deploy
  sudo docker push isanjay112/courses-ui:latest
