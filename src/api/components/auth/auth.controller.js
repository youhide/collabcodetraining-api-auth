import bcrypt from 'bcrypt';

import User from '../user/user.model';

const login = async ({ body: { email, password } }, res) => {
  try {
    const user = await User.findOne({ email }).select('+password');
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.send(401, { error: 'Senha inválida' });

    return res.send(200, { token: 'ok' });
  } catch (error) {
    return res.send(500, error);
  }
};

// eslint-disable-next-line import/prefer-default-export
export { login };
