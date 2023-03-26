Pwd := $(shell pwd)
.SILENT:
.PHONY: setting
# Copy .clasp.json from reset/ and update rootDir
setting:
	cp ../reset/.clasp.json ${Pwd}/.clasp.json
	clasp setting rootDir ${Pwd}/dist

.SILENT:
.PHONY: init
## Initialize project
init: setting forcepush
	clasp deploy --description "Initial version"

.SILENT:
.PHONY: open
## Open script
open: 
	clasp open

.SILENT:
.PHONY: dist
## Generate codes optimized for Google Apps Script
dist:
	if [ ! -d ./dist ]; then \
		mkdir ./dist; \
	fi
	npx babel --plugins=babel-plugin-clasp ./*.js --out-dir ./dist
	npx prettier ./dist/*.js --write
	cp appsscript.json ./dist

.SILENT:
.PHONY: push
## Push codes to remote
push: dist
	clasp push

.SILENT:
.PHONY: forcepush
## Force push codes to remote
forcepush: dist
	clasp push -f

.DEFAULT_GOAL := help
.SILENT:
.PHONY: help
help: # https://gist.github.com/klmr/575726c7e05d8780505a#file-show-help-minified-make
	sed -ne"/^## /{h;s/.*//;:d" -e"H;n;s/^## //;td" -e"s/:.*//;G;s/\\n## /---/;s/\\n/ /g;p;}" ${MAKEFILE_LIST}|LC_ALL='C' awk -F --- -v n=$$(tput cols) -v i=19 -v a="$$(tput setaf 6)" -v z="$$(tput sgr0)" '{printf"%s%*s%s ",a,-i,$$1,z;m=split($$2,w," ");l=n-i;for(j=1;j<=m;j++){l-=length(w[j])+1;if(l<= 0){l=n-i-length(w[j])-1;printf"\n%*s ",-i," ";}printf"%s ",w[j];}printf"\n";}'
