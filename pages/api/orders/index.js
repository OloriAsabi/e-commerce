import axios from 'axios';
import nc from 'next-connect';
import { isAuth } from '../../../utils/auth';

const handler = nc();

handler.use(isAuth);

handler.post(async (req, res) => {
   const projectId =  '3mwh3zg4';
   const dataset =  'product';
//    const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;
   console.log(req.body);
  const { data } = await axios.post(
    `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
    {
      mutations: [
        {
          create: {
            _type: 'order',
            createdAt: new Date().toISOString(),
            ...req.body,
            userName: req.user.name,
            user: {
              _type: 'reference',
              _ref: req.user._id,
            },
          },
        },
      ],
    },
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer skSfuoPIG5opfuyWkbCy0UjT3N4wuuPGCo8c08LmgiY3wXV1czXqeqQPTQXzMHBsFoKnE9RFIrhtsyZV12vLFf1LVubJBZi32g85VN1x3rlg9auXJ7XnpR9jDWlScQIaTWEIABTSAOarFfAQo5RE1Er2WQhysj6hjs8e9nZ8LWjNzfJ8Jy5O',
      },
    }
  );

  res.status(201).send(data.results[0].id);
});
export default handler;
