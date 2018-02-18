FROM node:carbon




RUN mkdir -p /frontend
WORKDIR /frontend
COPY ./ ./

COPY package.json /frontend


RUN npm install




EXPOSE 8000
CMD if [ ${NODE_ENV} = production ]; \
	then \
	npm install -g http-server && \
	npm run build && \
	cd build && \
	hs -p 8000; \
	else \
	npm run start; \
	fi
