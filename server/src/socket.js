let io;

export const initSocket = (socketIo) => {
  io = socketIo;
};

export const getIo = () => io;