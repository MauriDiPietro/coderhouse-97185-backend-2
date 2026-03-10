import bcrypt from 'bcrypt';

export const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

// console.log(hashPassword('1234'));//$2b$10$z4F5OaRRbMUdyu9QYr5tg./NBsfTmzx4ViIXBqy.l3tY8O3VFGzsK
