import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import client from '../../../utils/client';
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
   const projectId =  '3mwh3zg4';
   const dataset =  'product';
   const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;
   console.log(req.body);
   const createMutations = [
    {
      create: {
        _type: 'user',
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        isAdmin: false,
      },
    },
  ];
  const existUser = await client.fetch(
    `*[_type == "user" && email == $email][0]`,
    {
      email: req.body.email,
    }
  );
  if (existUser) {
    return res.status(401).send({ message: 'Email aleardy exists' });
  }

  const { data } = await axios.post(
    `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
    { mutations: createMutations },
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${tokenWithWriteAccess}`
      },
    }
  ).catch((err)  => (console.log('Error User: ', err)));
  console.log("User Data",data);
  const userId = data.results[0].id;
  const user = {
    _id: userId,
    name: req.body.name,
    email: req.body.email,
    isAdmin: false,
  };
  const token = signToken(user);
  console.log("User Data",user);
  res.status(200).send({ ...user, token });
})

export default handler;