ProjectName = "GeoTracking"
Pwd := $(shell pwd)

.SILENT:
.PHONY: login
# Log in to Google account.
login:
	clasp login

.SILENT:
.PHONY: clone
## Generate .clasp.json. Only use right after cloning from repository.
clone: login
	read -p "scriptURL: " ScriptUrl; \
	clasp clone $${ScriptUrl}

.SILENT:
.PHONY: create
# Create new Google Sheet.
create:
	clasp create --title ${ProjectName} --type sheets

.SILENT:
.PHONY: push
# Push codes to remote.
push:
	clasp push -f

.SILENT:
.PHONY: init
## Create initial sheet and project.
init: login create push open

.SILENT:
.PHONY: open
## Open script to run code.
open:
	clasp open

.DEFAULT_GOAL := help
.SILENT:
.PHONY: help
help: # https://gist.github.com/klmr/575726c7e05d8780505a#file-show-help-minified-make
	sed -ne"/^## /{h;s/.*//;:d" -e"H;n;s/^## //;td" -e"s/:.*//;G;s/\\n## /---/;s/\\n/ /g;p;}" ${MAKEFILE_LIST}|LC_ALL='C' awk -F --- -v n=$$(tput cols) -v i=19 -v a="$$(tput setaf 6)" -v z="$$(tput sgr0)" '{printf"%s%*s%s ",a,-i,$$1,z;m=split($$2,w," ");l=n-i;for(j=1;j<=m;j++){l-=length(w[j])+1;if(l<= 0){l=n-i-length(w[j])-1;printf"\n%*s ",-i," ";}printf"%s ",w[j];}printf"\n";}'
