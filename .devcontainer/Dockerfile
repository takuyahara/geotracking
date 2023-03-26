ARG VARIANT="18"
FROM mcr.microsoft.com/devcontainers/javascript-node:0-${VARIANT}

RUN apt-get update && apt-get -y install git-flow \
    bash-completion

RUN echo ". /usr/share/bash-completion/bash_completion" >> ~/.bashrc
