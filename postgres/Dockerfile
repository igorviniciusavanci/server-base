FROM postgres:latest

RUN localedef -i pt_BR -c -f UTF-8 -A /usr/share/locale/locale.alias pt_BR.UTF-8
ENV LANG pt_BR.utf8

# add backup scripts
ADD bin/backup.sh /usr/local/bin/backup
ADD bin/restore.sh /usr/local/bin/restore
ADD bin/list-backups.sh /usr/local/bin/list-backups


# make them executable
RUN chmod +x /usr/local/bin/restore
RUN chmod +x /usr/local/bin/list-backups
RUN chmod +x /usr/local/bin/backup

# Install extensions
ADD bin/install-extensions.sh /docker-entrypoint-initdb.d/
