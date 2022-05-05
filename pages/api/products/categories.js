import nc from 'next-connect';

const handler = nc();

handler.get(async (req, res) => {
  const categories = ['Shirt', 'Pant', 'Headphones', 'Earphones'];
  res.send(categories);
});

export default handler;