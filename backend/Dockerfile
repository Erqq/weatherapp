FROM node:carbon


RUN mkdir -p /backend
WORKDIR /backend
COPY ./ ./

COPY package.json /backend


RUN npm install

EXPOSE 9000
CMD if [ ${NODE_ENV} = production ]; \
	then \
	npm run start; \
	elif [ ${NODE_ENV} = lint ]; \
	then\
	npm run lint;\
	else \
	npm run dev; \
	fi