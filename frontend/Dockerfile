FROM node:carbon




RUN mkdir -p /frontend
WORKDIR /frontend
COPY . ./

COPY package.json /frontend


RUN npm install



EXPOSE 8000
CMD if[ ${NODE_ENV} = lint ];\
	then\
	npm run lint;\
	else \
	npm run start; \
	fi

