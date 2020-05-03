#-------------------------------------------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See https://go.microsoft.com/fwlink/?linkid=2090316 for license information.
#-------------------------------------------------------------------------------------------------------------

# To fully customize the contents of this image, use the following Dockerfile instead:
# https://github.com/microsoft/vscode-dev-containers/tree/v0.112.0/containers/javascript-node-12/.devcontainer/Dockerfile
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-12

# ** [Optional] Uncomment this section to install additional packages. **
#
# ENV DEBIAN_FRONTEND=noninteractive
# RUN apt-get update \
#    && apt-get -y install --no-install-recommends <your-package-list-here> \
#    #
#    # Clean up
#    && apt-get autoremove -y \
#    && apt-get clean -y \
#    && rm -rf /var/lib/apt/lists/*
# ENV DEBIAN_FRONTEND=dialog
RUN sed -i s@/dl.yarnpkg.com/@/mirrors.aliyun.com/@g /etc/apt/sources.list \
   && sed -i s@/security.debian.org/@/mirrors.aliyun.com/@g /etc/apt/sources.list \
   && sed -i s@/deb.debian.org/@/mirrors.aliyun.com/@g /etc/apt/sources.list \
   && apt-get clean
RUN apt-get update
RUN apt-get install  openssh-server -y
RUN mkdir -p /var/run/sshd
RUN mkdir -p /root/.ssh
RUN ssh-keygen -t rsa -f /root/.ssh/id_rsa -N ''
# RUN sed -i 's/PermitRootLogin without-password/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN cat /root/.ssh/id_rsa.pub >> /root/.ssh/authorized_keys
RUN chmod og-wx /root/.ssh/authorized_keys
COPY init.sh /usr/local/bin/
RUN chmod u+x /usr/local/bin/init.sh

ENTRYPOINT ["/usr/local/bin/init.sh"]
