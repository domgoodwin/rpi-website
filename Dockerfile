FROM resin/raspberry-pi-node:onbuild

# Enable systemd
ENV INITSYSTEM on
EXPOSE 3000

