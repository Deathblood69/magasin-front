#!/usr/bin/env bash

# Chargement fichier conf
source ./build_conf.cfg

IMG="poi-front"         # nom de l'image
FORCE_BUILD=${1:-no}   # build de l'image si vaut "build"

build(){
  DOCKERFILE=$1
  IMAGE=$2
  VERSION=$3
  if  [ $FORCE_BUILD == "force" ] || [ $(docker images -q $IMAGE:$VERSION|wc -l) -lt 1 ]; then # Création img docker au besoin
      echo "--------------Build image $IMAGE"
      docker build --no-cache -f $DOCKERFILE -t $IMAGE:$VERSION .
      docker tag $IMAGE:$VERSION $IMAGE:latest
  else
      echo "--------------------------Image déjà présente : $IMAGE:$VERSION"
  fi
}


# Génération de l'image du module front
build Dockerfile $IMG-image $version
build operateur.dockerfile $IMG-operateur $version
