module.exports = {
  servers: {
    one: {
      host: 'BOX_IP',
      username: 'root',
      // depending the box
      // password: 'some',
      // pem: `${process.env.HOME}/.ssh/id_rsa`
    }
  },
  meteor: {
    name: 'ts',
    path: process.env.PWD,
    servers: {
      one: {}
    },
    docker: {
      image:'abernix/meteord:base'
    },
    buildOptions: {
      serverOnly: true,
      debug: true,
    },
    env: {
      ROOT_URL: 'http://url_or_ip_here',
      MONGO_URL: "mongodb://<user>:<password>@dbhost:dbport/tsbot" // or mongodb://localhost/meteor
    },
    deployCheckWaitTime: 60,
    enableUploadProgressBar: true,
  }
};
